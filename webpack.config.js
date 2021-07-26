const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
console.log(isDev);

module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "bundle.[chunkhash].js",
        path: path.resolve(__dirname, 'public/src')
    },
    devServer: {
        port: 3000,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : false,
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin,
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'public/src/img')
                },
                {
                    from: path.resolve(__dirname, 'src/sound'),
                    to: path.resolve(__dirname, 'public/src/sound')
                }
            ],
            options: {
                concurrency: 100,
            },
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                // use: ["style-loader", "css-loader", "sass-loader"],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, 'public/src')
                        },
                    },
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: '/images/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                            disable: true,
                        },
                    },
                ]
            }
        ],
    }
}
