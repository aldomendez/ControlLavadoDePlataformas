const webpackValidator = require('webpack-validator')
const { resolve } = require('path')
module.exports = () => {
  return webpackValidator({
    context: resolve('src'),
    entry: './index.js',
    output: {
      path: resolve('dist'),
      filename: 'bundle.js',
      publicPath: '/dist/'
    }
  })
}
