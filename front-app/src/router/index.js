import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/index.html',
    component: Home,
  },
  {
    path: '/menu',
    component: () => import(/* webpackChunkName: "Menu" */ '@/views/Menu.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

export default router
