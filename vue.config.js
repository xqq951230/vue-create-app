const { defineConfig } = require('@vue/cli-service')
const proxy = require('./src/config/proxy.js')
//代理

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  outputDir: 'dist', // 出口
  filenameHashing: true, // 文件名的hash控制缓存
  productionSourceMap: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8081,
    proxy: { ...proxy[process.env.NODE_ENV] }
  },
  chainWebpack: (config) => {
    // 删除编译后的独立js文件上的预获取操作
    config.plugins.delete('prefetch');
    config.plugin('html').tap((args) => {
      args[0].title = '系统名称';
      return args;
    })
  }
})
