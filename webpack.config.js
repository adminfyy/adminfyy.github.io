var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = config = {
  target: 'web',
  entry: {
    app: './src/entry.js',
    vendor: [
      'vue',
      'vue-router'
    ]
  },
  output: {
    path: path.resolve(__dirname, './docs'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules/,
        loader: 'babel-loader'
      }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.template.html',
      filename: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'common.js'
    })
  ],
  devServer: {
    compress: true,
    hot: true,
    noInfo: true
  },
  devtool:"eval"
}

if(process.env.NODE_ENV === 'production'){
  config.plugins.push(
     new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      },
      sourceMap: true
    })
  )
}