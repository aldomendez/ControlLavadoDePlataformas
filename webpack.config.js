const webpack = require('webpack')
const webpackValidator = require('webpack-validator')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env)
  return webpackValidator({
    context: resolve('src'),
    entry: {
      app: './index.js'
    },
    output: {
      path: resolve('dist'),
      filename: 'bundle.[name].[hash].js',
      publicPath: ifProd('http://wmatvmlr401/lr4/4x25-Lavado-de-plataformas/', '/'),
      pathinfo: ifNotProd()
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel-loader?compact=false'], exclude: /node_modules / },
        { test: /\.css$/, loaders: ['style', 'css-loader'] }
      ]
    },
    plugins: removeEmpty([
      // new ExtractTextPlugin(ifProd('styles.[name].[chunkhash].css', 'style.[name].css')),
      new ProgressBarPlugin(),
      ifProd(new InlineManifestWebpackPlugin()),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest ']
      })),
      new HtmlWebpackPlugin({
        template: './index.html',
        // inject: 'body',
        favicon: '../favicon.ico'
      })
    ])
  })
}
