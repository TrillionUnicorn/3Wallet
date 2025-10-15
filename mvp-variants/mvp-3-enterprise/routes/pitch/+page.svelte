<script lang="ts">
	/**
	 * MVP-3: Enterprise - Pitch Deck
	 * Corporate crypto treasury management pitch
	 */
	
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	
	const marketData = [
		{ metric: '2,300+', label: 'Corporations Using Crypto', source: 'Fidelity Digital Assets 2024' },
		{ metric: '$85B+', label: 'Corporate Holdings', source: 'Bitcoin Treasuries 2024' },
		{ metric: '$21.3B', label: 'DAO Treasury Value', source: 'DeepDAO 2024' },
		{ metric: '$400B', label: 'Institutional Custody AUM', source: 'Coinbase Institutional' }
	];
	
	const problemStats = [
		{ stat: '73%', label: 'Struggle with Multi-Sig Complexity', impact: 'High' },
		{ stat: '68%', label: 'Lack Proper Compliance Tools', impact: 'High' },
		{ stat: '$2.1B', label: 'Lost to Poor Key Management', impact: 'Critical' },
		{ stat: '5+', label: 'Tools Needed for Treasury Mgmt', impact: 'Medium' }
	];
	
	const competitors = [
		{ name: 'Gnosis Safe', multisig: true, rbac: false, compliance: false, api: true, insurance: false, whitelabel: false },
		{ name: 'Fireblocks', multisig: true, rbac: true, compliance: true, api: true, insurance: true, whitelabel: true },
		{ name: 'Copper', multisig: true, rbac: true, compliance: true, api: true, insurance: true, whitelabel: true },
		{ name: '3Wallet Enterprise', multisig: true, rbac: true, compliance: true, api: true, insurance: true, whitelabel: true, highlight: true }
	];
	
	const pricing = [
		{ competitor: 'Fireblocks', price: '$10,000+/mo', setup: '$50K+' },
		{ competitor: 'Copper', price: '$5,000+/mo', setup: '$25K+' },
		{ competitor: '3Wallet Enterprise', price: '$99-999/mo', setup: '$0', highlight: true }
	];
</script>

<svelte:head>
	<title>Pitch Deck - 3Wallet Enterprise</title>
</svelte:head>

<div class="min-h-screen bg-slate-50 py-12 px-4">
	<div class="max-w-6xl mx-auto space-y-16">
		<!-- Title Slide -->
		<section class="text-center py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-2xl">
			<h1 class="text-7xl font-bold mb-6">
				<span class="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
					3Wallet Enterprise
				</span>
			</h1>
			<p class="text-4xl mb-4">Enterprise-Grade Crypto Treasury Management</p>
			<p class="text-xl text-slate-300 mb-8">Investor Pitch Deck • January 2025</p>
			<div class="flex gap-4 justify-center">
				<Button size="lg" class="bg-amber-600 hover:bg-amber-700">Download PDF</Button>
				<Button size="lg" variant="outline" class="border-white text-white hover:bg-white/10">Schedule Meeting</Button>
			</div>
		</section>

		<!-- Market Opportunity -->
		<section>
			<h2 class="text-5xl font-bold mb-8 text-center text-slate-900">
				Massive Enterprise Crypto Market
			</h2>
			<div class="grid md:grid-cols-4 gap-6">
				{#each marketData as data}
					<Card padding="lg" class="border border-slate-200 text-center">
						<div class="text-5xl font-bold text-blue-600 mb-2">{data.metric}</div>
						<div class="text-slate-900 mb-2">{data.label}</div>
						<div class="text-xs text-slate-500">{data.source}</div>
					</Card>
				{/each}
			</div>
		</section>

		<!-- Problem -->
		<section>
			<h2 class="text-5xl font-bold mb-8 text-center text-slate-900">
				Enterprises Face Critical Challenges
			</h2>
			<div class="grid md:grid-cols-2 gap-6">
				{#each problemStats as problem}
					<Card padding="lg" class="border border-red-200 bg-red-50">
						<div class="text-4xl font-bold text-red-600 mb-2">{problem.stat}</div>
						<div class="text-slate-900 mb-2">{problem.label}</div>
						<span class="px-3 py-1 bg-red-200 border border-red-300 rounded-full text-xs text-red-700 font-semibold">
							{problem.impact} Impact
						</span>
					</Card>
				{/each}
			</div>
		</section>

		<!-- Solution -->
		<section>
			<h2 class="text-5xl font-bold mb-8 text-center text-slate-900">
				All-in-One Enterprise Platform
			</h2>
			<div class="grid md:grid-cols-3 gap-6">
				<Card padding="lg" class="border border-slate-200">
					<div class="text-4xl mb-4">🔐</div>
					<h3 class="text-xl font-bold mb-2 text-slate-900">Advanced Multi-Sig</h3>
					<p class="text-slate-600 text-sm">Custom approval workflows with time-locks and emergency recovery</p>
				</Card>
				<Card padding="lg" class="border border-slate-200">
					<div class="text-4xl mb-4">📋</div>
					<h3 class="text-xl font-bold mb-2 text-slate-900">Full Compliance</h3>
					<p class="text-slate-600 text-sm">Automated audit trails, tax reporting, and KYC/AML integration</p>
				</Card>
				<Card padding="lg" class="border border-slate-200">
					<div class="text-4xl mb-4">🛡️</div>
					<h3 class="text-xl font-bold mb-2 text-slate-900">$100M Insurance</h3>
					<p class="text-slate-600 text-sm">Comprehensive coverage with optional custodial services</p>
				</Card>
			</div>
		</section>

		<!-- Competitive Analysis -->
		<section>
			<h2 class="text-5xl font-bold mb-8 text-center text-slate-900">
				Competitive Advantage
			</h2>
			<Card padding="lg" class="border border-slate-200">
				<div class="overflow-x-auto">
					<table class="w-full text-left">
						<thead>
							<tr class="border-b border-slate-200">
								<th class="p-3 text-slate-900">Platform</th>
								<th class="p-3 text-slate-900">Multi-Sig</th>
								<th class="p-3 text-slate-900">RBAC</th>
								<th class="p-3 text-slate-900">Compliance</th>
								<th class="p-3 text-slate-900">API</th>
								<th class="p-3 text-slate-900">Insurance</th>
								<th class="p-3 text-slate-900">White-Label</th>
							</tr>
						</thead>
						<tbody>
							{#each competitors as comp}
								<tr class="border-b border-slate-100 {comp.highlight ? 'bg-blue-50' : ''}">
									<td class="p-3 font-semibold {comp.highlight ? 'text-blue-600' : 'text-slate-900'}">
										{comp.name}
									</td>
									<td class="p-3">{comp.multisig ? '✅' : '❌'}</td>
									<td class="p-3">{comp.rbac ? '✅' : '❌'}</td>
									<td class="p-3">{comp.compliance ? '✅' : '❌'}</td>
									<td class="p-3">{comp.api ? '✅' : '❌'}</td>
									<td class="p-3">{comp.insurance ? '✅' : '❌'}</td>
									<td class="p-3">{comp.whitelabel ? '✅' : '❌'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</Card>
		</section>

		<!-- Pricing Advantage -->
		<section>
			<h2 class="text-5xl font-bold mb-8 text-center text-slate-900">
				10x More Affordable
			</h2>
			<Card padding="lg" class="border border-slate-200">
				<div class="space-y-4">
					{#each pricing as tier}
						<div class="flex justify-between items-center p-4 {tier.highlight ? 'bg-blue-50 border-2 border-blue-500' : 'bg-slate-50'} rounded-lg">
							<div>
								<div class="font-bold text-slate-900 text-xl">{tier.competitor}</div>
								<div class="text-sm text-slate-600">Monthly + Setup Fee</div>
							</div>
							<div class="text-right">
								<div class="text-2xl font-bold {tier.highlight ? 'text-blue-600' : 'text-slate-900'}">
									{tier.price}
								</div>
								<div class="text-sm text-slate-600">Setup: {tier.setup}</div>
							</div>
						</div>
					{/each}
				</div>
			</Card>
		</section>

		<!-- Business Model -->
		<section>
			<h2 class="text-5xl font-bold mb-8 text-center text-slate-900">
				Revenue Model
			</h2>
			<Card padding="lg" class="border border-slate-200">
				<div class="space-y-4">
					<div class="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
						<div>
							<div class="font-bold text-slate-900">Startup Tier</div>
							<div class="text-sm text-slate-600">$99/mo × 200 customers</div>
						</div>
						<div class="text-2xl font-bold text-emerald-600">$238K ARR</div>
					</div>
					<div class="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
						<div>
							<div class="font-bold text-slate-900">Growth Tier</div>
							<div class="text-sm text-slate-600">$499/mo × 200 customers</div>
						</div>
						<div class="text-2xl font-bold text-emerald-600">$1.2M ARR</div>
					</div>
					<div class="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
						<div>
							<div class="font-bold text-slate-900">Enterprise Tier</div>
							<div class="text-sm text-slate-600">$2,500/mo avg × 100 customers</div>
						</div>
						<div class="text-2xl font-bold text-emerald-600">$3M ARR</div>
					</div>
					<div class="flex justify-between items-center p-4 bg-blue-50 border-2 border-blue-500 rounded-lg">
						<div>
							<div class="font-bold text-slate-900 text-xl">Total ARR (Year 3)</div>
							<div class="text-sm text-slate-600">500 total customers</div>
						</div>
						<div class="text-4xl font-bold text-blue-600">$4.4M</div>
					</div>
				</div>
			</Card>
		</section>

		<!-- The Ask -->
		<section class="text-center">
			<Card padding="lg" class="border-2 border-blue-500 bg-blue-50">
				<h2 class="text-4xl font-bold mb-4 text-slate-900">
					Raising $5M Series A
				</h2>
				<p class="text-xl text-slate-700 mb-8">
					To scale enterprise sales and expand platform capabilities
				</p>
				<div class="grid md:grid-cols-3 gap-6 mb-8">
					<div>
						<div class="text-3xl font-bold text-blue-600 mb-2">40%</div>
						<div class="text-slate-700">Sales & Marketing</div>
					</div>
					<div>
						<div class="text-3xl font-bold text-blue-600 mb-2">35%</div>
						<div class="text-slate-700">Product Development</div>
					</div>
					<div>
						<div class="text-3xl font-bold text-blue-600 mb-2">25%</div>
						<div class="text-slate-700">Operations & Team</div>
					</div>
				</div>
				<div class="flex gap-4 justify-center">
					<Button size="lg" class="bg-blue-600 hover:bg-blue-700">Schedule Meeting</Button>
					<Button size="lg" variant="outline" class="border-blue-600 text-blue-600 hover:bg-blue-50">Download Deck</Button>
				</div>
			</Card>
		</section>
	</div>
</div>

