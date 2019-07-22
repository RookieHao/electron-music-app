module.exports = {
  presets: ["@babel/env", "@babel/react", "@babel/typescript"],
  plugins: [
    ["@babel/proposal-decorators", { "legacy": true }],
    "@babel/proposal-function-bind",
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
}
