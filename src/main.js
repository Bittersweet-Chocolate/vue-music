import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/font/iconfont.css'
import './assets/css/style.scss'

import api from '@/api/index'
import utils from '@/utils/common'
// 卡片组件
import TagCard from '@/components/Tag-Card'
import TagList from '@/components/Tag-List'
import SearchCard from '@/components/Search-Card'
import SearchList from '@/components/Search-List'
// 引入 mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.prototype.$api = api
Vue.prototype.$utils = utils
Vue.use(MintUI)

Vue.filter('toFixNumber', function (target, idx) {
  const k = 100000000
  if (target > k) {
    target = (target / k).toFixed(idx)
    return target + '亿'
  } else {
    const y = 10000
    target = (target / y).toFixed(idx)
    return target + '万'
  }
})

Vue.component('tag-card', TagCard)
Vue.component('tag-list', TagList)
Vue.component('search-card', SearchCard)
Vue.component('search-list', SearchList)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
