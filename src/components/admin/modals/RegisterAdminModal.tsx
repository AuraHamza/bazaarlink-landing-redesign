import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, Eye, EyeOff } from 'lucide-react';
import { platformAdminApi } from '../../../services/platformAdminApi';

interface RegisterAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const RegisterAdminModal: React.FC<RegisterAdminModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [securityKey, setSecurityKey] = useState('');
  const [showSecurityKey, setShowSecurityKey] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successFeedback, setSuccessFeedback] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setError('Please provide full identity and email portal address.');
      return;
    }

    if (!securityKey.trim()) {
      setError('Please provide security key.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Contract: POST /api/v1/admin/market-admins/register
      // Payload: { "fullName": "Admin Name", "email": "admin@example.com", "password": "password" }
      // Role is fixed to MARKET_ADMIN
      await platformAdminApi.createMarketAdmin({
        fullName: fullName.trim(),
        email: email.trim(),
        securityKey: securityKey.trim(),
      });

      setIsSubmitting(false);
      setSuccessFeedback(true);
      setTimeout(() => {
        setSuccessFeedback(false);
        setFullName('');
        setEmail('');
        setSecurityKey('');
        onSuccess();
        onClose();
      }, 700);
    } catch (err: unknown) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : 'Failed to register market administrator');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
              Command Center
            </span>
          </div>

          <h3 className="text-xl font-extrabold font-['Lexend'] tracking-tight">
            Admin Commissioning
          </h3>
          <p className="text-xs text-sky-100 mt-1">
            Directly register and provision a Market Administrator account.
          </p>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
              {error}
            </div>
          )}

          {successFeedback && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Market Admin commissioned successfully! Role: MARKET_ADMIN</span>
            </div>
          )}

          {/* 1. FULL IDENTITY */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              FULL IDENTITY *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Asadullah Qureshi"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA0C8] focus:bg-white text-slate-800"
            />
          </div>

          {/* 2. EMAIL PORTAL */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              EMAIL PORTAL *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. asadullah@bazaarlink.pk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA0C8] focus:bg-white text-slate-800"
            />
          </div>

          {/* 3. SECURITY KEY (Masked password input) */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              SECURITY KEY *
            </label>
            <div className="relative">
              <input
                type={showSecurityKey ? 'text' : 'password'}
                required
                placeholder="Initial secure portal password"
                value={securityKey}
                onChange={(e) => setSecurityKey(e.target.value)}
                className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA0C8] focus:bg-white font-mono text-slate-800"
              />
              <button
                type="button"
                onClick={() => setShowSecurityKey(!showSecurityKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showSecurityKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              Role is fixed to MARKET_ADMIN. Directly provisioned with zero approval workflow.
            </span>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || successFeedback}
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] hover:from-[#173e70] hover:to-[#358aa8] rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Issuing...' : 'Issue Credentials'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
