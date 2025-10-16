/**
 * 3Wallet Core Wallet Utilities
 * Wallet creation, import, and management functions
 */

import type { Wallet, WalletAccount, WalletTier, ChainType } from '$lib/types/wallet';
import { encrypt, decrypt } from './encryption';
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { HDKey } from '@scure/bip32';
import { privateKeyToAccount } from 'viem/accounts';
import { Keypair } from '@solana/web3.js';
import * as bitcoin from 'bitcoinjs-lib';

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY_PREFIX = '3wallet_';
const WALLET_STORAGE_KEY = `${STORAGE_KEY_PREFIX}wallets`;
const ACTIVE_WALLET_KEY = `${STORAGE_KEY_PREFIX}active_wallet`;

// Derivation paths
const DERIVATION_PATHS = {
	ethereum: "m/44'/60'/0'/0/0",
	bitcoin: "m/84'/0'/0'/0/0", // Native SegWit (bech32)
	solana: "m/44'/501'/0'/0'"
} as const;

// ============================================================================
// Wallet Creation
// ============================================================================

/**
 * Generate a new mnemonic phrase (12 words)
 */
export function generateMnemonicPhrase(): string {
	return generateMnemonic(wordlist, 128); // 128 bits = 12 words
}

/**
 * Validate mnemonic phrase
 */
export function isValidMnemonic(mnemonic: string): boolean {
	return validateMnemonic(mnemonic, wordlist);
}

/**
 * Create a new wallet with multi-chain support
 */
export async function createWallet(
	name: string,
	password: string,
	tier: WalletTier = 'personal',
	mnemonic?: string
): Promise<Wallet> {
	try {
		// Generate or validate mnemonic
		const mnemonicPhrase = mnemonic || generateMnemonicPhrase();
		
		if (!isValidMnemonic(mnemonicPhrase)) {
			throw new Error('Invalid mnemonic phrase');
		}
		
		// Generate seed from mnemonic
		const seed = mnemonicToSeedSync(mnemonicPhrase);
		
		// Create accounts for different chains
		const accounts: WalletAccount[] = [];
		
		// Ethereum account
		const ethAccount = await createEthereumAccount(seed);
		accounts.push(ethAccount);
		
		// Bitcoin account
		const btcAccount = await createBitcoinAccount(seed);
		accounts.push(btcAccount);
		
		// Solana account
		const solAccount = await createSolanaAccount(seed);
		accounts.push(solAccount);
		
		// Encrypt mnemonic
		const encryptedMnemonic = await encrypt(mnemonicPhrase, password);
		
		// Create wallet object
		const wallet: Wallet = {
			id: generateWalletId(),
			name,
			tier,
			accounts,
			encryptedMnemonic: JSON.stringify(encryptedMnemonic),
			createdAt: Date.now(),
			updatedAt: Date.now(),
			isLocked: false
		};
		
		return wallet;
	} catch (error) {
		console.error('Wallet creation error:', error);
		throw new Error('Failed to create wallet');
	}
}

/**
 * Create Ethereum account from seed
 */
async function createEthereumAccount(seed: Uint8Array): Promise<WalletAccount> {
	const hdKey = HDKey.fromMasterSeed(seed);
	const derivedKey = hdKey.derive(DERIVATION_PATHS.ethereum);
	
	if (!derivedKey.privateKey) {
		throw new Error('Failed to derive Ethereum private key');
	}
	
	const account = privateKeyToAccount(`0x${Buffer.from(derivedKey.privateKey).toString('hex')}`);
	
	return {
		address: account.address,
		publicKey: `0x${Buffer.from(derivedKey.publicKey!).toString('hex')}`,
		chainType: 'ethereum',
		derivationPath: DERIVATION_PATHS.ethereum,
		label: 'Ethereum Account',
		createdAt: Date.now()
	};
}

/**
 * Create Bitcoin account from seed
 */
async function createBitcoinAccount(seed: Uint8Array): Promise<WalletAccount> {
	const hdKey = HDKey.fromMasterSeed(seed);
	const derivedKey = hdKey.derive(DERIVATION_PATHS.bitcoin);
	
	if (!derivedKey.privateKey || !derivedKey.publicKey) {
		throw new Error('Failed to derive Bitcoin keys');
	}
	
	// Create P2WPKH (Native SegWit) address
	const { address } = bitcoin.payments.p2wpkh({
		pubkey: Buffer.from(derivedKey.publicKey),
		network: bitcoin.networks.testnet // Use testnet for MVP
	});
	
	if (!address) {
		throw new Error('Failed to generate Bitcoin address');
	}
	
	return {
		address,
		publicKey: Buffer.from(derivedKey.publicKey).toString('hex'),
		chainType: 'bitcoin',
		derivationPath: DERIVATION_PATHS.bitcoin,
		label: 'Bitcoin Account',
		createdAt: Date.now()
	};
}

/**
 * Create Solana account from seed
 */
async function createSolanaAccount(seed: Uint8Array): Promise<WalletAccount> {
	const hdKey = HDKey.fromMasterSeed(seed);
	const derivedKey = hdKey.derive(DERIVATION_PATHS.solana);
	
	if (!derivedKey.privateKey) {
		throw new Error('Failed to derive Solana private key');
	}
	
	// Solana uses the first 32 bytes of the derived key
	const keypair = Keypair.fromSeed(derivedKey.privateKey.slice(0, 32));
	
	return {
		address: keypair.publicKey.toBase58(),
		publicKey: keypair.publicKey.toBase58(),
		chainType: 'solana',
		derivationPath: DERIVATION_PATHS.solana,
		label: 'Solana Account',
		createdAt: Date.now()
	};
}

// ============================================================================
// Wallet Storage
// ============================================================================

/**
 * Save wallet to localStorage
 */
export async function saveWallet(wallet: Wallet, password: string): Promise<void> {
	try {
		// Get existing wallets
		const wallets = await getAllWallets(password);
		
		// Add or update wallet
		const index = wallets.findIndex(w => w.id === wallet.id);
		if (index >= 0) {
			wallets[index] = wallet;
		} else {
			wallets.push(wallet);
		}
		
		// Encrypt and save
		const encrypted = await encrypt(JSON.stringify(wallets), password);
		localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(encrypted));
		
		// Set as active wallet if it's the only one
		if (wallets.length === 1) {
			setActiveWallet(wallet.id);
		}
	} catch (error) {
		console.error('Save wallet error:', error);
		throw new Error('Failed to save wallet');
	}
}

/**
 * Get all wallets from localStorage
 */
export async function getAllWallets(password: string): Promise<Wallet[]> {
	try {
		const stored = localStorage.getItem(WALLET_STORAGE_KEY);
		if (!stored) return [];
		
		const encrypted = JSON.parse(stored);
		const decrypted = await decrypt(encrypted, password);
		return JSON.parse(decrypted);
	} catch (error) {
		console.error('Get wallets error:', error);
		return [];
	}
}

/**
 * Get wallet by ID
 */
export async function getWalletById(id: string, password: string): Promise<Wallet | null> {
	const wallets = await getAllWallets(password);
	return wallets.find(w => w.id === id) || null;
}

/**
 * Delete wallet
 */
export async function deleteWallet(id: string, password: string): Promise<void> {
	try {
		const wallets = await getAllWallets(password);
		const filtered = wallets.filter(w => w.id !== id);
		
		if (filtered.length === 0) {
			localStorage.removeItem(WALLET_STORAGE_KEY);
			localStorage.removeItem(ACTIVE_WALLET_KEY);
		} else {
			const encrypted = await encrypt(JSON.stringify(filtered), password);
			localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(encrypted));
			
			// Update active wallet if deleted
			const activeId = getActiveWalletId();
			if (activeId === id) {
				setActiveWallet(filtered[0].id);
			}
		}
	} catch (error) {
		console.error('Delete wallet error:', error);
		throw new Error('Failed to delete wallet');
	}
}

// ============================================================================
// Active Wallet Management
// ============================================================================

/**
 * Set active wallet
 */
export function setActiveWallet(id: string): void {
	localStorage.setItem(ACTIVE_WALLET_KEY, id);
}

/**
 * Get active wallet ID
 */
export function getActiveWalletId(): string | null {
	return localStorage.getItem(ACTIVE_WALLET_KEY);
}

/**
 * Get active wallet
 */
export async function getActiveWallet(password: string): Promise<Wallet | null> {
	const id = getActiveWalletId();
	if (!id) return null;
	return getWalletById(id, password);
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate unique wallet ID
 */
function generateWalletId(): string {
	return `wallet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get account for specific chain
 */
export function getAccountForChain(wallet: Wallet, chainType: ChainType): WalletAccount | null {
	return wallet.accounts.find(acc => acc.chainType === chainType) || null;
}

/**
 * Check if wallet has account for chain
 */
export function hasAccountForChain(wallet: Wallet, chainType: ChainType): boolean {
	return wallet.accounts.some(acc => acc.chainType === chainType);
}

/**
 * Export wallet mnemonic (requires password)
 */
export async function exportMnemonic(wallet: Wallet, password: string): Promise<string> {
	if (!wallet.encryptedMnemonic) {
		throw new Error('Wallet does not have a mnemonic');
	}
	
	try {
		const encrypted = JSON.parse(wallet.encryptedMnemonic);
		return await decrypt(encrypted, password);
	} catch (error) {
		console.error('Export mnemonic error:', error);
		throw new Error('Failed to export mnemonic - incorrect password');
	}
}

