<script lang="ts">
	/**
	 * 3Wallet MVP Product Page
	 * Functional multi-chain wallet interface
	 */
	
	import { onMount } from 'svelte';
	import type { Wallet, WalletBalance, ChainType } from '$lib/types/wallet';
	import { createWallet, getActiveWallet, saveWallet } from '$lib/utils/wallet';
	import { fetchBalance, calculateTotalValue, formatUSD } from '$lib/services/balance';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import WalletCard from '$lib/components/wallet/WalletCard.svelte';
	
	// State
	let wallet = $state<Wallet | null>(null);
	let balances = $state<WalletBalance[]>([]);
	let isLoading = $state(true);
	let showCreateModal = $state(false);
	let password = $state('');
	let walletName = $state('My Wallet');
	let selectedChain = $state<ChainType>('ethereum');
	
	// Supported chains for MVP
	const supportedChains: ChainType[] = ['ethereum', 'bitcoin', 'solana'];
	
	onMount(async () => {
		await loadWallet();
	});
	
	async function loadWallet() {
		isLoading = true;
		try {
			// Try to load existing wallet
			const storedPassword = sessionStorage.getItem('wallet_password');
			if (storedPassword) {
				const activeWallet = await getActiveWallet(storedPassword);
				if (activeWallet) {
					wallet = activeWallet;
					password = storedPassword;
					await loadBalances();
				}
			}
		} catch (error) {
			console.error('Load wallet error:', error);
		} finally {
			isLoading = false;
		}
	}
	
	async function handleCreateWallet() {
		if (!password || !walletName) return;
		
		isLoading = true;
		try {
			// Create new wallet
			const newWallet = await createWallet(walletName, password, 'personal');
			
			// Save wallet
			await saveWallet(newWallet, password);
			
			// Store password in session
			sessionStorage.setItem('wallet_password', password);
			
			// Update state
			wallet = newWallet;
			showCreateModal = false;
			
			// Load balances
			await loadBalances();
		} catch (error) {
			console.error('Create wallet error:', error);
			alert('Failed to create wallet. Please try again.');
		} finally {
			isLoading = false;
		}
	}
	
	async function loadBalances() {
		if (!wallet) return;
		
		try {
			const balancePromises = supportedChains.map(async (chainType) => {
				const account = wallet!.accounts.find(acc => acc.chainType === chainType);
				if (account) {
					return fetchBalance(account.address, chainType);
				}
				return null;
			});
			
			const results = await Promise.all(balancePromises);
			balances = results.filter(b => b !== null) as WalletBalance[];
		} catch (error) {
			console.error('Load balances error:', error);
		}
	}
	
	function getAccountAddress(chainType: ChainType): string {
		const account = wallet?.accounts.find(acc => acc.chainType === chainType);
		return account?.address || '';
	}
	
	function copyAddress(address: string) {
		navigator.clipboard.writeText(address);
		alert('Address copied to clipboard!');
	}
	
	const totalValue = $derived(calculateTotalValue(balances));
</script>

<svelte:head>
	<title>3Wallet - Your Secure Multi-Chain Wallet</title>
</svelte:head>

<div class="min-h-screen bg-slate-900 py-8 px-4">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-4xl font-bold text-gradient mb-2">3Wallet</h1>
			<p class="text-slate-400">Secure Multi-Chain Crypto Wallet</p>
		</div>
		
		{#if isLoading}
			<!-- Loading State -->
			<div class="flex items-center justify-center py-20">
				<div class="text-center">
					<div class="animate-spin w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
					<p class="text-slate-400">Loading wallet...</p>
				</div>
			</div>
		{:else if !wallet}
			<!-- No Wallet State -->
			<div class="max-w-2xl mx-auto">
				<Card glass padding="lg">
					<div class="text-center py-12">
						<div class="text-6xl mb-6">🔐</div>
						<h2 class="text-2xl font-bold mb-4 text-slate-100">Welcome to 3Wallet</h2>
						<p class="text-slate-300 mb-8">
							Create your secure multi-chain wallet to get started. Your wallet will support Ethereum, Bitcoin, and Solana.
						</p>
						<Button size="lg" onclick={() => showCreateModal = true}>
							Create New Wallet
						</Button>
					</div>
				</Card>
			</div>
		{:else}
			<!-- Wallet Dashboard -->
			<div class="space-y-8">
				<!-- Portfolio Overview -->
				<Card glass padding="lg">
					<div class="text-center">
						<p class="text-slate-400 mb-2">Total Portfolio Value</p>
						<h2 class="text-5xl font-bold text-gradient mb-4">
							{formatUSD(totalValue)}
						</h2>
						<div class="flex gap-4 justify-center">
							<Button variant="primary">Send</Button>
							<Button variant="secondary">Receive</Button>
							<Button variant="outline">Swap</Button>
						</div>
					</div>
				</Card>
				
				<!-- Chain Balances -->
				<div>
					<h3 class="text-2xl font-bold mb-4 text-slate-100">Your Assets</h3>
					<div class="grid md:grid-cols-3 gap-4">
						{#each balances as balance}
							<WalletCard {balance} />
						{/each}
					</div>
				</div>
				
				<!-- Wallet Addresses -->
				<div>
					<h3 class="text-2xl font-bold mb-4 text-slate-100">Wallet Addresses</h3>
					<div class="space-y-3">
						{#each supportedChains as chainType}
							{@const address = getAccountAddress(chainType)}
							<Card glass padding="md">
								<div class="flex items-center justify-between">
									<div>
										<p class="font-semibold text-slate-100 capitalize">{chainType}</p>
										<p class="text-sm text-slate-400 font-mono">{address.slice(0, 20)}...{address.slice(-10)}</p>
									</div>
									<Button size="sm" variant="outline" onclick={() => copyAddress(address)}>
										Copy
									</Button>
								</div>
							</Card>
						{/each}
					</div>
				</div>
				
				<!-- Security Info -->
				<Card glass padding="lg">
					<div class="flex items-start gap-4">
						<div class="text-3xl">🛡️</div>
						<div>
							<h4 class="font-bold text-slate-100 mb-2">Security Tier: {wallet.tier.charAt(0).toUpperCase() + wallet.tier.slice(1)}</h4>
							<p class="text-slate-300 text-sm mb-3">
								Your wallet is protected with AES-256-GCM encryption. Your private keys never leave your device.
							</p>
							<div class="flex gap-2">
								<span class="text-xs bg-emerald-900 text-emerald-300 px-2 py-1 rounded">✓ Encrypted</span>
								<span class="text-xs bg-emerald-900 text-emerald-300 px-2 py-1 rounded">✓ Local Storage</span>
								<span class="text-xs bg-emerald-900 text-emerald-300 px-2 py-1 rounded">✓ Testnet Mode</span>
							</div>
						</div>
					</div>
				</Card>
			</div>
		{/if}
	</div>
</div>

<!-- Create Wallet Modal -->
<Modal bind:open={showCreateModal} title="Create New Wallet" size="md">
	<div class="space-y-4">
		<div class="bg-yellow-900 border border-yellow-700 rounded-lg p-4 mb-4">
			<p class="text-yellow-200 text-sm">
				⚠️ <strong>Important:</strong> Your password encrypts your wallet. If you lose it, you cannot recover your funds. Write it down and store it safely.
			</p>
		</div>
		
		<Input
			label="Wallet Name"
			placeholder="My Wallet"
			bind:value={walletName}
			required
		/>
		
		<Input
			type="password"
			label="Password"
			placeholder="Enter a strong password"
			bind:value={password}
			required
		/>
		
		<div class="bg-slate-800 rounded-lg p-4">
			<p class="text-sm text-slate-300 mb-2">Your wallet will include:</p>
			<ul class="text-sm text-slate-400 space-y-1">
				<li>✓ Ethereum (Sepolia Testnet)</li>
				<li>✓ Bitcoin (Testnet)</li>
				<li>✓ Solana (Devnet)</li>
			</ul>
		</div>
	</div>
	
	{#snippet footer()}
		<div class="flex gap-3 justify-end">
			<Button variant="ghost" onclick={() => showCreateModal = false}>
				Cancel
			</Button>
			<Button onclick={handleCreateWallet} loading={isLoading}>
				Create Wallet
			</Button>
		</div>
	{/snippet}
</Modal>

