'use strict'
var webpack = require('webpack')
var pkg = require('./package.json')
var config = require('./config.json')

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'babel' ], exclude: [ /node_modules/ ] },
      { test: /\.json$/, loaders: [ 'json' ], exclude: [] }
    ],
    noParse: [ /node_modules\/firepad/ ]
  },
  plugins: [
    new webpack.BannerPlugin(`${config.library.file}.js v${pkg.version} | (c) Kyper Digital Inc.`, { raw: false, entryOnly: true })
  ],
  output: {
    library: config.library.export,
    libraryTarget: 'umd',
    publicPath: `/${config.folders.dist}/`
  },
  resolve: {
    extensions: ['', '.js']
  }
}
