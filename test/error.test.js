const test = require('ava')
const RuntimeEnvironmentPlugin = require('..')

const ERRORS = [
  [undefined, 'INVALID_ENVS'],
  [{envs: 1}, 'INVALID_ENVS'],
  [{envs: [1]}, 'INVALID_ENVS'],
  [{envs: ['foo']}, 'INVALID_ENV_FILE_PATH'],
  [{envs: ['foo'], envFilepath: 1}, 'INVALID_ENV_FILE_PATH']
]

ERRORS.forEach(([options, code]) => {
  test(JSON.stringify(options) || 'no options', t => {
    t.throws(() => new RuntimeEnvironmentPlugin(options), {code})
  })
})
