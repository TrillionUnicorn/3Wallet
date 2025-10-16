<template>
  <div id="app" class="min-h-screen bg-slate-950 text-slate-100">
    <!-- Navigation -->
    <nav class="bg-slate-900 border-b border-slate-800">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-xl">
              3W
            </div>
            <span class="text-xl font-bold">3Wallet DeFi</span>
          </div>
          
          <div class="hidden md:flex space-x-6">
            <router-link to="/" class="hover:text-emerald-400 transition-colors">Dashboard</router-link>
            <router-link to="/wallet" class="hover:text-emerald-400 transition-colors">Wallet</router-link>
            <router-link to="/nft" class="hover:text-emerald-400 transition-colors">NFT Gallery</router-link>
            <router-link to="/swap" class="hover:text-emerald-400 transition-colors">Token Swap</router-link>
            <router-link to="/defi" class="hover:text-emerald-400 transition-colors">DeFi</router-link>
          </div>
          
          <button 
            v-if="!isConnected"
            @click="connectWallet"
            class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-medium transition-colors"
          >
            Connect Wallet
          </button>
          <div v-else class="flex items-center space-x-2">
            <div class="px-3 py-1 bg-slate-800 rounded-lg text-sm">
              {{ shortAddress }}
            </div>
            <button 
              @click="disconnectWallet"
              class="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-sm transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 border-t border-slate-800 mt-16">
      <div class="container mx-auto px-4 py-8">
        <div class="text-center text-slate-400">
          <p>&copy; 2025 3Wallet DeFi Edition. All rights reserved.</p>
          <p class="text-sm mt-2">Built with Vue.js, Vite, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWalletStore } from './stores/wallet'

const walletStore = useWalletStore()

const isConnected = computed(() => walletStore.isConnected)
const address = computed(() => walletStore.address)

const shortAddress = computed(() => {
  if (!address.value) return ''
  return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`
})

const connectWallet = async () => {
  await walletStore.connect()
}

const disconnectWallet = () => {
  walletStore.disconnect()
}
</script>

<style>
#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.router-link-active {
  color: #10b981;
}
</style>

