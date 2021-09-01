import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Record from '@/views/Record.vue'
import Detail from '@/views/Detail.vue'
import Setting from '@/views/Setting.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path:'/',
    redirect:'/record'
  },
  {
    path:'/record',
    component:Record
  },
  {
    path:'/detail',
    component:Detail
  },
  {
    path:'/setting',
    component:Setting
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
