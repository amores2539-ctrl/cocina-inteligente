import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-brand-green text-white px-5 py-3.5 rounded shadow-xl border border-white/10 animate-fade-in">
      <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
      <span className="font-sans text-sm font-medium">{message}</span>
      <button 
        onClick={onClose}
        className="ml-2 text-white/75 hover:text-white transition-colors"
        aria-label="Cerrar notificación"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
