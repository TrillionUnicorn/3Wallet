<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'outline' | 'danger' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let loading = false;
	export let disabled = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';

	const baseStyles =
		'font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

	const variantStyles = {
		primary: 'bg-primary hover:bg-primary-dark text-white',
		secondary: 'bg-secondary hover:bg-secondary-dark text-white',
		outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
		danger: 'bg-red-600 hover:bg-red-700 text-white'
	};

	const sizeStyles = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	};

	$: classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${$$props.class || ''}`;
</script>

<button {type} class={classes} disabled={disabled || loading} on:click>
	{#if loading}
		<span class="flex items-center gap-2">
			<svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
				<circle
					class="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
					fill="none"
				/>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
			Loading...
		</span>
	{:else}
		<slot />
	{/if}
</button>

