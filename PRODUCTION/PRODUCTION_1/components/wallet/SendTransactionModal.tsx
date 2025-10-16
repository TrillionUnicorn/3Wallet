import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { sendEthereumTransaction } from '@/lib/wallet/ethereum';
import { sendBitcoinTransaction } from '@/lib/wallet/bitcoin';
import toast from 'react-hot-toast';

interface SendTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  chain: 'ethereum' | 'bitcoin';
  privateKey: string;
  onSuccess: () => void;
}

export function SendTransactionModal({
  isOpen,
  onClose,
  chain,
  privateKey,
  onSuccess,
}: SendTransactionModalProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const chainInfo = {
    ethereum: {
      name: 'Ethereum',
      symbol: 'ETH',
      placeholder: '0x...',
    },
    bitcoin: {
      name: 'Bitcoin',
      symbol: 'BTC',
      placeholder: 'tb1...',
    },
  };
  
  const info = chainInfo[chain];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Validate inputs
      if (!recipient || !amount) {
        throw new Error('Please fill in all fields');
      }
      
      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum <= 0) {
        throw new Error('Invalid amount');
      }
      
      // Send transaction
      let txHash: string;

      if (chain === 'ethereum') {
        txHash = await sendEthereumTransaction(privateKey, recipient, amount);
      } else {
        // Bitcoin transaction sending
        txHash = await sendBitcoinTransaction(privateKey, recipient, amount);
      }
      
      toast.success(`Transaction sent! Hash: ${txHash.slice(0, 10)}...`);
      
      // Reset form
      setRecipient('');
      setAmount('');
      
      // Call success callback
      onSuccess();
      
      // Close modal
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to send transaction');
      toast.error('Transaction failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Send ${info.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <Alert type="error" message={error} />}
        
        <Alert 
          type="warning" 
          message={`You are sending ${info.symbol} on ${info.name} testnet. Make sure the recipient address is correct.`}
        />
        
        <Input
          label="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder={info.placeholder}
          required
        />
        
        <Input
          type="number"
          step="0.000001"
          label={`Amount (${info.symbol})`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.001"
          required
        />
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Transaction Summary:</p>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold">{amount || '0'} {info.symbol}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Network Fee:</span>
              <span className="font-semibold">~0.0001 {info.symbol}</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total:</span>
              <span className="font-bold">~{(parseFloat(amount || '0') + 0.0001).toFixed(6)} {info.symbol}</span>
            </div>
          </div>
        </div>
        
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
            Send Transaction
          </Button>
        </div>
      </form>
    </Modal>
  );
}

