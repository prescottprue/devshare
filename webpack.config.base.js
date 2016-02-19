'use strict'
var webpack = require('webpack')
var pkg = require('./package.json')

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: [/node_modules/] },
      { test: [/aws-sdk/], loaders: ['transform?brfs'], exclude: [] },
      { test: /\.json$/, loaders: ['json'], exclude: [] }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('grout.js v' + pkg.version + ' | (c) Kyper Digital Inc.', {raw: false, entryOnly: true})
  ],
  output: {
    library: 'Grout',
    libraryTarget: 'umd',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['', '.js']
  }
}
