import React, { useEffect, useState } from 'react';
import { Copy, RefreshCw, Send } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { SendTransactionModal } from './SendTransactionModal';
import { getEthereumBalance } from '@/lib/wallet/ethereum';
import { getBitcoinBalance } from '@/lib/wallet/bitcoin';
import { useWalletStore } from '@/lib/store/wallet-store';
import toast from 'react-hot-toast';

interface WalletCardProps {
  address: string;
  chain: 'ethereum' | 'bitcoin';
  balance: string;
  privateKey?: string;
}

export function WalletCard({ address, chain, balance, privateKey }: WalletCardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const updateBalance = useWalletStore((state) => state.updateBalance);
  
  const chainInfo = {
    ethereum: {
      name: 'Ethereum',
      symbol: 'ETH',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    bitcoin: {
      name: 'Bitcoin',
      symbol: 'BTC',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  };
  
  const info = chainInfo[chain];
  
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success('Address copied to clipboard!');
  };
  
  const refreshBalance = async () => {
    setIsRefreshing(true);
    try {
      const newBalance = chain === 'ethereum' 
        ? await getEthereumBalance(address)
        : await getBitcoinBalance(address);
      
      updateBalance(address, newBalance);
      toast.success('Balance updated!');
    } catch (error) {
      toast.error('Failed to refresh balance');
    } finally {
      setIsRefreshing(false);
    }
  };
  
  return (
    <Card className="hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`px-3 py-1 rounded-full ${info.bgColor}`}>
          <span className={`text-sm font-semibold ${info.color}`}>
            {info.name}
          </span>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={refreshBalance}
          loading={isRefreshing}
          className="!p-2"
        >
          <RefreshCw size={16} />
        </Button>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Balance</p>
        <p className="text-3xl font-bold text-gray-900">
          {balance} {info.symbol}
        </p>
      </div>
      
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mb-4">
        <p className="text-sm text-gray-600 flex-1 truncate font-mono">
          {address}
        </p>
        <button
          onClick={copyAddress}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Copy size={16} />
        </button>
      </div>

      {privateKey && (
        <Button
          onClick={() => setShowSendModal(true)}
          className="w-full"
          size="sm"
        >
          <Send size={16} className="mr-2" />
          Send {info.symbol}
        </Button>
      )}

      {privateKey && (
        <SendTransactionModal
          isOpen={showSendModal}
          onClose={() => setShowSendModal(false)}
          chain={chain}
          privateKey={privateKey}
          onSuccess={refreshBalance}
        />
      )}
    </Card>
  );
}

