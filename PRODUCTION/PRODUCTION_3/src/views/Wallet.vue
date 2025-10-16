<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-4xl font-bold mb-2">Wallet</h1>
      <p class="text-slate-400">Manage your crypto assets</p>
    </div>

    <div v-if="!walletStore.isConnected" class="card text-center py-12">
      <div class="text-6xl mb-4">🔒</div>
      <h2 class="text-2xl font-bold mb-2">Connect Your Wallet</h2>
      <p class="text-slate-400 mb-6">Connect your wallet to view your assets</p>
      <button @click="walletStore.connect" class="btn-primary">
        Connect Wallet
      </button>
    </div>

    <div v-else class="space-y-6">
      <!-- Balance Card -->
      <div class="card">
        <div class="text-sm text-slate-400 mb-2">Total Balance</div>
        <div class="text-4xl font-bold mb-4">{{ walletStore.balance }} ETH</div>
        <div class="text-slate-400">≈ ${{ (parseFloat(walletStore.balance) * 2500).toFixed(2) }}</div>
      </div>

      <!-- Assets List -->
      <div class="card">
        <h2 class="text-2xl font-bold mb-4">Assets</h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">ETH</div>
              <div>
                <div class="font-medium">Ethereum</div>
                <div class="text-sm text-slate-400">ETH</div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-medium">{{ walletStore.balance }}</div>
              <div class="text-sm text-slate-400">${{ (parseFloat(walletStore.balance) * 2500).toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWalletStore } from '../stores/wallet'

const walletStore = useWalletStore()
</script>

