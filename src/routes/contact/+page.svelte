<script lang="ts">
	/**
	 * 3Wallet Contact Page
	 * Contact form and information
	 */
	
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	
	// Form state
	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');
	let isSubmitting = $state(false);
	let submitMessage = $state('');
	
	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		submitMessage = '';
		
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000));
			submitMessage = '✅ Thank you! We\'ll get back to you within 24 hours.';
			
			// Reset form
			name = '';
			email = '';
			subject = '';
			message = '';
		} catch (error) {
			submitMessage = '❌ Something went wrong. Please try again or email us directly.';
		} finally {
			isSubmitting = false;
		}
	}
	
	const contactMethods = [
		{
			icon: '📧',
			title: 'Email',
			value: 'hello@3wallet.app',
			link: 'mailto:hello@3wallet.app'
		},
		{
			icon: '💬',
			title: 'Discord',
			value: 'Join our community',
			link: 'https://discord.gg/3wallet'
		},
		{
			icon: '🐦',
			title: 'Twitter',
			value: '@3walletapp',
			link: 'https://twitter.com/3walletapp'
		},
		{
			icon: '💼',
			title: 'LinkedIn',
			value: 'Connect with us',
			link: 'https://linkedin.com/company/3wallet'
		}
	];
	
	const team = [
		{
			name: 'Hunter Ho',
			role: 'Founder & CEO',
			bio: 'Former blockchain security researcher with 8+ years in crypto and DeFi',
			email: 'hunter@3wallet.app',
			github: 'https://github.com/HunterHo07',
			portfolio: 'https://hunterho07.github.io/Portfolio_1/'
		}
	];
</script>

<svelte:head>
	<title>Contact Us - 3Wallet</title>
	<meta name="description" content="Get in touch with the 3Wallet team. We're here to help with any questions about our secure multi-chain crypto wallet." />
</svelte:head>

<div class="min-h-screen bg-slate-900 py-12 px-4">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-12">
			<h1 class="text-5xl font-bold text-gradient mb-4">Get in Touch</h1>
			<p class="text-xl text-slate-300">
				Have questions? We'd love to hear from you. Send us a message and we'll respond within 24 hours.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 mb-12">
			<!-- Contact Form -->
			<Card glass padding="lg">
				<h2 class="text-2xl font-bold mb-6 text-slate-100">Send us a Message</h2>
				
				<form onsubmit={handleSubmit} class="space-y-4">
					<Input
						label="Name"
						placeholder="Your name"
						bind:value={name}
						required
					/>
					
					<Input
						type="email"
						label="Email"
						placeholder="your@email.com"
						bind:value={email}
						required
					/>
					
					<Input
						label="Subject"
						placeholder="What's this about?"
						bind:value={subject}
						required
					/>
					
					<div>
						<label class="block text-sm font-medium text-slate-300 mb-2">
							Message <span class="text-red-500">*</span>
						</label>
						<textarea
							bind:value={message}
							required
							rows="6"
							placeholder="Tell us more..."
							class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
						></textarea>
					</div>
					
					<Button type="submit" fullWidth size="lg" loading={isSubmitting}>
						{isSubmitting ? 'Sending...' : 'Send Message'}
					</Button>
				</form>
				
				{#if submitMessage}
					<p class="mt-4 text-center {submitMessage.includes('✅') ? 'text-emerald-400' : 'text-red-400'}">
						{submitMessage}
					</p>
				{/if}
			</Card>

			<!-- Contact Information -->
			<div class="space-y-6">
				<Card glass padding="lg">
					<h2 class="text-2xl font-bold mb-6 text-slate-100">Contact Information</h2>
					
					<div class="space-y-4">
						{#each contactMethods as method}
							<a
								href={method.link}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-4 p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
							>
								<div class="text-3xl">{method.icon}</div>
								<div>
									<div class="font-semibold text-slate-100">{method.title}</div>
									<div class="text-sm text-slate-400">{method.value}</div>
								</div>
							</a>
						{/each}
					</div>
				</Card>

				<Card glass padding="lg">
					<h3 class="text-xl font-bold mb-4 text-slate-100">Response Time</h3>
					<div class="space-y-3 text-slate-300">
						<div class="flex items-start gap-2">
							<span class="text-emerald-500 mt-1">✓</span>
							<div>
								<div class="font-semibold">General Inquiries</div>
								<div class="text-sm text-slate-400">Within 24 hours</div>
							</div>
						</div>
						<div class="flex items-start gap-2">
							<span class="text-emerald-500 mt-1">✓</span>
							<div>
								<div class="font-semibold">Technical Support</div>
								<div class="text-sm text-slate-400">Within 12 hours</div>
							</div>
						</div>
						<div class="flex items-start gap-2">
							<span class="text-emerald-500 mt-1">✓</span>
							<div>
								<div class="font-semibold">Security Issues</div>
								<div class="text-sm text-slate-400">Immediate response</div>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>

		<!-- Team Section -->
		<section class="mb-12">
			<h2 class="text-3xl font-bold text-center mb-8 text-gradient">Meet the Team</h2>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each team as member}
					<Card glass padding="lg" class="text-center">
						<div class="w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white">
							{member.name.split(' ').map(n => n[0]).join('')}
						</div>
						<h3 class="text-xl font-bold text-slate-100 mb-1">{member.name}</h3>
						<p class="text-emerald-400 mb-3">{member.role}</p>
						<p class="text-sm text-slate-300 mb-4">{member.bio}</p>
						
						<div class="flex gap-3 justify-center">
							<a
								href={member.email}
								class="text-slate-400 hover:text-emerald-400 transition-colors"
								title="Email"
							>
								📧
							</a>
							<a
								href={member.github}
								target="_blank"
								rel="noopener noreferrer"
								class="text-slate-400 hover:text-emerald-400 transition-colors"
								title="GitHub"
							>
								💻
							</a>
							<a
								href={member.portfolio}
								target="_blank"
								rel="noopener noreferrer"
								class="text-slate-400 hover:text-emerald-400 transition-colors"
								title="Portfolio"
							>
								🌐
							</a>
						</div>
					</Card>
				{/each}
			</div>
		</section>

		<!-- FAQ Section -->
		<section>
			<h2 class="text-3xl font-bold text-center mb-8 text-gradient">Frequently Asked Questions</h2>
			
			<div class="grid md:grid-cols-2 gap-6">
				<Card glass padding="lg">
					<h3 class="font-bold text-slate-100 mb-2">How secure is 3Wallet?</h3>
					<p class="text-slate-300 text-sm">
						3Wallet uses military-grade AES-256-GCM encryption and offers multi-signature protection. Your private keys never leave your device and are encrypted with your password.
					</p>
				</Card>
				
				<Card glass padding="lg">
					<h3 class="font-bold text-slate-100 mb-2">Which blockchains do you support?</h3>
					<p class="text-slate-300 text-sm">
						Currently, we support Ethereum, Bitcoin, and Solana on testnet. We're adding 12+ more chains including Polygon, BSC, and Avalanche in Q1 2025.
					</p>
				</Card>
				
				<Card glass padding="lg">
					<h3 class="font-bold text-slate-100 mb-2">Is 3Wallet open source?</h3>
					<p class="text-slate-300 text-sm">
						Yes! Our code is available on GitHub. We believe in transparency and welcome community contributions to make 3Wallet even better.
					</p>
				</Card>
				
				<Card glass padding="lg">
					<h3 class="font-bold text-slate-100 mb-2">How do I report a security issue?</h3>
					<p class="text-slate-300 text-sm">
						Please email security@3wallet.app immediately. We have a bug bounty program with rewards up to $50,000 for critical vulnerabilities.
					</p>
				</Card>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="mt-12 text-center">
			<Card glass padding="lg">
				<h2 class="text-3xl font-bold mb-4 text-gradient">Ready to Get Started?</h2>
				<p class="text-xl text-slate-300 mb-6">
					Join thousands of users securing their crypto with 3Wallet
				</p>
				<div class="flex gap-4 justify-center">
					<Button size="lg" onclick={() => window.location.href = '/wallet'}>
						Launch Wallet
					</Button>
					<Button size="lg" variant="outline" onclick={() => window.location.href = '/'}>
						Learn More
					</Button>
				</div>
			</Card>
		</section>
	</div>
</div>

