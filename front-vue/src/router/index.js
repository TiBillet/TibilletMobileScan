import {createRouter, createWebHistory} from 'vue-router'
import Devices from '@/views/Devices.vue'

const routes = [
  {
    path: '/index.html',
    name: 'Devices',
    alias: '/',
    component: Devices
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
