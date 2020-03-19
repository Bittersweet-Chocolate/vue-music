import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Rank from '@/views/Rank.vue'
import Main from '@/views/Main.vue'
import Login from '@/views/Login'
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
}, {
  path: '*',
  redirect: '/'
}, {
  path: '/login',
  name: 'login',
  component: Login
}]

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes
})

export default router
