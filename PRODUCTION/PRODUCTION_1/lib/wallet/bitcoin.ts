import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';

const bip32 = BIP32Factory(ecc);

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
    network: bitcoin.networks.testnet,
  });
  
  if (!address) {
    throw new Error('Failed to generate Bitcoin address');
  }
  
  return {
    address,
    privateKey: child.toWIF(),
    mnemonic,
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
    network: bitcoin.networks.testnet,
  });
  
  if (!address) {
    throw new Error('Failed to generate Bitcoin address');
  }
  
  return {
    address,
    privateKey: child.toWIF(),
    mnemonic,
  };
}

/**
 * Get Bitcoin balance
 */
export async function getBitcoinBalance(address: string): Promise<string> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BITCOIN_API || 'https://blockstream.info/testnet/api';
    const response = await fetch(`${apiUrl}/address/${address}`);
    const data = await response.json();
    
    // Convert satoshis to BTC
    const balance = (data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum) / 100000000;
    return balance.toFixed(8);
  } catch (error) {
    console.error('Error fetching Bitcoin balance:', error);
    return '0';
  }
}

