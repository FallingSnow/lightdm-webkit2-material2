/*global __dirname*/

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const os = require('os');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HappyPack = require('happypack');
const SriPlugin = require('webpack-subresource-integrity');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';

const imageLoaderSettings = {
    progressive: true,
    optipng: {
        optimizationLevel: 7
    },
    pngquant: {
        quality: '65-90',
        speed: 4
    }
};
const happyPackSettings = {
    threadPool: HappyPack.ThreadPool({
        size: os.cpus().length + 1
    }),
    tempDir: path.resolve(os.tmpdir(), '.happypack')
};


const config = {
    context: path.resolve(__dirname, "src"),
    entry: [
        "font-awesome-webpack2",
        "animate.css",
        './index.js',
        "./less/style.less",
    ],

    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: '',
        filename: 'bundle.js',
        crossOriginLoading: 'anonymous'
    },

    resolve: {
        extensions: ['.jsx', '.js', '.json', '.less'],
        // alias: {
        //     react: 'preact-compat',
        //     "react-dom": 'preact-compat',
        //     "react-tap-event-plugin": "preact-tap-event-plugin",
        //     'react-addons-shallow-compare': 'shallow-compare'
        // }
    },

    module: {
        rules: [{
                enforce: 'pre',
                test: /\.jsx?$/,
                exclude: [/src\//, /node_modules\/intl-/],
                loader: 'source-map-loader'
            },
            {
                test: /\.(xml|html|txt|md)$/,
                loader: 'happypack/loader?id=raw'
            }, {
                //     test: /\.(jpe?g|png|gif|svg)$/i,
                //     loader: 'happypack/loader?id=image'
                // }, {
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
                //     loader: 'raw-loader'
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=static/[name].[ext]?[hash]',
                    {
                        loader: 'image-webpack-loader',
                        query: imageLoaderSettings
                    }
                ]
                // }, {
                //     test: /\.css$/,
                //     loader: "style-loader!css-loader"
                // }, {
                //     test: /\.less$/,
                //     loader: "style-loader!css-loader!less-loader"
                // }, {
                //     test: /\.jsx?$/,
                //     exclude: /node_modules/,
                //     loader: 'babel-loader'
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&hash=sha512&digest=hex&name=static/[name].[ext]?[hash]"
                // }, {
                //     test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                //     loader: "file-loader?hash=sha512&digest=hex&name=static/[name].[ext]?[hash]"
            }
        ]
    },

    plugins: ([
            new HappyPack(Object.assign({}, happyPackSettings, {
                id: 'raw',
                loaders: ['raw-loader']
            })),
            new HappyPack(Object.assign({}, happyPackSettings, {
                id: 'jsx',
                loaders: ['babel-loader']
            })),
            new HappyPack(Object.assign({}, happyPackSettings, {
                id: 'file',
                loaders: ['file-loader?hash=sha512&digest=hex&name=static/[name].[ext]?[hash]'],
            })),
            new HappyPack(Object.assign({}, happyPackSettings, {
                id: 'less',
                loaders: ['style-loader!css-loader!less-loader']
            })),
            new HappyPack(Object.assign({}, happyPackSettings, {
                id: 'css',
                loaders: ['style-loader!css-loader']
            })),
            new HappyPack(Object.assign({}, happyPackSettings, {
                id: 'image',
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=static/[name].[ext]?[hash]',
                    {
                        loader: 'image-webpack-loader',
                        query: imageLoaderSettings
                    }
                ]
            })),
            new HappyPack(Object.assign({}, happyPackSettings, {
                id: 'woff',
                loaders: ['url-loader?limit=10000&hash=sha512&digest=hex&name=static/[name].[ext]?[hash]']
            })),
            new webpack.DefinePlugin({
                // A common mistake is not stringifying the "production" string.
                'process.env.NODE_ENV': JSON.stringify(ENV)
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
                minify: {
                    collapseWhitespace: true
                }
            }),
            new SriPlugin({
                hashFuncNames: ['sha256', 'sha384'],
            }),
        ])
        .concat(ENV === 'production' ? [
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                compress: {
                    unsafe: true,
                    unsafe_comps: true,
                    collapse_vars: true,
                    reduce_vars: true
                }
            }),
        ] : [
            new DashboardPlugin(),
            new FriendlyErrorsWebpackPlugin(),
        ]),

    stats: {
        colors: true
    },

    devtool: ENV === 'production' ? 'source-map' : '#inline-source-map',

    devServer: {
        port: process.env.PORT || 8080,
        host: '0.0.0.0',
        publicPath: '/',
        contentBase: './src',
        historyApiFallback: true,
        quiet: true,
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
