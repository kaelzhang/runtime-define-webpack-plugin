const test = require('ava')
const path = require('path')
const webpack = require('webpack')
const fs = require('fs-extra')

// const log = require('util').debuglog('runtime-environment-webpack-plugin')
const RuntimeEnvironmentPlugin = require('..')

const fixture = (...args) => path.join(__dirname, 'fixtures', ...args)
const output = (...args) => path.join(__dirname, 'output', ...args)

const run = compiler => new Promise((resolve, reject) => {
  compiler.run(err => {
    if (err) {
      return reject(err)
    }
    resolve()
  })
})

const NOOP = () => {}
const createRunFile = file => () => {
  delete require.cache[file]
  require(file)
}

test.before(() => fs.remove(output()).catch(NOOP))

test('integrated', async t => {
  process.env.FOO = 'foo'
  process.env.BAR = 'bar'

  const plugin = new RuntimeEnvironmentPlugin({
    envs: [
      'FOO',
      'BAR',
      'BAZ'
    ],
    envFilepath: fixture('envs.js')
  })

  const compiler = webpack({
    plugins: [
      plugin
    ],
    entry: fixture('foo.js'),
    output: {
      path: output(),
      filename: 'foo.js'
    },
    target: 'node'
  })

  await run(compiler)

  const runFile = createRunFile(output('foo.js'))

  runFile()

  process.env.BAZ = 'baz'
  plugin.reload()
  await plugin.save()

  // runFile()

  t.pass()
})
