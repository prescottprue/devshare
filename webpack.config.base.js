const webpack = require('webpack')
const pkg = require('./package.json')
const config = require('./config.json')

const bannerText = config.library.file + '.js v' + pkg.version + ' | (c) Prescott Prue'

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'babel' ], exclude: [ /node_modules/, /firepad\// ] },
      { test: /\.json$/, loaders: [ 'json' ], exclude: [] }
    ]
    // noParse: [ /node_modules\/firepad/ ] // when requiring firepad (causes style/css loader error)
  },
  stats: {
    // silence critical dependency warnings from Firepad styles
    // warnings: false
  },
  // make firepad an external dep (causes style/css loader error)
  externals: {
    firepad: {
      commonjs: 'firepad',
      commonjs2: 'firepad',
      amd: 'firepad',
      root: 'Firepad'
    }
  },
  plugins: [
    new webpack.BannerPlugin(bannerText, { raw: false, entryOnly: true })
  ],
  output: {
    library: config.library.export,
    libraryTarget: 'umd',
    publicPath: '/' + config.folders.dist + '/'
  },
  resolve: {
    extensions: ['', '.js']
  }
}
