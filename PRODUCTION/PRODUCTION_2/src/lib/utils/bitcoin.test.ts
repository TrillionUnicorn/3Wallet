import { describe, it, expect } from 'vitest';
import { createBitcoinWallet, importBitcoinWallet } from './bitcoin';

describe('Bitcoin Wallet', () => {
	describe('createBitcoinWallet', () => {
		it('should create a valid Bitcoin wallet', () => {
			const wallet = createBitcoinWallet();

			expect(wallet).toHaveProperty('address');
			expect(wallet).toHaveProperty('privateKey');
			expect(wallet).toHaveProperty('mnemonic');

			// Testnet address should start with m, n, or 2
			expect(wallet.address).toMatch(/^[mn2][a-zA-Z0-9]{25,34}$/);

			// Mnemonic should be 12 words
			const words = wallet.mnemonic.split(' ');
			expect(words).toHaveLength(12);
		});

		it('should create different wallets each time', () => {
			const wallet1 = createBitcoinWallet();
			const wallet2 = createBitcoinWallet();

			expect(wallet1.address).not.toBe(wallet2.address);
			expect(wallet1.privateKey).not.toBe(wallet2.privateKey);
			expect(wallet1.mnemonic).not.toBe(wallet2.mnemonic);
		});
	});

	describe('importBitcoinWallet', () => {
		it('should import wallet from valid mnemonic', () => {
			// Create a wallet first
			const original = createBitcoinWallet();

			// Import using the same mnemonic
			const imported = importBitcoinWallet(original.mnemonic);

			// Should produce same address and private key
			expect(imported.address).toBe(original.address);
			expect(imported.privateKey).toBe(original.privateKey);
			expect(imported.mnemonic).toBe(original.mnemonic);
		});

		it('should throw error for invalid mnemonic', () => {
			const invalidMnemonic = 'invalid mnemonic phrase that is not valid';

			expect(() => {
				importBitcoinWallet(invalidMnemonic);
			}).toThrow('Invalid mnemonic phrase');
		});
	});
});

