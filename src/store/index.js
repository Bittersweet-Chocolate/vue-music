import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/index'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: {},
    musicList: [],
    tagList: []
  },
  getters: {},
  mutations: {
    getUserInfoMutaion(state, data) {
      state.userInfo = data
    },
    getMusicListMutaion(state, data) {
      if (state.musicList.length === 3) {
        state.musicList = []
      }
      data.music.length === 0 ? state.musicList.push(data) : state.musicList.unshift(data)
    },
    getTagListMutaion(state, data) {
      data.forEach(item => {
        state.tagList.push({
          name: item.name,
          id: item.id
        })
      })
    }
  },
  actions: {
    // 获取用户信息
    getUserInfoAction({
      commit
    }, value) {
      const result = api.getUserInfo({
        uid: value
      })
      result.then(val => {
        commit('getUserInfoMutaion', val)
      })
    },

    // 获取歌曲列表
    getMusicListAction({
      commit
    }, {
      limit = 6,
      tag = '华语',
      tagId = 5001
    }) {
      const result = api.getMusicList({
        limit: limit,
        cat: tag,
        order: 'hot'
      })
      result.then(val => {
        commit('getMusicListMutaion', {
          tag: tag,
          tagId: tagId,
          music: val.playlists
        })
      })
    },

    // 获取歌单列表
    getTagListAction({
      commit,
      dispatch
    }) {
      const result = api.getTagList()
      result.then(val => {
        for (let i = 0; i < 3; i++) {
          dispatch('getMusicListAction', {
            limit: 6,
            tag: val.tags[i].name,
            tagId: val.tags[i].id
          })
        }
        commit('getTagListMutaion', val.tags)
      })
    }

  },
  modules: {}
})
