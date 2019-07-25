const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const styleLoader =
  process.env.NODE_ENV === "development"
    ? "style-loader"
    : MiniCssExtractPlugin.loader;
exports.globalCssLoader = function globalCssLoader (style) {
  let cssLoader = {
    test: /\.global\.css$/i,
    use: [styleLoader, "css-loader", "postcss-loader"],
    exclude: [resolve(__dirname, "../node_modules")]
  };
  if (style) {
    if (style === "sass") {
      cssLoader.test = /\.global\.(scss|sass)$/i;
      cssLoader.use.push("sass-loader");
    } else if (style === "less") {
      cssLoader.test = /\.global\.less$/i;
      cssLoader.use.push("less-loader");
    }
  }
  return cssLoader;
}

exports.cssLoader = function cssLoader (style) {
  let cssLoader = {
    test: /^((?!\.global).)*\.css$/i,
    use: [
      styleLoader,
      "css-modules-typescript-loader",
      {
        loader: "css-loader",
        options: {
          modules: true
        }
      },
      "postcss-loader"
    ],
    exclude: [resolve(__dirname, "../node_modules")]
  };
  if (style) {
    if (style === "sass") {
      cssLoader.test = /^((?!\.global).)*\.(scss|sass)$/i;
      cssLoader.use.push("sass-loader");
    } else if (style === "less") {
      cssLoader.test = /^((?!\.global).)*\.less$/i;
      cssLoader.use.push("less-loader");
    }
  }
  return cssLoader;
}

module.exports = exports