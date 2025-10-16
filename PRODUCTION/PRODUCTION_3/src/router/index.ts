import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: '3Wallet - DeFi Dashboard' }
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('../views/Wallet.vue'),
    meta: { title: '3Wallet - Wallet' }
  },
  {
    path: '/nft',
    name: 'NFT',
    component: () => import('../views/NFTGallery.vue'),
    meta: { title: '3Wallet - NFT Gallery' }
  },
  {
    path: '/swap',
    name: 'Swap',
    component: () => import('../views/TokenSwap.vue'),
    meta: { title: '3Wallet - Token Swap' }
  },
  {
    path: '/defi',
    name: 'DeFi',
    component: () => import('../views/DeFi.vue'),
    meta: { title: '3Wallet - DeFi Dashboard' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || '3Wallet DeFi'
  next()
})

export default router

