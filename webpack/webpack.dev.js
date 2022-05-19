const base = require('./webpack.base');
const {merge} = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const os = require('os')
const path = require("path");

const devConfig = {
  mode: "development",
  entry: path.join(__dirname, '../src/Example/Example.tsx'),
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `../public/index.html`),
      filename: `index.html`,
      chunks: '[hash:8]',
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      }
    })
  ],
  devServer: {
    port: 8000,
    static: '../dist',
    host: RegExp(/^win/i).test(os.type()) ? '127.0.0.1' : "0.0.0.0",
    hot: true,
  },
  devtool: "source-map"
};

module.exports = merge(base, devConfig)
