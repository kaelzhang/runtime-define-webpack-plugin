
const {resolve} = require('path')
const {isString, isArray, isFunction} = require('core-util-is')
const {error} = require('./error')

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

module.exports = class RuntimeEnvironmentPlugin {
  constructor ({
    envs,
    webpack: webpackModule = getWebpack(),
    envFilepath
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

    this._webpackModule = webpackModule
    this._envs = envs
    this._envFilepath = resolve(envFilepath)
  }

  _createDefinePluginEnvs () {
    const {DefinePlugin} = this._webpackModule
    const {runtimeValue} = DefinePlugin


  }

  apply (compiler) {
    const {DefinePlugin} = this._webpackModule
    new DefinePlugin({

    }).apply(compiler)
  }
}
