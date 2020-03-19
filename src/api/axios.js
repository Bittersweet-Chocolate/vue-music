import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.timeoute = 10000
// 允许携带cookie 凭证
axios.defaults.withCredentials = true
/*
  设置请求传递数据的格式（看服务器要求格式）
  x-www-form-urlencoded
*/
axios.defaults.headers['Content-Type'] =
  'application/x-www-form-urlencoded'
axios.defaults.transformRequest = data => qs.stringify(data)
/*
 设置请求拦截器
 token校验：接收服务器返回的token，存储到vuex/本地存储中，
 每向服务器发一次请求，就带上token
*/
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  token && (config.headers.Authorization = token)
  return config
}, error => {
  return Promise.reject(error)
})
/*
 设置响应拦截器
*/
axios.interceptors.response.use(response => {
  return response.data
})
export default axios
