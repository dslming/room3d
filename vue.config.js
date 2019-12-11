const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

const version = "1.0.0"
const Timestamp = new Date().getTime();

module.exports = {
  runtimeCompiler: true,
  publicPath: 'muscicPlayer',

  chainWebpack(config) {
    config.resolve.alias
      .set('@', resolve('src/'))
  },
  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].${version}.${Timestamp}.js`,
      chunkFilename: `[name].${version}.${Timestamp}.js`
    }
  }
}
