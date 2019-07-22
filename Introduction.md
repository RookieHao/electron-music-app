# 项目搭建思路

一、安装依赖

```bash
npm install --save-dev webpack webpack-cli webpack-dev-serve webpack-bundle-analyzer webpack-merge
```

Webpack这个工具可以将你的所有代码和可选择地将依赖捆绑成一个单独的.js文件。
在 webpack 3 中，webpack 和它的 CLI 都是在同一个包中，但在第4版中，他们已经将两者分开来更好地管理它们。所以安装时，最好是 webpack 和 webpack-cli 同时安装.
使用webpack-dev-serve启动本地开发服务器。webpack-merge合并webpack配置参数。通过使用webpack-bundle-analyzer可以查看到项目打包后各模块的大小,方便针对优化

```bash
npm install --save react react-dom @types/react @types/react-dom react-router-dom @types/react-router-dom
```

使用[@types/]前缀表示我们额外要获取react、react-dom、react-router-dom的声明文件。 通常当你导入像"react"这样的路径，它会查看react包； 然而，并不是所有的包都包含了声明文件，所以TypeScript还会查看@types/react包

```bash
npm install --save-dev typescript source-map-loader
```

这些依赖会让TypeScript和webpack在一起良好地工作。
source-map-loader使用TypeScript输出的sourcemap文件来告诉webpack何时生成自己的sourcemaps。 这就允许你在调试最终生成的文件时就好像在调试TypeScript源码一样。

```bash
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/typescript
```

- [babel-loader](https://github.com/babel/babel-loader)：使用 Babel 转换 JavaScript依赖关系的 Webpack 加载器
- [@babel/core](https://babeljs.io/docs/en/babel-core)：即 babel-core，将 ES6 代码转换为 ES5
- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)：即 babel-preset-env，根据您要支持的浏览器，决定使用哪些 transformations / plugins 和 polyfills，例如为旧浏览器提供现代浏览器的新特性
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)：即 babel-preset-react，针对所有 React 插件的 Babel 预设，例如将 JSX 转换为函数
- [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript#docsNav)：该preset用于转换ts/x文件.如果不想使用babel可以使用[ts-loader](https://github.com/TypeStrong/ts-loader)
**注：babel 7 使用了 @babel 命名空间来区分官方包，因此以前的官方包 babel-xxx 改成了 @babel/xxx

```bash
npm install -D prettier eslint-config-prettier eslint babel-eslint eslint-config-airbnb
```

- prettier,eslint 代码静态检测规则
- eslint-config-prettier 禁用eslint和prettier之间的冲突规则
- babel-eslint 使得eslint与babel兼容
- eslint-config-airbnb默认导出包含我们所有的ESLint规则，包括ECMAScript 6+和React

```bash
npm install --save -dev postcss-import postcss-url cssnano autoprefixer
```

postcss相关插件

```bash
npm install -D  husky lint-staged
```

```bash
npm i -D friendly-errors-webpack-plugin node-notifier
```

friendly-errors-webpack-plugin：用于清理编译输出的内容
node-notifier：使用Node.js发送跨平台本机通知,对编译结果给出系统提示

husky lint-staged 配合使用，代码提交钩子中对代码进行检测

```bash
npm install rimraf -D
```

rimraf 用来删除文件夹或文件

```bash
npm install electron electron-builder -D
```

```bash
npm install --save-dev style-loader css-loader sass node-sass sass-loader less less-loader postcss-loader url-loader svg-sprite-loader css-modules-typescript-loader
```

一系列的webpack loader用于处理各类文件的引入，其中[css-modules-typescript-loader]作用是给样式文件写声明文件。解决css-loader开启modules时，引入样式文件ts提示找不到模块的问题。

二、各项配置

- 1.配置tsconfig.json
  
  ```json
    {
      "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "noFallthroughCasesInSwitch": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "moduleResolution": "node",
        "esModuleInterop": true,
        "noUnusedLocals": true,
        "noImplicitAny": true,
        "target": "esnext",
        "module": "commonjs",
        "strict": true,
        "jsx": "react",
        "outDir": "dist",
      },
      "include": [
        "main"
      ],
      "exclude": [
        "node_modules",
        "dist"
      ]
    }
  ```

- 2.babel配置：

  ```js
    module.exports = {
      presets:[ "@babel/env", "@babel/react", "@babel/typescript",],
      plugins: [
        ["@babel/proposal-decorators", { "legacy": true }],
        "@babel/proposal-function-bind",
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread"
      ]
    }
  ```

- 3.postcss配置

  ```js
    module.exports = {
      plugins: {
        'postcss-import': {},
        "postcss-url": {},
        'cssnano': {},
        "autoprefixer":{}
      }
    }
  ```

- 4.eslint配置

  ```json
    {
      "parser": "babel-eslint",
      "env": {
        "browser": true
      },
      "extends": ["airbnb", "prettier"],
      "rules": {
        "react/prop-types": false,
        "react/destructuring-assignment": false,
        "react/button-has-type": false
      }
    }
  ```

- 5.webpack配置

- 6.electron配置
