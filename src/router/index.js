/*@veriosns vue-router@3.5.1
 *
 *
 *
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import staticRoute from './staticRoute'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: staticRoute,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})


//获取组件路径
function routerCom (path) { //对路由的component解析
  return (resolve) => require([`@/views/${path}`], resolve);
}
//递归处理组件路径
function routerChildren (children) { //对子路由的component解析
  children.forEach(v => {
    v.component = routerCom(v.component);
    if (v.children != undefined && Array.isArray(v.children)) {
      v.children = routerChildren(v.children)
    }
  })
  return children
}

// 全局守卫
router.beforeEach(async (to, from, next) => {
  //获取路由刷新状态true 表示被刷新,false 表示未被刷新
  let needRefresh = store.state.vuex_router.needRefresh
  console.log(needRefresh);
  //needRefresh为true  和vuex路由不为空时追加路由
  if (needRefresh && store.getters['vuex_router/routerAll'].length != 0) {
    //从vuex中获取动态路由
    const accessRouteses = await store.getters['vuex_router/routerAll'];
    //动态路由循环解析和添加
    accessRouteses.forEach(v => {
      v.children = Array.isArray(v.children) ? routerChildren(v.children) : [];
      v.component = routerCom(v.component);
      router.addRoute(v); //添加
    })
    //动态路由添加完成之后将needRefresh赋为 false ，否则会一直循环，崩溃
    store.commit('vuex_router/setRefreshType', false)
    next({
      ...to, // next({ ...to })的目的,是保证路由添加完了再进入页面 (可以理解为重进一次)
      replace: true, // 重进一次, 不保留重复历史
    })
  } else {
    if (to.name == null) {
      next("/404")
    } else {
      if (to.meta.title) { //判断是否有标题
        document.title = to.meta.title //给相应页面添加标题
      }
      next()
    }
  }
})




const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
export default router
