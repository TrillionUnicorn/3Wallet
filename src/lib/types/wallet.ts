/**
 * 3Wallet TypeScript Type Definitions
 * Comprehensive type system for multi-chain wallet functionality
 */

// ============================================================================
// Chain & Network Types
// ============================================================================

export type ChainType = 'ethereum' | 'bitcoin' | 'solana' | 'polygon' | 'bsc' | 'avalanche';

export type NetworkType = 'mainnet' | 'testnet' | 'devnet';

export interface ChainConfig {
	id: string;
	name: string;
	type: ChainType;
	network: NetworkType;
	rpcUrl: string;
	explorerUrl: string;
	nativeCurrency: {
		name: string;
		symbol: string;
		decimals: number;
	};
	chainId?: number; // For EVM chains
	icon: string;
	enabled: boolean;
}

// ============================================================================
// Wallet Types
// ============================================================================

export type WalletTier = 'personal' | 'professional' | 'enterprise';

export interface WalletAccount {
	address: string;
	publicKey: string;
	chainType: ChainType;
	derivationPath?: string;
	label?: string;
	createdAt: number;
}

export interface Wallet {
	id: string;
	name: string;
	tier: WalletTier;
	accounts: WalletAccount[];
	encryptedMnemonic?: string; // Encrypted seed phrase
	createdAt: number;
	updatedAt: number;
	isLocked: boolean;
}

export interface WalletBalance {
	address: string;
	chainType: ChainType;
	balance: string; // String to handle large numbers
	balanceUSD: number;
	symbol: string;
	decimals: number;
	lastUpdated: number;
}

export interface TokenBalance {
	address: string;
	chainType: ChainType;
	tokenAddress: string;
	tokenName: string;
	tokenSymbol: string;
	balance: string;
	balanceUSD: number;
	decimals: number;
	logoUrl?: string;
}

// ============================================================================
// Transaction Types
// ============================================================================

export type TransactionStatus = 'pending' | 'confirmed' | 'failed' | 'cancelled';

export type TransactionType = 'send' | 'receive' | 'swap' | 'contract';

export interface Transaction {
	id: string;
	hash: string;
	chainType: ChainType;
	type: TransactionType;
	status: TransactionStatus;
	from: string;
	to: string;
	value: string;
	valueUSD: number;
	fee: string;
	feeUSD: number;
	timestamp: number;
	confirmations: number;
	blockNumber?: number;
	data?: string;
	error?: string;
}

export interface TransactionRequest {
	chainType: ChainType;
	from: string;
	to: string;
	value: string;
	data?: string;
	gasLimit?: string;
	gasPrice?: string;
	maxFeePerGas?: string;
	maxPriorityFeePerGas?: string;
	nonce?: number;
}

// ============================================================================
// Security Types
// ============================================================================

export interface MultiSigConfig {
	threshold: number; // Required signatures
	signers: string[]; // Array of signer addresses
	chainType: ChainType;
	contractAddress?: string;
}

export interface SecuritySettings {
	tier: WalletTier;
	multiSig?: MultiSigConfig;
	biometricEnabled: boolean;
	hardwareWalletConnected: boolean;
	autoLockTimeout: number; // Minutes
	requirePasswordForTransactions: boolean;
	maxTransactionAmount?: number; // USD
}

export interface RiskAnalysis {
	score: number; // 0-100, higher is safer
	level: 'low' | 'medium' | 'high' | 'critical';
	factors: RiskFactor[];
	recommendations: string[];
	timestamp: number;
}

export interface RiskFactor {
	type: 'phishing' | 'high_value' | 'new_address' | 'suspicious_contract' | 'unusual_activity';
	severity: 'low' | 'medium' | 'high';
	description: string;
	detected: boolean;
}

// ============================================================================
// UI State Types
// ============================================================================

export interface WalletUIState {
	selectedChain: ChainType;
	selectedAccount: string | null;
	isConnected: boolean;
	isLoading: boolean;
	error: string | null;
	showSidebar: boolean;
	theme: 'light' | 'dark';
}

export interface FormState<T> {
	data: T;
	errors: Partial<Record<keyof T, string>>;
	isSubmitting: boolean;
	isValid: boolean;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: {
		code: string;
		message: string;
		details?: unknown;
	};
	timestamp: number;
}

export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	pageSize: number;
	hasMore: boolean;
}

// ============================================================================
// Encryption Types
// ============================================================================

export interface EncryptedData {
	ciphertext: string;
	iv: string;
	salt: string;
	algorithm: 'AES-256-GCM';
}

export interface KeyPair {
	publicKey: string;
	privateKey: string; // Should always be encrypted when stored
}

// ============================================================================
// Waitlist & Contact Types
// ============================================================================

export interface WaitlistEntry {
	email: string;
	name?: string;
	company?: string;
	useCase?: string;
	tier?: WalletTier;
	referralSource?: string;
	timestamp: number;
}

export interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
	timestamp: number;
}

// ============================================================================
// Chart & Analytics Types
// ============================================================================

export interface PricePoint {
	timestamp: number;
	price: number;
	volume?: number;
}

export interface PortfolioSnapshot {
	timestamp: number;
	totalValueUSD: number;
	balances: WalletBalance[];
	tokens: TokenBalance[];
}

export interface ChartData {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		borderColor?: string;
		backgroundColor?: string;
	}[];
}

// ============================================================================
// Utility Types
// ============================================================================

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type AsyncResult<T, E = Error> = Promise<{ ok: true; value: T } | { ok: false; error: E }>;

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepReadonly<T> = {
	readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

