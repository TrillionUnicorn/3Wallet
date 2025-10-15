<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { walletStore } from '$lib/stores/walletStore';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CreateWalletModal from '$lib/components/wallet/CreateWalletModal.svelte';
	import UnlockWalletModal from '$lib/components/wallet/UnlockWalletModal.svelte';
	import ImportWalletModal from '$lib/components/wallet/ImportWalletModal.svelte';

	let showCreateModal = false;
	let showUnlockModal = false;
	let showImportModal = false;
	let mounted = false;

	$: hasWallet = !!$walletStore.encryptedData;
	$: isUnlocked = $walletStore.isUnlocked;

	onMount(() => {
		mounted = true;
	});

	$: if (mounted && isUnlocked) {
		goto('/wallet');
	}
</script>

<svelte:head>
	<title>3Wallet - Secure Multi-Chain Crypto Wallet</title>
</svelte:head>

{#if mounted}
	<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
		<!-- Header -->
		<header class="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
			<div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
				<div class="flex items-center gap-2">
					<svg
						class="w-8 h-8 text-primary"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
						/>
					</svg>
					<h1 class="text-2xl font-bold text-gray-900">3Wallet</h1>
				</div>
			</div>
		</header>

		<!-- Hero Section -->
		<main class="max-w-7xl mx-auto px-4 py-16">
			<div class="text-center mb-16">
				<h2 class="text-5xl font-bold text-gray-900 mb-4">
					Secure Multi-Chain Crypto Wallet
				</h2>
				<p class="text-xl text-gray-600 max-w-2xl mx-auto">
					Manage your Ethereum and Bitcoin assets with military-grade encryption and complete
					control over your private keys.
				</p>
			</div>

			<!-- Features -->
			<div class="grid md:grid-cols-3 gap-8 mb-16">
				<Card>
					<div class="text-center">
						<div
							class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
						>
							<svg
								class="w-8 h-8 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
								/>
							</svg>
						</div>
						<h3 class="text-xl font-bold text-gray-900 mb-2">Bank-Level Security</h3>
						<p class="text-gray-600">
							AES-256 encryption keeps your private keys safe on your device
						</p>
					</div>
				</Card>

				<Card>
					<div class="text-center">
						<div
							class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
						>
							<svg
								class="w-8 h-8 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/>
							</svg>
						</div>
						<h3 class="text-xl font-bold text-gray-900 mb-2">Your Keys, Your Crypto</h3>
						<p class="text-gray-600">
							Non-custodial wallet - you have complete control over your assets
						</p>
					</div>
				</Card>

				<Card>
					<div class="text-center">
						<div
							class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
						>
							<svg
								class="w-8 h-8 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
						</div>
						<h3 class="text-xl font-bold text-gray-900 mb-2">Multi-Chain Support</h3>
						<p class="text-gray-600">Manage Ethereum and Bitcoin from a single interface</p>
					</div>
				</Card>
			</div>

			<!-- CTA -->
			<div class="max-w-md mx-auto">
				<Card padding="lg">
					<div class="text-center space-y-4">
						<h3 class="text-2xl font-bold text-gray-900">
							{hasWallet ? 'Welcome Back!' : 'Get Started'}
						</h3>
						<p class="text-gray-600">
							{hasWallet
								? 'Unlock your wallet to access your crypto assets'
								: 'Create a new wallet to start managing your crypto'}
						</p>

						<div class="space-y-3">
							{#if hasWallet}
								<Button on:click={() => (showUnlockModal = true)} class="w-full" size="lg">
									Unlock Wallet
								</Button>
							{:else}
								<Button on:click={() => (showCreateModal = true)} class="w-full" size="lg">
									Create New Wallet
								</Button>

								<Button
									on:click={() => (showImportModal = true)}
									variant="outline"
									class="w-full"
									size="lg"
								>
									Import Existing Wallet
								</Button>
							{/if}
						</div>
					</div>
				</Card>
			</div>
		</main>

		<!-- Modals -->
		<CreateWalletModal bind:isOpen={showCreateModal} />
		<UnlockWalletModal bind:isOpen={showUnlockModal} />
		<ImportWalletModal bind:isOpen={showImportModal} />
	</div>
{/if}

