<script lang="ts">
	/**
	 * 3Wallet Card Component
	 * Reusable card container with glass effect option
	 */
	
	interface Props {
		glass?: boolean;
		hover?: boolean;
		padding?: 'none' | 'sm' | 'md' | 'lg';
		children?: import('svelte').Snippet;
		class?: string;
	}
	
	let {
		glass = false,
		hover = false,
		padding = 'md',
		children,
		class: className = ''
	}: Props = $props();
	
	const baseClasses = 'rounded-xl transition-all duration-200';
	
	const glassClasses = glass
		? 'glass-effect'
		: 'bg-slate-800 border border-slate-700';
	
	const hoverClasses = hover
		? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer'
		: '';
	
	const paddingClasses = {
		none: '',
		sm: 'p-3',
		md: 'p-4',
		lg: 'p-6'
	};
	
	const classes = `${baseClasses} ${glassClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`;
</script>

<div class={classes}>
	{@render children?.()}
</div>

