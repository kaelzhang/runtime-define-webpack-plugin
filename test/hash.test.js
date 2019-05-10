const test = require('ava')
const {
  compile,
  runOutput,
  clean,
  plugin
} = require('./prepare')({
  filename: 'foo5.js',
  outputFilename: 'bar.[hash].js'
})

test.before(clean)

test('integrated', async t => {
  await compile()

  // Setup
  runOutput()

  const {outputs} = plugin
  t.is(outputs.size, 1)

  for (const file of outputs) {
    t.true(/bar\.[a-z0-9]+.js$/.test(file), 'should has hash')
  }
})
