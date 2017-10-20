const webpack = require('webpack')
const path = require('path')
var nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack');

module.exports = [{
  target: 'web', // <=== can be omitted as default is 'web'
  devtool: 'eval',
  context: __dirname,

  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    'webpack/hot/dev-server',
    './app/src/index.js',
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.resolve(__dirname, 'app')
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv()
  ]
}]
