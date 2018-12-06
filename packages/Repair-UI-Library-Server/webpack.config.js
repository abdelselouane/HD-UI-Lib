const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('babel-polyfill');

module.exports = {
  entry: { index: ['babel-polyfill', "./src/index.jsx"] },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['env'] } 
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=[name].[ext]&outputPath=fonts/&publicPath=fonts/'
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader?name=[name].[ext]']
      },
      {
        test: /\.(html)$/,
        use: ['file-loader?name=[name].[ext]']
      }
    ]
  },
  resolve: { extensions: [ '*', '.js', '.jsx' ] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  devtool: 'source-map',
  plugins: [ new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFileName: '[id].css'
    }) ]
};
