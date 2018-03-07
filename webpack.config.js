
const path = require('path');

module.exports = {

  /**
   * Minimal build setup.
   * Create your app bundle.
   */

  entry: './src/game.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'assets', 'scripts')
  },

  /**
   * Minimal development setup.
   * Serves files in ./public folder.
   * Refresh browser automatically when your bundle changes.
   */

  devServer: {
    publicPath: '/assets/scripts/',
    contentBase: path.join(__dirname),
    port: 3000
  }

};