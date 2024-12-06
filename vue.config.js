module.exports = {
  publicPath: './',   //发布到相对路径 使可以用 chrome 直接打开。
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://api.hunanwanzhu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        onProxyReq: function(proxyReq) {
          proxyReq.setHeader('Origin', 'https://api.hunanwanzhu.com');
          proxyReq.setHeader('Referer', 'https://api.hunanwanzhu.com');
        }
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/index.scss";`
      }
    }
  }
} 