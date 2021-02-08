const path = require("path")
const fs = require("fs")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const webpack = require("webpack")

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev

const fileName = (ext) =>
	isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const PATHS = {
	src: path.resolve(__dirname, "src"),
	dist: path.resolve(__dirname, "dist"),
	assets: "assets",
}

const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = fs
	.readdirSync(PAGES_DIR)
	.filter((filename) => filename.endsWith(".pug"))

const optimization = () => {
	const config = {
		/* helps pull out the same code out of multiple files so that they're loaded once */
		splitChunks: {
			chunks: "all",
		},
	}
	if (isProd) {
		config.minimizer = [new CssMinimizerPlugin(), new TerserWebpackPlugin()]
	}
	return config
}

const babelOptions = (preset) => {
	const opts = {
		presets: ["@babel/preset-env"],
		plugins: [
			"@babel/plugin-proposal-class-properties",
			"@babel/plugin-transform-runtime",
		],
	}

	if (preset) {
		opts.presets.push(preset)
	}

	return opts
}

module.exports = {
	mode: "development",
	entry: PATHS.src,
	output: {
		filename: fileName("js"),
		path: PATHS.dist,
		publicPath: "/",
	},
	plugins: [
		/* gets rid of the last compiled files */
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: fileName(".css"),
		}),
		/* copies the stuff from a source folder into the dist without any change; otherwise, the names of the files are changed to hashes, and only the used are copied */
		// new CopyWebpackPlugin({
		// 	patterns: [
		// 		{
		// 			from: `${PATHS.src}/${PATHS.assets}/img`,
		// 			to: `${PATHS.assets}/img`,
		// 			noErrorOnMissing: true,
		// 		},
		// 		{
		// 			from: `${PATHS.src}/${PATHS.assets}/fonts`,
		// 			to: `${PATHS.assets}/fonts`,
		// 			noErrorOnMissing: true,
		// 		},
		// 	]
		// }),
		/* each pug page is turned into an html page */
		...PAGES.map(
			(page) =>
				new HTMLWebpackPlugin({
					template: `${PAGES_DIR}/${page}`,
					filename: `./${page.replace(/\.pug/, ".html")}`,
				})
		),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
		}),
	],
	resolve: {
		extensions: [
			".js",
			".ts",
			".json",
			".png",
			".jpg",
		] /* helps get rid of explicit extensions */,
		alias: {
			/* creates an alias for a folder address */
			"@modules": `${PATHS.src}/modules`,
			"@fonts": `${PATHS.src}/${PATHS.assets}/fonts`,
			"@img": `${PATHS.src}/${PATHS.assets}/img`,
			"@": PATHS.src,
		},
	},
	optimization: optimization(),
	devServer: {
		contentBase: "./dist",
		port: 4321,
		// open: true
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
			},
			{
				test: /\.(png|jpeg|jpg|svg|gif)$/,
				type: "asset/resource",
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				type: "asset/resource",
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: babelOptions(),
				},
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: babelOptions("@babel/preset-typescript"),
				},
			},
			{
				test: /\.pug$/,
				exclude: /node_modules/,
				use: {
					loader: "pug-loader",
					options: {
						pretty: true,
						root: PATHS.src,
					},
				},
			},
		],
	},
}
