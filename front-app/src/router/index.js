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
    children: [
      {
        path: '',
        name: 'Menu',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>  import(/* webpackChunkName: "Menu" */ '@/views/Menu.vue')
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
