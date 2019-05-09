
const {resolve} = require('path')
const {isString, isArray, isFunction} = require('core-util-is')

const {error} = require('./error')
const {walk} = require('./chunks-walker')
const Writer = require('./writer')

let webpack

const getWebpack = () => {
  if (webpack) {
    return webpack
  }

  try {
    // eslint-disable-next-line
    return webpack = require('webpack')
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      throw error('WEBPACK_REQUIRED')
    }

    throw error('WEBPACK_REQUIRE_ERROR', err.stack)
  }
}

const NAME = 'RuntimeEnvironmentPlugin'

module.exports = class RuntimeEnvironmentPlugin {
  constructor ({
    envs,
    webpack: webpackModule = getWebpack(),
    envFilepath,
    getterIdentifier
  } = {}) {
    if (!isString(envFilepath)) {
      throw error('INVALID_ENV_FILE_PATH', envFilepath)
    }

    if (!isArray(envs) || !envs.every(isString)) {
      throw error('INVALID_ENVS', envs)
    }

    if (!isFunction(webpackModule)) {
      throw error('INVALID_WEBPACK', webpackModule)
    }

    if (!isString(getterIdentifier)) {
      throw error('INVALID_GETTER_IDENTIFIER', getterIdentifier)
    }

    this._webpackModule = webpackModule
    this._envs = envs
    this._envFilepath = resolve(envFilepath)
    this._getterIdentifier = getterIdentifier

    this._dependents = new Set()
    this._chunks = Object.create(null)

    this._writer = new Writer({
      envs,
      envFilepath
    })
  }

  _addChunk (chunkOutput, dependency) {
    const dependencies = this._chunks[chunkOutput] || (
      this._chunks[chunkOutput] = new Set()
    )

    dependencies.add(dependency)
  }

  apply (compiler) {
    const {DefinePlugin} = this._webpackModule
    const {runtimeValue} = DefinePlugin

    const id = this._getterIdentifier

    new DefinePlugin({
      [id]: runtimeValue(({module}) => {
        this._dependents.add(module.userRequest)
        return id
      })
    }).apply(compiler)

    compiler.hooks.beforeRun.tapPromise(NAME, async () => {
      await this._writer.save()
    })

    compiler.hooks.compilation.tap(NAME, compilation => {
      compilation.hooks.afterOptimizeChunkModules.tap(NAME, chunks => {
        walk(chunks, (chunkOutput, dependency) => {
          this._addChunk(chunkOutput, dependency)
        })
      })
    })
  }

  reload (...args) {
    this._writer.reload(...args)
    return this
  }

  set (key, value) {
    this._writer.set(key, value)
    return this
  }

  async save () {
    return this._writer.save()
  }
}
