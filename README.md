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

```js
const RuntimeEnvironmentPlugin = require('runtime-environment-webpack-plugin')

const plugin = new RuntimeEnvironmentPlugin({
  'process.env.NODE_DEBUG': 'runtime-env-plugin'
})

webpack.config.plugins.push(plugin)

// And after that we can change the global constants by
plugin.set('process.env.NODE_DEBUG', '')
```

## License

[MIT](LICENSE)
