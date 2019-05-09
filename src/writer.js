const fs = require('fs-extra')
const stringify = require('code-stringify')
const mix = require('mix2')

const {error} = require('./error')

const template = values => `
let envs
module.exports = () => {
  if (envs) {
    return envs
  }

  return envs = ${stringify(values)}
}
`

module.exports = class Writer {
  constructor ({
    envs,
    envFilepath
  }) {
    this._envs = envs
    this._envFilepath = envFilepath

    this._values = null
  }

  load (key) {
    if (arguments.length === 0) {
      this._loadAll()
      return
    }

    this._loadOne(key)
  }

  _loadOne (key) {
    if (this._needSet(key)) {
      this._set(key, process.env[key])
    }
  }

  _needSet (key) {
    if (!this._values) {
      this._loadAll()
      return false
    }

    if (!this._envs.includes(key)) {
      throw error('KEY_NOT_ALLOWED', key)
    }

    return true
  }

  _set (key, value) {
    this._values[key] = value
  }

  set (key, value) {
    this._needSet(key)
    this._set(key, value)
  }

  _loadAll () {
    return this._values = mix(Object.create(null), process.env, this._envs)
  }

  get values () {
    return this._values || this._loadAll()
  }

  _template () {
    return template(this.values)
  }

  save () {
    return fs.outputFile(this._envFilepath, this._template())
  }
}
