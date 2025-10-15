<script lang="ts">
	/**
	 * 3Wallet WalletCard Component
	 * Display wallet balance for a specific chain
	 */
	
	import type { WalletBalance } from '$lib/types/wallet';
	import { formatBalance, formatUSD } from '$lib/services/balance';
	import { getChainIcon, formatChainName } from '$lib/config/chains';
	import Card from '$lib/components/ui/Card.svelte';
	
	interface Props {
		balance: WalletBalance;
		loading?: boolean;
		onclick?: () => void;
	}
	
	let {
		balance,
		loading = false,
		onclick
	}: Props = $props();
	
	const chainIcon = getChainIcon(balance.chainType);
	const chainName = formatChainName(balance.chainType);
</script>

<Card glass hover={!!onclick} {onclick}>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<div class="text-3xl">{chainIcon}</div>
			<div>
				<h3 class="font-semibold text-slate-100">{chainName}</h3>
				<p class="text-sm text-slate-400">{balance.symbol}</p>
			</div>
		</div>
		
		<div class="text-right">
			{#if loading}
				<div class="animate-pulse">
					<div class="h-6 w-24 bg-slate-700 rounded mb-1"></div>
					<div class="h-4 w-16 bg-slate-700 rounded"></div>
				</div>
			{:else}
				<p class="text-lg font-bold text-slate-100">
					{formatBalance(balance.balance)} {balance.symbol}
				</p>
				<p class="text-sm text-slate-400">
					{formatUSD(balance.balanceUSD)}
				</p>
			{/if}
		</div>
	</div>
</Card>

