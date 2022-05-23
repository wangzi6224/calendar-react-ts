const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { name } = require("../package.json");
const os = require("os");

const distDir = path.join(__dirname, '../dist')

module.exports = {
  entry: path.join(__dirname, '../src/scheduleRender.tsx'),
  output: {
    path: distDir,
    filename: `${name}.min.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader"
      },
      {
        test: /\.(css|less)$/,
        include: [path.join(__dirname, '../src')],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: 'calendar.[hash:6]'
              }
            }
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true
              },
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.(css|less)$/,
        include: [path.join(__dirname, '../node_module')],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[local]'
              }
            }
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true
              },
            }
          },
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "calendar_[contenthash:8].css",
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        test: /\.css$/,
        parallel: 4,
      }),
      new TerserPlugin({
        parallel: os.cpus().length - 1,
      })
    ],
  },
  resolve:{
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      "@": path.resolve(__dirname, '../src/'),
    }
  }
}
