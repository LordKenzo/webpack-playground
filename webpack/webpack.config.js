const webpackMerge = require("webpack-merge"); 

module.exports = env => {
  if (!env) {
    throw new Error('Nessun Env Specificato');
  }
  const config = require(`./webpack.${env.WEBPACK_ENV}.js`);
  return webpackMerge(require("./webpack.common"), config);
}