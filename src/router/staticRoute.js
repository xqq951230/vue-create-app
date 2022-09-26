//静态路径
const staticRoute = [{
  path: '/',
  name: 'index',
  component: resolve => require(['@/views/index'], resolve)
}]
/*动态路径 需要存入数据库 注：以模块为纬度存入，这样只需要请求一次,vuex拓展了持久储存能力,meftMenu可以直接使用请求回来的路由,router也可以直接将返回值追加为动态路由
 Example:  {
  path: '/Example',
  name: 'Example',
  component:'Example/index.vue', 注：router/index.js会再次处理路径 这样满足懒加载模式,直接像静态路由方式存入数据库,第一次可以进去,第二次及以后会报错
  "redirect": "/Example/home",
  "children": [{
      "path": "home",
      "name": "home",
      "component": "Example/home.vue", 注：router/index.js会再次处理路径
      "meta": {
        "name": "home",
        "title": "首页",
        "icon": "el-icon-location",
        "menu":true //true菜单栏展示
      }
  }]
}
 *
 *
 */
export default staticRoute
