import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/font/iconfont.css'
import './assets/css/style.scss'

// 根据NeteaseCloudMusicApi配置重新封装axios
import axios from '@/api/axios'
// 公共方法
import utils from '@/utils/common'

// 卡片组件
import Card from '@/components/Sroxck-Card.vue'
import CardList from '@/components/Sroxck-Card-List'
import SongList from '@/components/Song-Card-List'
// 引入 mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.prototype.$axios = axios
Vue.prototype.$utils = utils

Vue.use(MintUI)

Vue.component('m-card', Card)
Vue.component('m-card-list', CardList)
Vue.component('s-card-list', SongList)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
