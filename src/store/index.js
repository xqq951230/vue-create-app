import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

//声明路由具名模块
const vuex_router = {
  namespaced: true,
  state: () => ({
    routerData: [],//动态路由存放位置
    needRefresh: true //true 表示被刷新,false 表示未被刷新
  }),
  mutations: {
    setRouter (state, newsdata) {
      state.routerData = newsdata
    },
    //改变路由刷新状态
    setRefreshType (state, newsdata) {
      state.needRefresh = newsdata
    },
  },
  getters: {
    routerAll (state) {
      return state.routerData
    },

  },
  actions: {
    getRouter (context) {
      setTimeout(() => {
        //sync do something
        context.commit('setRouter', [{
          path: '/one',
          name: 'one',
          component: '/index'
        }])
      }, 1000)
    },
  }
}
export default new Vuex.Store({
  state: {
  },
  mutations: {},
  actions: {},
  modules: {
    vuex_router: vuex_router,
  },

  // 数据持久化
  plugins: [createPersistedState({
    //key是存储数据的键名
    key: 'vuex',
    //paths是存储state中的那些数据，如果是模块下具体的数据需要加上模块名称，如【模块名称】.【state中key】
    paths: ["vuex_router.routerData"]
  })]
})
