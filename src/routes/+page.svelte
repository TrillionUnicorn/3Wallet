<script lang="ts">
	let walletBalance = $state({ eth: 2.45, btc: 0.0123, matic: 150.75 });
	let riskScore = $state(85);
	let selectedTier = $state('secure');

	const tiers = [
		{ id: 'hot', name: 'Hot Wallet', icon: '🔥', description: 'Quick access, higher risk' },
		{ id: 'secure', name: 'Secure Wallet', icon: '🔒', description: 'Balanced security' },
		{ id: 'cold', name: 'Cold Storage', icon: '❄️', description: 'Maximum security' }
	];
</script>

<svelte:head>
	<title>3Wallet - Multi-Chain Secure Wallet</title>
</svelte:head>

<div class="wallet-app">
	<header class="header">
		<h1>💰 3Wallet</h1>
		<p>Multi-Chain Secure Wallet</p>
	</header>

	<div class="wallet-grid">
		<div class="tier-selector">
			<h2>Security Tiers</h2>
			{#each tiers as tier}
				<button
					class="tier-card {selectedTier === tier.id ? 'selected' : ''}"
					onclick={() => selectedTier = tier.id}
				>
					<div class="tier-icon">{tier.icon}</div>
					<div class="tier-name">{tier.name}</div>
					<div class="tier-description">{tier.description}</div>
				</button>
			{/each}
		</div>

		<div class="balance-section">
			<h2>Portfolio Balance</h2>
			<div class="balance-cards">
				<div class="balance-card">
					<div class="crypto-icon">Ξ</div>
					<div class="crypto-name">Ethereum</div>
					<div class="crypto-balance">{walletBalance.eth} ETH</div>
				</div>
				<div class="balance-card">
					<div class="crypto-icon">₿</div>
					<div class="crypto-name">Bitcoin</div>
					<div class="crypto-balance">{walletBalance.btc} BTC</div>
				</div>
				<div class="balance-card">
					<div class="crypto-icon">◆</div>
					<div class="crypto-name">Polygon</div>
					<div class="crypto-balance">{walletBalance.matic} MATIC</div>
				</div>
			</div>
		</div>

		<div class="risk-analysis">
			<h2>AI Risk Analysis</h2>
			<div class="risk-score">
				<div class="score-circle">
					<div class="score-number">{riskScore}</div>
					<div class="score-label">Risk Score</div>
				</div>
				<div class="risk-details">
					<div class="risk-item">✅ Multi-sig enabled</div>
					<div class="risk-item">✅ Hardware wallet connected</div>
					<div class="risk-item">⚠️ High transaction frequency</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		min-height: 100vh;
	}

	.wallet-app {
		max-width: 1000px;
		margin: 0 auto;
		padding: 2rem;
	}

	.header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.header h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.wallet-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 2rem;
	}

	.tier-selector h2,
	.balance-section h2,
	.risk-analysis h2 {
		margin-bottom: 1rem;
		font-size: 1.25rem;
	}

	.tier-card {
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.75rem;
		padding: 1rem;
		margin-bottom: 0.75rem;
		cursor: pointer;
		transition: all 0.2s;
		color: white;
		text-align: center;
		width: 100%;
	}

	.tier-card:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.tier-card.selected {
		border-color: #60a5fa;
		background: rgba(96, 165, 250, 0.2);
	}

	.tier-icon {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.tier-name {
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.tier-description {
		font-size: 0.875rem;
		opacity: 0.8;
	}

	.balance-cards {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.balance-card {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 0.75rem;
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.crypto-icon {
		font-size: 1.5rem;
		font-weight: bold;
	}

	.crypto-name {
		flex: 1;
		font-weight: 500;
	}

	.crypto-balance {
		font-weight: 600;
	}

	.risk-score {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 0.75rem;
		padding: 1.5rem;
		text-align: center;
	}

	.score-circle {
		margin-bottom: 1rem;
	}

	.score-number {
		font-size: 2.5rem;
		font-weight: 700;
		color: #10b981;
	}

	.score-label {
		font-size: 0.875rem;
		opacity: 0.8;
	}

	.risk-details {
		text-align: left;
	}

	.risk-item {
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
	}

	@media (max-width: 768px) {
		.wallet-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
