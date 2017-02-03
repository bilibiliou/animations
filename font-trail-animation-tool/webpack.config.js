var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: [
            './Bessel.js'
        ],
        vendor: [
            'babel-polyfill',
            './src/dat.gui.min.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dest'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                loaders: [
                    'babel?presets=[]=stage-2,presets[]=es2015,plugins[]=transform-async-to-generator'
                ]
            },{
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },{
                test: /\.less/,
                exclude: /node_modules/,
                loader: 'style!css!less'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
}