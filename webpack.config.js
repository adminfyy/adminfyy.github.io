 const webpack = require('webpack');
 const htmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
     entry: './src/main.js',
     output: {
         path: './',
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
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false
            }
        }),
        new htmlWebpackPlugin({
            title: 'Why To Javascript',
            template: 'index.html',
            inject: true
        })
     ]
 }