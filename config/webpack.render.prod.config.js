const { EnvironmentPlugin } = require('webpack');
const { resolve } = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.render.base.config');

module.exports= merge(common, {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    path: resolve(__dirname,"../dist"),
    publicPath: "/",
    filename: "[name]-[chunkhash].js",
    chunkFilename: "[name]-[id].js"
  },
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // },
  plugins:[
    // new CleanWebpackPlugin(),
    new EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode:'server',
      openAnalyzer: true
    })
  ]
});