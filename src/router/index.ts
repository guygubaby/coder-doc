import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/guide',
      name: 'guide',
      component: () => import('@/views/pages/Guide.vue'),
    },
  ],
})

export default router
