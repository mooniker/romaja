const { resolve } = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'romaja.js',
    library: 'romaja',
    libraryTarget: 'umd',
    globalObject: 'this'
  }
}
