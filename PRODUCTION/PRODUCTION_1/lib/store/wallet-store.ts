import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { encrypt, decrypt } from '../crypto/encryption';

export interface Wallet {
  address: string;
  chain: 'ethereum' | 'bitcoin';
  balance: string;
  privateKey?: string; // Only available when unlocked
}

interface WalletState {
  wallets: Wallet[];
  isUnlocked: boolean;
  encryptedData: string | null;

  // Actions
  createWallet: (
    mnemonic: string,
    password: string,
    ethereumAddress: string,
    ethereumPrivateKey: string,
    bitcoinAddress: string,
    bitcoinPrivateKey: string
  ) => void;
  unlockWallet: (password: string) => boolean;
  lockWallet: () => void;
  updateBalance: (address: string, balance: string) => void;
  getWallets: () => Wallet[];
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      wallets: [],
      isUnlocked: false,
      encryptedData: null,

      createWallet: (mnemonic, password, ethereumAddress, ethereumPrivateKey, bitcoinAddress, bitcoinPrivateKey) => {
        const wallets: Wallet[] = [
          {
            address: ethereumAddress,
            chain: 'ethereum',
            balance: '0',
            privateKey: ethereumPrivateKey,
          },
          {
            address: bitcoinAddress,
            chain: 'bitcoin',
            balance: '0',
            privateKey: bitcoinPrivateKey,
          },
        ];

        const data = JSON.stringify({ mnemonic, wallets });
        const encrypted = encrypt(data, password);

        set({
          encryptedData: encrypted,
          wallets,
          isUnlocked: true,
        });
      },

      unlockWallet: (password) => {
        const { encryptedData } = get();
        if (!encryptedData) return false;

        try {
          const decrypted = decrypt(encryptedData, password);
          const data = JSON.parse(decrypted);

          set({
            wallets: data.wallets,
            isUnlocked: true,
          });

          return true;
        } catch (error) {
          return false;
        }
      },

      lockWallet: () => {
        set({
          wallets: [],
          isUnlocked: false,
        });
      },

      updateBalance: (address, balance) => {
        set((state) => ({
          wallets: state.wallets.map((wallet) =>
            wallet.address === address ? { ...wallet, balance } : wallet
          ),
        }));
      },

      getWallets: () => get().wallets,
    }),
    {
      name: '3wallet-storage',
    }
  )
);

