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

const createRunFile = file => () => {
  delete require.cache[file]
  require(file)
}

const prepare = (filename, entry = 'seed.js') => {
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
    entry: fixture(entry),
    output: {
      path: output(),
      filename
    },
    target: 'node'
  })

  const runOutput = createRunFile(outputFilepath)

  return {
    compile () {
      return run(compiler)
    },
    runOutput,
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
