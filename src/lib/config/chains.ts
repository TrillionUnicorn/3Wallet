/**
 * 3Wallet Blockchain Chain Configurations
 * Supports Ethereum, Bitcoin, Solana, and other major chains
 */

import type { ChainConfig } from '$lib/types/wallet';

// ============================================================================
// Ethereum & EVM Chains
// ============================================================================

export const ETHEREUM_MAINNET: ChainConfig = {
	id: 'ethereum',
	name: 'Ethereum',
	type: 'ethereum',
	network: 'mainnet',
	chainId: 1,
	rpcUrl: 'https://eth.llamarpc.com',
	explorerUrl: 'https://etherscan.io',
	nativeCurrency: {
		name: 'Ether',
		symbol: 'ETH',
		decimals: 18
	},
	icon: 'Ξ',
	enabled: true
};

export const ETHEREUM_SEPOLIA: ChainConfig = {
	id: 'ethereum-sepolia',
	name: 'Ethereum Sepolia',
	type: 'ethereum',
	network: 'testnet',
	chainId: 11155111,
	rpcUrl: 'https://rpc.sepolia.org',
	explorerUrl: 'https://sepolia.etherscan.io',
	nativeCurrency: {
		name: 'Sepolia Ether',
		symbol: 'ETH',
		decimals: 18
	},
	icon: 'Ξ',
	enabled: true
};

export const POLYGON_MAINNET: ChainConfig = {
	id: 'polygon',
	name: 'Polygon',
	type: 'polygon',
	network: 'mainnet',
	chainId: 137,
	rpcUrl: 'https://polygon-rpc.com',
	explorerUrl: 'https://polygonscan.com',
	nativeCurrency: {
		name: 'MATIC',
		symbol: 'MATIC',
		decimals: 18
	},
	icon: '◆',
	enabled: true
};

export const BSC_MAINNET: ChainConfig = {
	id: 'bsc',
	name: 'BNB Smart Chain',
	type: 'bsc',
	network: 'mainnet',
	chainId: 56,
	rpcUrl: 'https://bsc-dataseed.binance.org',
	explorerUrl: 'https://bscscan.com',
	nativeCurrency: {
		name: 'BNB',
		symbol: 'BNB',
		decimals: 18
	},
	icon: '🔶',
	enabled: true
};

export const AVALANCHE_MAINNET: ChainConfig = {
	id: 'avalanche',
	name: 'Avalanche C-Chain',
	type: 'avalanche',
	network: 'mainnet',
	chainId: 43114,
	rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
	explorerUrl: 'https://snowtrace.io',
	nativeCurrency: {
		name: 'AVAX',
		symbol: 'AVAX',
		decimals: 18
	},
	icon: '🔺',
	enabled: true
};

// ============================================================================
// Bitcoin
// ============================================================================

export const BITCOIN_MAINNET: ChainConfig = {
	id: 'bitcoin',
	name: 'Bitcoin',
	type: 'bitcoin',
	network: 'mainnet',
	rpcUrl: 'https://blockstream.info/api',
	explorerUrl: 'https://blockstream.info',
	nativeCurrency: {
		name: 'Bitcoin',
		symbol: 'BTC',
		decimals: 8
	},
	icon: '₿',
	enabled: true
};

export const BITCOIN_TESTNET: ChainConfig = {
	id: 'bitcoin-testnet',
	name: 'Bitcoin Testnet',
	type: 'bitcoin',
	network: 'testnet',
	rpcUrl: 'https://blockstream.info/testnet/api',
	explorerUrl: 'https://blockstream.info/testnet',
	nativeCurrency: {
		name: 'Test Bitcoin',
		symbol: 'tBTC',
		decimals: 8
	},
	icon: '₿',
	enabled: true
};

// ============================================================================
// Solana
// ============================================================================

export const SOLANA_MAINNET: ChainConfig = {
	id: 'solana',
	name: 'Solana',
	type: 'solana',
	network: 'mainnet',
	rpcUrl: 'https://api.mainnet-beta.solana.com',
	explorerUrl: 'https://explorer.solana.com',
	nativeCurrency: {
		name: 'SOL',
		symbol: 'SOL',
		decimals: 9
	},
	icon: '◎',
	enabled: true
};

export const SOLANA_DEVNET: ChainConfig = {
	id: 'solana-devnet',
	name: 'Solana Devnet',
	type: 'solana',
	network: 'devnet',
	rpcUrl: 'https://api.devnet.solana.com',
	explorerUrl: 'https://explorer.solana.com?cluster=devnet',
	nativeCurrency: {
		name: 'SOL',
		symbol: 'SOL',
		decimals: 9
	},
	icon: '◎',
	enabled: true
};

// ============================================================================
// Chain Registry
// ============================================================================

export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
	// Ethereum
	'ethereum': ETHEREUM_MAINNET,
	'ethereum-sepolia': ETHEREUM_SEPOLIA,
	
	// Polygon
	'polygon': POLYGON_MAINNET,
	
	// BSC
	'bsc': BSC_MAINNET,
	
	// Avalanche
	'avalanche': AVALANCHE_MAINNET,
	
	// Bitcoin
	'bitcoin': BITCOIN_MAINNET,
	'bitcoin-testnet': BITCOIN_TESTNET,
	
	// Solana
	'solana': SOLANA_MAINNET,
	'solana-devnet': SOLANA_DEVNET
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get chain configuration by ID
 */
export function getChainConfig(chainId: string): ChainConfig | undefined {
	return SUPPORTED_CHAINS[chainId];
}

/**
 * Get all enabled chains
 */
export function getEnabledChains(): ChainConfig[] {
	return Object.values(SUPPORTED_CHAINS).filter(chain => chain.enabled);
}

/**
 * Get chains by network type
 */
export function getChainsByNetwork(network: 'mainnet' | 'testnet' | 'devnet'): ChainConfig[] {
	return Object.values(SUPPORTED_CHAINS).filter(
		chain => chain.network === network && chain.enabled
	);
}

/**
 * Get mainnet chains only
 */
export function getMainnetChains(): ChainConfig[] {
	return getChainsByNetwork('mainnet');
}

/**
 * Get testnet chains only
 */
export function getTestnetChains(): ChainConfig[] {
	return getChainsByNetwork('testnet').concat(getChainsByNetwork('devnet'));
}

/**
 * Check if chain is EVM compatible
 */
export function isEVMChain(chainType: string): boolean {
	return ['ethereum', 'polygon', 'bsc', 'avalanche'].includes(chainType);
}

/**
 * Get chain by EVM chain ID
 */
export function getChainByChainId(chainId: number): ChainConfig | undefined {
	return Object.values(SUPPORTED_CHAINS).find(chain => chain.chainId === chainId);
}

/**
 * Format chain name for display
 */
export function formatChainName(chainId: string): string {
	const chain = getChainConfig(chainId);
	return chain ? chain.name : chainId;
}

/**
 * Get chain icon
 */
export function getChainIcon(chainId: string): string {
	const chain = getChainConfig(chainId);
	return chain ? chain.icon : '🔗';
}

/**
 * Get explorer URL for address
 */
export function getExplorerAddressUrl(chainId: string, address: string): string {
	const chain = getChainConfig(chainId);
	if (!chain) return '';
	return `${chain.explorerUrl}/address/${address}`;
}

/**
 * Get explorer URL for transaction
 */
export function getExplorerTxUrl(chainId: string, txHash: string): string {
	const chain = getChainConfig(chainId);
	if (!chain) return '';
	return `${chain.explorerUrl}/tx/${txHash}`;
}

// ============================================================================
// Constants
// ============================================================================

export const DEFAULT_CHAIN = 'ethereum-sepolia'; // Use testnet by default for MVP

export const CHAIN_COLORS: Record<string, string> = {
	ethereum: '#627EEA',
	polygon: '#8247E5',
	bsc: '#F3BA2F',
	avalanche: '#E84142',
	bitcoin: '#F7931A',
	solana: '#14F195'
};

