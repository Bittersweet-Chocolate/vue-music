import axios from '@/api/axios'
const api = {
  getHotList () {
    return axios({
      url: '/search/hot/detail',
      methos: 'get'
    })
  },
  login (params) {
    return axios({
      url: '/login/cellphone',
      methos: 'get',
      params: params
    })
  },
  getUserInfo (params) {
    return axios({
      url: '/user/detail',
      methos: 'get',
      params: params
    })
  },
  getSearchList (params) {
    return axios({
      url: '/search',
      methos: 'get',
      params: params
    })
  },
  getMusicList (params) {
    return axios({
      url: '/top/playlist/highquality',
      methos: 'get',
      params: params
    })
  },
  getMusicListDetail (params) {
    return axios({
      url: '/playlist/detail',
      methos: 'get',
      params: params
    })
  },
  getTagList () {
    return axios({
      url: '/playlist/hot',
      methos: 'get'
    })
  },
  getRankList (params) {
    return axios({
      url: '/top/list',
      methos: 'get',
      params: params
    })
  },
  // 播放歌曲
  getSongDetail (params) {
    return axios({
      url: '/song/detail',
      methos: 'get',
      params: params
    })
  },
  // 播放歌曲
  getSong (params) {
    return axios({
      url: '/music/url',
      methos: 'get',
      params: params
    })
  },
  // 歌曲下载
  downMusic (url) {
    return axios.get(url, {
      responseType: 'blob'
    })
  }
}
export default api
