const path = require("path");
const HappyPack = require("happypack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/js/app.ts",
    provacss: "./src/js/prova-css.js"
  },
  resolve: {
    extensions: [".ts", ".js", ".jsx"]
  },
  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].chunk.js',
    path: path.resolve(__dirname, "..", "dist"),
    publicPath: './'
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    new HappyPack({
      id: "ts",
      threads: 2,
      loaders: [
        {
          path: "ts-loader",
          query: { happyPackMode: true }
        }
      ]
    })
  ]
};
