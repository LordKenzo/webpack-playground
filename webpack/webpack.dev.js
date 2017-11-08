const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, "..", "src/assets/css/style-ts"),
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "..", "src/assets/css/style-ts"),
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "typings-for-css-modules-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: true,
              camelCase: true,
              localIdentName: "[name]_[local]_[hash:base64:5]",
              minimize: false,
              namedExport: true
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower)/,
        use: "happypack/loader?id=ts"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower)/,
        use: ["react-hot-loader/webpack", "babel-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(path.resolve(__dirname, "..", "src"), "index.html")
    }),
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
