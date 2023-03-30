// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports = {
  devServer: {
    //proxy: 'http://suggestion.baidu.com/'
    proxy: {
      '^/baiduapi/': {
        target: 'http://suggestion.baidu.com/',
        ws: true, 
        changeOrigin: true,
        pathRewrite: {
          '^/baiduapi/': '/'
        }
      },
      '^/bingapi/': {
        target: 'https://api.bing.com/',
        ws: true, 
        changeOrigin: true,
        pathRewrite: {
          '^/bingapi/': '/'
        }
      },
      '^/googleapi/': {
        target: 'http://clients1.google.com/',
        ws: true, 
        changeOrigin: true,
        pathRewrite: {
          '^/googleapi/': '/'
        }
      },
    }
  }
}
