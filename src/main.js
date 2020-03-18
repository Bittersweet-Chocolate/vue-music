import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/font/iconfont.css'
import './assets/css/style.scss'

// 卡片组件
import Card from './components/Sroxck-Card.vue'
import CardList from './components/Sroxck-Card-List.vue'
Vue.component('m-card', Card)
Vue.component('m-card-list', CardList)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
