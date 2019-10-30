const merge = require("webpack-merge");
const devConfig = require("./webpack.dev");
const proxyConfig = require("./proxy-config");

module.exports = merge(devConfig, {
  devServer: {
    proxy: proxyConfig,
    historyApiFallback: {
      rewrites: [{ from: /^\/app\/.*$/, to: "index.html" }]
    }
  }
});
