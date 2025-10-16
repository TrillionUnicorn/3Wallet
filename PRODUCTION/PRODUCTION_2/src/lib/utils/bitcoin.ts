import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';

const bip32 = BIP32Factory(ecc);
const ECPair = ECPairFactory(ecc);

export interface BitcoinWallet {
	address: string;
	privateKey: string;
	mnemonic: string;
}

/**
 * Create a new Bitcoin wallet (testnet)
 */
export function createBitcoinWallet(): BitcoinWallet {
	// Generate mnemonic
	const mnemonic = bip39.generateMnemonic();

	// Create seed from mnemonic
	const seed = bip39.mnemonicToSeedSync(mnemonic);

	// Create root key
	const root = bip32.fromSeed(seed, bitcoin.networks.testnet);

	// Derive first account (m/44'/1'/0'/0/0 for testnet)
	const child = root.derivePath("m/44'/1'/0'/0/0");

	// Get address
	const { address } = bitcoin.payments.p2pkh({
		pubkey: child.publicKey,
		network: bitcoin.networks.testnet
	});

	if (!address) {
		throw new Error('Failed to generate Bitcoin address');
	}

	return {
		address,
		privateKey: child.toWIF(),
		mnemonic
	};
}

/**
 * Import Bitcoin wallet from mnemonic
 */
export function importBitcoinWallet(mnemonic: string): BitcoinWallet {
	if (!bip39.validateMnemonic(mnemonic)) {
		throw new Error('Invalid mnemonic phrase');
	}

	const seed = bip39.mnemonicToSeedSync(mnemonic);
	const root = bip32.fromSeed(seed, bitcoin.networks.testnet);
	const child = root.derivePath("m/44'/1'/0'/0/0");

	const { address } = bitcoin.payments.p2pkh({
		pubkey: child.publicKey,
		network: bitcoin.networks.testnet
	});

	if (!address) {
		throw new Error('Failed to generate Bitcoin address');
	}

	return {
		address,
		privateKey: child.toWIF(),
		mnemonic
	};
}

/**
 * Get Bitcoin balance
 */
export async function getBitcoinBalance(address: string): Promise<string> {
	try {
		const apiUrl =
			import.meta.env.PUBLIC_BITCOIN_API || 'https://blockstream.info/testnet/api';
		const response = await fetch(`${apiUrl}/address/${address}`);
		const data = await response.json();

		// Convert satoshis to BTC
		const balance =
			(data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum) / 100000000;
		return balance.toFixed(8);
	} catch (error) {
		console.error('Error fetching Bitcoin balance:', error);
		return '0';
	}
}

/**
 * Get UTXOs for an address
 */
async function getUTXOs(address: string): Promise<any[]> {
	const apiUrl = import.meta.env.PUBLIC_BITCOIN_API || 'https://blockstream.info/testnet/api';
	const response = await fetch(`${apiUrl}/address/${address}/utxo`);
	return await response.json();
}

/**
 * Broadcast Bitcoin transaction
 */
async function broadcastTransaction(txHex: string): Promise<string> {
	const apiUrl = import.meta.env.PUBLIC_BITCOIN_API || 'https://blockstream.info/testnet/api';
	const response = await fetch(`${apiUrl}/tx`, {
		method: 'POST',
		body: txHex
	});
	return await response.text();
}

/**
 * Send Bitcoin transaction
 */
export async function sendBitcoinTransaction(
	privateKeyWIF: string,
	toAddress: string,
	amount: string
): Promise<string> {
	// Import private key
	const keyPair = ECPair.fromWIF(privateKeyWIF, bitcoin.networks.testnet);

	// Get sender address
	const { address: fromAddress } = bitcoin.payments.p2pkh({
		pubkey: keyPair.publicKey,
		network: bitcoin.networks.testnet
	});

	if (!fromAddress) {
		throw new Error('Failed to derive address from private key');
	}

	// Get UTXOs
	const utxos = await getUTXOs(fromAddress);

	if (utxos.length === 0) {
		throw new Error('No UTXOs available');
	}

	// Convert amount to satoshis
	const amountSatoshis = Math.floor(parseFloat(amount) * 100000000);

	// Calculate fee (simple estimation: 1 sat/byte, ~250 bytes for simple tx)
	const fee = 250;

	// Find suitable UTXOs
	let inputSum = 0;
	const selectedUtxos: any[] = [];

	for (const utxo of utxos) {
		selectedUtxos.push(utxo);
		inputSum += utxo.value;

		if (inputSum >= amountSatoshis + fee) {
			break;
		}
	}

	if (inputSum < amountSatoshis + fee) {
		throw new Error('Insufficient funds');
	}

	// Create transaction
	const psbt = new bitcoin.Psbt({ network: bitcoin.networks.testnet });

	// Add inputs
	for (const utxo of selectedUtxos) {
		psbt.addInput({
			hash: utxo.txid,
			index: utxo.vout,
			witnessUtxo: {
				script: bitcoin.payments.p2pkh({
					pubkey: keyPair.publicKey,
					network: bitcoin.networks.testnet
				}).output!,
				value: utxo.value
			}
		});
	}

	// Add output (recipient)
	psbt.addOutput({
		address: toAddress,
		value: amountSatoshis
	});

	// Add change output if needed
	const change = inputSum - amountSatoshis - fee;
	if (change > 546) {
		// Dust limit
		psbt.addOutput({
			address: fromAddress,
			value: change
		});
	}

	// Sign all inputs
	selectedUtxos.forEach((_, index) => {
		psbt.signInput(index, keyPair);
	});

	// Finalize and extract transaction
	psbt.finalizeAllInputs();
	const tx = psbt.extractTransaction();
	const txHex = tx.toHex();

	// Broadcast transaction
	const txid = await broadcastTransaction(txHex);

	return txid;
}

