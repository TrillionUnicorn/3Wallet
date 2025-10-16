import { ethers } from 'ethers';
import * as bip39 from 'bip39';

export interface EthereumWallet {
	address: string;
	privateKey: string;
	mnemonic: string;
}

/**
 * Create a new Ethereum wallet
 */
export function createEthereumWallet(): EthereumWallet {
	// Generate mnemonic
	const mnemonic = bip39.generateMnemonic();

	// Create wallet from mnemonic
	const wallet = ethers.Wallet.fromPhrase(mnemonic);

	return {
		address: wallet.address,
		privateKey: wallet.privateKey,
		mnemonic
	};
}

/**
 * Import Ethereum wallet from mnemonic
 */
export function importEthereumWallet(mnemonic: string): EthereumWallet {
	if (!bip39.validateMnemonic(mnemonic)) {
		throw new Error('Invalid mnemonic phrase');
	}

	const wallet = ethers.Wallet.fromPhrase(mnemonic);

	return {
		address: wallet.address,
		privateKey: wallet.privateKey,
		mnemonic
	};
}

/**
 * Get Ethereum balance
 */
export async function getEthereumBalance(address: string): Promise<string> {
	try {
		const rpcUrl =
			import.meta.env.PUBLIC_ETHEREUM_RPC || 'https://eth-sepolia.g.alchemy.com/v2/demo';
		const provider = new ethers.JsonRpcProvider(rpcUrl);
		const balance = await provider.getBalance(address);
		return ethers.formatEther(balance);
	} catch (error) {
		console.error('Error fetching Ethereum balance:', error);
		return '0';
	}
}

/**
 * Send Ethereum transaction
 */
export async function sendEthereumTransaction(
	privateKey: string,
	to: string,
	amount: string
): Promise<string> {
	const rpcUrl =
		import.meta.env.PUBLIC_ETHEREUM_RPC || 'https://eth-sepolia.g.alchemy.com/v2/demo';
	const provider = new ethers.JsonRpcProvider(rpcUrl);
	const wallet = new ethers.Wallet(privateKey, provider);

	const tx = await wallet.sendTransaction({
		to,
		value: ethers.parseEther(amount)
	});

	await tx.wait();
	return tx.hash;
}

