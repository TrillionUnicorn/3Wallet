<script lang="ts">
	/**
	 * 3Wallet Home/Landing Page
	 * Complete landing page with all required sections
	 */
	
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	
	// Waitlist form state
	let email = $state('');
	let name = $state('');
	let isSubmitting = $state(false);
	let submitMessage = $state('');
	
	const tiers = [
		{
			name: 'Personal',
			price: 'Free',
			icon: '🔒',
			features: [
				'Single-signature wallet',
				'Basic encryption',
				'Mobile app access',
				'5 supported chains',
				'Perfect for beginners'
			],
			cta: 'Get Started'
		},
		{
			name: 'Professional',
			price: '$9.99/mo',
			originalPrice: '$9.99',
			earlyPrice: '$4.99',
			icon: '🔐',
			features: [
				'Multi-signature (2-of-3)',
				'Hardware wallet integration',
				'15 supported chains',
				'AI risk analysis',
				'Priority support'
			],
			cta: 'Start Free Trial',
			popular: true
		},
		{
			name: 'Enterprise',
			price: '$99/mo',
			originalPrice: '$99',
			earlyPrice: '$49',
			icon: '🏦',
			features: [
				'Multi-signature (3-of-5)',
				'Team management',
				'All chains supported',
				'24/7 monitoring',
				'Insurance up to $1M'
			],
			cta: 'Contact Sales'
		}
	];
	
	async function handleWaitlistSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		submitMessage = '';
		
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000));
			submitMessage = '✅ Success! Check your email for early access details.';
			email = '';
			name = '';
		} catch (error) {
			submitMessage = '❌ Something went wrong. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>3Wallet - Multi-Chain Secure Crypto Wallet</title>
	<meta name="description" content="The only crypto wallet that gives you bank-level security with DeFi-level freedom across all major blockchains." />
</svelte:head>

<div class="min-h-screen">
	<!-- Hero Section with Parallax -->
	<section class="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
		<!-- Parallax Background -->
		<div class="absolute inset-0 opacity-20">
			<div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920')] bg-cover bg-center bg-fixed"></div>
		</div>
		
		<!-- Content -->
		<div class="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
			<div class="animate-fade-in">
				<h1 class="text-5xl md:text-7xl font-bold mb-6 text-gradient">
					The Future of Secure<br />Multi-Chain Crypto
				</h1>
				<p class="text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto">
					Bank-level security meets DeFi-level freedom. Manage your digital assets across 15+ blockchains with military-grade encryption and AI-powered protection.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<Button size="lg" onclick={() => window.location.href = '/wallet'}>
						Launch Wallet
					</Button>
					<Button size="lg" variant="outline">
						Watch Demo
					</Button>
				</div>
			</div>
			
			<!-- Stats -->
			<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-slide-in-left">
				<div class="glass-effect p-6 rounded-xl">
					<div class="text-3xl font-bold text-emerald-400">$0</div>
					<div class="text-sm text-slate-300">Hacks Since Launch</div>
				</div>
				<div class="glass-effect p-6 rounded-xl">
					<div class="text-3xl font-bold text-emerald-400">15+</div>
					<div class="text-sm text-slate-300">Blockchains</div>
				</div>
				<div class="glass-effect p-6 rounded-xl">
					<div class="text-3xl font-bold text-emerald-400">99.9%</div>
					<div class="text-sm text-slate-300">Uptime</div>
				</div>
				<div class="glass-effect p-6 rounded-xl">
					<div class="text-3xl font-bold text-emerald-400">10K+</div>
					<div class="text-sm text-slate-300">Users</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Why Us Section -->
	<section class="py-20 px-4 bg-slate-900">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-4xl font-bold text-center mb-12 text-gradient">Why Choose 3Wallet?</h2>
			
			<div class="grid md:grid-cols-3 gap-8">
				<Card glass padding="lg">
					<div class="text-4xl mb-4">🛡️</div>
					<h3 class="text-xl font-bold mb-3 text-slate-100">3-Tier Security</h3>
					<p class="text-slate-300">
						Choose your security level: Personal, Professional, or Enterprise. Each tier offers progressively stronger protection with multi-signature and hardware wallet support.
					</p>
				</Card>
				
				<Card glass padding="lg">
					<div class="text-4xl mb-4">🤖</div>
					<h3 class="text-xl font-bold mb-3 text-slate-100">AI-Powered Protection</h3>
					<p class="text-slate-300">
						Real-time risk analysis detects phishing attempts, suspicious contracts, and unusual activity before you make a transaction.
					</p>
				</Card>
				
				<Card glass padding="lg">
					<div class="text-4xl mb-4">🌐</div>
					<h3 class="text-xl font-bold mb-3 text-slate-100">True Multi-Chain</h3>
					<p class="text-slate-300">
						Manage Ethereum, Bitcoin, Solana, and 12+ other chains from one unified interface. Cross-chain swaps built-in.
					</p>
				</Card>
			</div>
		</div>
	</section>

	<!-- How It Works -->
	<section class="py-20 px-4 bg-slate-800">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-4xl font-bold text-center mb-12 text-gradient">How It Works</h2>
			
			<div class="grid md:grid-cols-3 gap-12">
				<div class="text-center">
					<div class="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
					<h3 class="text-xl font-bold mb-3 text-slate-100">Create Your Wallet</h3>
					<p class="text-slate-300">
						Set up your secure wallet in under 60 seconds. Choose your security tier and generate your encrypted seed phrase.
					</p>
				</div>
				
				<div class="text-center">
					<div class="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
					<h3 class="text-xl font-bold mb-3 text-slate-100">Add Your Assets</h3>
					<p class="text-slate-300">
						Import existing wallets or receive crypto across 15+ blockchains. All your assets in one unified dashboard.
					</p>
				</div>
				
				<div class="text-center">
					<div class="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
					<h3 class="text-xl font-bold mb-3 text-slate-100">Transact Securely</h3>
					<p class="text-slate-300">
						Send, receive, and swap with AI-powered risk analysis. Every transaction is protected by our 3-tier security system.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Pricing Section -->
	<section class="py-20 px-4 bg-slate-900">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-4xl font-bold text-center mb-4 text-gradient">Choose Your Security Tier</h2>
			<p class="text-center text-slate-300 mb-12">Early bird pricing - 50% off for first 1,000 users!</p>
			
			<div class="grid md:grid-cols-3 gap-8">
				{#each tiers as tier}
					<Card glass padding="lg" class={tier.popular ? 'ring-2 ring-emerald-500' : ''}>
						{#if tier.popular}
							<div class="bg-emerald-600 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
								MOST POPULAR
							</div>
						{/if}
						
						<div class="text-4xl mb-4">{tier.icon}</div>
						<h3 class="text-2xl font-bold mb-2 text-slate-100">{tier.name}</h3>
						
						<div class="mb-6">
							{#if tier.earlyPrice}
								<div class="flex items-baseline gap-2">
									<span class="text-3xl font-bold text-emerald-400">{tier.earlyPrice}</span>
									<span class="text-lg text-slate-500 line-through">{tier.originalPrice}</span>
								</div>
								<p class="text-sm text-slate-400">50% off - Limited time!</p>
							{:else}
								<div class="text-3xl font-bold text-emerald-400">{tier.price}</div>
							{/if}
						</div>
						
						<ul class="space-y-3 mb-8">
							{#each tier.features as feature}
								<li class="flex items-start gap-2 text-slate-300">
									<span class="text-emerald-500 mt-1">✓</span>
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
						
						<Button fullWidth variant={tier.popular ? 'primary' : 'outline'}>
							{tier.cta}
						</Button>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Waitlist Section -->
	<section class="py-20 px-4 bg-slate-800">
		<div class="max-w-2xl mx-auto text-center">
			<h2 class="text-4xl font-bold mb-4 text-gradient">Join the Waitlist</h2>
			<p class="text-xl text-slate-300 mb-8">
				Be among the first 1,000 users to get 6 months of Professional tier FREE (worth $60)
			</p>
			
			<form onsubmit={handleWaitlistSubmit} class="space-y-4">
				<Input
					type="text"
					placeholder="Your name"
					bind:value={name}
					required
				/>
				<Input
					type="email"
					placeholder="your@email.com"
					bind:value={email}
					required
				/>
				<Button type="submit" fullWidth size="lg" loading={isSubmitting}>
					{isSubmitting ? 'Joining...' : 'Get Early Access'}
				</Button>
			</form>
			
			{#if submitMessage}
				<p class="mt-4 text-lg {submitMessage.includes('✅') ? 'text-emerald-400' : 'text-red-400'}">
					{submitMessage}
				</p>
			{/if}
			
			<p class="mt-6 text-sm text-slate-400">
				✅ Free Tier 2 for 6 months • ✅ Exclusive beta access • ✅ Early adopter NFT
			</p>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-slate-950 py-12 px-4">
		<div class="max-w-6xl mx-auto">
			<div class="grid md:grid-cols-4 gap-8 mb-8">
				<div>
					<h3 class="text-xl font-bold mb-4 text-gradient">3Wallet</h3>
					<p class="text-slate-400 text-sm">
						Making crypto safe, simple, and accessible for everyone.
					</p>
				</div>
				
				<div>
					<h4 class="font-semibold mb-3 text-slate-100">Product</h4>
					<ul class="space-y-2 text-slate-400 text-sm">
						<li><a href="/wallet" class="hover:text-emerald-400">Wallet</a></li>
						<li><a href="/pitch" class="hover:text-emerald-400">Pitch Deck</a></li>
						<li><a href="/contact" class="hover:text-emerald-400">Contact</a></li>
					</ul>
				</div>
				
				<div>
					<h4 class="font-semibold mb-3 text-slate-100">Resources</h4>
					<ul class="space-y-2 text-slate-400 text-sm">
						<li><a href="/docs" class="hover:text-emerald-400">Documentation</a></li>
						<li><a href="/security" class="hover:text-emerald-400">Security</a></li>
						<li><a href="/roadmap" class="hover:text-emerald-400">Roadmap</a></li>
					</ul>
				</div>
				
				<div>
					<h4 class="font-semibold mb-3 text-slate-100">Connect</h4>
					<ul class="space-y-2 text-slate-400 text-sm">
						<li><a href="https://twitter.com/3walletapp" class="hover:text-emerald-400">Twitter</a></li>
						<li><a href="https://discord.gg/3wallet" class="hover:text-emerald-400">Discord</a></li>
						<li><a href="https://github.com/TrillionUnicorn/3Wallet" class="hover:text-emerald-400">GitHub</a></li>
					</ul>
				</div>
			</div>
			
			<div class="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
				<p>© 2024 3Wallet. All rights reserved. Built with ❤️ by Hunter Ho</p>
			</div>
		</div>
	</footer>
</div>

