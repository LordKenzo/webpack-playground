const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const extractCSS = new ExtractTextPlugin("css/[name].style.css");
const extractCSSTS = new ExtractTextPlugin("css/[name].style.css");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  bail: true,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: path.resolve(__dirname, "..", "src/assets/css/style-ts"),
        use: extractCSS.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 1,
                minimize: true
              }
            }
          ]
        })
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "..", "src/assets/css/style-ts"),
        use: extractCSSTS.extract({
          fallback: "style-loader",
          use: [
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
        })
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
    new CleanWebpackPlugin([path.resolve(__dirname, "..", "dist")], {
      verbose: true,
      allowExternal: true,
      dry: false
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    extractCSS,
    extractCSSTS,
    new webpack.optimize.UglifyJsPlugin({
      // more info: http://lisperator.net/uglifyjs/compress
      compress: {
        sequences: true, // join consecutive statemets with the “comma operator”
        properties: true, // optimize property access: a["foo"] → a.foo
        dead_code: true, // discard unreachable code
        drop_debugger: true, // discard “debugger” statements
        unsafe: false, // some unsafe optimizations (see below)
        conditionals: true, // optimize if-s and conditional expressions
        comparisons: true, // optimize comparisons
        evaluate: true, // evaluate constant expressions
        booleans: true, // optimize boolean expressions
        loops: true, // optimize loops
        unused: true, // drop unused variables/functions
        hoist_funs: true, // hoist function declarations
        hoist_vars: false, // hoist variable declarations
        if_return: true, // optimize if-s followed by return/continue
        join_vars: true, // join var declarations
        cascade: true, // try to cascade `right` into `left` in sequences
        side_effects: true, // drop side-effect-free statements
        warnings: false, // warn about potentially dangerous optimizations/code
        global_defs: {
          __REACT_HOT_LOADER__: undefined // eslint-disable-line no-undefined
        }
      },
      sourceMap: true,
      output: {
        comments: false
      }
      // more options: https://github.com/webpack-contrib/uglifyjs-webpack-plugin
    }),
    new CompressionWebpackPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
