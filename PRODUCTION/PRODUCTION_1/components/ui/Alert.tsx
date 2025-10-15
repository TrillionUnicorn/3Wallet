import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export function Alert({ type, message, onClose }: AlertProps) {
  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: CheckCircle,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: XCircle,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: AlertCircle,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: Info,
    },
  };
  
  const { bg, border, text, icon: Icon } = styles[type];
  
  return (
    <div className={`${bg} ${border} border rounded-lg p-4 flex items-start gap-3`}>
      <Icon className={text} size={20} />
      <p className={`${text} flex-1 text-sm`}>{message}</p>
      {onClose && (
        <button onClick={onClose} className={`${text} hover:opacity-70`}>
          <XCircle size={20} />
        </button>
      )}
    </div>
  );
}

