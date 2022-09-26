const proxy = {
  test: {
    //测试环境
    '^/api': {
      target: 'http://192.168.1.84:8080/', // 联调的服务器端口
      // secure: true, // 如果是https  需要配置这个参数
      changeOrigin: true, // 打开跨域
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  //本地无需连线上所以这里不配置
  production: {},
  dev: {
    //开发环境
    '^/kapi': {
      target: 'http://192.168.1.84:8080/', // 需要对接的服务器端口
      // secure: true, // 如果是https  需要配置这个参数
      changeOrigin: true, // 打开跨域
      pathRewrite: {
        '^/kapi': ''
      }
    }
  },
}
module.exports = proxy
