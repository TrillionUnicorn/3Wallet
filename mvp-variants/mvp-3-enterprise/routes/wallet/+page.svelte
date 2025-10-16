<script lang="ts">
	/**
	 * MVP-3: Enterprise - Dashboard
	 * Team management and treasury overview
	 */
	
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	
	const treasuryValue = 45230000;
	const pendingApprovals = 3;
	const teamMembers = 12;
	const monthlyVolume = 8500000;
	
	const assets = [
		{ symbol: 'BTC', name: 'Bitcoin', balance: 125.5, value: 5234000, allocation: 11.6 },
		{ symbol: 'ETH', name: 'Ethereum', balance: 8450, value: 19120000, allocation: 42.3 },
		{ symbol: 'USDC', name: 'USD Coin', balance: 15000000, value: 15000000, allocation: 33.2 },
		{ symbol: 'SOL', name: 'Solana', balance: 45000, value: 4876000, allocation: 10.8 },
		{ symbol: 'MATIC', name: 'Polygon', balance: 950000, value: 1000000, allocation: 2.2 }
	];
	
	const pendingTxs = [
		{ id: 1, type: 'Transfer', amount: '$500,000 USDC', to: 'Vendor Payment', approvals: '2/3', status: 'pending' },
		{ id: 2, type: 'Swap', amount: '50 ETH → USDC', to: 'Treasury Rebalance', approvals: '1/3', status: 'pending' },
		{ id: 3, type: 'Transfer', amount: '5 BTC', to: 'Cold Storage', approvals: '3/5', status: 'pending' }
	];
	
	const teamActivity = [
		{ user: 'Sarah Chen', role: 'CFO', action: 'Approved transfer', time: '5 min ago' },
		{ user: 'Mike Johnson', role: 'Treasurer', action: 'Initiated swap', time: '1 hour ago' },
		{ user: 'Alex Kim', role: 'Controller', action: 'Updated spending limit', time: '3 hours ago' },
		{ user: 'Lisa Wang', role: 'Analyst', action: 'Generated report', time: '1 day ago' }
	];
	
	function formatCurrency(value: number): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(value);
	}
</script>

<svelte:head>
	<title>Treasury Dashboard - 3Wallet Enterprise</title>
</svelte:head>

<div class="min-h-screen bg-slate-50 py-8 px-4">
	<div class="max-w-[1920px] mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-4xl font-bold text-slate-900 mb-2">Treasury Dashboard</h1>
			<p class="text-slate-600">Enterprise crypto asset management</p>
		</div>
		
		<!-- Overview Cards -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<Card padding="lg" class="border border-slate-200">
				<div class="text-sm text-slate-600 mb-2">Total Treasury Value</div>
				<div class="text-3xl font-bold text-slate-900 mb-1">{formatCurrency(treasuryValue)}</div>
				<div class="text-sm text-emerald-600">+5.2% this month</div>
			</Card>
			
			<Card padding="lg" class="border border-slate-200">
				<div class="text-sm text-slate-600 mb-2">Pending Approvals</div>
				<div class="text-3xl font-bold text-amber-600 mb-1">{pendingApprovals}</div>
				<div class="text-sm text-slate-600">Require your signature</div>
			</Card>
			
			<Card padding="lg" class="border border-slate-200">
				<div class="text-sm text-slate-600 mb-2">Team Members</div>
				<div class="text-3xl font-bold text-blue-600 mb-1">{teamMembers}</div>
				<div class="text-sm text-slate-600">Active users</div>
			</Card>
			
			<Card padding="lg" class="border border-slate-200">
				<div class="text-sm text-slate-600 mb-2">Monthly Volume</div>
				<div class="text-3xl font-bold text-slate-900 mb-1">{formatCurrency(monthlyVolume)}</div>
				<div class="text-sm text-slate-600">Transactions processed</div>
			</Card>
		</div>
		
		<div class="grid lg:grid-cols-3 gap-8">
			<!-- Left Column: Assets & Pending -->
			<div class="lg:col-span-2 space-y-6">
				<!-- Treasury Assets -->
				<Card padding="lg" class="border border-slate-200">
					<div class="flex items-center justify-between mb-6">
						<h2 class="text-2xl font-bold text-slate-900">Treasury Assets</h2>
						<Button size="sm" class="bg-blue-600 hover:bg-blue-700">Add Asset</Button>
					</div>
					
					<div class="overflow-x-auto">
						<table class="w-full">
							<thead>
								<tr class="border-b border-slate-200 text-left">
									<th class="pb-3 text-sm text-slate-600">Asset</th>
									<th class="pb-3 text-sm text-slate-600">Balance</th>
									<th class="pb-3 text-sm text-slate-600">Value</th>
									<th class="pb-3 text-sm text-slate-600">Allocation</th>
								</tr>
							</thead>
							<tbody>
								{#each assets as asset}
									<tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
										<td class="py-4">
											<div class="font-semibold text-slate-900">{asset.symbol}</div>
											<div class="text-sm text-slate-600">{asset.name}</div>
										</td>
										<td class="py-4 text-slate-900">{asset.balance.toLocaleString()}</td>
										<td class="py-4 text-slate-900">{formatCurrency(asset.value)}</td>
										<td class="py-4">
											<div class="flex items-center gap-2">
												<div class="flex-1 bg-slate-200 rounded-full h-2 max-w-[100px]">
													<div class="bg-blue-600 h-2 rounded-full" style="width: {asset.allocation}%"></div>
												</div>
												<span class="text-sm text-slate-600">{asset.allocation}%</span>
											</div>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</Card>
				
				<!-- Pending Approvals -->
				<Card padding="lg" class="border border-amber-200 bg-amber-50">
					<h2 class="text-2xl font-bold text-slate-900 mb-6">Pending Approvals</h2>
					
					<div class="space-y-4">
						{#each pendingTxs as tx}
							<div class="bg-white rounded-lg p-4 border border-amber-200">
								<div class="flex items-start justify-between mb-3">
									<div>
										<div class="font-semibold text-slate-900">{tx.type}</div>
										<div class="text-sm text-slate-600">{tx.amount}</div>
										<div class="text-xs text-slate-500">{tx.to}</div>
									</div>
									<span class="px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-xs text-amber-700 font-semibold">
										{tx.approvals}
									</span>
								</div>
								<div class="flex gap-2">
									<Button size="sm" class="bg-emerald-600 hover:bg-emerald-700">Approve</Button>
									<Button size="sm" variant="outline" class="border-red-500 text-red-600 hover:bg-red-50">Reject</Button>
								</div>
							</div>
						{/each}
					</div>
				</Card>
			</div>
			
			<!-- Right Column: Team Activity -->
			<div class="space-y-6">
				<!-- Team Activity -->
				<Card padding="lg" class="border border-slate-200">
					<h2 class="text-xl font-bold text-slate-900 mb-4">Team Activity</h2>
					
					<div class="space-y-4">
						{#each teamActivity as activity}
							<div class="flex items-start gap-3">
								<div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
									{activity.user.split(' ').map(n => n[0]).join('')}
								</div>
								<div class="flex-1">
									<div class="font-semibold text-slate-900 text-sm">{activity.user}</div>
									<div class="text-xs text-slate-600">{activity.role}</div>
									<div class="text-sm text-slate-700 mt-1">{activity.action}</div>
									<div class="text-xs text-slate-500 mt-1">{activity.time}</div>
								</div>
							</div>
						{/each}
					</div>
					
					<Button fullWidth variant="outline" class="mt-4 border-slate-300">
						View All Activity
					</Button>
				</Card>
				
				<!-- Quick Actions -->
				<Card padding="lg" class="border border-slate-200">
					<h2 class="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
					
					<div class="space-y-3">
						<Button fullWidth class="bg-blue-600 hover:bg-blue-700">New Transfer</Button>
						<Button fullWidth variant="outline" class="border-slate-300">Add Team Member</Button>
						<Button fullWidth variant="outline" class="border-slate-300">Generate Report</Button>
						<Button fullWidth variant="outline" class="border-slate-300">Export Data</Button>
					</div>
				</Card>
				
				<!-- Compliance Status -->
				<Card padding="lg" class="border border-emerald-200 bg-emerald-50">
					<h2 class="text-xl font-bold text-slate-900 mb-4">Compliance Status</h2>
					
					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<span class="text-sm text-slate-700">KYC/AML</span>
							<span class="text-emerald-600 font-semibold">✓ Compliant</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-sm text-slate-700">Audit Trail</span>
							<span class="text-emerald-600 font-semibold">✓ Active</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-sm text-slate-700">Tax Reporting</span>
							<span class="text-emerald-600 font-semibold">✓ Up to Date</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-sm text-slate-700">Insurance</span>
							<span class="text-emerald-600 font-semibold">✓ $100M</span>
						</div>
					</div>
				</Card>
			</div>
		</div>
	</div>
</div>

