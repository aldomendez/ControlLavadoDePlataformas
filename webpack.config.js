const webpack = require('webpack')
const webpackValidator = require('webpack-validator')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env)
  return webpackValidator({
    context: resolve('src'),
    entry: {
      app: './index.js'
    },
    output: {
      path: resolve('dist'),
      filename: 'bundle.[name].[hash] .js',
      publicPath: '/dist/',
      pathinfo: ifNotProd()
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules / },
        { test: /\.css$/, loaders: ['style', 'css-loader'] }
      ]
    },
    plugins: removeEmpty([
      new ProgressBarPlugin(),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      })),
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body',
        favicon: '../favicon.ico'
      })
    ])
  })
}
