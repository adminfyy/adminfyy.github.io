 const webpack = require('webpack');
 const htmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = webpackConfig = {
     entry: './src/main.js',
     output: {
         path: './doc',
         filename: `[name].js`,
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         },{
            test: /\.css$/,
            exclude: /node_modules/,
            loader: 'css-loader'
         }]
     },
     plugins: [
        new htmlWebpackPlugin({
            title: 'Why To Javascript',
            template: './src/index.html',
            inject: true
        })
     ]
 }
 var __dev__ = false

 if(__dev__){
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false
            }
        }))
 }