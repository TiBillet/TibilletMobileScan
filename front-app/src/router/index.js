import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/index.html',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'devices',
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Devices" */ '@/views/Devices.vue')
      },
    ]
  },
  {
    path: '/keycard',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
      path: '',
      name: 'keycard',
      component: () => import(/* webpackChunkName: "Keycard" */ '@/views/Keycard.vue')
    },
    ]
  },
  {
    path: '/menu',
    component: () => import('@/layouts/default/Default.vue'),
    // Menu.vue est un composant de Input.vue
    children: [
      {
        path: '',
        name: 'menu',
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Menu" */ '@/views/Menu.vue')
      }
    ]
  },
  {
    path: '/scan',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'scan',
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Menu" */ '@/views/Scan.vue')
      }
    ]
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
