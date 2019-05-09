next
  // generator webpack configuration
  /dist/build/webpack-config.js

webpack
  /compiler.js
    exec entry -> new Compiler().run(callback)

argument of the fn of runtimeValue(fn) is {module} of which is the same as the `module` of Compilation::processModuleDependencies(module, callback)

NormalModuleFactory
  hooks
    beforeResolve
      [factory] -> actually never hooked externally?
        resolver
        afterResolve
        createModule -> NormalModule
          module
