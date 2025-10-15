<script lang="ts">
	/**
	 * MVP-2: DeFi Power User - Contact Page
	 */
	
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	
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
			await new Promise(resolve => setTimeout(resolve, 1000));
			submitMessage = '✅ Thank you! Our team will respond within 24 hours.';
			name = '';
			email = '';
			subject = '';
			message = '';
		} catch (error) {
			submitMessage = '❌ Something went wrong. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Contact Us - 3Wallet DeFi</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-12 px-4">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-6xl font-bold mb-4">
				<span class="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
					Get in Touch
				</span>
			</h1>
			<p class="text-xl text-slate-300">
				24/7 support for professional traders
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 mb-12">
			<Card glass padding="lg" class="border border-purple-500/20">
				<h2 class="text-2xl font-bold mb-6 text-slate-100">Send us a Message</h2>
				
				<form onsubmit={handleSubmit} class="space-y-4">
					<Input label="Name" placeholder="Your name" bind:value={name} required />
					<Input type="email" label="Email" placeholder="your@email.com" bind:value={email} required />
					<Input label="Subject" placeholder="How can we help?" bind:value={subject} required />
					
					<div>
						<label class="block text-sm font-medium text-slate-300 mb-2">
							Message <span class="text-red-500">*</span>
						</label>
						<textarea
							bind:value={message}
							required
							rows="6"
							placeholder="Tell us more..."
							class="w-full px-4 py-2 bg-slate-900 border border-purple-500/30 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
						></textarea>
					</div>
					
					<Button type="submit" fullWidth size="lg" loading={isSubmitting} class="bg-gradient-to-r from-purple-600 to-cyan-600">
						{isSubmitting ? 'Sending...' : 'Send Message'}
					</Button>
				</form>
				
				{#if submitMessage}
					<p class="mt-4 text-center {submitMessage.includes('✅') ? 'text-emerald-400' : 'text-red-400'}">
						{submitMessage}
					</p>
				{/if}
			</Card>

			<div class="space-y-6">
				<Card glass padding="lg" class="border border-purple-500/20">
					<h2 class="text-2xl font-bold mb-6 text-slate-100">Contact Information</h2>
					
					<div class="space-y-4">
						<a href="mailto:support@3walletdefi.com" class="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors">
							<div class="text-3xl">📧</div>
							<div>
								<div class="font-semibold text-slate-100">Email</div>
								<div class="text-sm text-slate-400">support@3walletdefi.com</div>
							</div>
						</a>
						
						<a href="https://discord.gg/3wallet" target="_blank" class="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors">
							<div class="text-3xl">💬</div>
							<div>
								<div class="font-semibold text-slate-100">Discord</div>
								<div class="text-sm text-slate-400">Join our community</div>
							</div>
						</a>
						
						<a href="https://t.me/3wallet" target="_blank" class="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors">
							<div class="text-3xl">✈️</div>
							<div>
								<div class="font-semibold text-slate-100">Telegram</div>
								<div class="text-sm text-slate-400">Real-time support</div>
							</div>
						</a>
					</div>
				</Card>

				<Card glass padding="lg" class="border border-purple-500/20">
					<h3 class="text-xl font-bold mb-4 text-slate-100">Response Time</h3>
					<div class="space-y-3 text-slate-300">
						<div class="flex items-start gap-2">
							<span class="text-emerald-500 mt-1">✓</span>
							<div>
								<div class="font-semibold">Premium Support</div>
								<div class="text-sm text-slate-400">Within 1 hour (24/7)</div>
							</div>
						</div>
						<div class="flex items-start gap-2">
							<span class="text-emerald-500 mt-1">✓</span>
							<div>
								<div class="font-semibold">Technical Issues</div>
								<div class="text-sm text-slate-400">Within 2 hours</div>
							</div>
						</div>
						<div class="flex items-start gap-2">
							<span class="text-emerald-500 mt-1">✓</span>
							<div>
								<div class="font-semibold">General Inquiries</div>
								<div class="text-sm text-slate-400">Within 24 hours</div>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>

		<section class="text-center">
			<Card glass padding="lg" class="border border-purple-500/20">
				<h2 class="text-3xl font-bold mb-4">
					<span class="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
						Ready to Trade Smarter?
					</span>
				</h2>
				<p class="text-xl text-slate-300 mb-6">
					Join 6,200+ professional traders using 3Wallet DeFi
				</p>
				<Button size="lg" class="bg-gradient-to-r from-purple-600 to-cyan-600">
					Start Free Trial
				</Button>
			</Card>
		</section>
	</div>
</div>

