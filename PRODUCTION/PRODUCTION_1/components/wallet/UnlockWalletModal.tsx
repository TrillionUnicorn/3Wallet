import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { useWalletStore } from '@/lib/store/wallet-store';
import { Eye, EyeOff } from 'lucide-react';

interface UnlockWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UnlockWalletModal({ isOpen, onClose }: UnlockWalletModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const unlockWallet = useWalletStore((state) => state.unlockWallet);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = unlockWallet(password);
      
      if (success) {
        setPassword('');
        onClose();
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      setError('Failed to unlock wallet');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Unlock Wallet">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <Alert type="error" message={error} />}
        
        <Alert 
          type="info" 
          message="Enter your password to unlock your wallet"
        />
        
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        <Button type="submit" className="w-full" loading={isLoading}>
          Unlock Wallet
        </Button>
      </form>
    </Modal>
  );
}

