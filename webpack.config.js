 const webpack = require('webpack');
 const htmlWebpackPlugin = require('html-webpack-plugin');
 const CopyWebpackPlugin = require('copy-webpack-plugin');

 module.exports = webpackConfig = {
     entry: './src/index.js',
     output: {
         path: './docs',
         filename: "app.js",
     },
     module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                  loaders: {
                    // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                    // the "scss" and "sass" values for the lang attribute to the right configs here.
                    // other preprocessors should work out of the box, no loader config like this nessessary.
                    'scss': 'vue-style-loader!css-loader!sass-loader',
                    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                  }
                  // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
     plugins: [
        new htmlWebpackPlugin({
            title: 'Why To Javascript',
            template: './src/index.html',
            inject: true
        })
     ]
 }