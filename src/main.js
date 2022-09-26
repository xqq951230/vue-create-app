import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import comFunction from './static/js/comFunction.js' // 公共函数
import element from './element-ui/index'


Vue.use(element)
Vue.use(comFunction)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#root')
