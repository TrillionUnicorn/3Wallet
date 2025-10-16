<script lang="ts">
	/**
	 * 3Wallet Modal Component
	 * Reusable modal dialog with backdrop
	 */
	
	interface Props {
		open?: boolean;
		title?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		onclose?: () => void;
		children?: import('svelte').Snippet;
		footer?: import('svelte').Snippet;
	}
	
	let {
		open = $bindable(false),
		title,
		size = 'md',
		onclose,
		children,
		footer
	}: Props = $props();
	
	const sizeClasses = {
		sm: 'max-w-md',
		md: 'max-w-lg',
		lg: 'max-w-2xl',
		xl: 'max-w-4xl'
	};
	
	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			close();
		}
	}
	
	function close() {
		open = false;
		onclose?.();
	}
	
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			close();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm animate-fade-in"
		onclick={handleBackdropClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? 'modal-title' : undefined}
		tabindex="-1"
	>
		<div class="bg-slate-900 rounded-xl shadow-2xl border border-slate-700 w-full {sizeClasses[size]} max-h-[90vh] overflow-hidden flex flex-col">
			<!-- Header -->
			{#if title}
				<div class="flex items-center justify-between p-6 border-b border-slate-700">
					<h2 id="modal-title" class="text-xl font-semibold text-slate-100">
						{title}
					</h2>
					<button
						onclick={close}
						class="text-slate-400 hover:text-slate-100 transition-colors"
						aria-label="Close modal"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			{/if}
			
			<!-- Content -->
			<div class="flex-1 overflow-y-auto p-6">
				{@render children?.()}
			</div>
			
			<!-- Footer -->
			{#if footer}
				<div class="p-6 border-t border-slate-700">
					{@render footer?.()}
				</div>
			{/if}
		</div>
	</div>
{/if}

