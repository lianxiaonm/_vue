const webpack            = require('webpack');
const path               = require('path');
const ExtractTxtPlugin   = require('extract-text-webpack-plugin');
const htmlWebpackPlugin  = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry  : {
        vendor: ['vue', 'vue-router'],//框架核心模块
        app   : ['./src/index.js'],//业务代码
        plugin: [//第三方代码
            './plugin/picker.js'
        ]
    },
    output : {
        path         : path.resolve(__dirname, 'deployed'),
        filename     : '[name].js',
        chunkFilename: "[name].js",
        publicPath   : 'deployed/'
    },
    resolve: {
        alias: {
            extensions: ['', '.vue', '.js', '.jsx']
        }
    },
    module : {
        loaders: [
            {
                test  : /\.(css|less)$/,
                loader: ExtractTxtPlugin.extract("style", "css!less", {publicPath: "/deployed"})
            },
            {
                test  : /\.js$/,
                loader: 'babel'
            },
            {
                test  : /\.vue$/,
                loader: 'vue'
            },
            {
                test  : /\.(jpg|png|gif)$/,
                loader: 'url?limit=4000&name=/images/[name].[ext]'
            },
            {
                test  : /\.(svg|ttf|woff|eot)$/,
                loader: 'url?limit=4000&name=/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name    : 'vendor',
            filename: 'vendor.js',
            chunks  : ['vendor', 'app']
        }),
        new ExtractTxtPlugin("[name].css", {
            allChunks: true
        }),
        new htmlWebpackPlugin({
            template: './template.html',
            filename: '../index.html',
            inject  : 'body'
        }),
        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {warnings: false}
        //}),
        new CleanWebpackPlugin(['deployed/*'], {
            root: __dirname,
            dry : false
        })
    ]
}