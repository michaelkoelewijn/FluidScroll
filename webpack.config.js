const path = require('path');

module.exports = {
  entry: './src/scroll.js',
  mode: 'development',
  output: {
    filename: 'scroll.js',
    path: path.resolve(__dirname, 'dist')
  }
};