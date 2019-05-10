const test = require('ava')
const {
  compile,
  runOutput,
  clean,
  plugin
} = require('./prepare')({
  filename: 'foo.js'
})

test.before(clean)

test('integrated', async t => {
  await compile()

  // Setup
  runOutput()

  // Reload all
  process.env.BAZ = 'baz'
  plugin.reload()
  await plugin.save()
  runOutput()

  // Reload one
  process.env.FOO = 'foo2'
  process.env.BAR = 'baz2'
  plugin.reload('BAR')
  await plugin.save()
  process.env.FOO = 'foo'
  runOutput()

  // Set one
  plugin.set('BAZ', 'baz3')
  await plugin.save()
  process.env.BAZ = 'baz3'
  runOutput()

  t.pass()
})
