const { resolve } = require('path');
module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: { electron: require('electron/package.json').version },
        useBuiltIns: 'usage'
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
