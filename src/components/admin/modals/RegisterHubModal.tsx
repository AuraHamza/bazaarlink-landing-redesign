import React, { useState } from 'react';
import { X, Globe2, CheckCircle2 } from 'lucide-react';
import { platformAdminApi } from '../../../services/platformAdminApi';

interface RegisterHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const RegisterHubModal: React.FC<RegisterHubModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [hubCityName, setHubCityName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successFeedback, setSuccessFeedback] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hubCityName.trim()) {
      setError('Please provide the Hub City Name.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      // Calls POST /api/v1/admin/hubs contract: { cityName: "Karachi" }
      await platformAdminApi.createRegionalHub({
        cityName: hubCityName.trim(),
      });
      setIsSubmitting(false);
      setSuccessFeedback(true);
      setTimeout(() => {
        setSuccessFeedback(false);
        setHubCityName('');
        onSuccess();
        onClose();
      }, 700);
    } catch (err: unknown) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : 'Failed to register regional hub');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="bg-[#0A0E1A] w-full max-w-md rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0F172A] border-b border-slate-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-teal-400">
              <Globe2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
              Command Center
            </span>
          </div>

          <h3 className="text-xl font-extrabold font-['Lexend'] tracking-tight text-white">
            Regional Expansion
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Register a new regional city/hub.
          </p>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm bg-[#0A1128] text-white">
          {error && (
            <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-300">
              {error}
            </div>
          )}

          {successFeedback && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-800/80 rounded-2xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Regional city/hub registered successfully!</span>
            </div>
          )}

          {/* HUB CITY NAME */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              HUB CITY NAME *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Karachi, Lahore, Islamabad"
              value={hubCityName}
              onChange={(e) => setHubCityName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#0F172A] border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-slate-900 text-white placeholder:text-slate-500 transition-colors"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              In BazaarLink, Regional Hub and City represent the same geographic entity.
            </span>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || successFeedback}
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0D9488] to-[#06B6D4] hover:brightness-110 rounded-xl shadow-md shadow-teal-500/20 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Authorizing...' : 'Authorize Expansion'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
