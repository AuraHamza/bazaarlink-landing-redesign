import React, { useState } from 'react';
import { X, Store, CheckCircle2 } from 'lucide-react';
import { platformAdminApi } from '../../../services/platformAdminApi';
import { RegionalHub, PlatformPersonnel } from '../../../types/platformAdmin';

interface RegisterMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  hubs: RegionalHub[];
  admins: PlatformPersonnel[];
}

export const RegisterMarketModal: React.FC<RegisterMarketModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  hubs,
  admins,
}) => {
  const [marketName, setMarketName] = useState('');
  const [selectedHubId, setSelectedHubId] = useState(hubs[0]?.id || '');
  const [selectedAdminId, setSelectedAdminId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successFeedback, setSuccessFeedback] = useState(false);

  // Synchronize initial hub id when hubs are loaded
  React.useEffect(() => {
    if (hubs.length > 0 && !selectedHubId) {
      setSelectedHubId(hubs[0].id);
    }
  }, [hubs, selectedHubId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!marketName.trim()) {
      setError('Please provide the market name.');
      return;
    }

    if (!selectedHubId) {
      setError('Please select an assigned hub / city.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Contract: POST /api/v1/admin/markets
      // Payload: { "marketName": "Tariq Road", "hubId": "HUB_123", "adminId": null }
      await platformAdminApi.createMarket({
        marketName: marketName.trim(),
        hubId: selectedHubId,
        adminId: selectedAdminId || null,
      });

      setIsSubmitting(false);
      setSuccessFeedback(true);
      setTimeout(() => {
        setSuccessFeedback(false);
        setMarketName('');
        setSelectedAdminId('');
        onSuccess();
        onClose();
      }, 700);
    } catch (err: unknown) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : 'Failed to register market');
    }
  };

  const availableMarketAdmins = admins.filter((a) => a.role === 'MARKET_ADMIN');

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
              <Store className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
              Command Center
            </span>
          </div>

          <h3 className="text-xl font-extrabold font-['Lexend'] tracking-tight text-white">
            Market Deployment
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Register a new market under an existing regional hub/city.
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
              <span>Market registered and operations launched!</span>
            </div>
          )}

          {/* 1. MARKET NAME */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              MARKET NAME *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Tariq Road, Zainab Market, Bolton Market"
              value={marketName}
              onChange={(e) => setMarketName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#0F172A] border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-slate-900 text-white placeholder:text-slate-500 transition-colors"
            />
          </div>

          {/* 2. ASSIGNED HUB (Select City) - Single Geographic Field */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              ASSIGNED HUB (Select City) *
            </label>
            <select
              required
              value={selectedHubId}
              onChange={(e) => setSelectedHubId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#0F172A] border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-slate-900 text-white cursor-pointer"
            >
              {hubs.length === 0 ? (
                <option value="">No Hubs Available (Register a hub first)</option>
              ) : (
                hubs.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.city} ({h.name})
                  </option>
                ))
              )}
            </select>
            <span className="text-[10px] text-slate-400 mt-1 block">
              In BazaarLink, Regional Hub and City represent the same geographic entity.
            </span>
          </div>

          {/* 3. APPOINT ADMINISTRATOR */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              APPOINT ADMINISTRATOR
            </label>
            <select
              value={selectedAdminId}
              onChange={(e) => setSelectedAdminId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#0F172A] border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-slate-900 text-white cursor-pointer"
            >
              <option value="">None (Reserve for later)</option>
              {availableMarketAdmins.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.email}) {a.assignedMarketName ? `· [Assigned: ${a.assignedMarketName}]` : '· [Available]'}
                </option>
              ))}
            </select>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Populates available Market Admins from real backend data.
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
              <span>{isSubmitting ? 'Launching...' : 'Launch Operations'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
