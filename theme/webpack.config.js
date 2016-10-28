var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './js/src/server.js',
    output: {
        path: __dirname,
        filename: './js/server.js'
    },
    module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			}
		]
	},
    stats: {
        // Nice colored output
        colors: true
    }
};
