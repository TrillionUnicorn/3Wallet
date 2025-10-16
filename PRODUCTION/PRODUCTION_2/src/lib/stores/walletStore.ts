import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { encrypt, decrypt } from '$lib/utils/encryption';

export interface Wallet {
	address: string;
	chain: 'ethereum' | 'bitcoin';
	balance: string;
	privateKey?: string;
}

interface WalletState {
	wallets: Wallet[];
	isUnlocked: boolean;
	encryptedData: string | null;
}

// Initial state
const initialState: WalletState = {
	wallets: [],
	isUnlocked: false,
	encryptedData: null
};

// Load from localStorage if in browser
function loadFromStorage(): WalletState {
	if (!browser) return initialState;

	try {
		const stored = localStorage.getItem('3wallet-storage');
		if (stored) {
			const data = JSON.parse(stored);
			return {
				wallets: [],
				isUnlocked: false,
				encryptedData: data.encryptedData || null
			};
		}
	} catch (error) {
		console.error('Error loading from storage:', error);
	}

	return initialState;
}

// Create the store
function createWalletStore() {
	const { subscribe, set, update } = writable<WalletState>(loadFromStorage());

	// Save to localStorage whenever state changes
	if (browser) {
		subscribe((state) => {
			try {
				localStorage.setItem(
					'3wallet-storage',
					JSON.stringify({
						encryptedData: state.encryptedData
					})
				);
			} catch (error) {
				console.error('Error saving to storage:', error);
			}
		});
	}

	return {
		subscribe,

		createWallet: (
			mnemonic: string,
			password: string,
			ethereumAddress: string,
			ethereumPrivateKey: string,
			bitcoinAddress: string,
			bitcoinPrivateKey: string
		) => {
			const wallets: Wallet[] = [
				{
					address: ethereumAddress,
					chain: 'ethereum',
					balance: '0',
					privateKey: ethereumPrivateKey
				},
				{
					address: bitcoinAddress,
					chain: 'bitcoin',
					balance: '0',
					privateKey: bitcoinPrivateKey
				}
			];

			const data = JSON.stringify({ mnemonic, wallets });
			const encrypted = encrypt(data, password);

			set({
				encryptedData: encrypted,
				wallets,
				isUnlocked: true
			});
		},

		unlockWallet: (password: string): boolean => {
			let success = false;

			update((state) => {
				if (!state.encryptedData) return state;

				try {
					const decrypted = decrypt(state.encryptedData, password);
					const data = JSON.parse(decrypted);

					success = true;
					return {
						...state,
						wallets: data.wallets,
						isUnlocked: true
					};
				} catch (error) {
					return state;
				}
			});

			return success;
		},

		lockWallet: () => {
			update((state) => ({
				...state,
				wallets: [],
				isUnlocked: false
			}));
		},

		updateBalance: (address: string, balance: string) => {
			update((state) => ({
				...state,
				wallets: state.wallets.map((wallet) =>
					wallet.address === address ? { ...wallet, balance } : wallet
				)
			}));
		},

		reset: () => {
			set(initialState);
			if (browser) {
				localStorage.removeItem('3wallet-storage');
			}
		}
	};
}

export const walletStore = createWalletStore();

