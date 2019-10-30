// $Id$

const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "development",

  devtool: "eval-source-map",

  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    contentBase: "packages/",
    disableHostCheck: true,
    port: 8888,
    host: "0.0.0.0"
  },

  output: {
    filename: "[name].js"
  },

  plugins: [
    new ExtractCssChunks({
      filename: "[name].css",
      hot: true,
      orderWarning: true,
      reloadAll: true
    })
  ]
});
