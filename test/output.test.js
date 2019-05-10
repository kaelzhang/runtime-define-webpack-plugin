const test = require('ava')
const {
  compile,
  runOutput,
  clean,
  plugin,
  output
} = require('./prepare')({
  filename: 'foo4.js',
  outputFilename: 'bar.js'
})

test.before(clean)

test('integrated', async t => {
  await compile()

  // Setup
  runOutput()

  t.true(plugin.outputs.has(output('bar.js')))
})
