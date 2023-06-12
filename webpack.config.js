const path = require('path');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function getHtmlWebPackPluginConfig (name){
    return {
        title: name,
        template: `./src/view/${name}.html`,
        filename: `view/${name}.html`,
        inject: true,  // 在html中注入script
        hash: true,
        chunks: ['common', name]  // 在页面中引入的chunk，这里引入common和自身两个
    }
}

module.exports = {
    mode: "development",
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],  // 能够使用户在import模块时不带文件扩展名，会按照顺序尝试载入以这些作为后缀的文件
        alias: {
            // page: path.resolve(__dirname, '/src/page'),
            // service: path.resolve(__dirname, '/src/service'),
            // utils: path.resolve(__dirname, '/src/utils'),
            // view: path.resolve(__dirname, '/src/view'),
            // module: path.resolve(__dirname, '/node_modules'),
            '@': path.resolve(__dirname, 'src/')
        }
    },
    entry: {
        'index'     : './src/page/index/index.ts',
        'common'    : './src/page/common/common.ts',
        'user-login': './src/page/user-login/user-login.ts',
        'product-list': '/src/page/product-list/product-list.ts'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: "resource/[name][ext][query]"  // 图片等资源文件的名称
    },
    devtool: 'inline-source-map',  // 此配置仅用于示例，不要用于生产环境
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.tsx?$/i,
                use: 'ts-loader', exclude: /node_modules/
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|gif|jpg|avif|png|webp)$/i,
                type: "asset/resource"  // 发送一个单独的文件并导出 URL
            },
            {
                test: /\.(htm|template)$/i,
                use: {
                    loader: 'html-loader',  // htm后缀文件转化为字符串处理
                    options: {esModule: false}
                }
            },

        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(getHtmlWebPackPluginConfig("index")),
        new HtmlWebpackPlugin(getHtmlWebPackPluginConfig("user-login")),
        new HtmlWebpackPlugin(getHtmlWebPackPluginConfig("product-list")),
        new MiniCssExtractPlugin({filename: 'css/[name].css'})  // name由entry指定
    ],
    devServer: {
        static: './dist'
    },
}