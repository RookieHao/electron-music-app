const { EnvironmentPlugin } = require('webpack');
const { resolve } = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.render.base.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports= merge(common, {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    path: resolve(__dirname,"../dist/render"),
    publicPath: "./",
    filename: "js/render.prod.js",
    chunkFilename: "js/[name]-[id].js"
  },
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // },
  plugins:[
    new EnvironmentPlugin({
      NODE_ENV:'production',
      IS_DEBUG:false
    }),
    new BundleAnalyzerPlugin({
      analyzerMode:'static',
      openAnalyzer: false
    })
  ]
});