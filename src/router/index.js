import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Rank from '@/views/Rank'
import Main from '@/views/Main'
import Login from '@/views/Login'
import Info from '@/views/Info'
import MusicTop from '@/views/MusicTop'
import MusicPlay from '@/views/MusicPlay'
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
  path: '/info/:infoId',
  name: 'info',
  component: Info,
  props: true
}, {
  path: '/musicTop/:topId',
  name: 'musicTop',
  component: MusicTop,
  props: true
}, {
  path: '/login',
  name: 'login',
  component: Login
},
{
  path: '/musicPlay/:id',
  name: 'musicPlay',
  component: MusicPlay,
  props: true
},
{
  path: '*',
  redirect: '/'
}
]

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes
})

export default router
