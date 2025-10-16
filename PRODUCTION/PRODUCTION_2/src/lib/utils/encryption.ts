import CryptoJS from 'crypto-js';

/**
 * Encrypt data using AES-256
 */
export function encrypt(data: string, password: string): string {
	return CryptoJS.AES.encrypt(data, password).toString();
}

/**
 * Decrypt data using AES-256
 */
export function decrypt(encryptedData: string, password: string): string {
	const bytes = CryptoJS.AES.decrypt(encryptedData, password);
	return bytes.toString(CryptoJS.enc.Utf8);
}

/**
 * Hash password using SHA-256
 */
export function hashPassword(password: string): string {
	return CryptoJS.SHA256(password).toString();
}

/**
 * Generate random bytes
 */
export function generateRandomBytes(length: number): string {
	return CryptoJS.lib.WordArray.random(length).toString();
}

