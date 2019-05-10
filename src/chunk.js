const {resolve} = require('path')

const IGNORE = /node_modules/

class Chunk {
  constructor (entryModule, ignore = IGNORE) {
    this._ignore = ignore

    const {
      // The absolute path of of the entry
      userRequest
    } = entryModule

    this.dependencies = new Set()

    const request = resolve(userRequest)
    this.request = request
    this.name = undefined

    // entryModule is already an issuer module
    this._decend(entryModule)
  }

  _decend (module) {
    if (!module) {
      return
    }

    const {userRequest} = module

    if (this._ignore.test(userRequest)) {
      return
    }

    this.dependencies.add(userRequest)

    // `module.dependencies` is always an array
    // Ref: webpack/lib/DependenciesBlock.js
    module.dependencies.forEach(dep => {
      this._decend(dep.module)
    })
  }
}

module.exports = Chunk
