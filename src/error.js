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

E('WEBPACK_REQUIRED', `${name} requires "webpack" to be installed, or options.webpack should be specified`)

E('WEBPACK_REQUIRE_ERROR', 'fails to require "webpack": %s')

TE('ENV_FILE_PATH', 'options.envFilepath must be a string of path')

TE('ENVS', 'options.envs must be an array of strings')

TE('WEBPACK', 'options.webpack must be a function which actually should be the module.exports of the "webpack" package')

module.exports = {
  error
}
