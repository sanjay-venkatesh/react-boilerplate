const merge = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require("./webpack.base");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production",

  stats: "errors-only",

  /**
   * @see https://jakearchibald.com/2016/caching-best-practices/ this to learn about caching
   * caching configuration is done as per guidance in https://webpack.js.org/guides/caching/
   */

  output: {
    filename: "[name]-[contenthash]" + ".js",
    chunkFilename: "[contenthash]" + ".js"
  },

  plugins: [
    /** @see https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching#make_module_ids_more_stable*/
    new webpack.HashedModuleIdsPlugin(),

    new ManifestPlugin(),

    new ExtractCssChunks({
      filename: "[name]-[contenthash].css",
      chunkFilename: "[contenthash].css",
      orderWarning: true // Disable to remove warnings about conflicting order between imports
    }),

    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }]
      }
    })
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        /** @see https://github.com/mishoo/UglifyJS2#minify-options for uglify options */
        uglifyOptions: {
          output: {
            comments: false,
            beautify: false
          },
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
});
