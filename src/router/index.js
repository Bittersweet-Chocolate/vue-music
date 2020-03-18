import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Rank from '@/views/Rank.vue'
import Main from '@/views/Main.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Main,
  children: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/rank',
    name: 'rank',
    component: Rank
  }]
}]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
