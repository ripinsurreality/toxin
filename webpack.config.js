const path = require("path")
const fs = require("fs")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { ProvidePlugin } = require("webpack")

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev

const fileName = (ext) =>
  isDev ? `index.${ext}` : `index.[contenthash].${ext}`

const PATHS = {
  src: path.resolve(__dirname, "src"),
  dist: path.resolve(__dirname, "dist"),
  assets: "assets",
}

const PAGES_DIR = `${PATHS.src}/pages/`
const PAGES = fs.readdirSync(PAGES_DIR)
const PAGES_TS = Object.fromEntries(
  new Map(PAGES.map((page) => [page, `${PAGES_DIR}/${page}`]))
)

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
  externals: {
    paths: PATHS,
  },
  entry: PAGES_TS,
  output: {
    filename: fileName("js"),
    path: PATHS.dist,
    publicPath: "/",
    clean: true,
    assetModuleFilename: "assets/[name][ext]",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: fileName(".css"),
    }),
    ...PAGES.map(
      (page) =>
        new HTMLWebpackPlugin({
          template: `${PAGES_DIR}/${page}/index.pug`,
          filename: `${page}/index.html`,
          chunks: [`${page}`],
        })
    ),
    new ProvidePlugin({
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
    contentBase: PATHS.dist,
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
        generator: {
          filename: "assets/img/[name][ext]",
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
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
