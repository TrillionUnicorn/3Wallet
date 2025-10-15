import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { importEthereumWallet } from '@/lib/wallet/ethereum';
import { importBitcoinWallet } from '@/lib/wallet/bitcoin';
import { useWalletStore } from '@/lib/store/wallet-store';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImportWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportWalletModal({ isOpen, onClose }: ImportWalletModalProps) {
  const [mnemonic, setMnemonic] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const createWallet = useWalletStore((state) => state.createWallet);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Validate password
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Validate and import mnemonic
      const trimmedMnemonic = mnemonic.trim().toLowerCase();
      const words = trimmedMnemonic.split(/\s+/);
      
      if (words.length !== 12 && words.length !== 24) {
        throw new Error('Recovery phrase must be 12 or 24 words');
      }
      
      // Import wallets
      const ethWallet = importEthereumWallet(trimmedMnemonic);
      const btcWallet = importBitcoinWallet(trimmedMnemonic);
      
      // Store wallet
      createWallet(
        trimmedMnemonic,
        password,
        ethWallet.address,
        ethWallet.privateKey,
        btcWallet.address,
        btcWallet.privateKey
      );
      
      toast.success('Wallet imported successfully!');
      
      // Reset form
      setMnemonic('');
      setPassword('');
      setConfirmPassword('');
      
      // Close modal
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to import wallet');
      toast.error('Import failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Wallet">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <Alert type="error" message={error} />}
        
        <Alert 
          type="info" 
          message="Enter your 12 or 24-word recovery phrase to import your wallet."
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recovery Phrase <span className="text-red-500">*</span>
          </label>
          <textarea
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
            placeholder="Enter your recovery phrase (12 or 24 words)"
            rows={4}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
          />
        </div>
        
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter a strong password"
            helperText="This password will encrypt your wallet on this device"
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
        
        <Alert 
          type="warning" 
          message="Make sure you're importing the correct recovery phrase. Importing will replace any existing wallet on this device."
        />
        
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            loading={isLoading}
          >
            Import Wallet
          </Button>
        </div>
      </form>
    </Modal>
  );
}

