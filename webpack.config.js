const path = require('path')
const dev = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: path.resolve(__dirname, 'src', 'main.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: dev
    ? 'development'
    : 'production',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    open: true,
    overlay: {
      errors: true,
      warnings: true
    },
    port: 8081
  }
}
