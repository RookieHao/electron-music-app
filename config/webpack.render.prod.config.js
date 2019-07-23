const { EnvironmentPlugin } = require('webpack');
const { resolve } = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.render.base.config');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports= merge(common, {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    path: resolve(__dirname,"../dist/render"),
    publicPath: "./",
    filename: "render.prod.js",
    chunkFilename: "[name]-[id].js"
  },
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // },
  plugins:[
    new EnvironmentPlugin({
      NODE_ENV:'production',
      DEBUG:false
    }),
    // new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerMode:'server',
    //   openAnalyzer: true
    // })
  ]
});