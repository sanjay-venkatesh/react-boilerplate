// $Id$

const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const sass = require("sass");

const ROOT = path.join(__dirname, "/..");
const SRC = path.join(__dirname, "/../src");
const NODE_MODULES = path.join(__dirname, "/../node_modules");

module.exports = {
  context: SRC,

  entry: {
    app: "index.js"
  },

  output: {
    path: path.join(ROOT, "dist", "web_static")
  },

  module: {
    rules: [
      {
        test: /(.jsx|.js)$/,
        exclude: /node_modules|.json/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[local]__[hash:base64:5]"
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.(svg|gif|png|jpg|eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: "10000",
            name: "[name].[contenthash:16].[ext]"
          }
        }
      },
      {
        test: /\.(ico|wav)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[contenthash:16].[ext]"
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(["dist"], { root: ROOT, verbose: true }),

    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /de|fr|es|pt|zh-cn|bg|sv|ja/
    ),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],

  resolve: {
    extensions: ["*", ".js", ".jsx", ".jpg", ".png", ".gif", ".css"],

    modules: [ROOT, "bower_components", "node_modules"],

    alias: {
      src: SRC,
      images: ROOT + "/images",
      moment: NODE_MODULES + "/moment"
    }
  },
  optimization: {
    /** @see https://webpack.js.org/concepts/manifest/#runtime */
    // runtimeChunk: 'single',

    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendorCore: {
          name: "vendor-core",
          chunks: "all",
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|redux|axios|react-i18next|react-redux)[\\/]/,
          priority: 3
        },
        antdCore: {
          name: "antd-core",
          chunks: "all",
          test: /[\\/]node_modules[\\/](antd)[\\/]/,
          priority: 3
        },
        vendorCommon: {
          name: "vendor",
          minChunks: 2,
          chunks: "all",
          test: /(node_modules|bower_components)/,
          priority: 2,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  }
};
