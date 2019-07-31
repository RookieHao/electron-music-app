# 项目搭建思路

一、安装依赖

```bash
npm install --save-dev webpack webpack-cli webpack-dev-serve webpack-bundle-analyzer webpack-merge
```

Webpack这个工具可以将你的所有代码和可选择地将依赖捆绑成一个单独的.js文件。
在 webpack 3 中，webpack 和它的 CLI 都是在同一个包中，但在第4版中，他们已经将两者分开来更好地管理它们。所以安装时，最好是 webpack 和 webpack-cli 同时安装.
使用webpack-dev-serve启动本地开发服务器。webpack-merge合并webpack配置参数。通过使用webpack-bundle-analyzer可以查看到项目打包后各模块的大小,方便针对优化.

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
npm install --save-dev babel-loader @babel/core @babel/env @babel/react @babel/typescript
```

- [babel-loader](https://github.com/babel/babel-loader)：使用 Babel 转换 JavaScript依赖关系的 Webpack 加载器
- [@babel/core](https://babeljs.io/docs/en/babel-core)：即 babel-core，将 ES6 代码转换为 ES5
- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)：即 babel-preset-env，根据您要支持的浏览器，决定使用哪些 transformations / plugins 和 polyfills，例如为旧浏览器提供现代浏览器的新特性
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)：即 babel-preset-react，针对所有 React 插件的 Babel 预设，例如将 JSX 转换为函数
- [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript#docsNav)：该preset用于转换ts/x文件.如果不想使用babel可以使用[ts-loader](https://github.com/TypeStrong/ts-loader)
**注：babel 7 使用了 @babel 命名空间来区分官方包，因此以前的官方包 babel-xxx 改成了 @babel/xxx

```bash
npm install -D eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-import-resolver-webpack eslint-config-prettier
```

- prettier,eslint 代码静态检测规则
- @typescript-eslint/parser ESLint的解析器
- @typescript-eslint/eslint-plugin 定义了该eslint文件所依赖的插件
- eslint-import-resolver-webpack 扩展eslint的模块解析
- eslint-config-prettier 禁用eslint和prettier之间的冲突规则,以prettier规范格式化代码

```bash
npm install --save -dev postcss-import postcss-url cssnano autoprefixer
```

postcss相关插件

```bash
npm install -D  husky lint-staged
```

husky lint-staged 配合使用，代码提交钩子中对代码进行检测

```bash
npm i -D friendly-errors-webpack-plugin node-notifier clean-webpack-plugin mini-css-extract-plugin
```

friendly-errors-webpack-plugin：用于清理编译输出的内容
node-notifier：使用Node.js发送跨平台本机通知,对编译结果给出系统提示
clean-webpack-plugin:清理构建目录.
mini-css-extract-plugin:把css样式从js文件单独提取到css文件中

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
        "allowJs": true,
        "strict": true,
        "module": "commonjs",
        "jsx": "react",
        "outDir": "dist",
        "baseUrl":"./",
        "paths": {
          "@/*": ["src/*"],
          "@api/*": ["src/api/*"],
          "@router/*": ["src/router/*"],
          "@utils/*": ["src/utils/*"],
          "@components/*": ["src/components/*"],
          "@store/*": ["src/store/*"],
          "@views/*": ["src/views/*"],
          "@assets/*": ["src/assets/*"]
        },
      },
      "include": ["src","main","public"],
      "exclude": [
        "node_modules",
        "dist",
        "config"
      ]
    }
  ```

- 2.babel配置：

  ```js
    module.exports = {
      presets: [
        [
          "@babel/env",
          {
            targets: { electron: require('electron/package.json').version },
            useBuiltIns: 'usage',
            corejs: "3.1.4",
          }
        ],
        "@babel/react", "@babel/typescript"],
      plugins: [
        ["@babel/proposal-decorators", { "legacy": true }],
        "@babel/proposal-function-bind",
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread",
        // [
        //   'module-resolver',
        //   {
        //     extensions: ['.js', '.jsx', '.ts', '.tsx'],
        //     root: ['./src'],
        //     alias: {
        //       // this must be synchronized with tsconfig.json's path configuration
        //       '@':'./src',
        //       '@assets':'./src/assets',
        //       '@views':'./src/views',
        //       '@components': './src/components',
        //     },
        //   },
        // ],
        [
          'import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
          }
        ]
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

  ```js
  module.exports = {
    parser:  '@typescript-eslint/parser', //定义ESLint的解析器
    extends: [//定义文件继承的子规范

      // 'plugin:react/recommended',
      // 'plugin:@typescript-eslint/recommended'
      /**
       * prettier/@typescript-eslint：使得@typescript-eslint中的样式规范失效，遵循prettier中的样式规范
      * plugin:prettier/recommended：使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出
      */
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended'
    ],
    settings: {//自动发现React的版本，从而进行规范react代码
      "react": {
        "pragma": "React",
        "version": "detect"
      },
      "import/resolver": {
        "webpack": {
          "config": "./config/webpack.render.base.config.js",
        }
      }
    },
    plugins: ['@typescript-eslint'],//定义了该eslint文件所依赖的插件
    env:{                          //指定代码的运行环境
        browser: true,
        node: true,
    },
    parserOptions: {        //指定ESLint可以解析JSX语法
      "ecmaVersion": 2019,
      "sourceType": 'module',
      "ecmaFeatures":{
        jsx:true
      }
    }
  }
  ```

- 5.webpack配置

- 6.electron配置

三、遇到的问题
