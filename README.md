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

The webpack RuntimeDefinePlugin allows you to create global constants which can be configured at runtime, even after the asset(s) have been emitted to output directory by webpack.

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

const envFilepath = '/path/to/envs.js'
const plugin = new RuntimeEnvironmentPlugin({
  envs: [
    'NODE_DEBUG',
    'NODE_ENV'
  ],
  envFilepath
})

webpackConfig.plugins.push(plugin)

// Run webpack
webpack(webpackConfig).run(() => {

  // And after that we can change the global constants by
  plugin.set('NODE_DEBUG', '')

  // Reload all variables to the latest of the process.env
  plugin.reload()

  // Reload a single environment key
  plugin.reload('NODE_DEBUG')

  // Save changes to files
  plugin.save().then(() => {
    // The content of the chunks has been changed
  })
})
```

### How does it work?

`RuntimeEnvironmentPlugin` will generate and output a commonjs module to the path `options.envFilepath`.

And the module exports a function which returns the env object.

```js
// After webpack has been run

console.log(require(envFilepath).NODE_DEBUG)
// will print `process.env.NODE_DEBUG` at the compiling time of webpack.
```

`RuntimeEnvironmentPlugin` tracks all chunks that depend on the module `envFilepath` and will change the content of each chunk if we reload or set the environment variables.

## new RuntimeEnvironmentPlugin(options)

- **options** `Object`
  - **envs** `Object` the same as the first parameter of `new webpack.DefinePlugin`
  - **envFilepath** `path` the file that environment variables will be save into.

### plugin.reload(): this

Reload all bundled code slices which are original from `options.envFilepath` with the current `process.env`

### plugin.reload(key): this

Reload one env key

### plugin.set(key): this

Set an env key.

### await plugin.save()

Save the changes to the chunk files.

### getter: plugin.outputs

Returns `Set<string>` a set of file paths each of which depends on `options.envFilepath`

## License

[MIT](LICENSE)
