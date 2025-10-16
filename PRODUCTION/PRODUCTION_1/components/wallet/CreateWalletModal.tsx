import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { createEthereumWallet } from '@/lib/wallet/ethereum';
import { createBitcoinWallet } from '@/lib/wallet/bitcoin';
import { useWalletStore } from '@/lib/store/wallet-store';
import { Copy, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

interface CreateWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateWalletModal({ isOpen, onClose }: CreateWalletModalProps) {
  const [step, setStep] = useState<'password' | 'mnemonic'>('password');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mnemonic, setMnemonic] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  const createWallet = useWalletStore((state) => state.createWallet);
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Generate wallets
    const ethWallet = createEthereumWallet();
    const btcWallet = createBitcoinWallet();

    // Use the same mnemonic for both (in production, you'd use the same seed)
    setMnemonic(ethWallet.mnemonic);

    // Store wallet with private keys
    createWallet(
      ethWallet.mnemonic,
      password,
      ethWallet.address,
      ethWallet.privateKey,
      btcWallet.address,
      btcWallet.privateKey
    );
    
    setStep('mnemonic');
  };
  
  const copyMnemonic = () => {
    navigator.clipboard.writeText(mnemonic);
    setCopied(true);
    toast.success('Recovery phrase copied!');
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleComplete = () => {
    setPassword('');
    setConfirmPassword('');
    setMnemonic('');
    setStep('password');
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Wallet">
      {step === 'password' && (
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {error && <Alert type="error" message={error} />}
          
          <Alert 
            type="info" 
            message="Your password encrypts your wallet on this device. Choose a strong password you won't forget."
          />
          
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
          
          <Button type="submit" className="w-full">
            Create Wallet
          </Button>
        </form>
      )}
      
      {step === 'mnemonic' && (
        <div className="space-y-4">
          <Alert 
            type="warning" 
            message="Write down your recovery phrase and store it safely. You'll need it to recover your wallet."
          />
          
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-2 font-semibold">Recovery Phrase</p>
            <p className="text-base font-mono text-gray-900 leading-relaxed">
              {mnemonic}
            </p>
          </div>
          
          <Button
            onClick={copyMnemonic}
            variant="outline"
            className="w-full"
          >
            <Copy size={16} className="mr-2" />
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
          
          <Alert 
            type="error" 
            message="Never share your recovery phrase with anyone. Anyone with this phrase can access your funds."
          />
          
          <Button onClick={handleComplete} className="w-full">
            I've Saved My Recovery Phrase
          </Button>
        </div>
      )}
    </Modal>
  );
}

