// Test the cases that there is a deps in node_modules
const {get} = require('object-access')

// eslint-disable-next-line
const __getProcessEnvs = require(`./envs/${process.env.ENTRY_FILE}`)

const ENVS = ['FOO', 'BAR', 'BAZ']

ENVS.forEach(key => {
  const env = get(process, ['env', key])
  const v = __getProcessEnvs()[key]
  if (env !== v) {
    throw new Error(
      `process.env.${key} not match, expect ${env}, but got ${v}`)
  }
})
