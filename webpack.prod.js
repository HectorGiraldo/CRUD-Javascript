const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {

    mode: 'production',
    output: {
        clean: true,
        filename: 'main.[fullhash].js'
    },
    module: {
        rules : [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options : {
                    sources: false,
                    // minimize: true,
                }
               
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                  },
               
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    },
    plugins : [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[fullhash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets/", to: "assets/" },
            ],
        }),
    ]
}