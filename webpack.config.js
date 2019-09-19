const path = require('path');

module.exports = {
  entry: './src/scroll.js',
  mode: 'production',
  output: {
    filename: 'scroll.js',
    path: path.resolve(__dirname, 'dist')
  }
};