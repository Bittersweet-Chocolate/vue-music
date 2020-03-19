import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {
  USERS
} from '@/api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    getUserInfoMutaion(state, data) {
      state.userInfo = data
    }
  },
  actions: {
    // // 解构赋值牛逼
    getUserInfoAction({
      commit
    }, value) {
      axios({
        url: USERS.url + `?uid=${value}`,
        methods: 'get'
      }).then(val => {
        commit('getUserInfoMutaion', val)
      })
    }
  },
  modules: {}
})
