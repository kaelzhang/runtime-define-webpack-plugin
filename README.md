[![Build Status](https://travis-ci.org/kaelzhang/runtime-environment-webpack-plugin.svg?branch=master)](https://travis-ci.org/kaelzhang/runtime-environment-webpack-plugin)
[![Coverage](https://codecov.io/gh/kaelzhang/runtime-environment-webpack-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/runtime-environment-webpack-plugin)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/runtime-environment-webpack-plugin?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/runtime-environment-webpack-plugin)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/runtime-environment-webpack-plugin.svg)](http://badge.fury.io/js/runtime-environment-webpack-plugin)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/runtime-environment-webpack-plugin.svg)](https://www.npmjs.org/package/runtime-environment-webpack-plugin)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/runtime-environment-webpack-plugin.svg)](https://david-dm.org/kaelzhang/runtime-environment-webpack-plugin)
-->

# runtime-environment-webpack-plugin

The webpack RuntimeDefinePlugin allows you to create global constants which can be configured at runtime.

## Install

```sh
$ npm i runtime-environment-webpack-plugin
```

## Usage

This plugin must be used with the babel plugin [babel-plugin-transform-environment-variables-to-getters](https://github.com/kaelzhang/babel-plugin-transform-environment-variables-to-getters)

Be careful, only use this plugin for **BROWSER-SIDE** webpack compilation.

`.babelrc`

```json
{
  "plugins": ["transform-environment-variables-to-getters", {
    "envFilepath": "/path/to/envs.js",
    "include": ["NODE_DEBUG"]
  }]
}
```

```js
const RuntimeEnvironmentPlugin = require('runtime-environment-webpack-plugin')

const plugin = new RuntimeEnvironmentPlugin({
  envs: [
    'NODE_DEBUG',
    'NODE_ENV'
  ],
  envFilepath: '/path/to/envs.js'
})

webpack.config.plugins.push(plugin)

// And after that we can change the global constants by
plugin.set('NODE_DEBUG', '')

// Reload all variables to the latest of the process.env
plugin.reload()

// Reload a single environment key
plugin.reload('NODE_DEBUG')

// Save changes to files
await plugin.save()
```

## new RuntimeEnvironmentPlugin(envs, options)

- **envs** `Object` the same as the first parameter of `new webpack.DefinePlugin`
- **options** `Object`
  - **webpack?** `webpack` The `webpack` to use by `RuntimeEnvironmentPlugin`. If not specified, `RuntimeEnvironmentPlugin` will try to `require('webpack')`
  - **envFilepath** `path` the file that environment variables will be save into.
  - **getterIdentifier?** `string='__getProcessEnvs'` the identifier name of the env getter method

## License

[MIT](LICENSE)
