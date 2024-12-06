import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

// 使用 hash 模式而不是 history 模式。hash 模式不依赖服务器配置，可以在 file:// 协议下正常工作。
const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
  /* mode: 'history',
  base: process.env.BASE_URL,
  routes */
})

export default router 