<script lang="ts">
	export let padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

	const paddingStyles = {
		none: '',
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8'
	};

	$: classes = `bg-white rounded-xl shadow-lg border border-gray-200 ${paddingStyles[padding]} ${$$props.class || ''}`;
</script>

<div class={classes}>
	<slot />
</div>

