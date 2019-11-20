const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  runtimeCompiler: true,
  outputDir: "dist",
  publicPath: 'muscicPlayer',

  chainWebpack(config) {
    config.resolve.alias
      .set('@', resolve('src/'))
  }
}
