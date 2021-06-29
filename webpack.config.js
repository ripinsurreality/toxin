const path = require("path")
const fs = require("fs")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { ProvidePlugin } = require("webpack")
const CopyPlugin = require("copy-webpack-plugin")

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev

const fileName = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const PATHS = {
  src: path.resolve(__dirname, "src"),
  dist: path.resolve(__dirname, "dist"),
  assets: "assets",
}

const PAGES_DIR = `${PATHS.src}/pages/`
const PAGES = ["search"] /* fs.readdirSync(PAGES_DIR) */
const PAGES_TS = Object.fromEntries(
  new Map(
    PAGES.map((page) => {
      return [
        page,
        {
          import: `${PAGES_DIR}/${page}`,
        },
      ]
    })
  )
)

const optimization = () => {
  const config = {
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
    publicPath: `/`,
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: `${PATHS.src}/${PATHS.assets}/img`,
          to: `${PATHS.assets}/img`,
          noErrorOnMissing: true,
        },
        {
          from: `${PATHS.src}/${PATHS.assets}/fonts`,
          to: `${PATHS.assets}/fonts`,
          noErrorOnMissing: true,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: fileName("css"),
    }),
    ...PAGES.map((page) => {
      return new HTMLWebpackPlugin({
        template: `${PAGES_DIR}/${page}/index.pug`,
        filename: `index.html`,
        chunks: [`${page}`],
      })
    }),
    new ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".json", ".png", ".jpg"],
    alias: {
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
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false } },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
      {
        test: /\.(ttf|woff|woff2|svg|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
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
