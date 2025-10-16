<script lang="ts">
	/**
	 * MVP-2: DeFi Power User - Trading Platform
	 * Advanced DeFi trading interface with analytics
	 */
	
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	
	// Mock data for demo
	let totalValue = $state(247850.32);
	let change24h = $state(12.34);
	let totalPnL = $state(45230.18);
	let gasS aved = $state(3420.50);
	
	const portfolio = [
		{ symbol: 'ETH', name: 'Ethereum', balance: 45.23, value: 102450.50, change: 5.67, allocation: 41.3 },
		{ symbol: 'WBTC', name: 'Wrapped Bitcoin', balance: 1.89, value: 78920.00, change: 3.21, allocation: 31.8 },
		{ symbol: 'USDC', name: 'USD Coin', balance: 35000, value: 35000.00, change: 0.01, allocation: 14.1 },
		{ symbol: 'UNI', name: 'Uniswap', balance: 2450, value: 18650.00, change: -2.34, allocation: 7.5 },
		{ symbol: 'AAVE', name: 'Aave', balance: 145, value: 12829.82, change: 8.92, allocation: 5.2 }
	];
	
	const recentTrades = [
		{ type: 'Swap', from: 'ETH', to: 'USDC', amount: '2.5 ETH', value: '$5,650', gas: '$12.34', profit: '+$125', time: '2 min ago', status: 'success' },
		{ type: 'Add Liquidity', from: 'ETH/USDC', to: 'LP', amount: '5 ETH', value: '$11,300', gas: '$18.90', profit: '+$0', time: '1 hour ago', status: 'success' },
		{ type: 'Swap', from: 'USDC', to: 'UNI', amount: '1000 USDC', value: '$1,000', gas: '$8.45', profit: '+$23', time: '3 hours ago', status: 'success' },
		{ type: 'Claim Rewards', from: 'AAVE', to: 'AAVE', amount: '12.5 AAVE', value: '$1,105', gas: '$6.20', profit: '+$1,105', time: '1 day ago', status: 'success' }
	];
	
	const activeStrategies = [
		{ name: 'ETH-USDC LP Auto-Compound', protocol: 'Uniswap V3', apy: 18.5, tvl: 15000, status: 'active', earnings: '+$234.50' },
		{ name: 'AAVE Lending', protocol: 'Aave V3', apy: 4.2, tvl: 12830, status: 'active', earnings: '+$89.20' },
		{ name: 'Curve 3pool', protocol: 'Curve', apy: 12.8, tvl: 8500, status: 'active', earnings: '+$156.80' }
	];
	
	// Trading state
	let fromToken = $state('ETH');
	let toToken = $state('USDC');
	let fromAmount = $state('');
	let toAmount = $state('');
	let slippage = $state(0.5);
	let gasPrice = $state('medium');
	
	function handleSwap() {
		alert('Swap functionality would execute here with DEX aggregation');
	}
	
	function formatCurrency(value: number): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2
		}).format(value);
	}
	
	function formatPercent(value: number): string {
		return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
	}
</script>

<svelte:head>
	<title>Trading Platform - 3Wallet DeFi</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-8 px-4">
	<div class="max-w-[1920px] mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
				DeFi Command Center
			</h1>
			<p class="text-slate-400">Professional trading platform with advanced analytics</p>
		</div>
		
		<!-- Portfolio Overview -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<Card glass padding="lg" class="border border-purple-500/20">
				<div class="text-sm text-slate-400 mb-2">Total Portfolio Value</div>
				<div class="text-3xl font-bold text-slate-100 mb-1">{formatCurrency(totalValue)}</div>
				<div class="text-sm {change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}">
					{formatPercent(change24h)} (24h)
				</div>
			</Card>
			
			<Card glass padding="lg" class="border border-purple-500/20">
				<div class="text-sm text-slate-400 mb-2">Total P&L</div>
				<div class="text-3xl font-bold text-emerald-400 mb-1">{formatCurrency(totalPnL)}</div>
				<div class="text-sm text-slate-400">All-time profit</div>
			</Card>
			
			<Card glass padding="lg" class="border border-purple-500/20">
				<div class="text-sm text-slate-400 mb-2">Gas Saved</div>
				<div class="text-3xl font-bold text-cyan-400 mb-1">{formatCurrency(gasSaved)}</div>
				<div class="text-sm text-slate-400">vs Direct DEX</div>
			</Card>
			
			<Card glass padding="lg" class="border border-purple-500/20">
				<div class="text-sm text-slate-400 mb-2">Active Strategies</div>
				<div class="text-3xl font-bold text-purple-400 mb-1">{activeStrategies.length}</div>
				<div class="text-sm text-slate-400">Auto-compounding</div>
			</Card>
		</div>
		
		<div class="grid lg:grid-cols-3 gap-8">
			<!-- Left Column: Trading Interface -->
			<div class="lg:col-span-2 space-y-6">
				<!-- Quick Trade -->
				<Card glass padding="lg" class="border border-purple-500/20">
					<h2 class="text-2xl font-bold mb-6 text-slate-100">Quick Trade</h2>
					
					<div class="space-y-4">
						<!-- From Token -->
						<div>
							<label class="block text-sm text-slate-400 mb-2">From</label>
							<div class="flex gap-3">
								<select bind:value={fromToken} class="px-4 py-3 bg-slate-900 border border-purple-500/30 rounded-lg text-slate-100 flex-1">
									<option value="ETH">ETH - Ethereum</option>
									<option value="WBTC">WBTC - Wrapped Bitcoin</option>
									<option value="USDC">USDC - USD Coin</option>
									<option value="UNI">UNI - Uniswap</option>
									<option value="AAVE">AAVE - Aave</option>
								</select>
								<Input bind:value={fromAmount} placeholder="0.0" class="w-40" />
							</div>
						</div>
						
						<!-- Swap Icon -->
						<div class="flex justify-center">
							<button class="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center hover:bg-purple-500/30 transition-colors">
								<span class="text-purple-400">⇅</span>
							</button>
						</div>
						
						<!-- To Token -->
						<div>
							<label class="block text-sm text-slate-400 mb-2">To</label>
							<div class="flex gap-3">
								<select bind:value={toToken} class="px-4 py-3 bg-slate-900 border border-purple-500/30 rounded-lg text-slate-100 flex-1">
									<option value="USDC">USDC - USD Coin</option>
									<option value="ETH">ETH - Ethereum</option>
									<option value="WBTC">WBTC - Wrapped Bitcoin</option>
									<option value="UNI">UNI - Uniswap</option>
									<option value="AAVE">AAVE - Aave</option>
								</select>
								<Input bind:value={toAmount} placeholder="0.0" class="w-40" disabled />
							</div>
						</div>
						
						<!-- Settings -->
						<div class="flex gap-4">
							<div class="flex-1">
								<label class="block text-sm text-slate-400 mb-2">Slippage</label>
								<select bind:value={slippage} class="w-full px-4 py-2 bg-slate-900 border border-purple-500/30 rounded-lg text-slate-100">
									<option value={0.1}>0.1%</option>
									<option value={0.5}>0.5%</option>
									<option value={1.0}>1.0%</option>
									<option value={3.0}>3.0%</option>
								</select>
							</div>
							<div class="flex-1">
								<label class="block text-sm text-slate-400 mb-2">Gas Price</label>
								<select bind:value={gasPrice} class="w-full px-4 py-2 bg-slate-900 border border-purple-500/30 rounded-lg text-slate-100">
									<option value="low">Low (5 min)</option>
									<option value="medium">Medium (2 min)</option>
									<option value="high">High (30 sec)</option>
								</select>
							</div>
						</div>
						
						<!-- Trade Info -->
						<div class="bg-slate-900/50 rounded-lg p-4 space-y-2 text-sm">
							<div class="flex justify-between text-slate-400">
								<span>Best Route:</span>
								<span class="text-slate-100">Uniswap V3 → 1inch</span>
							</div>
							<div class="flex justify-between text-slate-400">
								<span>Estimated Gas:</span>
								<span class="text-cyan-400">$12.34 (15% saved)</span>
							</div>
							<div class="flex justify-between text-slate-400">
								<span>Price Impact:</span>
								<span class="text-emerald-400">0.12%</span>
							</div>
							<div class="flex justify-between text-slate-400">
								<span>MEV Protection:</span>
								<span class="text-purple-400">✓ Flashbots</span>
							</div>
						</div>
						
						<Button fullWidth size="lg" onclick={handleSwap} class="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
							Swap with Best Rate
						</Button>
					</div>
				</Card>
				
				<!-- Portfolio Assets -->
				<Card glass padding="lg" class="border border-purple-500/20">
					<h2 class="text-2xl font-bold mb-6 text-slate-100">Portfolio Assets</h2>
					
					<div class="overflow-x-auto">
						<table class="w-full">
							<thead>
								<tr class="border-b border-purple-500/20 text-left">
									<th class="pb-3 text-sm text-slate-400">Asset</th>
									<th class="pb-3 text-sm text-slate-400">Balance</th>
									<th class="pb-3 text-sm text-slate-400">Value</th>
									<th class="pb-3 text-sm text-slate-400">24h Change</th>
									<th class="pb-3 text-sm text-slate-400">Allocation</th>
								</tr>
							</thead>
							<tbody>
								{#each portfolio as asset}
									<tr class="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors">
										<td class="py-4">
											<div class="font-semibold text-slate-100">{asset.symbol}</div>
											<div class="text-sm text-slate-400">{asset.name}</div>
										</td>
										<td class="py-4 text-slate-100">{asset.balance.toLocaleString()}</td>
										<td class="py-4 text-slate-100">{formatCurrency(asset.value)}</td>
										<td class="py-4">
											<span class={asset.change >= 0 ? 'text-emerald-400' : 'text-red-400'}>
												{formatPercent(asset.change)}
											</span>
										</td>
										<td class="py-4">
											<div class="flex items-center gap-2">
												<div class="flex-1 bg-slate-700 rounded-full h-2">
													<div class="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full" style="width: {asset.allocation}%"></div>
												</div>
												<span class="text-sm text-slate-400">{asset.allocation}%</span>
											</div>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</Card>
			</div>
			
			<!-- Right Column: Strategies & Activity -->
			<div class="space-y-6">
				<!-- Active Strategies -->
				<Card glass padding="lg" class="border border-purple-500/20">
					<h2 class="text-xl font-bold mb-4 text-slate-100">Active Strategies</h2>
					
					<div class="space-y-4">
						{#each activeStrategies as strategy}
							<div class="bg-slate-900/50 rounded-lg p-4">
								<div class="flex items-start justify-between mb-2">
									<div>
										<div class="font-semibold text-slate-100 text-sm">{strategy.name}</div>
										<div class="text-xs text-slate-400">{strategy.protocol}</div>
									</div>
									<span class="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded text-xs text-emerald-400">
										{strategy.status}
									</span>
								</div>
								<div class="grid grid-cols-2 gap-2 text-xs">
									<div>
										<div class="text-slate-400">APY</div>
										<div class="text-emerald-400 font-semibold">{strategy.apy}%</div>
									</div>
									<div>
										<div class="text-slate-400">TVL</div>
										<div class="text-slate-100">{formatCurrency(strategy.tvl)}</div>
									</div>
									<div class="col-span-2">
										<div class="text-slate-400">Earnings</div>
										<div class="text-emerald-400 font-semibold">{strategy.earnings}</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
					
					<Button fullWidth variant="outline" class="mt-4 border-purple-500 text-purple-400">
						+ Add Strategy
					</Button>
				</Card>
				
				<!-- Recent Activity -->
				<Card glass padding="lg" class="border border-purple-500/20">
					<h2 class="text-xl font-bold mb-4 text-slate-100">Recent Activity</h2>
					
					<div class="space-y-3">
						{#each recentTrades as trade}
							<div class="bg-slate-900/50 rounded-lg p-3">
								<div class="flex items-start justify-between mb-2">
									<div>
										<div class="font-semibold text-slate-100 text-sm">{trade.type}</div>
										<div class="text-xs text-slate-400">{trade.from} → {trade.to}</div>
									</div>
									<span class="text-xs text-slate-400">{trade.time}</span>
								</div>
								<div class="grid grid-cols-2 gap-2 text-xs">
									<div>
										<div class="text-slate-400">Amount</div>
										<div class="text-slate-100">{trade.amount}</div>
									</div>
									<div>
										<div class="text-slate-400">Gas</div>
										<div class="text-cyan-400">{trade.gas}</div>
									</div>
									<div>
										<div class="text-slate-400">Value</div>
										<div class="text-slate-100">{trade.value}</div>
									</div>
									<div>
										<div class="text-slate-400">Profit</div>
										<div class="text-emerald-400">{trade.profit}</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</Card>
			</div>
		</div>
	</div>
</div>

