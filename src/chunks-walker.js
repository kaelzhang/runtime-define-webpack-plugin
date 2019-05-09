const IGNORE = /node_modules/

const decend = (module, onFound, ignore) => {
  const {
    userRequest,
    dependencies
  } = module

  if (!userRequest || ignore.test(userRequest)) {
    return
  }

  onFound(userRequest)

  if (!dependencies) {
    return
  }

  dependencies.forEach(dep => decend(dep, onFound, ignore))
}

const walk = (chunks, onDependency, ignore = IGNORE) => {
  chunks.forEach(chunk => {
    const {entryModule} = chunk

    // TODO: handle the scenario that entryModule.name is undefined,
    // that we need to subtitute
    const entryModuleName = entryModule.name

    entryModule.dependencies.forEach(module => {
      decend(module, dep => {
        onDependency(entryModuleName, dep)
      }, ignore)
    })
  })
}

module.exports = {
  walk
}
