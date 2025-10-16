<script lang="ts">
	/**
	 * MVP-3: Enterprise - Contact Page
	 * Enterprise sales and support
	 */
	
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	
	let company = $state('');
	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let employees = $state('');
	let message = $state('');
	let isSubmitting = $state(false);
	let submitMessage = $state('');
	
	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		submitMessage = '';
		
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			submitMessage = '✅ Thank you! Our enterprise team will contact you within 24 hours to schedule a demo.';
			company = '';
			name = '';
			email = '';
			phone = '';
			employees = '';
			message = '';
		} catch (error) {
			submitMessage = '❌ Something went wrong. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Contact Enterprise Sales - 3Wallet Enterprise</title>
</svelte:head>

<div class="min-h-screen bg-slate-50 py-12 px-4">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-6xl font-bold mb-4 text-slate-900">
				Contact Enterprise Sales
			</h1>
			<p class="text-xl text-slate-600">
				Let's discuss how 3Wallet can secure your corporate treasury
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 mb-12">
			<Card padding="lg" class="border border-slate-200">
				<h2 class="text-2xl font-bold mb-6 text-slate-900">Schedule a Demo</h2>
				
				<form onsubmit={handleSubmit} class="space-y-4">
					<Input label="Company Name" placeholder="Acme Corp" bind:value={company} required />
					<Input label="Your Name" placeholder="John Doe" bind:value={name} required />
					<Input type="email" label="Work Email" placeholder="john@acme.com" bind:value={email} required />
					<Input type="tel" label="Phone Number" placeholder="+1 (555) 123-4567" bind:value={phone} required />
					
					<div>
						<label class="block text-sm font-medium text-slate-900 mb-2">
							Company Size <span class="text-red-500">*</span>
						</label>
						<select bind:value={employees} required class="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
							<option value="">Select size</option>
							<option value="1-10">1-10 employees</option>
							<option value="11-50">11-50 employees</option>
							<option value="51-200">51-200 employees</option>
							<option value="201-1000">201-1,000 employees</option>
							<option value="1000+">1,000+ employees</option>
						</select>
					</div>
					
					<div>
						<label class="block text-sm font-medium text-slate-900 mb-2">
							Message
						</label>
						<textarea
							bind:value={message}
							rows="4"
							placeholder="Tell us about your treasury management needs..."
							class="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
						></textarea>
					</div>
					
					<Button type="submit" fullWidth size="lg" loading={isSubmitting} class="bg-blue-600 hover:bg-blue-700">
						{isSubmitting ? 'Submitting...' : 'Request Demo'}
					</Button>
				</form>
				
				{#if submitMessage}
					<p class="mt-4 text-center {submitMessage.includes('✅') ? 'text-emerald-600' : 'text-red-600'}">
						{submitMessage}
					</p>
				{/if}
			</Card>

			<div class="space-y-6">
				<Card padding="lg" class="border border-slate-200">
					<h2 class="text-2xl font-bold mb-6 text-slate-900">Contact Information</h2>
					
					<div class="space-y-4">
						<a href="mailto:enterprise@3wallet.com" class="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
							<div class="text-3xl">📧</div>
							<div>
								<div class="font-semibold text-slate-900">Enterprise Sales</div>
								<div class="text-sm text-slate-600">enterprise@3wallet.com</div>
							</div>
						</a>
						
						<a href="tel:+18005553000" class="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
							<div class="text-3xl">📞</div>
							<div>
								<div class="font-semibold text-slate-900">Phone</div>
								<div class="text-sm text-slate-600">+1 (800) 555-3000</div>
							</div>
						</a>
						
						<a href="https://calendly.com/3wallet-enterprise" target="_blank" class="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
							<div class="text-3xl">📅</div>
							<div>
								<div class="font-semibold text-slate-900">Book a Call</div>
								<div class="text-sm text-slate-600">Schedule on Calendly</div>
							</div>
						</a>
					</div>
				</Card>

				<Card padding="lg" class="border border-blue-200 bg-blue-50">
					<h3 class="text-xl font-bold mb-4 text-slate-900">Enterprise Support</h3>
					<div class="space-y-3 text-slate-700">
						<div class="flex items-start gap-2">
							<span class="text-blue-600 mt-1">✓</span>
							<div>
								<div class="font-semibold">24/7 Phone Support</div>
								<div class="text-sm text-slate-600">Dedicated support line</div>
							</div>
						</div>
						<div class="flex items-start gap-2">
							<span class="text-blue-600 mt-1">✓</span>
							<div>
								<div class="font-semibold">Dedicated Account Manager</div>
								<div class="text-sm text-slate-600">Personal point of contact</div>
							</div>
						</div>
						<div class="flex items-start gap-2">
							<span class="text-blue-600 mt-1">✓</span>
							<div>
								<div class="font-semibold">Custom Onboarding</div>
								<div class="text-sm text-slate-600">Tailored to your needs</div>
							</div>
						</div>
						<div class="flex items-start gap-2">
							<span class="text-blue-600 mt-1">✓</span>
							<div>
								<div class="font-semibold">SLA Guarantee</div>
								<div class="text-sm text-slate-600">99.99% uptime</div>
							</div>
						</div>
					</div>
				</Card>

				<Card padding="lg" class="border border-slate-200">
					<h3 class="text-xl font-bold mb-4 text-slate-900">Office Locations</h3>
					<div class="space-y-3 text-slate-700">
						<div>
							<div class="font-semibold">San Francisco (HQ)</div>
							<div class="text-sm text-slate-600">123 Market St, Suite 500</div>
							<div class="text-sm text-slate-600">San Francisco, CA 94103</div>
						</div>
						<div>
							<div class="font-semibold">New York</div>
							<div class="text-sm text-slate-600">456 Wall St, Floor 20</div>
							<div class="text-sm text-slate-600">New York, NY 10005</div>
						</div>
						<div>
							<div class="font-semibold">London</div>
							<div class="text-sm text-slate-600">789 Canary Wharf</div>
							<div class="text-sm text-slate-600">London E14 5AB, UK</div>
						</div>
					</div>
				</Card>
			</div>
		</div>

		<section class="text-center">
			<Card padding="lg" class="border border-slate-200">
				<h2 class="text-3xl font-bold mb-4 text-slate-900">
					Ready to Secure Your Treasury?
				</h2>
				<p class="text-xl text-slate-600 mb-6">
					Join 50+ enterprises managing $2B+ in crypto assets
				</p>
				<Button size="lg" class="bg-blue-600 hover:bg-blue-700">
					Schedule Demo
				</Button>
			</Card>
		</section>
	</div>
</div>

