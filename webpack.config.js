const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: 'development',
    devServer: {
        bonjour: true,
        static: {
            directory: path.join(__dirname, 'src'),
        },
        liveReload: true,
        compress: true,
        host: '0.0.0.0',
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpg|gif|svg|ico|webp)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.mp3$/i,
                type: 'asset',
            },
        ],

    },
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'GG',
            'meta': {
                'description': 'Игра с шкалой и молотом',
                'author': 'Mihail Tretyakov',
                'og:title': "GG",
                'og:image': 'favicon.ico',
                'og:url': 'https://gg-topaz.vercel.app/',
                'og:site_name': 'Игра с шкалой и молотом',
            },
            template: path.resolve(__dirname, './src/template.html'),
            favicon: path.resolve(__dirname, './src/assets/images/favicon.ico'),
            filename: 'index.html',
        }),

        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false,
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
}
