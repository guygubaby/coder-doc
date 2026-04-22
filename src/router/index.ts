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
    {
      path: '/tutorial',
      name: 'tutorial',
      component: () => import('@/views/pages/Tutorial.vue'),
    },
  ],
})

export default router
