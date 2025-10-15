<script lang="ts">
	import { toast } from 'svelte-french-toast';
	import Modal from '../ui/Modal.svelte';
	import Input from '../ui/Input.svelte';
	import Button from '../ui/Button.svelte';
	import Alert from '../ui/Alert.svelte';
	import { importEthereumWallet } from '$lib/utils/ethereum';
	import { importBitcoinWallet } from '$lib/utils/bitcoin';
	import { walletStore } from '$lib/stores/walletStore';

	export let isOpen = false;

	let mnemonic = '';
	let password = '';
	let confirmPassword = '';
	let showPassword = false;
	let error = '';
	let isLoading = false;

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		isLoading = true;

		try {
			// Validate password
			if (password.length < 8) {
				throw new Error('Password must be at least 8 characters');
			}

			if (password !== confirmPassword) {
				throw new Error('Passwords do not match');
			}

			// Validate and import mnemonic
			const trimmedMnemonic = mnemonic.trim().toLowerCase();
			const words = trimmedMnemonic.split(/\s+/);

			if (words.length !== 12 && words.length !== 24) {
				throw new Error('Recovery phrase must be 12 or 24 words');
			}

			// Import wallets
			const ethWallet = importEthereumWallet(trimmedMnemonic);
			const btcWallet = importBitcoinWallet(trimmedMnemonic);

			// Store wallet
			walletStore.createWallet(
				trimmedMnemonic,
				password,
				ethWallet.address,
				ethWallet.privateKey,
				btcWallet.address,
				btcWallet.privateKey
			);

			toast.success('Wallet imported successfully!');

			// Reset form
			mnemonic = '';
			password = '';
			confirmPassword = '';

			// Close modal
			isOpen = false;
		} catch (err: any) {
			error = err.message || 'Failed to import wallet';
			toast.error('Import failed');
		} finally {
			isLoading = false;
		}
	}
</script>

<Modal bind:isOpen title="Import Wallet">
	<form on:submit={handleSubmit} class="space-y-4">
		{#if error}
			<Alert type="error" message={error} />
		{/if}

		<Alert type="info" message="Enter your 12 or 24-word recovery phrase to import your wallet." />

		<div>
			<label class="block text-sm font-medium text-gray-700 mb-2">
				Recovery Phrase <span class="text-red-500">*</span>
			</label>
			<textarea
				bind:value={mnemonic}
				placeholder="Enter your recovery phrase (12 or 24 words)"
				rows="4"
				required
				class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
			/>
		</div>

		<div class="relative">
			<Input
				type={showPassword ? 'text' : 'password'}
				label="New Password"
				bind:value={password}
				required
				placeholder="Enter a strong password"
				helperText="This password will encrypt your wallet on this device"
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

		<Alert
			type="warning"
			message="Make sure you're importing the correct recovery phrase. Importing will replace any existing wallet on this device."
		/>

		<div class="flex gap-3">
			<Button type="button" variant="outline" on:click={() => (isOpen = false)} class="flex-1" disabled={isLoading}>
				Cancel
			</Button>
			<Button type="submit" class="flex-1" loading={isLoading}>Import Wallet</Button>
		</div>
	</form>
</Modal>

