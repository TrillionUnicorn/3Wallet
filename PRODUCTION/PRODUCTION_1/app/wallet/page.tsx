'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWalletStore } from '@/lib/store/wallet-store';
import { WalletCard } from '@/components/wallet/WalletCard';
import { Button } from '@/components/ui/Button';
import { Wallet, LogOut, RefreshCw } from 'lucide-react';
import { getEthereumBalance } from '@/lib/wallet/ethereum';
import { getBitcoinBalance } from '@/lib/wallet/bitcoin';

export default function WalletPage() {
  const router = useRouter();
  const { wallets, isUnlocked, lockWallet, updateBalance } = useWalletStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (mounted && !isUnlocked) {
      router.push('/');
    }
  }, [isUnlocked, mounted, router]);
  
  useEffect(() => {
    if (mounted && isUnlocked && wallets.length > 0) {
      // Fetch balances on mount
      refreshAllBalances();
    }
  }, [mounted, isUnlocked]);
  
  const refreshAllBalances = async () => {
    setIsRefreshing(true);
    try {
      for (const wallet of wallets) {
        const balance = wallet.chain === 'ethereum'
          ? await getEthereumBalance(wallet.address)
          : await getBitcoinBalance(wallet.address);
        
        updateBalance(wallet.address, balance);
      }
    } catch (error) {
      console.error('Error refreshing balances:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const handleLockWallet = () => {
    lockWallet();
    router.push('/');
  };
  
  if (!mounted || !isUnlocked) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="text-primary" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">3Wallet</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={refreshAllBalances}
              variant="outline"
              size="sm"
              loading={isRefreshing}
            >
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </Button>
            
            <Button
              onClick={handleLockWallet}
              variant="outline"
              size="sm"
            >
              <LogOut size={16} className="mr-2" />
              Lock
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Your Wallets
          </h2>
          <p className="text-gray-600">
            Manage your multi-chain crypto assets
          </p>
        </div>
        
        {/* Wallet Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {wallets.map((wallet) => (
            <WalletCard
              key={wallet.address}
              address={wallet.address}
              chain={wallet.chain}
              balance={wallet.balance}
            />
          ))}
        </div>
        
        {/* Info Section */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            🔒 Security Notice
          </h3>
          <p className="text-blue-800 text-sm">
            Your private keys are encrypted and stored locally on your device. 
            Never share your recovery phrase with anyone. 3Wallet will never ask for your password or recovery phrase.
          </p>
        </div>
      </main>
    </div>
  );
}

