<script lang="ts">
	import { toast } from 'svelte-french-toast';
	import Card from '../ui/Card.svelte';
	import Button from '../ui/Button.svelte';
	import SendTransactionModal from './SendTransactionModal.svelte';
	import { getEthereumBalance } from '$lib/utils/ethereum';
	import { getBitcoinBalance } from '$lib/utils/bitcoin';
	import { walletStore } from '$lib/stores/walletStore';

	export let address: string;
	export let chain: 'ethereum' | 'bitcoin';
	export let balance: string;
	export let privateKey: string | undefined = undefined;

	let isRefreshing = false;
	let showSendModal = false;

	const chainInfo = {
		ethereum: {
			name: 'Ethereum',
			symbol: 'ETH',
			color: 'text-blue-600',
			bgColor: 'bg-blue-50'
		},
		bitcoin: {
			name: 'Bitcoin',
			symbol: 'BTC',
			color: 'text-orange-600',
			bgColor: 'bg-orange-50'
		}
	};

	const info = chainInfo[chain];

	async function copyAddress() {
		await navigator.clipboard.writeText(address);
		toast.success('Address copied to clipboard!');
	}

	async function refreshBalance() {
		isRefreshing = true;
		try {
			const newBalance =
				chain === 'ethereum'
					? await getEthereumBalance(address)
					: await getBitcoinBalance(address);

			walletStore.updateBalance(address, newBalance);
			toast.success('Balance updated!');
		} catch (error) {
			toast.error('Failed to refresh balance');
		} finally {
			isRefreshing = false;
		}
	}
</script>

<Card class="hover:shadow-xl transition-shadow">
	<div class="flex items-center justify-between mb-4">
		<div class="px-3 py-1 rounded-full {info.bgColor}">
			<span class="text-sm font-semibold {info.color}">
				{info.name}
			</span>
		</div>
		<Button size="sm" variant="outline" on:click={refreshBalance} loading={isRefreshing} class="!p-2">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
				/>
			</svg>
		</Button>
	</div>

	<div class="mb-4">
		<p class="text-sm text-gray-600 mb-1">Balance</p>
		<p class="text-3xl font-bold text-gray-900">
			{balance}
			{info.symbol}
		</p>
	</div>

	<div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mb-4">
		<p class="text-sm text-gray-600 flex-1 truncate font-mono">
			{address}
		</p>
		<button on:click={copyAddress} class="text-gray-600 hover:text-gray-900 transition-colors">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
				/>
			</svg>
		</button>
	</div>

	{#if privateKey}
		<Button on:click={() => (showSendModal = true)} class="w-full" size="sm">
			<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
				/>
			</svg>
			Send {info.symbol}
		</Button>

		<SendTransactionModal
			bind:isOpen={showSendModal}
			{chain}
			{privateKey}
			onSuccess={refreshBalance}
		/>
	{/if}
</Card>

