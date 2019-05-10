const {resolve, basename} = require('path')

const IGNORE = /node_modules/

class Chunk {
  constructor (entryModule, ignore = IGNORE) {
    this._ignore = ignore

    const {
      // The changed output name of the module
      name,
      // The absolute path of of the entry
      userRequest
    } = entryModule

    this.dependencies = new Set()

    const request = resolve(userRequest)
    this.userRequest = request
    this.name = name || basename(request)

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

    const {
      dependencies
    } = module

    if (!dependencies) {
      return
    }

    dependencies.forEach(dep => {
      this._decend(dep.module)
    })
  }
}

module.exports = Chunk
