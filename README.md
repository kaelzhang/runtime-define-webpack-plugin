[![Build Status](https://travis-ci.org/kaelzhang/runtime-define-webpack-plugin.svg?branch=master)](https://travis-ci.org/kaelzhang/runtime-define-webpack-plugin)
[![Coverage](https://codecov.io/gh/kaelzhang/runtime-define-webpack-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/runtime-define-webpack-plugin)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/runtime-define-webpack-plugin?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/runtime-define-webpack-plugin)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/runtime-define-webpack-plugin.svg)](http://badge.fury.io/js/runtime-define-webpack-plugin)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/runtime-define-webpack-plugin.svg)](https://www.npmjs.org/package/runtime-define-webpack-plugin)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/runtime-define-webpack-plugin.svg)](https://david-dm.org/kaelzhang/runtime-define-webpack-plugin)
-->

# runtime-define-webpack-plugin

The webpack RuntimeDefinePlugin allows you to create global constants which can be configured at runtime.

## Install

```sh
$ npm i runtime-define-webpack-plugin
```

## Usage

```js
const RuntimeDefinePlugin = require('runtime-define-webpack-plugin')

const plugin = new RuntimeDefinePlugin({
  '__DEV__': true,
  'process.env.NODE_DEBUG': false
})

webpack.config.plugins.push(plugin)

// And after that we can change the global constants by
plugin.set('process.env.NODE_DEBUG', true)
```

## License

[MIT](LICENSE)
