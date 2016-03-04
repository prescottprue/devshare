'use strict'
var webpack = require('webpack')
var pkg = require('./package.json')

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'babel' ], exclude: [ /node_modules/ ] },
      { test: /\.json$/, loaders: [ 'json' ], exclude: [] }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('devshare.js v' + pkg.version + ' | (c) Kyper Digital Inc.', {raw: false, entryOnly: true})
  ],
  output: {
    library: 'Devshare',
    libraryTarget: 'umd',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['', '.js']
  }
}
