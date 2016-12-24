import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

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
        ]
    },

    module: {
        preLoaders: [{
            test: /\.js/,
            loader: 'import-glob'
        }, {
            test: /\.jsx?$/,
            exclude: [/src\//, /node_modules\/intl-/],
            loader: 'source-map'
        }],
        loaders: [{
            test: /\.(xml|html|txt|md)$/,
            loader: 'raw'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }, {
            test: /\.json$/,
            loaders: ["json-loader"]
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }]
    },

    plugins: ([
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
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
