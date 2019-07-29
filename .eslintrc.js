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