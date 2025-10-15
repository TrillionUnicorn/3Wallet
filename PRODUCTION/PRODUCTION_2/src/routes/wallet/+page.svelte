<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { walletStore } from '$lib/stores/walletStore';
	import WalletCard from '$lib/components/wallet/WalletCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { getEthereumBalance } from '$lib/utils/ethereum';
	import { getBitcoinBalance } from '$lib/utils/bitcoin';

	let isRefreshing = false;
	let mounted = false;

	$: wallets = $walletStore.wallets;
	$: isUnlocked = $walletStore.isUnlocked;

	onMount(() => {
		mounted = true;
		if (isUnlocked && wallets.length > 0) {
			refreshAllBalances();
		}
	});

	$: if (mounted && !isUnlocked) {
		goto('/');
	}

	async function refreshAllBalances() {
		isRefreshing = true;
		try {
			for (const wallet of wallets) {
				const balance =
					wallet.chain === 'ethereum'
						? await getEthereumBalance(wallet.address)
						: await getBitcoinBalance(wallet.address);

				walletStore.updateBalance(wallet.address, balance);
			}
		} catch (error) {
			console.error('Error refreshing balances:', error);
		} finally {
			isRefreshing = false;
		}
	}

	function handleLockWallet() {
		walletStore.lockWallet();
		goto('/');
	}
</script>

<svelte:head>
	<title>Wallet Dashboard - 3Wallet</title>
</svelte:head>

{#if mounted && isUnlocked}
	<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
		<!-- Header -->
		<header class="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
			<div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
				<div class="flex items-center gap-2">
					<svg
						class="w-8 h-8 text-primary"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
						/>
					</svg>
					<h1 class="text-2xl font-bold text-gray-900">3Wallet</h1>
				</div>

				<div class="flex items-center gap-3">
					<Button on:click={refreshAllBalances} variant="outline" size="sm" loading={isRefreshing}>
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
						Refresh
					</Button>

					<Button on:click={handleLockWallet} variant="outline" size="sm">
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
						Lock
					</Button>
				</div>
			</div>
		</header>

		<!-- Main Content -->
		<main class="max-w-7xl mx-auto px-4 py-8">
			<div class="mb-8">
				<h2 class="text-3xl font-bold text-gray-900 mb-2">Your Wallets</h2>
				<p class="text-gray-600">Manage your multi-chain crypto assets</p>
			</div>

			<!-- Wallet Cards -->
			<div class="grid md:grid-cols-2 gap-6">
				{#each wallets as wallet (wallet.address)}
					<WalletCard
						address={wallet.address}
						chain={wallet.chain}
						balance={wallet.balance}
						privateKey={wallet.privateKey}
					/>
				{/each}
			</div>

			<!-- Info Section -->
			<div class="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-xl">
				<h3 class="text-lg font-bold text-blue-900 mb-2">🔒 Security Notice</h3>
				<p class="text-blue-800 text-sm">
					Your private keys are encrypted and stored locally on your device. Never share your
					recovery phrase with anyone. 3Wallet will never ask for your password or recovery phrase.
				</p>
			</div>
		</main>
	</div>
{/if}

