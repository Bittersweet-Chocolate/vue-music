import axios from '@/api/axios'
const api = {
  getHotList() {
    return axios({
      url: '/search/hot/detail',
      methos: 'get'
    })
  },
  loginByPhonefunction(params) {
    return axios({
      url: '/login/cellphone',
      methos: 'get',
      params: params
    })
  },
  getUserInfo(params) {
    return axios({
      url: '/user/detail',
      methos: 'get',
      params: params
    })
  },
  getSearchList(params) {
    return axios({
      url: '/search',
      methos: 'get',
      params: params
    })
  },
  getMusicList(params) {
    return axios({
      url: '/top/playlist/highquality',
      methos: 'get',
      params: params
    })
  },
  getTagList() {
    return axios({
      url: '/playlist/hot',
      methos: 'get'
    })
  }
}
export default api
