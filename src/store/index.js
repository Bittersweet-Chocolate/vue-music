import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/index'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicList: [],
    hotList: [],
    homeList: []
  },
  mutations: {
    // 获取推荐列表数据
    getHomeListMutation(state, data) {
      state.homeList = data.MusicHallHomePage.data.v_shelf
    }
  },
  actions: {
    // 解构赋值牛逼
    getHomeListAction({
      commit
    }) {
      axios({
        url: api.HOMELIST,
        methods: 'get'
      }).then(val => {
        commit('getHomeListMutation', val.data)
      })
    }
  },
  modules: {}
})
