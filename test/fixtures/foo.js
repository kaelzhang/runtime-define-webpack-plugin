// eslint-disable-next-line
const __getProcessEnvs = require('./envs')

const ENVS = ['FOO', 'BAR', 'BAZ']

ENVS.forEach(key => {
  const env = process.env[key]
  const v = __getProcessEnvs()[key]
  if (env !== v) {
    throw new Error(
      `process.env.${key} not match, expect ${env}, but got ${v}`)
  }
})
