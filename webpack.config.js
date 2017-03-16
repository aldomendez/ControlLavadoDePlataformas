const webpackValidator = require('webpack-validator')
const { resolve } = require('path')
const { getIfUtils } = require('webpack-config-utils')

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env)
  return webpackValidator({
    context: resolve('src'),
    entry: './index.js',
    output: {
      path: resolve('dist'),
      filename: 'bundle.js',
      publicPath: '/dist/',
      pathinfo: ifNotProd()
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          exclude: /node_modules /
        }
      ]
    }
  })
}
