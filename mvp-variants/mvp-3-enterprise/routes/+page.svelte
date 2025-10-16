<script lang="ts">
	/**
	 * MVP-3: Enterprise - Home Page
	 * Corporate crypto treasury management
	 */
	
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	
	let email = $state('');
	let company = $state('');
	let isSubmitting = $state(false);
	let submitMessage = $state('');
	
	const stats = [
		{ value: '2,300+', label: 'Corporations Using Crypto', source: 'Fidelity 2024' },
		{ value: '$85B+', label: 'Corporate Holdings', source: 'Bitcoin Treasuries' },
		{ value: '$21.3B', label: 'DAO Treasury Value', source: 'DeepDAO' },
		{ value: '99.99%', label: 'Uptime SLA', source: '3Wallet Enterprise' }
	];
	
	const features = [
		{
			icon: '🔐',
			title: 'Advanced Multi-Signature',
			description: 'Customizable approval workflows with 3-of-5, 5-of-9, or custom thresholds.',
			benefit: 'Enterprise-grade security'
		},
		{
			icon: '👥',
			title: 'Team Management',
			description: 'Role-based access control with granular permissions and spending limits.',
			benefit: 'Complete control'
		},
		{
			icon: '📋',
			title: 'Compliance Suite',
			description: 'Automated audit trails, tax reporting, and KYC/AML integration.',
			benefit: 'Regulatory ready'
		},
		{
			icon: '🔌',
			title: 'API & Integrations',
			description: 'Full REST API, webhooks, and integrations with QuickBooks, Xero, Slack.',
			benefit: 'Seamless workflow'
		},
		{
			icon: '🛡️',
			title: 'Insurance & Custody',
			description: 'Up to $100M coverage with optional custodial services and cold storage.',
			benefit: 'Peace of mind'
		},
		{
			icon: '🎨',
			title: 'White-Label',
			description: 'Custom branding, dedicated infrastructure, and 24/7 enterprise support.',
			benefit: 'Your brand'
		}
	];
	
	const customers = [
		{ name: 'TechCorp', logo: 'TC', industry: 'Technology', holdings: '$45M' },
		{ name: 'FinanceDAO', logo: 'FD', industry: 'DeFi', holdings: '$28M' },
		{ name: 'GlobalFund', logo: 'GF', industry: 'Investment', holdings: '$120M' }
	];
	
	const pricing = [
		{
			name: 'Startup',
			price: '$99/mo',
			icon: '🚀',
			features: [
				'Up to 5 team members',
				'3-of-5 multi-sig',
				'Basic compliance',
				'Email support',
				'API access'
			]
		},
		{
			name: 'Growth',
			price: '$499/mo',
			icon: '📈',
			features: [
				'Up to 20 team members',
				'Custom multi-sig',
				'Full compliance suite',
				'Priority support',
				'Advanced API',
				'QuickBooks integration'
			],
			popular: true
		},
		{
			name: 'Enterprise',
			price: 'Custom',
			icon: '🏢',
			features: [
				'Unlimited team members',
				'Custom workflows',
				'White-label option',
				'24/7 phone support',
				'Dedicated account manager',
				'Custom integrations',
				'SLA guarantee'
			]
		}
	];
	
	async function handleDemoRequest(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		submitMessage = '';
		
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			submitMessage = '✅ Thank you! Our enterprise team will contact you within 24 hours.';
			email = '';
			company = '';
		} catch (error) {
			submitMessage = '❌ Something went wrong. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>3Wallet Enterprise - Corporate Crypto Treasury Management</title>
	<meta name="description" content="Secure, compliant, and scalable crypto treasury management for corporations, DAOs, and institutions." />
</svelte:head>

<div class="min-h-screen bg-slate-50">
	<!-- Hero Section -->
	<section class="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 px-4">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-12">
				<div class="inline-block px-4 py-2 bg-amber-600/20 border border-amber-600/30 rounded-full mb-6">
					<span class="text-amber-400 text-sm font-semibold">🏆 Trusted by Fortune 500 Companies</span>
				</div>
				
				<h1 class="text-5xl md:text-7xl font-bold mb-6">
					<span class="bg-gradient-to-r from-blue-400 via-amber-400 to-blue-400 bg-clip-text text-transparent">
						Secure Your<br />Corporate Treasury
					</span>
				</h1>
				
				<p class="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
					Enterprise-grade crypto treasury management with advanced multi-signature, compliance tools, and 24/7 support.
				</p>
				
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<Button size="lg" class="bg-blue-600 hover:bg-blue-700">
						Schedule Demo
					</Button>
					<Button size="lg" variant="outline" class="border-white text-white hover:bg-white/10">
						View Case Studies
					</Button>
				</div>
			</div>
			
			<!-- Stats -->
			<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
				{#each stats as stat}
					<div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
						<div class="text-3xl font-bold text-amber-400 mb-2">{stat.value}</div>
						<div class="text-slate-300 text-sm mb-1">{stat.label}</div>
						<div class="text-slate-500 text-xs">{stat.source}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Features -->
	<section class="py-20 px-4 bg-white">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl font-bold mb-4 text-slate-900">
					Enterprise-Grade Features
				</h2>
				<p class="text-xl text-slate-600">
					Everything your organization needs to manage crypto securely
				</p>
			</div>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each features as feature}
					<Card padding="lg" class="border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all">
						<div class="text-5xl mb-4">{feature.icon}</div>
						<h3 class="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
						<p class="text-slate-600 mb-4">{feature.description}</p>
						<div class="inline-block px-3 py-1 bg-blue-100 border border-blue-200 rounded-full">
							<span class="text-blue-700 text-sm font-semibold">{feature.benefit}</span>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Customers -->
	<section class="py-20 px-4 bg-slate-100">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl font-bold mb-4 text-slate-900">
					Trusted by Leading Organizations
				</h2>
				<p class="text-xl text-slate-600">
					Join corporations and DAOs managing billions in crypto
				</p>
			</div>
			
			<div class="grid md:grid-cols-3 gap-8">
				{#each customers as customer}
					<Card padding="lg" class="border border-slate-200 text-center">
						<div class="w-20 h-20 bg-gradient-to-br from-blue-600 to-amber-600 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4">
							{customer.logo}
						</div>
						<h3 class="text-xl font-bold text-slate-900 mb-2">{customer.name}</h3>
						<p class="text-slate-600 mb-2">{customer.industry}</p>
						<p class="text-2xl font-bold text-blue-600">{customer.holdings}</p>
						<p class="text-sm text-slate-500">in crypto assets</p>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Pricing -->
	<section class="py-20 px-4 bg-white">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl font-bold mb-4 text-slate-900">
					Transparent Pricing
				</h2>
				<p class="text-xl text-slate-600">
					Choose the plan that fits your organization
				</p>
			</div>
			
			<div class="grid md:grid-cols-3 gap-8">
				{#each pricing as tier}
					<Card padding="lg" class="border {tier.popular ? 'border-blue-500 shadow-xl' : 'border-slate-200'}">
						{#if tier.popular}
							<div class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
								MOST POPULAR
							</div>
						{/if}
						
						<div class="text-5xl mb-4">{tier.icon}</div>
						<h3 class="text-2xl font-bold mb-2 text-slate-900">{tier.name}</h3>
						<div class="text-4xl font-bold text-blue-600 mb-6">{tier.price}</div>
						
						<ul class="space-y-3 mb-8">
							{#each tier.features as feature}
								<li class="flex items-start gap-2 text-slate-700">
									<span class="text-emerald-600 mt-1">✓</span>
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
						
						<Button fullWidth variant={tier.popular ? 'primary' : 'outline'} class={tier.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}>
							{tier.name === 'Enterprise' ? 'Contact Sales' : 'Start Trial'}
						</Button>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="py-20 px-4 bg-gradient-to-r from-blue-900 to-slate-900 text-white">
		<div class="max-w-3xl mx-auto text-center">
			<h2 class="text-4xl font-bold mb-4">Ready to Secure Your Treasury?</h2>
			<p class="text-xl text-slate-300 mb-8">
				Schedule a demo with our enterprise team
			</p>
			
			<form onsubmit={handleDemoRequest} class="space-y-4 max-w-xl mx-auto">
				<Input
					placeholder="Company name"
					bind:value={company}
					required
					class="bg-white/10 border-white/20 text-white placeholder-slate-400"
				/>
				<Input
					type="email"
					placeholder="Work email"
					bind:value={email}
					required
					class="bg-white/10 border-white/20 text-white placeholder-slate-400"
				/>
				<Button type="submit" fullWidth size="lg" loading={isSubmitting} class="bg-amber-600 hover:bg-amber-700">
					{isSubmitting ? 'Submitting...' : 'Schedule Demo'}
				</Button>
			</form>
			
			{#if submitMessage}
				<p class="mt-4 text-lg {submitMessage.includes('✅') ? 'text-emerald-400' : 'text-red-400'}">
					{submitMessage}
				</p>
			{/if}
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-slate-900 text-white py-12 px-4">
		<div class="max-w-7xl mx-auto">
			<div class="grid md:grid-cols-4 gap-8 mb-8">
				<div>
					<h3 class="text-xl font-bold mb-4 text-amber-400">3Wallet Enterprise</h3>
					<p class="text-slate-400 text-sm">
						Secure crypto treasury management for organizations.
					</p>
				</div>
				
				<div>
					<h4 class="font-semibold mb-3">Product</h4>
					<ul class="space-y-2 text-slate-400 text-sm">
						<li><a href="/wallet" class="hover:text-amber-400">Dashboard</a></li>
						<li><a href="/pitch" class="hover:text-amber-400">Pitch Deck</a></li>
						<li><a href="/contact" class="hover:text-amber-400">Contact</a></li>
					</ul>
				</div>
				
				<div>
					<h4 class="font-semibold mb-3">Resources</h4>
					<ul class="space-y-2 text-slate-400 text-sm">
						<li><a href="/docs" class="hover:text-amber-400">Documentation</a></li>
						<li><a href="/api" class="hover:text-amber-400">API</a></li>
						<li><a href="/security" class="hover:text-amber-400">Security</a></li>
					</ul>
				</div>
				
				<div>
					<h4 class="font-semibold mb-3">Company</h4>
					<ul class="space-y-2 text-slate-400 text-sm">
						<li><a href="/about" class="hover:text-amber-400">About</a></li>
						<li><a href="/careers" class="hover:text-amber-400">Careers</a></li>
						<li><a href="/compliance" class="hover:text-amber-400">Compliance</a></li>
					</ul>
				</div>
			</div>
			
			<div class="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
				<p>© 2025 3Wallet Enterprise. SOC 2 Type II Certified. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>

