const {
  Errors,
  exitOnNotDefined
} = require('err-object')

const {name} = require('../package.json')

const {error, E} = new Errors({
  notDefined: exitOnNotDefined,
  prefix: `[${name}] `
})

const BUT_GOT = ', but got `%j`'

const TE = (code, message) => E(
  `INVALID_${code}`,
  `${message}${BUT_GOT}`,
  TypeError
)

TE('ENV_FILE_PATH', 'options.envFilepath must be a string of path')

TE('ENVS', 'options.envs must be an array of strings')

E('KEY_NOT_ALLOWED', 'key "%s" is not among options.envs', RangeError)

module.exports = {
  error
}
