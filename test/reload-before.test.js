const test = require('ava')
const {
  compile,
  runOutput,
  clean,
  plugin
} = require('./prepare')({
  filename: 'foo3.js'
})

test.before(clean)

test('reload before load', async t => {
  process.env.BAZ = 'baz'
  plugin.reload('BAZ')
  process.env.BAZ = 'baz2'
  // compile should not use the process.env, but only plugin.values
  await compile()
  process.env.BAZ = 'baz'

  // Setup
  runOutput()

  t.pass()
})
