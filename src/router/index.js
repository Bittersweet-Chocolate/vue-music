import Vue from 'vue'
import VueRouter from 'vue-router'
import playSong from '@/views/playSong'
import playVide from '@/views/playVide'
import logger from 'vuex/dist/logger'
Vue.use(VueRouter)

const routes = [{
  path: '/playsong/:id',
  name: 'playsong',
  component: playSong
}, {
  path: '/',
  redirect: '/playsong/1'
}, {
  path: '/playvide/:id',
  name: 'playvide',
  component: playVide
}, {
  path: '*',
  redirect: '/playsong/1'
}]

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes,
  // vuex中打印日志的方法
  plugins: [logger()]
})

export default router
