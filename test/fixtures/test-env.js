const {get} = require('object-access')

module.exports = (ENVS, getter) => ENVS.forEach(key => {
  const env = get(process, ['env', key])
  const v = getter()[key]
  if (env !== v) {
    throw new Error(
      `process.env.${key} not match, expect ${env}, but got ${v}`)
  }
})
