const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const staticDir = path.resolve(__dirname, 'xmleditor/static');

module.exports = {
	mode: 'development',
	entry: {
		index: [
			path.resolve(staticDir, 'js/index.js'),
			path.resolve(staticDir, 'css/index.css'),
		]
	},
	target: 'node',
	externals: [nodeExternals()],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
};