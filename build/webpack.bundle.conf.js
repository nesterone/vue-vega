const webpack = require('webpack')
const base = require('./webpack.base.conf')
const config = require('../config')

// this is used only for umd browser bundle,
// refer to .babelrc for lib configuration

base.entry = {
  'vue-vega': './src/index.js',
}

base.output = {
  path: config.bundle.assetsRoot,
  publicPath: config.bundle.assetsPublicPath,
  filename: '[name].min.js',
  libraryTarget: 'umd',
  library: 'VueVega'
}

var webpackConfig = Object.assign({
  devtool: '#source-map'
}, base)

webpackConfig.plugins = (webpackConfig.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    sourceMap: true
  })
])

module.exports = webpackConfig
