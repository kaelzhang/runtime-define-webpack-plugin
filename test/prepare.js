const path = require('path')
const webpack = require('webpack')
const fs = require('fs-extra')

const RuntimeEnvironmentPlugin = require('..')

const fixture = (...args) => path.join(__dirname, 'fixtures', ...args)
const output = (...args) => path.join(__dirname, 'output', ...args)

const NOOP = () => {}

const run = compiler => new Promise((resolve, reject) => {
  compiler.run(err => {
    if (err) {
      return reject(err)
    }
    resolve()
  })
})

const requireNoCache = file => {
  delete require.cache[file]
  require(file)
}

const prepare = ({
  filename,
  outputFilename = filename
}) => {
  process.env.FOO = 'foo'
  process.env.BAR = 'bar'
  process.env.ENTRY_FILE = filename

  const outputFilepath = output(filename)
  const envFilepath = fixture('envs', filename)

  const plugin = new RuntimeEnvironmentPlugin({
    envs: [
      'FOO',
      'BAR',
      'BAZ'
    ],
    envFilepath
  })

  const compiler = webpack({
    plugins: [
      plugin
    ],
    entry: fixture(filename),
    output: {
      path: output(),
      filename: outputFilename
    },
    target: 'node'
  })

  return {
    compile () {
      return run(compiler)
    },
    runOutput () {
      let hasRun = false

      for (const file of plugin.outputs) {
        hasRun = true
        requireNoCache(file)
      }

      if (!hasRun) {
        throw new Error('nothing in plugin.outputs')
      }
    },
    clean () {
      return Promise.all([
        fs.remove(outputFilepath),
        fs.remove(envFilepath)
      ])
      .catch(NOOP)
    },
    plugin
  }
}

module.exports = prepare
