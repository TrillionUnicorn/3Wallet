<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-4xl font-bold mb-2">DeFi Dashboard</h1>
      <p class="text-slate-400">Manage your DeFi positions and earn yield</p>
    </div>

    <!-- Yield Opportunities -->
    <div class="card">
      <h2 class="text-2xl font-bold mb-4">Yield Opportunities</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="pool in yieldPools" :key="pool.id" class="bg-slate-800 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <div class="font-bold">{{ pool.name }}</div>
            <div class="text-emerald-400 font-bold">{{ pool.apy }}% APY</div>
          </div>
          <div class="text-sm text-slate-400 mb-3">{{ pool.protocol }}</div>
          <button class="btn-primary w-full text-sm">Deposit</button>
        </div>
      </div>
    </div>

    <!-- Active Positions -->
    <div class="card">
      <h2 class="text-2xl font-bold mb-4">Active Positions</h2>
      <div class="space-y-3">
        <div v-for="position in activePositions" :key="position.id" 
             class="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
          <div>
            <div class="font-bold mb-1">{{ position.pool }}</div>
            <div class="text-sm text-slate-400">{{ position.protocol }}</div>
          </div>
          <div class="text-right">
            <div class="font-bold">${{ position.value }}</div>
            <div class="text-sm text-emerald-400">+{{ position.earned }} earned</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Staking -->
    <div class="card">
      <h2 class="text-2xl font-bold mb-4">Staking</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-slate-800 rounded-lg p-4">
          <div class="text-sm text-slate-400 mb-2">ETH Staking</div>
          <div class="text-2xl font-bold mb-2">4.5% APY</div>
          <button class="btn-primary w-full">Stake ETH</button>
        </div>
        <div class="bg-slate-800 rounded-lg p-4">
          <div class="text-sm text-slate-400 mb-2">Liquid Staking</div>
          <div class="text-2xl font-bold mb-2">5.2% APY</div>
          <button class="btn-primary w-full">Stake</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const yieldPools = ref([
  { id: 1, name: 'USDC-ETH', apy: 12.5, protocol: 'Uniswap V3' },
  { id: 2, name: 'DAI-USDC', apy: 8.3, protocol: 'Curve' },
  { id: 3, name: 'WBTC-ETH', apy: 15.7, protocol: 'Uniswap V3' },
  { id: 4, name: 'stETH-ETH', apy: 6.2, protocol: 'Lido' },
  { id: 5, name: 'USDT-DAI', apy: 7.8, protocol: 'Aave' },
  { id: 6, name: 'LINK-ETH', apy: 18.4, protocol: 'SushiSwap' }
])

const activePositions = ref([
  { id: 1, pool: 'USDC-ETH LP', protocol: 'Uniswap V3', value: '5,234.50', earned: '$125.30' },
  { id: 2, pool: 'DAI Lending', protocol: 'Aave', value: '2,500.00', earned: '$45.20' },
  { id: 3, pool: 'ETH Staking', protocol: 'Lido', value: '8,750.00', earned: '$234.50' }
])
</script>

