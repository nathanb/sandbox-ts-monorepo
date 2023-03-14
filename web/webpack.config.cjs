/// <reference types="webpack/module" />

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('node:path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')

function transformSharedToDefine(shared) {
	const result = {}
	Object.keys(shared).forEach(k => {
		const v = shared[k]
		result[`process.env.${k}`] = JSON.stringify(v)
	})
	return result
}

function buildConfig(argv) {
	const mode = argv.mode || 'development'
	const prodMode = mode === 'production'
	const CI = process.env.CI === 'true' || false

	const sharedEnv = {
		PUBLIC_URL: process.env.PUBLIC_URL || '/',
		VERSION: require('./package.json').version,
		VERSION_HASH: process.env.GITHUB_SHA?.substring(0, 7)
	}

	let devtool; let plugins = []; let sourceMapLoader
	if (!prodMode) {
		devtool = 'source-map'
		sourceMapLoader = {
			test: /\.(m|c){0,1}js$/,
			enforce: 'pre',
			use: ['source-map-loader']
		}
	} else {
		if (!CI) { // no bundle analyzer for a CI build
			plugins = [new BundleAnalyzerPlugin({
				openAnalyzer: false,
				analyzerMode: 'static'
			})]
		}
	}

	const config = {
		entry: {
			app: './src/index'
		},
		mode,
		...({ devtool }),
		optimization: {
			minimize: prodMode,
			usedExports: true,
			minimizer: [new TerserPlugin()]
		},
		devServer: {
			hot: !prodMode,
			historyApiFallback: true,
			host: '0.0.0.0',
			static: {
				directory: path.join(__dirname, 'public')
			},
			compress: true,
			port: process.env.PORT || 3000,
		},
		watchOptions: {
			aggregateTimeout: 2500,
			poll: 1000,
		},
		module: {
			rules: [
				{
					test: /\.(t|j|mj|mt|cj|ct)sx{0,1}?$/,
					use: 'babel-loader',
					exclude: /node_modules/
				}
				// {
				// 	test: /\.css$/i,
				// 	use: [
				// 		prodMode ? MiniCssExtractPlugin.loader : 'style-loader',
				// 		'css-loader',
				// 		'postcss-loader'
				// 	]
				// }
			]
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.cjs', '.mjs', '.mts', '.cts'],
			extensionAlias: {
				'.js': ['.js', '.ts', '.tsx'],
				'.cjs': ['.cjs', '.cts', '.ctsx'],
				'.mjs': ['.mjs', '.mts', '.mtsx']
			}
		},
		plugins: [
			// new MiniCssExtractPlugin(),
			new HtmlWebpackPlugin({
				template: path.join(__dirname, './src/index.html'),
				templateParameters: sharedEnv,
				hash: true
			}),
			new webpack.DefinePlugin(transformSharedToDefine(sharedEnv))
		],
		output: {
			filename: '[name]-[fullhash].bundle.js',
			path: path.resolve(__dirname, 'dist'),
			clean: true,
			publicPath: sharedEnv.PUBLIC_URL
		}
	}
	if (sourceMapLoader) config.module.rules.push(sourceMapLoader)
	config.plugins.push(...plugins)
	return config
}

module.exports = (env, argv) => {
	return buildConfig(argv)
}
