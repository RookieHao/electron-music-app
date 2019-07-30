const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const mode = process.env.NODE_ENV

module.exports= {
  mode,
  devtool: "cheap-module-source-map",
  entry:resolve(__dirname,"../main/main.ts"),
  output: {
    path: resolve(__dirname,"../dist"),
    filename: "main/main.js"
  },
  resolve:{
    extensions: [".js",".ts"],
  },
  module:{
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin()
  ],
  target:"electron-main",
  node: {
    __dirname: false,
    __filename: false
  }
};