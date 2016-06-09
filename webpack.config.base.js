const webpack = require('webpack')
const pkg = require('./package.json')
const config = require('./config.json')

const bannerText = config.library.file + '.js v' + pkg.version + ' | (c) Kyper Digital Inc.'

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'babel' ], exclude: [ /node_modules/ ] },
      { test: /\.json$/, loaders: [ 'json' ], exclude: [] }
    ]
    // noParse: [ /node_modules\/firepad/ ] // when requiring firepad
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
