/* eslint-disable no-undef */

const devCerts = require("office-addin-dev-certs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const webpack = require("webpack");
const path = require('path');

const {
  default: FluentUIReactIconsFontSubsettingPlugin,
} = require('@fluentui/react-icons-font-subsetting-webpack-plugin');

const urlDev = "https://localhost:3000/";
const urlProd = "https://www.contoso.com/"; // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION

async function getHttpsOptions() {
  const httpsOptions = await devCerts.getHttpsServerOptions();
  return { ca: httpsOptions.ca, key: httpsOptions.key, cert: httpsOptions.cert };
}

module.exports = async (env, options) => {
  const dev = options.mode === "development";
  const config = {
    devtool: "source-map",
    entry: {
      icons: ["@fluentui/react-icons"],
      index: {
        import: ["./src/index/index.tsx", "./src/index/index.html"],
        dependOn: ['icons'],
      },
      authorize: {
        import: ["./src/authorize/index.tsx", "./src/authorize/authorize.html"],
        dependOn: ['icons'],
      },
      analyzer: {
        import: ["./src/analyzer/index.tsx", "./src/analyzer/analyzer.html"],
        dependOn: ["icons"],
      }
    },
    output: {
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".html", ".js"],
      conditionNames: ['fluentIconFont', 'import'],
    },
    optimization: {
      usedExports: true,
      sideEffects: false,
      minimize: true
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: "html-loader",
        },
        {
          test: /\.(png|jpg|jpeg|ttf|woff|woff2|gif|ico)$/,
          type: "asset/resource",
          generator: {
            filename: "assets/[name][ext][query]",
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(ttf|woff2?)$/,
          type: 'asset',
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index/index.html",
        chunks: ["icons","index"],
      }),
      new HtmlWebpackPlugin({
        filename: "authorize.html",
        template: "./src/authorize/authorize.html",
        chunks: ["icons","authorize"],
      }),
      new HtmlWebpackPlugin({
        filename: "analyzer.html",
        template: "./src/analyzer/analyzer.html",
        chunks: ["icons","analyzer"],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "**/*",
            to: "assets/[path][name][ext][query]",
            context: "assets"
          },
          {
            from: "manifest*.xml",
            to: "[name]" + "[ext]",
            transform(content) {
              if (dev) {
                return content;
              } else {
                return content.toString().replace(new RegExp(urlDev, "g"), urlProd);
              }
            },
          },
        ],
      }),
      new webpack.ProvidePlugin({
        Promise: ["es6-promise", "Promise"],
      }),
      new FluentUIReactIconsFontSubsettingPlugin(),
      new CompressionPlugin({
        algorithm: "gzip",
        test: /\.(js|html)$/
      }),
    ],
    devServer: {
      hot: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      server: {
        type: "https",
        options: env.WEBPACK_BUILD || options.https !== undefined ? options.https : await getHttpsOptions(),
      },
      port: process.env.npm_package_config_dev_server_port || 3000,
    },
  };

  return config;
};
