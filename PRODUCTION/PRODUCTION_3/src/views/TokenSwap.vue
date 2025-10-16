<template>
  <div class="max-w-2xl mx-auto space-y-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-2">Token Swap</h1>
      <p class="text-slate-400">Swap tokens instantly across chains</p>
    </div>

    <div class="card">
      <!-- From Token -->
      <div class="mb-4">
        <label class="block text-sm text-slate-400 mb-2">From</label>
        <div class="bg-slate-800 rounded-lg p-4">
          <div class="flex justify-between items-center mb-2">
            <input 
              v-model="fromAmount" 
              type="number" 
              placeholder="0.0" 
              class="bg-transparent text-2xl font-bold outline-none w-full"
            />
            <select v-model="fromToken" class="bg-slate-700 px-3 py-2 rounded-lg">
              <option value="ETH">ETH</option>
              <option value="USDC">USDC</option>
              <option value="DAI">DAI</option>
            </select>
          </div>
          <div class="text-sm text-slate-400">Balance: 1.5 {{ fromToken }}</div>
        </div>
      </div>

      <!-- Swap Button -->
      <div class="flex justify-center -my-2">
        <button @click="swapTokens" class="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>

      <!-- To Token -->
      <div class="mb-6">
        <label class="block text-sm text-slate-400 mb-2">To</label>
        <div class="bg-slate-800 rounded-lg p-4">
          <div class="flex justify-between items-center mb-2">
            <input 
              v-model="toAmount" 
              type="number" 
              placeholder="0.0" 
              class="bg-transparent text-2xl font-bold outline-none w-full"
              readonly
            />
            <select v-model="toToken" class="bg-slate-700 px-3 py-2 rounded-lg">
              <option value="ETH">ETH</option>
              <option value="USDC">USDC</option>
              <option value="DAI">DAI</option>
            </select>
          </div>
          <div class="text-sm text-slate-400">Balance: 2500.0 {{ toToken }}</div>
        </div>
      </div>

      <!-- Swap Details -->
      <div class="bg-slate-800 rounded-lg p-4 mb-6 space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-slate-400">Rate</span>
          <span>1 {{ fromToken }} = {{ rate }} {{ toToken }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-slate-400">Slippage</span>
          <span>0.5%</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-slate-400">Fee</span>
          <span>0.3%</span>
        </div>
      </div>

      <!-- Swap Button -->
      <button @click="executeSwap" class="btn-primary w-full">
        Swap Tokens
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const fromAmount = ref<number>(0)
const toAmount = ref<number>(0)
const fromToken = ref('ETH')
const toToken = ref('USDC')
const rate = ref(2500)

watch([fromAmount, fromToken, toToken], () => {
  if (fromToken.value === 'ETH' && toToken.value === 'USDC') {
    toAmount.value = fromAmount.value * 2500
  } else if (fromToken.value === 'USDC' && toToken.value === 'ETH') {
    toAmount.value = fromAmount.value / 2500
  } else {
    toAmount.value = fromAmount.value
  }
})

function swapTokens() {
  const temp = fromToken.value
  fromToken.value = toToken.value
  toToken.value = temp
}

function executeSwap() {
  alert(`Swapping ${fromAmount.value} ${fromToken.value} for ${toAmount.value} ${toToken.value}`)
}
</script>

