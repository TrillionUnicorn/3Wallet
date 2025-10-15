<script lang="ts">
	/**
	 * MVP-2: DeFi Power User - Pitch Deck
	 */
	
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	
	const marketData = [
		{ metric: '$47.2B', label: 'Total Value Locked', source: 'DefiLlama 2025' },
		{ metric: '$3.8B', label: 'Daily Trading Volume', source: 'CoinGecko 2025' },
		{ metric: '6.2M', label: 'Active DeFi Users', source: 'Dune Analytics' },
		{ metric: '26.8%', label: 'Expected CAGR', source: 'Grand View Research' }
	];
	
	const problemStats = [
		{ stat: '$500M+', label: 'Lost to MEV in 2024', impact: 'High' },
		{ stat: '$15-50', label: 'Average Gas Fee per TX', impact: 'High' },
		{ stat: '5+', label: 'Tools Needed for DeFi', impact: 'Medium' },
		{ stat: '82%', label: 'Want Better Analytics', impact: 'High' }
	];
	
	const competitors = [
		{ name: 'MetaMask', users: '30M', dex: false, mev: false, analytics: false, automation: false },
		{ name: 'Rabby', users: '500K', dex: true, mev: false, analytics: false, automation: false },
		{ name: 'Zerion', users: '1M', dex: true, mev: false, analytics: true, automation: false },
		{ name: '3Wallet DeFi', users: 'Beta', dex: true, mev: true, analytics: true, automation: true, highlight: true }
	];
	
	const traction = [
		{ metric: '1,200', label: 'Beta Users', period: '3 months' },
		{ metric: '$12M', label: 'Trading Volume', period: 'Month 1' },
		{ metric: '15%', label: 'Avg Gas Savings', period: 'vs Direct DEX' },
		{ metric: '85%', label: 'User Retention', period: 'Month 2' }
	];
</script>

<svelte:head>
	<title>Pitch Deck - 3Wallet DeFi</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-12 px-4">
	<div class="max-w-6xl mx-auto space-y-16">
		<!-- Title Slide -->
		<section class="text-center py-20">
			<h1 class="text-7xl font-bold mb-6">
				<span class="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
					3Wallet DeFi
				</span>
			</h1>
			<p class="text-4xl text-slate-200 mb-4">The Professional's DeFi Command Center</p>
			<p class="text-xl text-slate-400 mb-8">Investor Pitch Deck • January 2025</p>
			<div class="flex gap-4 justify-center">
				<Button size="lg" class="bg-gradient-to-r from-purple-600 to-cyan-600">Download PDF</Button>
				<Button size="lg" variant="outline" class="border-purple-500 text-purple-400">Schedule Meeting</Button>
			</div>
		</section>

		<!-- Market Opportunity -->
		<section>
			<h2 class="text-5xl font-bold mb-8 text-center">
				<span class="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
					Massive DeFi Market
				</span>
			</h2>
			<div class="grid md:grid-cols-4 gap-6 mb-8">
				{#each marketData as data}
					<Card glass padding="lg" class="border border-purple-500/20 text-center">
						<div class="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
							{data.metric}
						</div>
						<div class="text-slate-300 mb-2">{data.label}</div>
						<div class="text-xs text-slate-500">{data.source}</div>
					</Card>
				{/each}
			</div>
		</section>

		<!-- Problem -->
		<section>
			<h2 class="text-5xl font-bold mb-8 text-center">
				<span class="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
					DeFi Traders Face Major Challenges
				</span>
			</h2>
			<div class="grid md:grid-cols-2 gap-6">
				{#each problemStats as problem}
					<Card glass padding="lg" class="border border-purple-500/20">
						<div class="text-4xl font-bold text-red-400 mb-2">{problem.stat}</div>
						<div class="text-slate-300 mb-2">{problem.label}</div>
						<span class="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs text-red-400">
							{problem.impact} Impact
						</span>
					</Card>
				{/each}
			</div>
		</section>

		<!-- Solution -->
		<section>
			<h2 class="text-5xl font-bold mb-8 text-center">
				<span class="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
					All-in-One DeFi Platform
				</span>
			</h2>
			<div class="grid md:grid-cols-3 gap-6">
				<Card glass padding="lg" class="border border-purple-500/20">
					<div class="text-4xl mb-4">🔄</div>
					<h3 class="text-xl font-bold mb-2 text-slate-100">DEX Aggregation</h3>
					<p class="text-slate-300 text-sm">Best prices across 15+ DEXs with smart routing</p>
				</Card>
				<Card glass padding="lg" class="border border-purple-500/20">
					<div class="text-4xl mb-4">🛡️</div>
					<h3 class="text-xl font-bold mb-2 text-slate-100">MEV Protection</h3>
					<p class="text-slate-300 text-sm">Flashbots integration prevents sandwich attacks</p>
				</Card>
				<Card glass padding="lg" class="border border-purple-500/20">
					<div class="text-4xl mb-4">📊</div>
					<h3 class="text-xl font-bold mb-2 text-slate-100">Advanced Analytics</h3>
					<p class="text-slate-300 text-sm">Real-time portfolio tracking and PnL analysis</p>
				</Card>
			</div>
		</section>

		<!-- Competitive Analysis -->
		<section>
			<h2 class="text-5xl font-bold mb-8 text-center">
				<span class="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
					Competitive Advantage
				</span>
			</h2>
			<Card glass padding="lg" class="border border-purple-500/20">
				<div class="overflow-x-auto">
					<table class="w-full text-left">
						<thead>
							<tr class="border-b border-purple-500/20">
								<th class="p-3 text-slate-300">Platform</th>
								<th class="p-3 text-slate-300">Users</th>
								<th class="p-3 text-slate-300">DEX Agg</th>
								<th class="p-3 text-slate-300">MEV Protection</th>
								<th class="p-3 text-slate-300">Analytics</th>
								<th class="p-3 text-slate-300">Automation</th>
							</tr>
						</thead>
						<tbody>
							{#each competitors as comp}
								<tr class="border-b border-purple-500/10 {comp.highlight ? 'bg-purple-500/10' : ''}">
									<td class="p-3 font-semibold {comp.highlight ? 'text-purple-400' : 'text-slate-300'}">
										{comp.name}
									</td>
									<td class="p-3 text-slate-300">{comp.users}</td>
									<td class="p-3">{comp.dex ? '✅' : '❌'}</td>
									<td class="p-3">{comp.mev ? '✅' : '❌'}</td>
									<td class="p-3">{comp.analytics ? '✅' : '❌'}</td>
									<td class="p-3">{comp.automation ? '✅' : '❌'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</Card>
		</section>

		<!-- Traction -->
		<section>
			<h2 class="text-5xl font-bold mb-8 text-center">
				<span class="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
					Early Traction
				</span>
			</h2>
			<div class="grid md:grid-cols-4 gap-6">
				{#each traction as metric}
					<Card glass padding="lg" class="border border-purple-500/20 text-center">
						<div class="text-5xl font-bold text-emerald-400 mb-2">{metric.metric}</div>
						<div class="text-slate-300 mb-1">{metric.label}</div>
						<div class="text-xs text-slate-500">{metric.period}</div>
					</Card>
				{/each}
			</div>
		</section>

		<!-- Business Model -->
		<section>
			<h2 class="text-5xl font-bold mb-8 text-center">
				<span class="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
					Revenue Model
				</span>
			</h2>
			<Card glass padding="lg" class="border border-purple-500/20">
				<div class="space-y-4">
					<div class="flex justify-between items-center p-4 bg-slate-900/50 rounded-lg">
						<div>
							<div class="font-bold text-slate-100">Subscription Revenue</div>
							<div class="text-sm text-slate-400">$49/month × 50,000 users</div>
						</div>
						<div class="text-2xl font-bold text-emerald-400">$29.4M ARR</div>
					</div>
					<div class="flex justify-between items-center p-4 bg-slate-900/50 rounded-lg">
						<div>
							<div class="font-bold text-slate-100">Transaction Fees</div>
							<div class="text-sm text-slate-400">0.1% on $500M monthly volume</div>
						</div>
						<div class="text-2xl font-bold text-emerald-400">$6M ARR</div>
					</div>
					<div class="flex justify-between items-center p-4 bg-purple-500/20 border-2 border-purple-500 rounded-lg">
						<div>
							<div class="font-bold text-slate-100 text-xl">Total ARR</div>
							<div class="text-sm text-slate-400">Year 3 projection</div>
						</div>
						<div class="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
							$35.4M
						</div>
					</div>
				</div>
			</Card>
		</section>

		<!-- The Ask -->
		<section class="text-center py-12">
			<Card glass padding="lg" class="border-2 border-purple-500">
				<h2 class="text-4xl font-bold mb-4">
					<span class="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
						Raising $2M Seed Round
					</span>
				</h2>
				<p class="text-xl text-slate-300 mb-8">
					To accelerate product development and user acquisition
				</p>
				<div class="grid md:grid-cols-3 gap-6 mb-8">
					<div>
						<div class="text-3xl font-bold text-purple-400 mb-2">40%</div>
						<div class="text-slate-400">Product Development</div>
					</div>
					<div>
						<div class="text-3xl font-bold text-cyan-400 mb-2">35%</div>
						<div class="text-slate-400">Marketing & Growth</div>
					</div>
					<div>
						<div class="text-3xl font-bold text-emerald-400 mb-2">25%</div>
						<div class="text-slate-400">Operations & Team</div>
					</div>
				</div>
				<div class="flex gap-4 justify-center">
					<Button size="lg" class="bg-gradient-to-r from-purple-600 to-cyan-600">Schedule Meeting</Button>
					<Button size="lg" variant="outline" class="border-purple-500 text-purple-400">Download Deck</Button>
				</div>
			</Card>
		</section>
	</div>
</div>

