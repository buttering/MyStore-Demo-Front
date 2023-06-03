const path = require('path');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function getHtmlWebPackPluginConfig (name){
    return {
        title: name,
        template: `./src/view/${name}.html`,
        filename: `view/${name}.html`,
        inject: true,
        hash: true
    }
}

module.exports = {
    mode: "development",
    resolve: {
        extensions: ['.tsx', '.ts', '.js']  // 能够使用户在import模块时不带文件扩展名，会按照顺序尝试载入以这些作为后缀的文件
    },
    entry: {
        'index': './src/page/index/index.js',
        'common': './src/page/common/index.ts'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devtool: 'inline-source-map',  // 此配置仅用于示例，不要用于生产环境
    module: {
        rules: [
            { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
            { test: /\.tsx?$/i, use: 'ts-loader', exclude: /node_modules/ },
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(getHtmlWebPackPluginConfig("index")),
        new MiniCssExtractPlugin({filename: 'css/[name].css'})
    ],
    devServer: {
        static: './dist'
    }
}