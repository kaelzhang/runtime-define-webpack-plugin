// Test the cases that there is a deps in node_modules
const test = require('./test-env')

// eslint-disable-next-line
const __getProcessEnvs = require(`./envs/${process.env.ENTRY_FILE}`)

const ENVS = ['FOO', 'BAR', 'BAZ']

test(ENVS, __getProcessEnvs)
