<script lang="ts">
	export let label: string | undefined = undefined;
	export let error: string | undefined = undefined;
	export let helperText: string | undefined = undefined;
	export let value = '';
	export let type = 'text';
	export let placeholder = '';
	export let required = false;
	export let disabled = false;

	$: inputClasses = `
		w-full px-4 py-2 border rounded-lg
		focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
		disabled:bg-gray-100 disabled:cursor-not-allowed
		${error ? 'border-red-500' : 'border-gray-300'}
		${$$props.class || ''}
	`;
</script>

<div class="w-full">
	{#if label}
		<label class="block text-sm font-medium text-gray-700 mb-2">
			{label}
			{#if required}
				<span class="text-red-500 ml-1">*</span>
			{/if}
		</label>
	{/if}

	<input
		{type}
		{placeholder}
		{required}
		{disabled}
		bind:value
		class={inputClasses}
		on:input
		on:change
		on:blur
		on:focus
		{...$$restProps}
	/>

	{#if error}
		<p class="mt-1 text-sm text-red-600">{error}</p>
	{:else if helperText}
		<p class="mt-1 text-sm text-gray-500">{helperText}</p>
	{/if}
</div>

