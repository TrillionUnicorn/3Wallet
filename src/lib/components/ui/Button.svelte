<script lang="ts">
	/**
	 * 3Wallet Button Component
	 * Reusable button with multiple variants and sizes
	 */
	
	interface Props {
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		loading?: boolean;
		fullWidth?: boolean;
		type?: 'button' | 'submit' | 'reset';
		onclick?: (event: MouseEvent) => void;
		children?: import('svelte').Snippet;
		class?: string;
	}
	
	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		loading = false,
		fullWidth = false,
		type = 'button',
		onclick,
		children,
		class: className = ''
	}: Props = $props();
	
	const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
	
	const variantClasses = {
		primary: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
		secondary: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500',
		outline: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 focus:ring-emerald-500',
		ghost: 'text-slate-300 hover:bg-slate-800 focus:ring-slate-500',
		danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
	};
	
	const sizeClasses = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	};
	
	const widthClass = fullWidth ? 'w-full' : '';
	
	const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
</script>

<button
	{type}
	class={classes}
	disabled={disabled || loading}
	onclick={onclick}
>
	{#if loading}
		<svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
	{/if}
	{@render children?.()}
</button>

