<script lang="ts">
	/**
	 * MVP-2: DeFi Power User - Home Page
	 * Professional DeFi trading platform
	 */
	
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	
	// Trial signup state
	let email = $state('');
	let isSubmitting = $state(false);
	let submitMessage = $state('');
	
	const stats = [
		{ value: '$47.2B', label: 'Total Value Locked', change: '+12.3%' },
		{ value: '$3.8B', label: 'Daily Volume', change: '+8.7%' },
		{ value: '6.2M', label: 'Active Users', change: '+15.2%' },
		{ value: '15%', label: 'Avg Gas Savings', change: 'vs Direct DEX' }
	];
	
	const features = [
		{
			icon: '🔄',
			title: 'DEX Aggregator',
			description: 'Compare prices across 15+ DEXs and get the best execution every time.',
			benefit: 'Save 2-5% on every trade'
		},
		{
			icon: '⚡',
			title: 'Gas Optimization',
			description: 'Advanced gas prediction and batching to minimize transaction costs.',
			benefit: 'Reduce gas fees by 40%'
		},
		{
			icon: '🛡️',
			title: 'MEV Protection',
			description: 'Flashbots integration prevents sandwich attacks and front-running.',
			benefit: 'Protect $500K+ annually'
		},
		{
			icon: '📊',
			title: 'Advanced Analytics',
			description: 'Track portfolio performance, PnL, and impermanent loss in real-time.',
			benefit: 'Make data-driven decisions'
		},
		{
			icon: '🤖',
			title: 'Auto-Compound',
			description: 'Automatically compound yields across multiple protocols.',
			benefit: 'Boost APY by 3-8%'
		},
		{
			icon: '📈',
			title: 'Limit Orders',
			description: 'Set buy/sell limits, stop-loss, and take-profit orders.',
			benefit: 'Trade like a pro'
		},
		{
			icon: '💰',
			title: 'Tax Reporting',
			description: 'Automatic transaction categorization and cost basis tracking.',
			benefit: 'Save hours at tax time'
		}
	];
	
	const testimonials = [
		{
			name: 'Alex Chen',
			role: 'DeFi Trader',
			portfolio: '$2.3M',
			quote: 'Saved over $15K in gas fees in the first month. The DEX aggregator alone pays for itself.',
			avatar: 'AC'
		},
		{
			name: 'Sarah Martinez',
			role: 'Yield Farmer',
			portfolio: '$890K',
			quote: 'Auto-compounding increased my APY from 12% to 18%. Game changer for passive income.',
			avatar: 'SM'
		},
		{
			name: 'David Kim',
			role: 'Liquidity Provider',
			portfolio: '$1.5M',
			quote: 'The impermanent loss calculator helped me optimize my LP positions. Made back the subscription fee in one trade.',
			avatar: 'DK'
		}
	];
	
	async function handleTrialSignup(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		submitMessage = '';
		
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			submitMessage = '✅ Success! Check your email to start your 14-day free trial.';
			email = '';
		} catch (error) {
			submitMessage = '❌ Something went wrong. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>3Wallet DeFi - Professional DeFi Trading Platform</title>
	<meta name="description" content="Trade smarter with DEX aggregation, MEV protection, and advanced analytics. Save 15% on gas fees." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
	<!-- Hero Section -->
	<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
		<!-- Animated Background -->
		<div class="absolute inset-0 opacity-20">
			<div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920')] bg-cover bg-center bg-fixed"></div>
		</div>
		
		<!-- Grid Overlay -->
		<div class="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
		
		<div class="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
			<div class="animate-fade-in">
				<div class="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-6">
					<span class="text-purple-300 text-sm font-semibold">🚀 Now in Public Beta</span>
				</div>
				
				<h1 class="text-6xl md:text-8xl font-bold mb-6">
					<span class="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
						Trade Smarter,<br />Not Harder
					</span>
				</h1>
				
				<p class="text-2xl md:text-3xl text-slate-300 mb-8 max-w-4xl mx-auto">
					The all-in-one DeFi platform for professional traders. DEX aggregation, MEV protection, and advanced analytics in one place.
				</p>
				
				<div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
					<Button size="lg" class="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
						Start Free Trial
					</Button>
					<Button size="lg" variant="outline" class="border-purple-500 text-purple-400 hover:bg-purple-500/10">
						View Demo
					</Button>
				</div>
				
				<p class="text-slate-400 text-sm">
					14-day free trial • No credit card required • Cancel anytime
				</p>
			</div>
			
			<!-- Stats -->
			<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
				{#each stats as stat}
					<div class="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
						<div class="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
							{stat.value}
						</div>
						<div class="text-slate-300 text-sm mb-1">{stat.label}</div>
						<div class="text-emerald-400 text-xs">{stat.change}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-20 px-4 bg-slate-900/50">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-5xl font-bold mb-4">
					<span class="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
						Everything You Need to Dominate DeFi
					</span>
				</h2>
				<p class="text-xl text-slate-400">
					Professional-grade tools that save you time and money
				</p>
			</div>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each features as feature}
					<Card glass padding="lg" class="border border-purple-500/20 hover:border-purple-500/40 transition-all">
						<div class="text-5xl mb-4">{feature.icon}</div>
						<h3 class="text-2xl font-bold mb-3 text-slate-100">{feature.title}</h3>
						<p class="text-slate-300 mb-4">{feature.description}</p>
						<div class="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full">
							<span class="text-purple-300 text-sm font-semibold">{feature.benefit}</span>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Testimonials -->
	<section class="py-20 px-4 bg-slate-950/50">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-5xl font-bold mb-4">
					<span class="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
						Trusted by Professional Traders
					</span>
				</h2>
				<p class="text-xl text-slate-400">
					Join thousands of traders saving time and money
				</p>
			</div>
			
			<div class="grid md:grid-cols-3 gap-8">
				{#each testimonials as testimonial}
					<Card glass padding="lg" class="border border-purple-500/20">
						<div class="flex items-center gap-4 mb-4">
							<div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
								{testimonial.avatar}
							</div>
							<div>
								<div class="font-bold text-slate-100">{testimonial.name}</div>
								<div class="text-sm text-slate-400">{testimonial.role}</div>
								<div class="text-xs text-purple-400">{testimonial.portfolio} Portfolio</div>
							</div>
						</div>
						<p class="text-slate-300 italic">"{testimonial.quote}"</p>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Pricing -->
	<section class="py-20 px-4 bg-slate-900/50">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-5xl font-bold mb-4">
				<span class="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
					Simple, Transparent Pricing
				</span>
			</h2>
			<p class="text-xl text-slate-400 mb-12">
				One plan with everything you need
			</p>
			
			<Card glass padding="lg" class="border-2 border-purple-500 max-w-2xl mx-auto">
				<div class="text-6xl mb-4">💎</div>
				<h3 class="text-3xl font-bold mb-2 text-slate-100">Professional</h3>
				<div class="flex items-baseline justify-center gap-2 mb-6">
					<span class="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">$49</span>
					<span class="text-slate-400">/month</span>
				</div>
				<p class="text-slate-300 mb-8">or $490/year (save 17%)</p>
				
				<ul class="text-left space-y-3 mb-8 max-w-md mx-auto">
					<li class="flex items-start gap-2 text-slate-300">
						<span class="text-emerald-500 mt-1">✓</span>
						<span>DEX aggregation across 15+ exchanges</span>
					</li>
					<li class="flex items-start gap-2 text-slate-300">
						<span class="text-emerald-500 mt-1">✓</span>
						<span>MEV protection with Flashbots</span>
					</li>
					<li class="flex items-start gap-2 text-slate-300">
						<span class="text-emerald-500 mt-1">✓</span>
						<span>Advanced portfolio analytics</span>
					</li>
					<li class="flex items-start gap-2 text-slate-300">
						<span class="text-emerald-500 mt-1">✓</span>
						<span>Auto-compound yields</span>
					</li>
					<li class="flex items-start gap-2 text-slate-300">
						<span class="text-emerald-500 mt-1">✓</span>
						<span>Limit orders & automation</span>
					</li>
					<li class="flex items-start gap-2 text-slate-300">
						<span class="text-emerald-500 mt-1">✓</span>
						<span>Tax reporting & export</span>
					</li>
					<li class="flex items-start gap-2 text-slate-300">
						<span class="text-emerald-500 mt-1">✓</span>
						<span>24/7 priority support</span>
					</li>
				</ul>
				
				<Button fullWidth size="lg" class="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
					Start 14-Day Free Trial
				</Button>
			</Card>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 px-4 bg-gradient-to-r from-purple-900/50 to-cyan-900/50">
		<div class="max-w-3xl mx-auto text-center">
			<h2 class="text-4xl font-bold mb-4 text-slate-100">Ready to Level Up Your DeFi Game?</h2>
			<p class="text-xl text-slate-300 mb-8">
				Join 6,200+ professional traders already using 3Wallet DeFi
			</p>
			
			<form onsubmit={handleTrialSignup} class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
				<Input
					type="email"
					placeholder="your@email.com"
					bind:value={email}
					required
					class="flex-1"
				/>
				<Button type="submit" size="lg" loading={isSubmitting} class="bg-gradient-to-r from-purple-600 to-cyan-600">
					{isSubmitting ? 'Starting...' : 'Start Free Trial'}
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
	<footer class="bg-slate-950 py-12 px-4 border-t border-purple-500/20">
		<div class="max-w-7xl mx-auto">
			<div class="grid md:grid-cols-4 gap-8 mb-8">
				<div>
					<h3 class="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
						3Wallet DeFi
					</h3>
					<p class="text-slate-400 text-sm">
						Professional DeFi trading platform for serious traders.
					</p>
				</div>
				
				<div>
					<h4 class="font-semibold mb-3 text-slate-100">Product</h4>
					<ul class="space-y-2 text-slate-400 text-sm">
						<li><a href="/wallet" class="hover:text-purple-400">Trading Platform</a></li>
						<li><a href="/pitch" class="hover:text-purple-400">Pitch Deck</a></li>
						<li><a href="/contact" class="hover:text-purple-400">Contact</a></li>
					</ul>
				</div>
				
				<div>
					<h4 class="font-semibold mb-3 text-slate-100">Resources</h4>
					<ul class="space-y-2 text-slate-400 text-sm">
						<li><a href="/docs" class="hover:text-purple-400">Documentation</a></li>
						<li><a href="/api" class="hover:text-purple-400">API</a></li>
						<li><a href="/blog" class="hover:text-purple-400">Blog</a></li>
					</ul>
				</div>
				
				<div>
					<h4 class="font-semibold mb-3 text-slate-100">Community</h4>
					<ul class="space-y-2 text-slate-400 text-sm">
						<li><a href="https://twitter.com/3walletdefi" class="hover:text-purple-400">Twitter</a></li>
						<li><a href="https://discord.gg/3wallet" class="hover:text-purple-400">Discord</a></li>
						<li><a href="https://t.me/3wallet" class="hover:text-purple-400">Telegram</a></li>
					</ul>
				</div>
			</div>
			
			<div class="border-t border-purple-500/20 pt-8 text-center text-slate-400 text-sm">
				<p>© 2025 3Wallet DeFi. Built for professional traders. Not financial advice.</p>
			</div>
		</div>
	</footer>
</div>

