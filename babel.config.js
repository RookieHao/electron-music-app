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
    ["@babel/proposal-class-properties",{ "loose": true }],
    "@babel/proposal-function-bind",
    "@babel/proposal-object-rest-spread",
    // 通过插件babel-plugin-module-resolver 配置module别名,不使用webpack的话，可以使用此插件配置别名
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
