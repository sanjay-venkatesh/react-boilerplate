// $Id$

const merge = require('webpack-merge'); 
const baseConfig = require('./webpack.prod'); 
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 

module.exports = merge(baseConfig, {

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerPort: 8889
        })
    ],
});
