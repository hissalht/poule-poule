import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Game from '@/views/Game'
import Signup from '@/views/user/Signup'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    name: 'index',
    path: '/',
    component: Index
  },
  {
    name: 'game',
    path: '/game',
    component: Game
  },
  {
    name: 'signup',
    path: '/user/signup',
    component: Signup,
    beforeEnter(to, from, next) {
      if (store.getters.isLoggedIn) {
        return next({ name: 'game' })
      }
      next()
    }
  }
]

const router = new VueRouter({ mode: 'history', routes })

export default router
