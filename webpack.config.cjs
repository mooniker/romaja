const { resolve } = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'romaja.cjs',
    library: 'romaja',
    libraryTarget: 'umd',
    globalObject: 'this'
  }
}
