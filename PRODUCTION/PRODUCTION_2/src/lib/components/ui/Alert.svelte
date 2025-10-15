<script lang="ts">
	export let type: 'success' | 'error' | 'warning' | 'info' = 'info';
	export let message: string;
	export let onClose: (() => void) | undefined = undefined;

	const styles = {
		success: {
			bg: 'bg-green-50',
			border: 'border-green-200',
			text: 'text-green-800',
			icon: '✓'
		},
		error: {
			bg: 'bg-red-50',
			border: 'border-red-200',
			text: 'text-red-800',
			icon: '✕'
		},
		warning: {
			bg: 'bg-yellow-50',
			border: 'border-yellow-200',
			text: 'text-yellow-800',
			icon: '⚠'
		},
		info: {
			bg: 'bg-blue-50',
			border: 'border-blue-200',
			text: 'text-blue-800',
			icon: 'ℹ'
		}
	};

	$: style = styles[type];
</script>

<div class="{style.bg} {style.border} border rounded-lg p-4 flex items-start gap-3">
	<span class="{style.text} text-lg font-bold">{style.icon}</span>
	<p class="{style.text} flex-1 text-sm">{message}</p>
	{#if onClose}
		<button on:click={onClose} class="{style.text} hover:opacity-70">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	{/if}
</div>

