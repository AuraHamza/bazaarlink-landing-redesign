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
              <Globe2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
              Command Center
            </span>
          </div>

          <h3 className="text-xl font-extrabold font-['Lexend'] tracking-tight">
            Regional Expansion
          </h3>
          <p className="text-xs text-sky-100 mt-1">
            Register a new regional city/hub.
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
              <span>Regional city/hub registered successfully!</span>
            </div>
          )}

          {/* HUB CITY NAME */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              HUB CITY NAME *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Karachi, Lahore, Islamabad"
              value={hubCityName}
              onChange={(e) => setHubCityName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA0C8] focus:bg-white text-slate-800"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              In BazaarLink, Regional Hub and City represent the same geographic entity.
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
              <span>{isSubmitting ? 'Authorizing...' : 'Authorize Expansion'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
