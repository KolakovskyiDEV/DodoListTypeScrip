// const path =require('path');
// const HTMLWebpackPlugin = require("html-webpack-plugin");
// const { template } = require('lodash');
// const {CleanWebpackPlugin}= require('clean-webpack-plugin')

// module.export = {
//     mode:'development',
//     entry:'.src/index.js',
//     output:{
//         filename:'[name].[contenthash].bundle.js',
//         path:path.resolve(__dirname,'dist'),
//     },
//     plugins:[
//         new HTMLWebpackPlugin({
//             template:'.src/index.html'
//         }),
//         new CleanWebpackPlugin()
//     ]
// }
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};