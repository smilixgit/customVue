// Node.js path 模块提供用于处理文件路径的小工具
const path = require('path');

function resolve(dir) {
    // Node.js 中，__dirname 总是指向被执行 js 文件(当前js文件)的绝对路径
    // 连接路径
    return path.join(__dirname, dir);
}

module.exports = {
    
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    lintOnSave: false,
    devServer:{
      host: '127.0.0.1',
      port: 8082,
      open: true,
      proxy: {
        '/dev-api': {
          // 此处的写法，目的是为了 将 /dev-api 替换成 https://www.baidu.com/
          target: 'http://127.0.0.1:8080/',//'https://www.rxzhky.com/',
          // 允许跨域
          changeOrigin: true,
          ws: true,
          secure: false,
          pathRewrite: {
              '^/dev-api': ''
          }
        },
      },
      disableHostCheck: true
    },
    configureWebpack: {
      // provide the app's title in webpack's name field, so that
      // it can be accessed in index.html to inject the correct title.
      name: '鉴定',
      resolve: {
          alias: {
              '@': require('path').join(__dirname, 'src')
          }
      }
    },
  }
  