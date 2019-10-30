/** 
@todo merge with projects webpack config
/**
 *  @see  https://storybook.js.org/docs/configurations/custom-webpack-config/#using-your-existing-config
 *  also @see https://stackoverflow.com/questions/49370849/configuration-module-has-an-unknown-property-loaders
 
const custom = require('../webpack/webpack.base');

console.log(JSON.stringify(custom));
module.exports = async ({ config, mode }) => {
  return {...config, module: custom.module };
};
*/

const path = require('path'); // no i18n

module.exports = {
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [
                    'style-loader', //no i18n
                    {
                        loader: 'css-loader', //no i18n
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    'less-loader' //no i18n
                ]
            }
            {
                test: /\.(svg|gif|png|jpg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader', //no i18n
                    options: {
                        limit: '10000',
                        name: '[name].[contenthash:16].[ext]'
                    }
                }
            }
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.jsx', '.jpg', '.png', '.gif', '.css'],


        alias: {
            assistImages: path.join(__dirname, '/../images'), // no i18n
        }
    },
};
