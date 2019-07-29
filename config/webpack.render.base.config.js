const { cssLoader, globalCssLoader, nodeModulesCssLoader } = require('./utils');
const { join, resolve, posix } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry:join(__dirname, "../src", "index.tsx"),
  resolve:{
    extensions: [".json", ".js", ".jsx", ".tsx"],
    alias:{
      '@': resolve("src"),
      '@api': resolve("src/api"),
      '@router': resolve("src/router"),
      '@utils': resolve("src/utils"),
      '@components': resolve("src/components"),
      '@store': resolve("src/store"),
      '@views': resolve("src/views"),
      '@assets': resolve("src/assets")
    }
  },
  module:{
    rules: [
      cssLoader(),
      cssLoader("sass"),
      cssLoader("less"),
      globalCssLoader(),
      globalCssLoader("sass"),
      globalCssLoader("less"),
      nodeModulesCssLoader(),
      nodeModulesCssLoader("sass"),
      nodeModulesCssLoader("less"),
      {
        test: /.(j|t)sx?$/i,
        include: [resolve(__dirname, "../src")],
        exclude: [resolve(__dirname, "../node_modules")],
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        include: [resolve("src/icons")],
        options: {
          symbolId: "icon-[name]"
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        exclude: [resolve("src/icons")],
        options: {
          limit: 10000,
          name: posix.join("/", "img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: posix.join("/", "media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: posix.join("/", "fonts/[name].[hash:7].[ext]")
        }
      },
      {
        enforce: "pre",
        test: /.(j|t)sx?$/,
        use: ["source-map-loader"]
      }
    ]
  },
  plugins:[
    new HTMLWebpackPlugin({
      template: resolve(__dirname, "../public/index.html")
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    // 自动注入模块,不必各处引入
    // new webpack.ProvidePlugin({
    //   request: 'utils/request'
    // }),
  ],
  target:"electron-renderer"
}


