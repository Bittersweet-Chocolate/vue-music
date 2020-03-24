import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {
  USERS,
  MUSLIST,
  TAGLIST
} from '@/api/index'

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
      axios({
        url: USERS.url,
        methods: USERS.type,
        params: {
          uid: value
        }
      }).then(val => {
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
      axios({
        url: MUSLIST.url,
        methods: MUSLIST.type,
        params: {
          limit: limit,
          cat: tag,
          order: 'hot'
        }
      }).then(val => {
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
      axios({
        url: TAGLIST.url,
        methods: TAGLIST.type
      }).then(val => {
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
