import React, { useState } from 'react';
import { X, Lock, ShieldCheck, Check, CreditCard, Award } from 'lucide-react';
import { Plan } from '../data/landingData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan;
  onSuccess: (name: string, email: string) => void;
}

export default function CheckoutModal({ isOpen, onClose, plan, onSuccess }: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('4000 1234 5678 9010');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('123');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'transfer'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, ingresa tu nombre completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    setError('');
    setIsProcessing(true);

    // Simulate safe processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(name, email);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-brand-base border border-brand-gold/20 rounded shadow-2xl overflow-hidden animate-fade-in"
        id="checkout-container"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-brand-green text-white">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-5 text-brand-gold" />
            <h3 className="font-sans font-medium text-xs tracking-wider uppercase">Pago 100% Seguro</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            id="close-checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6 p-4 bg-white/60 border border-brand-gold/10 rounded">
            <span className="font-sans text-xs uppercase tracking-wider text-brand-gold font-medium">Estás adquiriendo:</span>
            <div className="flex justify-between items-baseline mt-1">
              <h4 className="font-display font-semibold text-lg text-brand-text">{plan.title}</h4>
              <span className="font-sans font-bold text-xl text-brand-green">{plan.price}</span>
            </div>
            <p className="mt-1 text-xs text-brand-soft">Acceso Vitalicio + Todos los entregables incluidos.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-xs text-red-800 bg-red-100/80 border border-red-200 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text mb-1.5">
                Tu Nombre Completo *
              </label>
              <input 
                type="text"
                required
                placeholder="Ej. Sofía Valenzuela"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-brand-gold/20 rounded font-sans text-sm text-brand-text placeholder-brand-soft/50 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text mb-1.5">
                Tu Correo Electrónico *
              </label>
              <input 
                type="email"
                required
                placeholder="Ej. sofia@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-brand-gold/20 rounded font-sans text-sm text-brand-text placeholder-brand-soft/50 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                helper-text="Recibirás tus credenciales y copias PDF en este correo."
              />
              <span className="block text-[10px] text-brand-soft mt-1">
                Asegura que tu email sea correcto para poder iniciar sesión siempre.
              </span>
            </div>

            {/* Payment Options */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text mb-2">
                Método de Pago
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center justify-center p-2.5 border rounded transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-brand-green bg-brand-green/5 text-brand-green font-medium' 
                      : 'border-brand-gold/20 bg-white text-brand-soft hover:bg-brand-green/5 hover:border-brand-gold/45'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-1" />
                  <span className="text-[10px] tracking-wider uppercase">Tarjeta</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex flex-col items-center justify-center p-2.5 border rounded transition-all ${
                    paymentMethod === 'paypal' 
                      ? 'border-brand-green bg-brand-green/5 text-brand-green font-medium' 
                      : 'border-brand-gold/20 bg-white text-brand-soft hover:bg-brand-green/5 hover:border-brand-gold/45'
                  }`}
                >
                  <span className="font-bold italic text-sm text-blue-800">Pay</span>
                  <span className="text-[10px] tracking-wider uppercase">PayPal</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('transfer')}
                  className={`flex flex-col items-center justify-center p-2.5 border rounded transition-all ${
                    paymentMethod === 'transfer' 
                      ? 'border-brand-green bg-brand-green/5 text-brand-green font-medium' 
                      : 'border-brand-gold/20 bg-white text-brand-soft hover:bg-brand-green/5 hover:border-brand-gold/45'
                  }`}
                >
                  <Award className="w-4 h-4 mb-1 text-brand-gold" />
                  <span className="text-[10px] tracking-wider uppercase">Pix / Transf.</span>
                </button>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3 p-3 bg-white/40 border border-brand-gold/10 rounded-md animate-fade-in">
                <div>
                  <label className="block text-[10px] font-semibold text-brand-soft uppercase mb-1">Número de Tarjeta (Simulado)</label>
                  <input 
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-brand-gold/10 rounded font-mono text-xs text-brand-text"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-brand-soft uppercase mb-1">Vencimiento</label>
                    <input 
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-brand-gold/10 rounded font-mono text-xs text-brand-text text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-brand-soft uppercase mb-1">Cvv</label>
                    <input 
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-brand-gold/10 rounded font-mono text-xs text-brand-text text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded text-center py-5 animate-fade-in">
                <p className="text-xs text-brand-soft mb-1">Se abrirá una pestaña simulada segura para ingresar a tu cuenta de PayPal.</p>
                <span className="text-[10px] font-semibold text-blue-700 tracking-wide">PAGO EXPRESS ACTIVO</span>
              </div>
            )}

            {paymentMethod === 'transfer' && (
              <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-md text-center py-4 animate-fade-in space-y-1">
                <p className="text-xs text-brand-soft">Pago instantáneo por transferencia electrónica (Pix o cuenta bancaria).</p>
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded font-mono text-xs font-bold tracking-wider">
                  PIX / TRANSF ACTIVO
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-brand-green hover:bg-brand-green/90 text-white font-sans font-bold text-sm tracking-wider uppercase transition-all rounded shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              id="confirm-checkout"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>PROCESANDO DE FORMA SEGURA...</span>
                </>
              ) : (
                <span>APROBAR PAGO Y OBTENER ACCESO →</span>
              )}
            </button>
          </form>

          {/* Footer security badges */}
          <div className="mt-5 pt-4 border-t border-brand-gold/10 flex items-center justify-center gap-6 text-brand-soft text-[11px]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-green" /> SSL Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-brand-green" /> Garantía de 15 Días
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
