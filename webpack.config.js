const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const extractCSS = new ExtractTextPlugin("app.bundle.css");
const extractCSSTS = new ExtractTextPlugin("style.bundle.css");

module.exports = {
  entry: {
    app: "./src/js/app.ts",
    provacss: "./src/js/prova-css.js"
  },
  resolve: {
    extensions: [".ts", ".js", ".jsx"]
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, "src/assets/css/style-ts"),
        use:["css-hot-loader"].concat(
          extractCSS.extract(["css-loader"])
        )
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src/assets/css/style-ts"),
        use: ["css-hot-loader"].concat(extractCSSTS.extract({
          loader: "typings-for-css-modules-loader",
          options: {
            modules: true,
            namedExport: true
          }
        }))
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower)/,
        use: "awesome-typescript-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower)/,
        use: ["react-hot-loader/webpack","babel-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(path.resolve(__dirname, "src"), "index.html")
    }),
    new webpack.NamedModulesPlugin(),    
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
    extractCSS,
    extractCSSTS
  ]
};
