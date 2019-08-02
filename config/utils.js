const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const aliyunTheme = require('@ant-design/aliyun-theme');
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
      cssLoader.use.push({
        loader:'sass-resources-loader',
        options:{
          resources:[
            resolve('src/assets/variables.scss')
         ]
        }
      });
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
      cssLoader.use.push({
        loader:'sass-resources-loader',
        options:{
          resources:[
            resolve('src/assets/variables.scss')
         ]
        }
      });
    } else if (style === "less") {
      cssLoader.test = /^((?!\.global).)*\.less$/i;
      cssLoader.use.push("less-loader");
    }
  }
  return cssLoader;
}

exports.nodeModulesCssLoader = function (style){
  let cssLoader = {
    test: /.css$/i,
    use: [
      styleLoader,
      "css-loader",
      "postcss-loader"
    ],
    include: [resolve(__dirname, "../node_modules")]
  };
  if (style) {
    if (style === "sass") {
      cssLoader.test = /.(scss | sass)$/i
      cssLoader.use.push("sass-loader");
      cssLoader.use.push({
        loader:'sass-resources-loader',
        options:{
          resources:[resolve('src/assets/variables.scss')]
        }
      });
    } else if (style === "less") {
      cssLoader.test = /.less$/i
      cssLoader.use.push({
        loader: 'less-loader',
        options: {
          modifyVars: {...aliyunTheme,'primary-color':'#C62F2F','layout-header-background':'#C62F2F','layout-sider-background':'#f0f2f5','layout-trigger-background':'#f0f2f5'},
          javascriptEnabled:true
        }
      });
    }
  }
  return cssLoader;
}

module.exports = exports