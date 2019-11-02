import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Game from '@/views/Game'
import Signup from '@/views/user/Signup'

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
    component: Signup
  }
]

const router = new VueRouter({ mode: 'history', routes })

export default router
