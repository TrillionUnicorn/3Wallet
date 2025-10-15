<script lang="ts">
	import Modal from '../ui/Modal.svelte';
	import Input from '../ui/Input.svelte';
	import Button from '../ui/Button.svelte';
	import Alert from '../ui/Alert.svelte';
	import { walletStore } from '$lib/stores/walletStore';

	export let isOpen = false;

	let password = '';
	let showPassword = false;
	let error = '';
	let isLoading = false;

	function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		isLoading = true;

		try {
			const success = walletStore.unlockWallet(password);

			if (success) {
				password = '';
				isOpen = false;
			} else {
				error = 'Incorrect password';
			}
		} catch (err) {
			error = 'Failed to unlock wallet';
		} finally {
			isLoading = false;
		}
	}
</script>

<Modal bind:isOpen title="Unlock Wallet">
	<form on:submit={handleSubmit} class="space-y-4">
		{#if error}
			<Alert type="error" message={error} />
		{/if}

		<Alert type="info" message="Enter your password to unlock your wallet" />

		<div class="relative">
			<Input
				type={showPassword ? 'text' : 'password'}
				label="Password"
				bind:value={password}
				required
				placeholder="Enter your password"
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

		<Button type="submit" class="w-full" loading={isLoading}>Unlock Wallet</Button>
	</form>
</Modal>

