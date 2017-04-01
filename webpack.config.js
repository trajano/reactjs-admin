var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var yargs = require("yargs")

var optimizeMinimize = yargs.alias('p', 'optimize-minimize').argv.optimizeMinimize

module.exports = {
    entry: ['./src/app'],
    resolve: {
        extensions: [
            '',
            '.js',
            '.jsx',
        ],
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },
    externals: {
        "jquery": "jQuery"
    },
    output: {
        path: './dist',
        filename: 'bundle.[hash].js'
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: './src/assets',
            to: 'assets'
        }]),
        new HtmlWebpackPlugin({
            template: "./src/app.html",
            minify: {
                minifyJS: optimizeMinimize,
                minifyCSS: optimizeMinimize,
                removeAttributeQuotes: false,
                collapseWhitespace: optimizeMinimize,
                html5: true
            }
        })
    ],
    devtool: 'source-map',
    devServer: {
        inline: true
    }
}
