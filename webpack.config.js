// webpack v4
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path');
module.exports = {
  entry: {
      pageOne: './src/pageone/index.js',
      pageTwo: './src/pagetwo/index.js',
      pageThree:'./src/pagethree/index.js',
      pageFour:'./src/pagefour/index.js',
      pageFive:'./src/pagefive/index.js'
        },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js'
  },
  module: {

    rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract(
            {
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            })
        }
    ]
  },
    plugins: [
        new ExtractTextPlugin({filename: '../css/[name].css'}),
    ]
};