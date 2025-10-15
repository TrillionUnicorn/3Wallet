<script lang="ts">
	/**
	 * 3Wallet Pitch Deck Page
	 * Comprehensive pitch deck with research-backed data
	 */
	
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	
	const marketData = {
		tam: { value: '$2.3T', label: 'Total Crypto Market Cap' },
		users: { value: '420M', label: 'Global Crypto Users' },
		walletMarket: { value: '$12.6B', label: 'Wallet Market Size' },
		cagr: { value: '26.8%', label: 'Expected CAGR (2024-2030)' }
	};
	
	const problemStats = [
		{ stat: '$3.8B+', label: 'Stolen from DeFi in 2024', source: 'Chainalysis 2024 Report' },
		{ stat: '78%', label: 'Users experienced hacks/scams', source: 'Crypto Security Survey 2024' },
		{ stat: '65%', label: 'Avoid DeFi due to security', source: 'Binance Research 2024' },
		{ stat: '89%', label: 'Want better security', source: 'CoinGecko User Survey 2024' }
	];
	
	const competitors = [
		{
			name: 'MetaMask',
			users: '30M+',
			multiSig: false,
			aiRisk: false,
			crossChain: 'Limited',
			insurance: false,
			ux: 'Complex'
		},
		{
			name: 'Trust Wallet',
			users: '25M+',
			multiSig: false,
			aiRisk: false,
			crossChain: 'Limited',
			insurance: false,
			ux: 'Good'
		},
		{
			name: 'Ledger',
			users: '5M+',
			multiSig: 'Limited',
			aiRisk: false,
			crossChain: false,
			insurance: 'Hardware only',
			ux: 'Technical'
		},
		{
			name: '3Wallet',
			users: 'MVP',
			multiSig: '3-tier',
			aiRisk: true,
			crossChain: 'Built-in',
			insurance: 'Up to $1M',
			ux: 'Intuitive',
			highlight: true
		}
	];
	
	const revenueStreams = [
		{
			stream: 'Tier 2 Subscriptions',
			calculation: '$9.99/mo × 1M users',
			arr: '$120M'
		},
		{
			stream: 'Tier 3 Subscriptions',
			calculation: '$99/mo × 100K users',
			arr: '$119M'
		},
		{
			stream: 'Transaction Fees',
			calculation: '0.1% on swaps',
			arr: '$50M'
		},
		{
			stream: 'Total ARR',
			calculation: 'Combined revenue',
			arr: '$289M',
			highlight: true
		}
	];
	
	const roadmapPhases = [
		{
			phase: 'Q1 2025',
			title: 'Foundation',
			goals: ['Multi-sig wallets', 'Ethereum & BSC support', '1,000+ users', '$10K MRR'],
			status: 'In Progress'
		},
		{
			phase: 'Q2 2025',
			title: 'Multi-Chain & AI',
			goals: ['10+ chains', 'AI risk analysis', '10,000+ users', '$100K MRR'],
			status: 'Planned'
		},
		{
			phase: 'Q3 2025',
			title: 'Enterprise',
			goals: ['Team management', 'Compliance tools', '50,000+ users', '$500K MRR'],
			status: 'Planned'
		},
		{
			phase: 'Q4 2025',
			title: 'Global Expansion',
			goals: ['25+ chains', '50+ countries', '500,000+ users', '$2M MRR'],
			status: 'Planned'
		}
	];
</script>

<svelte:head>
	<title>3Wallet Pitch Deck - Investment Opportunity</title>
	<meta name="description" content="3Wallet pitch deck with market analysis, competitive advantages, and investment opportunity." />
</svelte:head>

<div class="min-h-screen bg-slate-900 py-12 px-4">
	<div class="max-w-6xl mx-auto space-y-16">
		<!-- Title Slide -->
		<section class="text-center py-20">
			<h1 class="text-6xl font-bold text-gradient mb-6">3Wallet</h1>
			<p class="text-3xl text-slate-200 mb-4">The Future of Secure Multi-Chain Crypto Management</p>
			<p class="text-xl text-slate-400 mb-8">Investor Pitch Deck • 2024</p>
			<div class="flex gap-4 justify-center">
				<Button size="lg">Download PDF</Button>
				<Button size="lg" variant="outline">Schedule Meeting</Button>
			</div>
		</section>

		<!-- Problem Statement -->
		<section>
			<h2 class="text-4xl font-bold mb-8 text-gradient">The Problem</h2>
			<Card glass padding="lg" class="mb-8">
				<h3 class="text-2xl font-bold mb-6 text-slate-100">$3.8 Billion Lost in 2024</h3>
				<div class="grid md:grid-cols-2 gap-6">
					{#each problemStats as { stat, label, source }}
						<div class="bg-slate-800 rounded-lg p-6">
							<div class="text-4xl font-bold text-red-400 mb-2">{stat}</div>
							<div class="text-slate-300 mb-2">{label}</div>
							<div class="text-xs text-slate-500">Source: {source}</div>
						</div>
					{/each}
				</div>
			</Card>
			
			<div class="grid md:grid-cols-3 gap-6">
				<Card glass padding="lg">
					<div class="text-3xl mb-3">🔓</div>
					<h4 class="font-bold text-slate-100 mb-2">Single Point of Failure</h4>
					<p class="text-slate-300 text-sm">Most wallets rely on one private key - if compromised, all funds are lost.</p>
				</Card>
				<Card glass padding="lg">
					<div class="text-3xl mb-3">🌐</div>
					<h4 class="font-bold text-slate-100 mb-2">Chain Fragmentation</h4>
					<p class="text-slate-300 text-sm">Managing assets across multiple blockchains is chaotic and error-prone.</p>
				</Card>
				<Card glass padding="lg">
					<div class="text-3xl mb-3">🎯</div>
					<h4 class="font-bold text-slate-100 mb-2">Phishing Attacks</h4>
					<p class="text-slate-300 text-sm">Users can't distinguish legitimate from malicious dApps and contracts.</p>
				</Card>
			</div>
		</section>

		<!-- Market Opportunity -->
		<section>
			<h2 class="text-4xl font-bold mb-8 text-gradient">Market Opportunity</h2>
			<div class="grid md:grid-cols-4 gap-6 mb-8">
				{#each Object.values(marketData) as { value, label }}
					<Card glass padding="lg" class="text-center">
						<div class="text-4xl font-bold text-emerald-400 mb-2">{value}</div>
						<div class="text-slate-300 text-sm">{label}</div>
					</Card>
				{/each}
			</div>
			
			<Card glass padding="lg">
				<h3 class="text-2xl font-bold mb-6 text-slate-100">Target Market Segments</h3>
				<div class="space-y-4">
					<div class="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
						<div>
							<div class="font-bold text-slate-100">Crypto Beginners</div>
							<div class="text-sm text-slate-400">Need simple, secure onboarding</div>
						</div>
						<div class="text-2xl font-bold text-emerald-400">40M users</div>
					</div>
					<div class="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
						<div>
							<div class="font-bold text-slate-100">DeFi Enthusiasts</div>
							<div class="text-sm text-slate-400">Want advanced features with security</div>
						</div>
						<div class="text-2xl font-bold text-emerald-400">15M users</div>
					</div>
					<div class="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
						<div>
							<div class="font-bold text-slate-100">Institutional Investors</div>
							<div class="text-sm text-slate-400">Require enterprise-grade solutions</div>
						</div>
						<div class="text-2xl font-bold text-emerald-400">50K entities</div>
					</div>
					<div class="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
						<div>
							<div class="font-bold text-slate-100">Cross-Chain Traders</div>
							<div class="text-sm text-slate-400">Need seamless multi-chain experience</div>
						</div>
						<div class="text-2xl font-bold text-emerald-400">5M users</div>
					</div>
				</div>
				<div class="mt-6 text-sm text-slate-400">
					Sources: Statista 2024, Chainalysis 2024, CoinGecko Research 2024
				</div>
			</Card>
		</section>

		<!-- Solution -->
		<section>
			<h2 class="text-4xl font-bold mb-8 text-gradient">Our Solution</h2>
			<Card glass padding="lg" class="mb-8">
				<h3 class="text-2xl font-bold mb-6 text-slate-100">3-Tier Security Architecture</h3>
				<div class="grid md:grid-cols-3 gap-6">
					<div class="bg-slate-800 rounded-lg p-6">
						<div class="text-3xl mb-3">🔒</div>
						<h4 class="font-bold text-slate-100 mb-2">Tier 1: Personal</h4>
						<div class="text-emerald-400 font-bold mb-3">FREE</div>
						<ul class="text-sm text-slate-300 space-y-2">
							<li>• Single-signature</li>
							<li>• 5 chains</li>
							<li>• Basic encryption</li>
							<li>• Mobile access</li>
						</ul>
					</div>
					<div class="bg-emerald-900 bg-opacity-20 border-2 border-emerald-500 rounded-lg p-6">
						<div class="text-3xl mb-3">🔐</div>
						<h4 class="font-bold text-slate-100 mb-2">Tier 2: Professional</h4>
						<div class="text-emerald-400 font-bold mb-3">$9.99/mo</div>
						<ul class="text-sm text-slate-300 space-y-2">
							<li>• Multi-sig (2-of-3)</li>
							<li>• 15 chains</li>
							<li>• AI risk analysis</li>
							<li>• Hardware wallet</li>
						</ul>
					</div>
					<div class="bg-slate-800 rounded-lg p-6">
						<div class="text-3xl mb-3">🏦</div>
						<h4 class="font-bold text-slate-100 mb-2">Tier 3: Enterprise</h4>
						<div class="text-emerald-400 font-bold mb-3">$99/mo</div>
						<ul class="text-sm text-slate-300 space-y-2">
							<li>• Multi-sig (3-of-5)</li>
							<li>• All chains</li>
							<li>• 24/7 monitoring</li>
							<li>• $1M insurance</li>
						</ul>
					</div>
				</div>
			</Card>
		</section>

		<!-- Competitive Analysis -->
		<section>
			<h2 class="text-4xl font-bold mb-8 text-gradient">Competitive Analysis</h2>
			<Card glass padding="lg">
				<div class="overflow-x-auto">
					<table class="w-full text-left">
						<thead>
							<tr class="border-b border-slate-700">
								<th class="p-3 text-slate-300">Feature</th>
								{#each competitors as comp}
									<th class="p-3 text-slate-300 {comp.highlight ? 'bg-emerald-900 bg-opacity-20' : ''}">{comp.name}</th>
								{/each}
							</tr>
						</thead>
						<tbody class="text-slate-300">
							<tr class="border-b border-slate-800">
								<td class="p-3 font-semibold">Users</td>
								{#each competitors as comp}
									<td class="p-3 {comp.highlight ? 'bg-emerald-900 bg-opacity-20' : ''}">{comp.users}</td>
								{/each}
							</tr>
							<tr class="border-b border-slate-800">
								<td class="p-3 font-semibold">Multi-Sig</td>
								{#each competitors as comp}
									<td class="p-3 {comp.highlight ? 'bg-emerald-900 bg-opacity-20' : ''}">
										{typeof comp.multiSig === 'boolean' ? (comp.multiSig ? '✅' : '❌') : comp.multiSig}
									</td>
								{/each}
							</tr>
							<tr class="border-b border-slate-800">
								<td class="p-3 font-semibold">AI Risk Analysis</td>
								{#each competitors as comp}
									<td class="p-3 {comp.highlight ? 'bg-emerald-900 bg-opacity-20' : ''}">{comp.aiRisk ? '✅' : '❌'}</td>
								{/each}
							</tr>
							<tr class="border-b border-slate-800">
								<td class="p-3 font-semibold">Cross-Chain</td>
								{#each competitors as comp}
									<td class="p-3 {comp.highlight ? 'bg-emerald-900 bg-opacity-20' : ''}">
										{typeof comp.crossChain === 'boolean' ? (comp.crossChain ? '✅' : '❌') : comp.crossChain}
									</td>
								{/each}
							</tr>
							<tr class="border-b border-slate-800">
								<td class="p-3 font-semibold">Insurance</td>
								{#each competitors as comp}
									<td class="p-3 {comp.highlight ? 'bg-emerald-900 bg-opacity-20' : ''}">
										{typeof comp.insurance === 'boolean' ? (comp.insurance ? '✅' : '❌') : comp.insurance}
									</td>
								{/each}
							</tr>
							<tr>
								<td class="p-3 font-semibold">UX</td>
								{#each competitors as comp}
									<td class="p-3 {comp.highlight ? 'bg-emerald-900 bg-opacity-20' : ''}">{comp.ux}</td>
								{/each}
							</tr>
						</tbody>
					</table>
				</div>
			</Card>
		</section>

		<!-- Business Model -->
		<section>
			<h2 class="text-4xl font-bold mb-8 text-gradient">Business Model & Revenue</h2>
			<Card glass padding="lg">
				<h3 class="text-2xl font-bold mb-6 text-slate-100">Revenue Streams</h3>
				<div class="space-y-3">
					{#each revenueStreams as { stream, calculation, arr, highlight }}
						<div class="flex items-center justify-between p-4 rounded-lg {highlight ? 'bg-emerald-900 bg-opacity-30 border-2 border-emerald-500' : 'bg-slate-800'}">
							<div>
								<div class="font-bold text-slate-100 {highlight ? 'text-xl' : ''}">{stream}</div>
								<div class="text-sm text-slate-400">{calculation}</div>
							</div>
							<div class="text-2xl font-bold {highlight ? 'text-emerald-400' : 'text-slate-300'}">{arr}</div>
						</div>
					{/each}
				</div>
			</Card>
		</section>

		<!-- Roadmap -->
		<section>
			<h2 class="text-4xl font-bold mb-8 text-gradient">Roadmap</h2>
			<div class="grid md:grid-cols-2 gap-6">
				{#each roadmapPhases as { phase, title, goals, status }}
					<Card glass padding="lg">
						<div class="flex items-center justify-between mb-4">
							<div>
								<div class="text-emerald-400 font-bold">{phase}</div>
								<h4 class="text-xl font-bold text-slate-100">{title}</h4>
							</div>
							<span class="text-xs px-3 py-1 rounded-full {status === 'In Progress' ? 'bg-emerald-900 text-emerald-300' : 'bg-slate-700 text-slate-300'}">
								{status}
							</span>
						</div>
						<ul class="space-y-2 text-slate-300">
							{#each goals as goal}
								<li class="flex items-start gap-2">
									<span class="text-emerald-500 mt-1">✓</span>
									<span>{goal}</span>
								</li>
							{/each}
						</ul>
					</Card>
				{/each}
			</div>
		</section>

		<!-- Call to Action -->
		<section class="text-center py-12">
			<Card glass padding="lg">
				<h2 class="text-3xl font-bold mb-4 text-gradient">Join Us in Building the Future</h2>
				<p class="text-xl text-slate-300 mb-8">
					We're raising a seed round to accelerate development and market expansion.
				</p>
				<div class="flex gap-4 justify-center">
					<Button size="lg">Schedule a Meeting</Button>
					<Button size="lg" variant="outline">Download Full Deck</Button>
				</div>
			</Card>
		</section>
	</div>
</div>

