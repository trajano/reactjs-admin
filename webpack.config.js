const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const yargs = require("yargs")

const optimizeMinimize = yargs.alias('p', 'optimize-minimize').argv.optimizeMinimize

module.exports = {
    entry: ['./src/app'],
    resolve: {
        extensions: [
            '.js',
            '.jsx',
        ],
        alias: {
            'react$': path.join(__dirname, 'node_modules', 'react', 'dist',
                (optimizeMinimize ? 'react.min.js' : 'react.js')),
            'react-dom$': path.join(__dirname, 'node_modules', 'react-dom', 'dist',
                (optimizeMinimize ? 'react-dom.min.js' : 'react-dom.js')),
            'redux$': path.join(__dirname, 'node_modules', 'redux', 'dist',
                (optimizeMinimize ? 'redux.min.js' : 'redux.js')),
            'react-redux$': path.join(__dirname, 'node_modules', 'react-redux', 'dist',
                (optimizeMinimize ? 'react-redux.min.js' : 'react-redux.js'))
        }
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
                    presets: ['es2015', 'react', 'stage-1']
                }
            },
            {
                test: /\.(jpe?g|png)$/,
                loader: "responsive-loader"
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
    output: {
        path: path.resolve(__dirname, 'dist'),
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
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    devtool: 'source-map',
    devServer: {
        inline: true,
        historyApiFallback: {
            verbose: true,
            disableDotRule: true
        }
    }
}
