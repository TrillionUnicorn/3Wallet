import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ethers } from 'ethers'

export const useWalletStore = defineStore('wallet', () => {
  // State
  const address = ref<string | null>(null)
  const balance = ref<string>('0')
  const chainId = ref<number | null>(null)
  const provider = ref<ethers.BrowserProvider | null>(null)
  const signer = ref<ethers.JsonRpcSigner | null>(null)

  // Getters
  const isConnected = computed(() => address.value !== null)
  const shortAddress = computed(() => {
    if (!address.value) return ''
    return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`
  })

  // Actions
  async function connect() {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask!')
        return
      }

      const browserProvider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await browserProvider.send('eth_requestAccounts', [])
      
      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }

      const walletSigner = await browserProvider.getSigner()
      const walletAddress = await walletSigner.getAddress()
      const network = await browserProvider.getNetwork()
      const walletBalance = await browserProvider.getBalance(walletAddress)

      provider.value = browserProvider
      signer.value = walletSigner
      address.value = walletAddress
      chainId.value = Number(network.chainId)
      balance.value = ethers.formatEther(walletBalance)

      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

      console.log('Wallet connected:', walletAddress)
    } catch (error) {
      console.error('Error connecting wallet:', error)
      alert('Failed to connect wallet')
    }
  }

  function disconnect() {
    address.value = null
    balance.value = '0'
    chainId.value = null
    provider.value = null
    signer.value = null

    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum.removeListener('chainChanged', handleChainChanged)
    }

    console.log('Wallet disconnected')
  }

  async function handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      disconnect()
    } else {
      address.value = accounts[0]
      await updateBalance()
    }
  }

  function handleChainChanged() {
    window.location.reload()
  }

  async function updateBalance() {
    if (!provider.value || !address.value) return

    try {
      const walletBalance = await provider.value.getBalance(address.value)
      balance.value = ethers.formatEther(walletBalance)
    } catch (error) {
      console.error('Error updating balance:', error)
    }
  }

  return {
    // State
    address,
    balance,
    chainId,
    provider,
    signer,
    // Getters
    isConnected,
    shortAddress,
    // Actions
    connect,
    disconnect,
    updateBalance
  }
})

