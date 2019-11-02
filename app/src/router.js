import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Game from '@/views/Game'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/game',
    component: Game
  }
]

const router = new VueRouter({ mode: 'history', routes })

export default router
