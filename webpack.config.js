var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require('path');
module.exports = {
    entry: {
        main: './public/js/APP'
    },
    output: {
        path: path.join(__dirname, '/public/js/build'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['','.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
            }
        ]
    }
}
