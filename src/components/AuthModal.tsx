import React, { useState } from 'react';
import { X, MapPin, Store, User, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<'shopper' | 'merchant'>('shopper');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    setMode(initialMode);
    setSubmitted(false);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold font-['Lexend']">
              BazaarLink Karachi
            </span>
          </div>

          <h3 className="text-xl font-extrabold font-['Lexend']">
            {mode === 'login' ? 'Welcome Back to BazaarLink' : 'Start Exploring Local Markets'}
          </h3>
          <p className="text-xs text-sky-100 mt-1">
            {mode === 'login'
              ? 'Access your orders, saved shops, and market carts.'
              : 'Join as a local Karachi shopper or register your market shop.'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-['Lexend']">
                {mode === 'login' ? 'Logged In Successfully!' : 'Account Created!'}
              </h4>
              <p className="text-xs text-slate-500">
                Redirecting to your BazaarLink dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Account Type Selector for Register */}
              {mode === 'register' && (
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setRole('shopper')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      role === 'shopper'
                        ? 'bg-white text-[#1E4E8C] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Customer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('merchant')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      role === 'merchant'
                        ? 'bg-white text-[#1E4E8C] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Shop Owner</span>
                  </button>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA0C8] focus:bg-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  {mode === 'login' && (
                    <span className="text-[11px] text-[#1E4E8C] hover:underline cursor-pointer">
                      Forgot password?
                    </span>
                  )}
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA0C8] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-sm font-bold text-white bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] hover:from-[#173e70] hover:to-[#358aa8] rounded-xl shadow-md shadow-[#1E4E8C]/20 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
              >
                <span>{mode === 'login' ? 'Sign In to BazaarLink' : 'Create Free Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                {mode === 'login' ? (
                  <p className="text-xs text-slate-500">
                    Don&apos;t have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="text-[#1E4E8C] font-semibold hover:underline cursor-pointer"
                    >
                      Get Started
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-[#1E4E8C] font-semibold hover:underline cursor-pointer"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
