import React, { useState } from 'react';
import { X, MapPin, Store, User, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onAdminLogin?: () => void;
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="bg-[#0A0E1A] w-full max-w-md rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F172A] border-b border-slate-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-xs">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold font-['Lexend'] text-white">
              BazaarLink Karachi
            </span>
          </div>

          <h3 className="text-xl font-extrabold font-['Lexend'] text-white">
            {mode === 'login' ? 'Welcome Back to BazaarLink' : 'Start Exploring Local Markets'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login'
              ? 'Access your orders, saved shops, and market carts.'
              : 'Join as a local Karachi shopper or register your market shop.'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 bg-[#0A0E1A]">
          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white font-['Lexend']">
                {mode === 'login' ? 'Logged In Successfully!' : 'Account Created!'}
              </h4>
              <p className="text-xs text-slate-400">
                Redirecting to your BazaarLink account...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Account Type Selector for Register */}
              {mode === 'register' && (
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setRole('shopper')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      role === 'shopper'
                        ? 'bg-slate-800 text-teal-300 shadow-sm border border-slate-700'
                        : 'text-slate-400 hover:text-white'
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
                        ? 'bg-slate-800 text-teal-300 shadow-sm border border-slate-700'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Shop Owner</span>
                  </button>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#0F172A] border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-slate-900 text-white placeholder:text-slate-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-300">
                    Password
                  </label>
                  {mode === 'login' && (
                    <span className="text-[11px] text-teal-400 hover:text-cyan-300 hover:underline cursor-pointer">
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
                  className="w-full px-3.5 py-2.5 text-sm bg-[#0F172A] border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-slate-900 text-white placeholder:text-slate-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-sm font-bold text-white bg-gradient-to-r from-[#0D9488] to-[#06B6D4] hover:brightness-110 rounded-xl shadow-md shadow-teal-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
              >
                <span>{mode === 'login' ? 'Sign In to BazaarLink' : 'Create Free Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                {mode === 'login' ? (
                  <p className="text-xs text-slate-400">
                    Don&apos;t have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="text-teal-400 hover:text-cyan-300 font-semibold hover:underline cursor-pointer"
                    >
                      Get Started
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-slate-400">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-teal-400 hover:text-cyan-300 font-semibold hover:underline cursor-pointer"
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
