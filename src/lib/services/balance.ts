/**
 * 3Wallet Balance Service
 * Fetch balances for different blockchain networks
 */

import type { WalletBalance, ChainType } from '$lib/types/wallet';
import { getChainConfig } from '$lib/config/chains';
import { createPublicClient, http, formatEther, type Address } from 'viem';
import { mainnet, sepolia, polygon, bsc, avalanche } from 'viem/chains';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

// ============================================================================
// Chain Clients
// ============================================================================

/**
 * Get Viem chain configuration
 */
function getViemChain(chainType: ChainType) {
	switch (chainType) {
		case 'ethereum':
			return sepolia; // Use testnet for MVP
		case 'polygon':
			return polygon;
		case 'bsc':
			return bsc;
		case 'avalanche':
			return avalanche;
		default:
			return sepolia;
	}
}

/**
 * Create public client for EVM chains
 */
function createEVMClient(chainType: ChainType) {
	const chainConfig = getChainConfig(chainType === 'ethereum' ? 'ethereum-sepolia' : chainType);
	if (!chainConfig) throw new Error(`Chain config not found for ${chainType}`);
	
	return createPublicClient({
		chain: getViemChain(chainType),
		transport: http(chainConfig.rpcUrl)
	});
}

// ============================================================================
// Balance Fetching Functions
// ============================================================================

/**
 * Fetch Ethereum balance
 */
export async function fetchEthereumBalance(address: string): Promise<WalletBalance> {
	try {
		const client = createEVMClient('ethereum');
		const balance = await client.getBalance({ address: address as Address });
		
		const balanceInEth = formatEther(balance);
		const balanceUSD = parseFloat(balanceInEth) * 2000; // Mock price, replace with real API
		
		return {
			address,
			chainType: 'ethereum',
			balance: balanceInEth,
			balanceUSD,
			symbol: 'ETH',
			decimals: 18,
			lastUpdated: Date.now()
		};
	} catch (error) {
		console.error('Ethereum balance fetch error:', error);
		return {
			address,
			chainType: 'ethereum',
			balance: '0',
			balanceUSD: 0,
			symbol: 'ETH',
			decimals: 18,
			lastUpdated: Date.now()
		};
	}
}

/**
 * Fetch Polygon balance
 */
export async function fetchPolygonBalance(address: string): Promise<WalletBalance> {
	try {
		const client = createEVMClient('polygon');
		const balance = await client.getBalance({ address: address as Address });
		
		const balanceInMatic = formatEther(balance);
		const balanceUSD = parseFloat(balanceInMatic) * 0.8; // Mock price
		
		return {
			address,
			chainType: 'polygon',
			balance: balanceInMatic,
			balanceUSD,
			symbol: 'MATIC',
			decimals: 18,
			lastUpdated: Date.now()
		};
	} catch (error) {
		console.error('Polygon balance fetch error:', error);
		return {
			address,
			chainType: 'polygon',
			balance: '0',
			balanceUSD: 0,
			symbol: 'MATIC',
			decimals: 18,
			lastUpdated: Date.now()
		};
	}
}

/**
 * Fetch Bitcoin balance
 */
export async function fetchBitcoinBalance(address: string): Promise<WalletBalance> {
	try {
		const chainConfig = getChainConfig('bitcoin-testnet');
		if (!chainConfig) throw new Error('Bitcoin config not found');
		
		// Fetch from Blockstream API
		const response = await fetch(`${chainConfig.rpcUrl}/address/${address}`);
		const data = await response.json();
		
		const balanceInSats = data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum;
		const balanceInBTC = balanceInSats / 100000000; // Convert satoshis to BTC
		const balanceUSD = balanceInBTC * 40000; // Mock price
		
		return {
			address,
			chainType: 'bitcoin',
			balance: balanceInBTC.toString(),
			balanceUSD,
			symbol: 'BTC',
			decimals: 8,
			lastUpdated: Date.now()
		};
	} catch (error) {
		console.error('Bitcoin balance fetch error:', error);
		return {
			address,
			chainType: 'bitcoin',
			balance: '0',
			balanceUSD: 0,
			symbol: 'BTC',
			decimals: 8,
			lastUpdated: Date.now()
		};
	}
}

/**
 * Fetch Solana balance
 */
export async function fetchSolanaBalance(address: string): Promise<WalletBalance> {
	try {
		const chainConfig = getChainConfig('solana-devnet');
		if (!chainConfig) throw new Error('Solana config not found');
		
		const connection = new Connection(chainConfig.rpcUrl, 'confirmed');
		const publicKey = new PublicKey(address);
		const balance = await connection.getBalance(publicKey);
		
		const balanceInSOL = balance / LAMPORTS_PER_SOL;
		const balanceUSD = balanceInSOL * 100; // Mock price
		
		return {
			address,
			chainType: 'solana',
			balance: balanceInSOL.toString(),
			balanceUSD,
			symbol: 'SOL',
			decimals: 9,
			lastUpdated: Date.now()
		};
	} catch (error) {
		console.error('Solana balance fetch error:', error);
		return {
			address,
			chainType: 'solana',
			balance: '0',
			balanceUSD: 0,
			symbol: 'SOL',
			decimals: 9,
			lastUpdated: Date.now()
		};
	}
}

/**
 * Fetch balance for any supported chain
 */
export async function fetchBalance(address: string, chainType: ChainType): Promise<WalletBalance> {
	switch (chainType) {
		case 'ethereum':
			return fetchEthereumBalance(address);
		case 'polygon':
			return fetchPolygonBalance(address);
		case 'bitcoin':
			return fetchBitcoinBalance(address);
		case 'solana':
			return fetchSolanaBalance(address);
		case 'bsc':
		case 'avalanche':
			// Use EVM client for other EVM chains
			try {
				const client = createEVMClient(chainType);
				const balance = await client.getBalance({ address: address as Address });
				const balanceInEth = formatEther(balance);
				
				return {
					address,
					chainType,
					balance: balanceInEth,
					balanceUSD: 0,
					symbol: chainType === 'bsc' ? 'BNB' : 'AVAX',
					decimals: 18,
					lastUpdated: Date.now()
				};
			} catch (error) {
				console.error(`${chainType} balance fetch error:`, error);
				return {
					address,
					chainType,
					balance: '0',
					balanceUSD: 0,
					symbol: chainType === 'bsc' ? 'BNB' : 'AVAX',
					decimals: 18,
					lastUpdated: Date.now()
				};
			}
		default:
			throw new Error(`Unsupported chain type: ${chainType}`);
	}
}

/**
 * Fetch balances for multiple chains
 */
export async function fetchMultiChainBalances(
	address: string,
	chainTypes: ChainType[]
): Promise<WalletBalance[]> {
	const promises = chainTypes.map(chainType => fetchBalance(address, chainType));
	return Promise.all(promises);
}

/**
 * Calculate total portfolio value in USD
 */
export function calculateTotalValue(balances: WalletBalance[]): number {
	return balances.reduce((total, balance) => total + balance.balanceUSD, 0);
}

/**
 * Format balance for display
 */
export function formatBalance(balance: string, decimals: number = 4): string {
	const num = parseFloat(balance);
	if (num === 0) return '0';
	if (num < 0.0001) return '< 0.0001';
	return num.toFixed(decimals);
}

/**
 * Format USD value for display
 */
export function formatUSD(value: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(value);
}

