import { describe, it, expect } from 'vitest';
import { createEthereumWallet, importEthereumWallet } from './ethereum';

describe('Ethereum Wallet', () => {
	describe('createEthereumWallet', () => {
		it('should create a valid Ethereum wallet', () => {
			const wallet = createEthereumWallet();

			expect(wallet).toHaveProperty('address');
			expect(wallet).toHaveProperty('privateKey');
			expect(wallet).toHaveProperty('mnemonic');

			// Address should start with 0x
			expect(wallet.address).toMatch(/^0x[a-fA-F0-9]{40}$/);

			// Private key should start with 0x
			expect(wallet.privateKey).toMatch(/^0x[a-fA-F0-9]{64}$/);

			// Mnemonic should be 12 words
			const words = wallet.mnemonic.split(' ');
			expect(words).toHaveLength(12);
		});

		it('should create different wallets each time', () => {
			const wallet1 = createEthereumWallet();
			const wallet2 = createEthereumWallet();

			expect(wallet1.address).not.toBe(wallet2.address);
			expect(wallet1.privateKey).not.toBe(wallet2.privateKey);
			expect(wallet1.mnemonic).not.toBe(wallet2.mnemonic);
		});
	});

	describe('importEthereumWallet', () => {
		it('should import wallet from valid mnemonic', () => {
			// Create a wallet first
			const original = createEthereumWallet();

			// Import using the same mnemonic
			const imported = importEthereumWallet(original.mnemonic);

			// Should produce same address and private key
			expect(imported.address).toBe(original.address);
			expect(imported.privateKey).toBe(original.privateKey);
			expect(imported.mnemonic).toBe(original.mnemonic);
		});

		it('should throw error for invalid mnemonic', () => {
			const invalidMnemonic = 'invalid mnemonic phrase that is not valid';

			expect(() => {
				importEthereumWallet(invalidMnemonic);
			}).toThrow('Invalid mnemonic phrase');
		});

		it('should handle 24-word mnemonic', () => {
			// This is a test mnemonic (DO NOT USE IN PRODUCTION)
			const mnemonic24 =
				'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art';

			const wallet = importEthereumWallet(mnemonic24);

			expect(wallet.address).toBeDefined();
			expect(wallet.privateKey).toBeDefined();
		});
	});
});

