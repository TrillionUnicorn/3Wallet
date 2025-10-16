<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let isOpen = false;
	export let title = '';
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

	const sizeStyles = {
		sm: 'max-w-md',
		md: 'max-w-lg',
		lg: 'max-w-2xl',
		xl: 'max-w-4xl'
	};

	function handleClose() {
		isOpen = false;
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	}

	$: if (isOpen) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = 'unset';
	}

	onDestroy(() => {
		document.body.style.overflow = 'unset';
	});
</script>

{#if isOpen}
	<div class="fixed inset-0 z-50 overflow-y-auto">
		<!-- Backdrop -->
		<div
			class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
			on:click={handleBackdropClick}
			on:keydown={(e) => e.key === 'Escape' && handleClose()}
			role="button"
			tabindex="0"
		/>

		<!-- Modal -->
		<div class="flex min-h-full items-center justify-center p-4">
			<div
				class="relative bg-white rounded-xl shadow-2xl w-full {sizeStyles[
					size
				]} transform transition-all"
			>
				<!-- Header -->
				<div class="flex items-center justify-between p-6 border-b border-gray-200">
					<h2 class="text-2xl font-bold text-gray-900">{title}</h2>
					<button
						on:click={handleClose}
						class="text-gray-400 hover:text-gray-600 transition-colors"
					>
						<svg
							class="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<!-- Content -->
				<div class="p-6">
					<slot />
				</slot>
			</div>
		</div>
	</div>
{/if}

