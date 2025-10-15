<script lang="ts">
	import { toast } from 'svelte-french-toast';
	import Modal from '../ui/Modal.svelte';
	import Input from '../ui/Input.svelte';
	import Button from '../ui/Button.svelte';
	import Alert from '../ui/Alert.svelte';
	import { createEthereumWallet } from '$lib/utils/ethereum';
	import { createBitcoinWallet } from '$lib/utils/bitcoin';
	import { walletStore } from '$lib/stores/walletStore';

	export let isOpen = false;

	let step: 'password' | 'mnemonic' = 'password';
	let password = '';
	let confirmPassword = '';
	let showPassword = false;
	let mnemonic = '';
	let error = '';
	let copied = false;

	function handlePasswordSubmit(e: Event) {
		e.preventDefault();
		error = '';

		if (password.length < 8) {
			error = 'Password must be at least 8 characters';
			return;
		}

		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		// Generate wallets
		const ethWallet = createEthereumWallet();
		const btcWallet = createBitcoinWallet();

		// Use the same mnemonic for both
		mnemonic = ethWallet.mnemonic;

		// Store wallet
		walletStore.createWallet(
			ethWallet.mnemonic,
			password,
			ethWallet.address,
			ethWallet.privateKey,
			btcWallet.address,
			btcWallet.privateKey
		);

		step = 'mnemonic';
	}

	async function copyMnemonic() {
		await navigator.clipboard.writeText(mnemonic);
		copied = true;
		toast.success('Recovery phrase copied!');
		setTimeout(() => (copied = false), 2000);
	}

	function handleComplete() {
		password = '';
		confirmPassword = '';
		mnemonic = '';
		step = 'password';
		isOpen = false;
	}
</script>

<Modal bind:isOpen title="Create New Wallet">
	{#if step === 'password'}
		<form on:submit={handlePasswordSubmit} class="space-y-4">
			{#if error}
				<Alert type="error" message={error} />
			{/if}

			<Alert
				type="info"
				message="Your password encrypts your wallet on this device. Choose a strong password you won't forget."
			/>

			<div class="relative">
				<Input
					type={showPassword ? 'text' : 'password'}
					label="Password"
					bind:value={password}
					required
					placeholder="Enter a strong password"
				/>
				<button
					type="button"
					on:click={() => (showPassword = !showPassword)}
					class="absolute right-3 top-9 text-gray-500"
				>
					{#if showPassword}
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
							/>
						</svg>
					{:else}
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							/>
						</svg>
					{/if}
				</button>
			</div>

			<Input
				type={showPassword ? 'text' : 'password'}
				label="Confirm Password"
				bind:value={confirmPassword}
				required
				placeholder="Confirm your password"
			/>

			<Button type="submit" class="w-full">Create Wallet</Button>
		</form>
	{:else if step === 'mnemonic'}
		<div class="space-y-4">
			<Alert
				type="warning"
				message="Write down your recovery phrase and store it safely. You'll need it to recover your wallet."
			/>

			<div class="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
				<p class="text-sm text-gray-600 mb-2 font-semibold">Recovery Phrase</p>
				<p class="text-base font-mono text-gray-900 leading-relaxed">
					{mnemonic}
				</p>
			</div>

			<Button on:click={copyMnemonic} variant="outline" class="w-full">
				<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
					/>
				</svg>
				{copied ? 'Copied!' : 'Copy to Clipboard'}
			</Button>

			<Alert
				type="error"
				message="Never share your recovery phrase with anyone. Anyone with this phrase can access your funds."
			/>

			<Button on:click={handleComplete} class="w-full">I've Saved My Recovery Phrase</Button>
		</div>
	{/if}
</Modal>

