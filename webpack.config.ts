import webpack from "webpack";
import { loadEnvironment } from "./utils/loadEnvironment";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
loadEnvironment();

const isProduction = process.env.NODE_ENV == "production";
const isDevCacheEnabled = process.env.ENABLE_DEV_CACHE;

const stylesHandler = MiniCssExtractPlugin.loader;

const config: webpack.Configuration = {
  mode: isProduction ? "production" : "development",
  entry: {
    home: [
      "webpack-hot-middleware/client?reload=true",
      "./src/pages/home/index.tsx"
    ],
    about: [
      "webpack-hot-middleware/client?reload=true",
      "./src/pages/about/index.tsx"
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename:
      isProduction || isDevCacheEnabled === "true"
        ? "[name].[contenthash].js"
        : "[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./server/views/home.ejs",
      filename: `views/home.ejs`,
      chunks: ["home"]
    }),
    new HtmlWebpackPlugin({
      template: "./server/views/about.ejs",
      filename: `views/about.ejs`,
      chunks: ["about"]
    }),
    new HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename:
        isProduction || isDevCacheEnabled === "true"
          ? "[name].[contenthash].css"
          : "[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(gif|svg|png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 100000
          }
        },
        generator: {
          filename:
            isProduction || isDevCacheEnabled === "true"
              ? "[name].[contenthash][ext]"
              : "[name][ext]"
        }
      },
      {
        test: /\.(eot|woff|woff2?|ttf)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3000
          }
        },
        generator: {
          filename:
            isProduction || isDevCacheEnabled === "true"
              ? "[name].[contenthash][ext]"
              : "[name][ext]"
        }
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."]
  }
};

export default config;
