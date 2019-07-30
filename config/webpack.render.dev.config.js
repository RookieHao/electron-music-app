const {
  HotModuleReplacementPlugin,
  WatchIgnorePlugin,
  EnvironmentPlugin,
  NamedModulesPlugin
} = require("webpack");
const { spawn } = require("child_process");
const meger = require("webpack-merge");
const common = require("./webpack.render.base.config");

const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const notifier = require("node-notifier");

console.log(
  "dev======================================================================================>"
);

module.exports = meger(common, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    hot: true,
    inline: true,
    host: "localhost",
    port: 3000,
    quiet: true,
    overlay: true,
    before() {
      console.log("Starting Main Process...");
      spawn("npm", ["run", "run:main"], {
        shell: true,
        env: process.env,
        stdio: "inherit"
      })
        .on("close", code => process.exit(code))
        .on("error", spawnError => console.error(spawnError));
    }
  },
  plugins: [
    new HotModuleReplacementPlugin(), // 热更新
    new NamedModulesPlugin(), // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new WatchIgnorePlugin([/(css|less|scss|sass)\.d\.ts$/]),

    // EnvironmentPlugin 是一个通过 DefinePlugin 来设置 process.env 环境变量的快捷方式。
    // 不同于 DefinePlugin，默认值将被 EnvironmentPlugin 执行 JSON.stringify。
    new EnvironmentPlugin({
      NODE_ENV: "development",
      IS_DEBUG: true
    }),

    // 配合 webpack-dev-server  quiet: true,清理控制台编译输出结果
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:3000`]
      },
      clearConsole: true,
      onErrors(severity, errors) {
        const error = errors[0];
        notifier.notify({
          title: "出错啦",
          message: severity + ": " + error.name,
          subtitle: error.file || ""
        });
      }
    })
  ]
});
