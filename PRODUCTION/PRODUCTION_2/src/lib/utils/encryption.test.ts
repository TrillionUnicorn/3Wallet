import { describe, it, expect } from 'vitest';
import { encrypt, decrypt, hashPassword, generateRandomBytes } from './encryption';

describe('Encryption Utilities', () => {
	describe('encrypt and decrypt', () => {
		it('should encrypt and decrypt data correctly', () => {
			const data = 'sensitive information';
			const password = 'strongPassword123';

			const encrypted = encrypt(data, password);
			const decrypted = decrypt(encrypted, password);

			expect(decrypted).toBe(data);
		});

		it('should produce different ciphertext for same data', () => {
			const data = 'test data';
			const password = 'password123';

			const encrypted1 = encrypt(data, password);
			const encrypted2 = encrypt(data, password);

			// Should be different due to random IV
			expect(encrypted1).not.toBe(encrypted2);

			// But both should decrypt to same data
			expect(decrypt(encrypted1, password)).toBe(data);
			expect(decrypt(encrypted2, password)).toBe(data);
		});

		it('should fail to decrypt with wrong password', () => {
			const data = 'secret';
			const password = 'correct';
			const wrongPassword = 'wrong';

			const encrypted = encrypt(data, password);
			const decrypted = decrypt(encrypted, wrongPassword);

			// Should return empty string or garbled data
			expect(decrypted).not.toBe(data);
		});

		it('should handle empty strings', () => {
			const data = '';
			const password = 'password';

			const encrypted = encrypt(data, password);
			const decrypted = decrypt(encrypted, password);

			expect(decrypted).toBe(data);
		});

		it('should handle special characters', () => {
			const data = '!@#$%^&*()_+-=[]{}|;:,.<>?';
			const password = 'password';

			const encrypted = encrypt(data, password);
			const decrypted = decrypt(encrypted, password);

			expect(decrypted).toBe(data);
		});
	});

	describe('hashPassword', () => {
		it('should hash password consistently', () => {
			const password = 'myPassword123';

			const hash1 = hashPassword(password);
			const hash2 = hashPassword(password);

			expect(hash1).toBe(hash2);
		});

		it('should produce different hashes for different passwords', () => {
			const password1 = 'password1';
			const password2 = 'password2';

			const hash1 = hashPassword(password1);
			const hash2 = hashPassword(password2);

			expect(hash1).not.toBe(hash2);
		});

		it('should produce 64-character hex string', () => {
			const password = 'test';
			const hash = hashPassword(password);

			expect(hash).toHaveLength(64);
			expect(hash).toMatch(/^[a-f0-9]{64}$/);
		});
	});

	describe('generateRandomBytes', () => {
		it('should generate random bytes of specified length', () => {
			const length = 16;
			const bytes = generateRandomBytes(length);

			expect(bytes).toBeDefined();
			expect(typeof bytes).toBe('string');
		});

		it('should generate different values each time', () => {
			const bytes1 = generateRandomBytes(16);
			const bytes2 = generateRandomBytes(16);

			expect(bytes1).not.toBe(bytes2);
		});
	});
});

