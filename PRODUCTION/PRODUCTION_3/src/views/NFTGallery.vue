<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-4xl font-bold mb-2">NFT Gallery</h1>
      <p class="text-slate-400">Browse and manage your NFT collection</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="nft in nfts" :key="nft.id" class="card hover:border-emerald-500 transition-colors cursor-pointer">
        <div class="aspect-square bg-slate-800 rounded-lg mb-3 flex items-center justify-center text-4xl">
          {{ nft.emoji }}
        </div>
        <h3 class="font-bold mb-1">{{ nft.name }}</h3>
        <p class="text-sm text-slate-400 mb-2">{{ nft.collection }}</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-emerald-400">{{ nft.price }} ETH</span>
          <span class="text-xs text-slate-500">#{{ nft.tokenId }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nfts = ref([
  { id: 1, name: 'Cool Ape #1234', collection: 'Bored Apes', price: '5.2', tokenId: '1234', emoji: '🦍' },
  { id: 2, name: 'Crypto Punk #5678', collection: 'CryptoPunks', price: '12.5', tokenId: '5678', emoji: '👾' },
  { id: 3, name: 'Doodle #9012', collection: 'Doodles', price: '2.8', tokenId: '9012', emoji: '🎨' },
  { id: 4, name: 'Azuki #3456', collection: 'Azuki', price: '8.1', tokenId: '3456', emoji: '🌸' },
  { id: 5, name: 'Moonbird #7890', collection: 'Moonbirds', price: '6.3', tokenId: '7890', emoji: '🦉' },
  { id: 6, name: 'Clone X #2345', collection: 'Clone X', price: '4.7', tokenId: '2345', emoji: '🤖' },
  { id: 7, name: 'Pudgy #6789', collection: 'Pudgy Penguins', price: '3.9', tokenId: '6789', emoji: '🐧' },
  { id: 8, name: 'Meebits #4567', collection: 'Meebits', price: '1.5', tokenId: '4567', emoji: '🎮' }
])
</script>

