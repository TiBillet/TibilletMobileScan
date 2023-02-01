// Composables
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/index.html',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/menu',
    component: () => import('@/layouts/default/Default.vue'),
    // Menu.vue est un composant de Default.vue
    children: [
      {
        path: '',
        name: 'Menu',
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Menu" */ '@/views/Menu.vue')
      },
    ],
  },
  {
    path: '/scan',
    component: () => import(/* webpackChunkName: "Scan" */ '@/views/Scan.vue')
  },
  {
    path: '/ticketstatus',
    component: () => import(/* webpackChunkName: "TicketStatus" */ '@/views/TicketStatus.vue')
  },
  {
    path: '/linkcashless',
    component: () => import(/* webpackChunkName: "LinkCashless" */ '@/views/LinkCashless.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
