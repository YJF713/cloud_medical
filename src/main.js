// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import Axios from 'axios'

Vue.use(Vuex)
Axios
// 使用Axios替换Vue本身的http模块
Vue.prototype.$http = Axios 
Vue.config.productionTip = false

// 在请求中带上token
let token = localStorage.getItem('token')
let xhrData = {
  authorization: token
}
export default xhrData

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})
