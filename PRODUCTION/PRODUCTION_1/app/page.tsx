'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CreateWalletModal } from '@/components/wallet/CreateWalletModal';
import { UnlockWalletModal } from '@/components/wallet/UnlockWalletModal';
import { ImportWalletModal } from '@/components/wallet/ImportWalletModal';
import { useWalletStore } from '@/lib/store/wallet-store';
import { Shield, Wallet, Lock, Zap } from 'lucide-react';

export default function Home() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  const { encryptedData, isUnlocked } = useWalletStore();
  const hasWallet = !!encryptedData;
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (mounted && isUnlocked) {
      router.push('/wallet');
    }
  }, [isUnlocked, mounted, router]);
  
  if (!mounted) {
    return null; // Prevent hydration mismatch
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
        </div>
      </header>
      
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Secure Multi-Chain Crypto Wallet
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your Ethereum and Bitcoin assets with military-grade encryption
            and complete control over your private keys.
          </p>
        </div>
        
        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Shield className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Bank-Level Security
              </h3>
              <p className="text-gray-600">
                AES-256 encryption keeps your private keys safe on your device
              </p>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Lock className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Your Keys, Your Crypto
              </h3>
              <p className="text-gray-600">
                Non-custodial wallet - you have complete control over your assets
              </p>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Zap className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Multi-Chain Support
              </h3>
              <p className="text-gray-600">
                Manage Ethereum and Bitcoin from a single interface
              </p>
            </div>
          </Card>
        </div>
        
        {/* CTA */}
        <div className="max-w-md mx-auto">
          <Card padding="lg">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {hasWallet ? 'Welcome Back!' : 'Get Started'}
              </h3>
              <p className="text-gray-600">
                {hasWallet 
                  ? 'Unlock your wallet to access your crypto assets'
                  : 'Create a new wallet to start managing your crypto'
                }
              </p>
              
              <div className="space-y-3">
                {hasWallet ? (
                  <Button
                    onClick={() => setShowUnlockModal(true)}
                    className="w-full"
                    size="lg"
                  >
                    Unlock Wallet
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => setShowCreateModal(true)}
                      className="w-full"
                      size="lg"
                    >
                      Create New Wallet
                    </Button>

                    <Button
                      onClick={() => setShowImportModal(true)}
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      Import Existing Wallet
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>
      
      {/* Modals */}
      <CreateWalletModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
      <UnlockWalletModal
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
      />
      <ImportWalletModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
      />
    </div>
  );
}

