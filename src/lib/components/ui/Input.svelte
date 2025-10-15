<script lang="ts">
	/**
	 * 3Wallet Input Component
	 * Reusable input field with label and error support
	 */
	
	interface Props {
		type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
		label?: string;
		placeholder?: string;
		value?: string | number;
		error?: string;
		disabled?: boolean;
		required?: boolean;
		fullWidth?: boolean;
		class?: string;
		oninput?: (event: Event) => void;
		onchange?: (event: Event) => void;
	}
	
	let {
		type = 'text',
		label,
		placeholder,
		value = $bindable(''),
		error,
		disabled = false,
		required = false,
		fullWidth = true,
		class: className = '',
		oninput,
		onchange
	}: Props = $props();
	
	const baseClasses = 'px-4 py-2 bg-slate-800 border rounded-lg text-slate-100 placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed';
	
	const errorClasses = error
		? 'border-red-500 focus:ring-red-500'
		: 'border-slate-700';
	
	const widthClass = fullWidth ? 'w-full' : '';
	
	const inputClasses = `${baseClasses} ${errorClasses} ${widthClass} ${className}`;
</script>

<div class={fullWidth ? 'w-full' : ''}>
	{#if label}
		<label class="block text-sm font-medium text-slate-300 mb-2">
			{label}
			{#if required}
				<span class="text-red-500">*</span>
			{/if}
		</label>
	{/if}
	
	<input
		{type}
		{placeholder}
		{disabled}
		{required}
		bind:value
		class={inputClasses}
		oninput={oninput}
		onchange={onchange}
	/>
	
	{#if error}
		<p class="mt-1 text-sm text-red-500">{error}</p>
	{/if}
</div>

