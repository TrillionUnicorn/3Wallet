<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-4xl font-bold mb-2">DeFi Dashboard</h1>
      <p class="text-slate-400">Manage your DeFi portfolio and track your investments</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card">
        <div class="text-sm text-slate-400 mb-1">Total Balance</div>
        <div class="text-3xl font-bold text-emerald-400">{{ totalBalance }}</div>
        <div class="text-sm text-emerald-400 mt-1">+12.5% this month</div>
      </div>
      
      <div class="card">
        <div class="text-sm text-slate-400 mb-1">NFTs Owned</div>
        <div class="text-3xl font-bold">{{ nftCount }}</div>
        <div class="text-sm text-slate-400 mt-1">Across 5 collections</div>
      </div>
      
      <div class="card">
        <div class="text-sm text-slate-400 mb-1">DeFi Positions</div>
        <div class="text-3xl font-bold">{{ defiPositions }}</div>
        <div class="text-sm text-slate-400 mt-1">Active positions</div>
      </div>
      
      <div class="card">
        <div class="text-sm text-slate-400 mb-1">Total Yield</div>
        <div class="text-3xl font-bold text-emerald-400">{{ totalYield }}</div>
        <div class="text-sm text-emerald-400 mt-1">APY: 8.5%</div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card">
      <h2 class="text-2xl font-bold mb-4">Quick Actions</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <router-link to="/wallet" class="btn-secondary text-center">
          <div class="text-2xl mb-2">💼</div>
          <div>Wallet</div>
        </router-link>
        <router-link to="/nft" class="btn-secondary text-center">
          <div class="text-2xl mb-2">🖼️</div>
          <div>NFT Gallery</div>
        </router-link>
        <router-link to="/swap" class="btn-secondary text-center">
          <div class="text-2xl mb-2">🔄</div>
          <div>Token Swap</div>
        </router-link>
        <router-link to="/defi" class="btn-secondary text-center">
          <div class="text-2xl mb-2">📊</div>
          <div>DeFi</div>
        </router-link>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="card">
      <h2 class="text-2xl font-bold mb-4">Recent Activity</h2>
      <div class="space-y-3">
        <div v-for="activity in recentActivity" :key="activity.id" 
             class="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
          <div class="flex items-center space-x-3">
            <div class="text-2xl">{{ activity.icon }}</div>
            <div>
              <div class="font-medium">{{ activity.title }}</div>
              <div class="text-sm text-slate-400">{{ activity.time }}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="font-medium" :class="activity.positive ? 'text-emerald-400' : 'text-red-400'">
              {{ activity.amount }}
            </div>
            <div class="text-sm text-slate-400">{{ activity.token }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Portfolio Chart Placeholder -->
    <div class="card">
      <h2 class="text-2xl font-bold mb-4">Portfolio Performance</h2>
      <div class="h-64 flex items-center justify-center bg-slate-800 rounded-lg">
        <div class="text-center text-slate-400">
          <div class="text-4xl mb-2">📈</div>
          <div>Chart will be displayed here</div>
          <div class="text-sm mt-1">(Chart.js integration needed)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWalletStore } from '../stores/wallet'

const walletStore = useWalletStore()

const totalBalance = computed(() => {
  if (!walletStore.isConnected) return '$0.00'
  return `$${(parseFloat(walletStore.balance) * 2500).toFixed(2)}`
})

const nftCount = ref(12)
const defiPositions = ref(5)
const totalYield = ref('$1,234.56')

const recentActivity = ref([
  {
    id: 1,
    icon: '🔄',
    title: 'Token Swap',
    time: '2 hours ago',
    amount: '+125.50',
    token: 'USDC',
    positive: true
  },
  {
    id: 2,
    icon: '🖼️',
    title: 'NFT Purchase',
    time: '5 hours ago',
    amount: '-0.5',
    token: 'ETH',
    positive: false
  },
  {
    id: 3,
    icon: '💰',
    title: 'Yield Claimed',
    time: '1 day ago',
    amount: '+45.20',
    token: 'USDC',
    positive: true
  },
  {
    id: 4,
    icon: '📊',
    title: 'Liquidity Added',
    time: '2 days ago',
    amount: '-1000.00',
    token: 'USDC',
    positive: false
  }
])
</script>

