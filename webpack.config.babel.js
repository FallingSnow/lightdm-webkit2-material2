import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import os from 'os';
import fs from 'fs';
let HappyPack = require('happypack');
let happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length + 1
});
const happyTempDir = path.resolve(os.tmpdir(), '.happypack');

const ENV = process.env.NODE_ENV || 'development';

const config = {
    context: path.resolve(__dirname, "src"),
    entry: './index.js',

    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: '',
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['', '.jsx', '.js', '.json', '.less'],
        modulesDirectories: [
            path.resolve(__dirname, "node_modules"),
            'node_modules'
        ],
        unsafeCache: true
    },

    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            exclude: [/src\//, /node_modules\/intl-/],
            loader: 'source-map'
        }],
        loaders: [{
            test: /\.(xml|html|txt|md)$/,
            loader: 'happypack/loader?id=raw'
        // }, {
        //     test: /\.(jpe?g|png|gif|svg)$/i,
        //     loader: 'happypack/loader?id=image'
        }, {
            test: /\.json$/,
            loader: 'happypack/loader?id=json'
        }, {
            test: /\.css$/,
            loader: "happypack/loader?id=css"
        }, {
            test: /\.less$/,
            loader: "happypack/loader?id=less"
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'happypack/loader?id=jsx'
        // }, {
        //     test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        //     loader: "happypack/loader?id=woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "happypack/loader?id=file"
        // }, {
        //     test: /\.(xml|html|txt|md)$/,
        //     loader: 'raw'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        // }, {
        //     test: /\.json$/,
        //     loaders: ["json-loader"]
        // }, {
        //     test: /\.css$/,
        //     loader: "style-loader!css-loader"
        // }, {
        //     test: /\.less$/,
        //     loader: "style-loader!css-loader!less-loader"
        // }, {
        //     test: /\.jsx?$/,
        //     exclude: /node_modules/,
        //     loader: 'babel'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        // }, {
        //     test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        //     loader: "file-loader"
        }]
    },

    plugins: ([
            new HappyPack({
                id: 'raw',
                threadPool: happyThreadPool,
                loaders: ['raw'],
                tempDir: happyTempDir
            }),
            new HappyPack({
                id: 'jsx',
                threadPool: happyThreadPool,
                loaders: ['babel'],
                tempDir: happyTempDir
            }),
            new HappyPack({
                id: 'json',
                threadPool: happyThreadPool,
                loaders: ['json-loader'],
                tempDir: happyTempDir
            }),
            new HappyPack({
                id: 'file',
                threadPool: happyThreadPool,
                loaders: ['file-loader'],
                tempDir: happyTempDir
            }),
            new HappyPack({
                id: 'less',
                threadPool: happyThreadPool,
                loaders: ['style-loader!css-loader!less-loader'],
                tempDir: happyTempDir
            }),
            new HappyPack({
                id: 'css',
                threadPool: happyThreadPool,
                loaders: ['style-loader!css-loader'],
                tempDir: happyTempDir
            }),
            new HappyPack({
                id: 'image',
                threadPool: happyThreadPool,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ],
                tempDir: happyTempDir
            }),
            new HappyPack({
                id: 'woff',
                threadPool: happyThreadPool,
                loaders: ['url-loader?limit=10000&minetype=application/font-woff'],
                tempDir: happyTempDir
            }),
            new webpack.NoErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify({
                    NODE_ENV: ENV
                })
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
                minify: {
                    collapseWhitespace: true
                }
            })
        ])
        .concat(ENV === 'production' ? [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ] : []),

    stats: {
        colors: true
    },

    // devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
    devtool: '#inline-source-map',

    devServer: {
        port: process.env.PORT || 8080,
        host: '0.0.0.0',
        colors: true,
        publicPath: '/',
        contentBase: './src',
        historyApiFallback: true,
        proxy: {
            // OPTIONAL: proxy configuration:
            // '/optional-prefix/**': { // path pattern to rewrite
            //	 target: 'http://target-host.com',
            //	 pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
            // }
        }
    }
};

module.exports = config;
