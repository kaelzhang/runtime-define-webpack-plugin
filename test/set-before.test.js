const test = require('ava')
const {
  compile,
  runOutput,
  clean,
  plugin
} = require('./prepare')('foo2.js')

test.before(clean)

test('set before load', async t => {
  plugin.set('BAZ', 'baz')
  await compile()
  t.is(process.env.BAZ, undefined, 'process.env.BAZ should be undefined')
  process.env.BAZ = 'baz'

  // Setup
  runOutput()

  t.pass()
})
