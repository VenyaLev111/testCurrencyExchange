import { createRouter, createWebHistory } from 'vue-router'
import CurrencyExchange from '@/pages/CurrencyExchange.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CurrencyExchange
    },
    {
      path: '/changed',
      name: 'changed',
      component: () => import('@/pages/ChangedCurrencies.vue')
    },
    {
      path: '/course',
      name: 'course',
      component: () => import('@/pages/SearchRate.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('@/pages/DetailCurrency.vue')
    }
  ]
})

export default router
