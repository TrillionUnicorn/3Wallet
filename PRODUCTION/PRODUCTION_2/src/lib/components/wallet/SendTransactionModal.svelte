<script lang="ts">
	import { toast } from 'svelte-french-toast';
	import Modal from '../ui/Modal.svelte';
	import Input from '../ui/Input.svelte';
	import Button from '../ui/Button.svelte';
	import Alert from '../ui/Alert.svelte';
	import { sendEthereumTransaction } from '$lib/utils/ethereum';
	import { sendBitcoinTransaction } from '$lib/utils/bitcoin';

	export let isOpen = false;
	export let chain: 'ethereum' | 'bitcoin';
	export let privateKey: string;
	export let onSuccess: () => void;

	let recipient = '';
	let amount = '';
	let isLoading = false;
	let error = '';

	const chainInfo = {
		ethereum: {
			name: 'Ethereum',
			symbol: 'ETH',
			placeholder: '0x...'
		},
		bitcoin: {
			name: 'Bitcoin',
			symbol: 'BTC',
			placeholder: 'tb1...'
		}
	};

	const info = chainInfo[chain];

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		isLoading = true;

		try {
			// Validate inputs
			if (!recipient || !amount) {
				throw new Error('Please fill in all fields');
			}

			const amountNum = parseFloat(amount);
			if (isNaN(amountNum) || amountNum <= 0) {
				throw new Error('Invalid amount');
			}

			// Send transaction
			let txHash: string;

			if (chain === 'ethereum') {
				txHash = await sendEthereumTransaction(privateKey, recipient, amount);
			} else {
				txHash = await sendBitcoinTransaction(privateKey, recipient, amount);
			}

			toast.success(`Transaction sent! Hash: ${txHash.slice(0, 10)}...`);

			// Reset form
			recipient = '';
			amount = '';

			// Call success callback
			onSuccess();

			// Close modal
			isOpen = false;
		} catch (err: any) {
			error = err.message || 'Failed to send transaction';
			toast.error('Transaction failed');
		} finally {
			isLoading = false;
		}
	}
</script>

<Modal bind:isOpen title="Send {info.name}">
	<form on:submit={handleSubmit} class="space-y-4">
		{#if error}
			<Alert type="error" message={error} />
		{/if}

		<Alert
			type="warning"
			message="You are sending {info.symbol} on {info.name} testnet. Make sure the recipient address is correct."
		/>

		<Input
			label="Recipient Address"
			bind:value={recipient}
			placeholder={info.placeholder}
			required
		/>

		<Input
			type="number"
			step="0.000001"
			label="Amount ({info.symbol})"
			bind:value={amount}
			placeholder="0.001"
			required
		/>

		<div class="bg-gray-50 p-4 rounded-lg">
			<p class="text-sm text-gray-600 mb-2">Transaction Summary:</p>
			<div class="space-y-1">
				<div class="flex justify-between text-sm">
					<span class="text-gray-600">Amount:</span>
					<span class="font-semibold">{amount || '0'} {info.symbol}</span>
				</div>
				<div class="flex justify-between text-sm">
					<span class="text-gray-600">Network Fee:</span>
					<span class="font-semibold">~0.0001 {info.symbol}</span>
				</div>
				<div class="border-t border-gray-200 my-2"></div>
				<div class="flex justify-between text-sm">
					<span class="text-gray-600">Total:</span>
					<span class="font-bold"
						>~{(parseFloat(amount || '0') + 0.0001).toFixed(6)}
						{info.symbol}</span
					>
				</div>
			</div>
		</div>

		<div class="flex gap-3">
			<Button type="button" variant="outline" on:click={() => (isOpen = false)} class="flex-1" disabled={isLoading}>
				Cancel
			</Button>
			<Button type="submit" class="flex-1" loading={isLoading}>Send Transaction</Button>
		</div>
	</form>
</Modal>

