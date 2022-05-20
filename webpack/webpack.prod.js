const { merge } = require("webpack-merge");
const base = require('./webpack.base');
const {name} = require("../package.json");

const prodConfig = {
  output:{
    libraryTarget: "umd",
    library: [name],
  },
  devtool: 'hidden-source-map',
  mode: 'production',
  stats: "errors-only"
};

module.exports = merge(base, prodConfig);
