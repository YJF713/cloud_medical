import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
	  // 存储 电子病历 id值
    emedicalID: '测试数据'
  },
//   mutations: {
// 	  newEmedicalID(state, id_mes) {
// 		  state.emedicalID = id_mes
// 	  }
//   }
})

export default store
