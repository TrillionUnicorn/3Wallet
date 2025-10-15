/**
 * 3Wallet Encryption Utilities
 * AES-256-GCM encryption for secure data storage
 */

import type { EncryptedData } from '$lib/types/wallet';

// ============================================================================
// Constants
// ============================================================================

const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;
const IV_LENGTH = 12; // 96 bits for GCM
const SALT_LENGTH = 16;
const ITERATIONS = 100000; // PBKDF2 iterations

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Convert string to ArrayBuffer
 */
function str2ab(str: string): ArrayBuffer {
	const encoder = new TextEncoder();
	return encoder.encode(str);
}

/**
 * Convert ArrayBuffer to string
 */
function ab2str(buffer: ArrayBuffer): string {
	const decoder = new TextDecoder();
	return decoder.decode(buffer);
}

/**
 * Convert ArrayBuffer to hex string
 */
function ab2hex(buffer: ArrayBuffer): string {
	return Array.from(new Uint8Array(buffer))
		.map(b => b.toString(16).padStart(2, '0'))
		.join('');
}

/**
 * Convert hex string to ArrayBuffer
 */
function hex2ab(hex: string): ArrayBuffer {
	const bytes = new Uint8Array(hex.length / 2);
	for (let i = 0; i < hex.length; i += 2) {
		bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
	}
	return bytes.buffer;
}

/**
 * Generate random bytes
 */
function getRandomBytes(length: number): Uint8Array {
	return crypto.getRandomValues(new Uint8Array(length));
}

// ============================================================================
// Key Derivation
// ============================================================================

/**
 * Derive encryption key from password using PBKDF2
 */
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
	const passwordBuffer = str2ab(password);
	
	// Import password as key material
	const keyMaterial = await crypto.subtle.importKey(
		'raw',
		passwordBuffer,
		'PBKDF2',
		false,
		['deriveBits', 'deriveKey']
	);
	
	// Derive key using PBKDF2
	return crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt: salt,
			iterations: ITERATIONS,
			hash: 'SHA-256'
		},
		keyMaterial,
		{
			name: ALGORITHM,
			length: KEY_LENGTH
		},
		false,
		['encrypt', 'decrypt']
	);
}

// ============================================================================
// Encryption Functions
// ============================================================================

/**
 * Encrypt data using AES-256-GCM
 * @param data - Data to encrypt (string)
 * @param password - Password for encryption
 * @returns Encrypted data object
 */
export async function encrypt(data: string, password: string): Promise<EncryptedData> {
	try {
		// Generate random salt and IV
		const salt = getRandomBytes(SALT_LENGTH);
		const iv = getRandomBytes(IV_LENGTH);
		
		// Derive encryption key
		const key = await deriveKey(password, salt);
		
		// Encrypt data
		const dataBuffer = str2ab(data);
		const encryptedBuffer = await crypto.subtle.encrypt(
			{
				name: ALGORITHM,
				iv: iv
			},
			key,
			dataBuffer
		);
		
		// Return encrypted data
		return {
			ciphertext: ab2hex(encryptedBuffer),
			iv: ab2hex(iv.buffer),
			salt: ab2hex(salt.buffer),
			algorithm: 'AES-256-GCM'
		};
	} catch (error) {
		console.error('Encryption error:', error);
		throw new Error('Failed to encrypt data');
	}
}

/**
 * Decrypt data using AES-256-GCM
 * @param encryptedData - Encrypted data object
 * @param password - Password for decryption
 * @returns Decrypted data (string)
 */
export async function decrypt(encryptedData: EncryptedData, password: string): Promise<string> {
	try {
		// Convert hex strings back to ArrayBuffers
		const ciphertext = hex2ab(encryptedData.ciphertext);
		const iv = hex2ab(encryptedData.iv);
		const salt = hex2ab(encryptedData.salt);
		
		// Derive decryption key
		const key = await deriveKey(password, new Uint8Array(salt));
		
		// Decrypt data
		const decryptedBuffer = await crypto.subtle.decrypt(
			{
				name: ALGORITHM,
				iv: new Uint8Array(iv)
			},
			key,
			ciphertext
		);
		
		// Return decrypted string
		return ab2str(decryptedBuffer);
	} catch (error) {
		console.error('Decryption error:', error);
		throw new Error('Failed to decrypt data - incorrect password or corrupted data');
	}
}

// ============================================================================
// Secure Storage
// ============================================================================

/**
 * Securely store encrypted data in localStorage
 * @param key - Storage key
 * @param data - Data to store
 * @param password - Encryption password
 */
export async function secureStore(key: string, data: string, password: string): Promise<void> {
	try {
		const encrypted = await encrypt(data, password);
		localStorage.setItem(key, JSON.stringify(encrypted));
	} catch (error) {
		console.error('Secure store error:', error);
		throw new Error('Failed to securely store data');
	}
}

/**
 * Retrieve and decrypt data from localStorage
 * @param key - Storage key
 * @param password - Decryption password
 * @returns Decrypted data or null if not found
 */
export async function secureRetrieve(key: string, password: string): Promise<string | null> {
	try {
		const stored = localStorage.getItem(key);
		if (!stored) return null;
		
		const encrypted: EncryptedData = JSON.parse(stored);
		return await decrypt(encrypted, password);
	} catch (error) {
		console.error('Secure retrieve error:', error);
		return null;
	}
}

/**
 * Remove encrypted data from localStorage
 * @param key - Storage key
 */
export function secureRemove(key: string): void {
	localStorage.removeItem(key);
}

/**
 * Check if encrypted data exists in localStorage
 * @param key - Storage key
 * @returns True if data exists
 */
export function secureExists(key: string): boolean {
	return localStorage.getItem(key) !== null;
}

// ============================================================================
// Password Validation
// ============================================================================

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Validation result with strength score and feedback
 */
export function validatePassword(password: string): {
	isValid: boolean;
	strength: 'weak' | 'medium' | 'strong';
	score: number;
	feedback: string[];
} {
	const feedback: string[] = [];
	let score = 0;
	
	// Length check
	if (password.length < 8) {
		feedback.push('Password must be at least 8 characters long');
	} else if (password.length >= 12) {
		score += 2;
	} else {
		score += 1;
	}
	
	// Uppercase check
	if (/[A-Z]/.test(password)) {
		score += 1;
	} else {
		feedback.push('Include at least one uppercase letter');
	}
	
	// Lowercase check
	if (/[a-z]/.test(password)) {
		score += 1;
	} else {
		feedback.push('Include at least one lowercase letter');
	}
	
	// Number check
	if (/[0-9]/.test(password)) {
		score += 1;
	} else {
		feedback.push('Include at least one number');
	}
	
	// Special character check
	if (/[^A-Za-z0-9]/.test(password)) {
		score += 1;
	} else {
		feedback.push('Include at least one special character');
	}
	
	// Determine strength
	let strength: 'weak' | 'medium' | 'strong';
	if (score <= 2) {
		strength = 'weak';
	} else if (score <= 4) {
		strength = 'medium';
	} else {
		strength = 'strong';
	}
	
	return {
		isValid: score >= 4 && password.length >= 8,
		strength,
		score,
		feedback
	};
}

/**
 * Generate a random secure password
 * @param length - Password length (default: 16)
 * @returns Random password
 */
export function generateSecurePassword(length: number = 16): string {
	const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
	const randomBytes = getRandomBytes(length);
	let password = '';
	
	for (let i = 0; i < length; i++) {
		password += charset[randomBytes[i] % charset.length];
	}
	
	return password;
}

