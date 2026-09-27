import React, { useState, useEffect } from 'react';
import { X, Store, Check } from 'lucide-react';
import { Market } from '../../../types/market';
import { PlatformPersonnel } from '../../../types/platformAdmin';
import { platformAdminApi } from '../../../services/platformAdminApi';

interface EditMarketModalProps {
  market: Market | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  admins: PlatformPersonnel[];
}

export const EditMarketModal: React.FC<EditMarketModalProps> = ({
  market,
  isOpen,
  onClose,
  onSuccess,
  admins,
}) => {
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [district, setDistrict] = useState('South Karachi');
  const [status, setStatus] = useState<'active' | 'pending' | 'inactive'>('active');
  const [timing, setTiming] = useState('');
  const [tagline, setTagline] = useState('');
  const [adminId, setAdminId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (market) {
      setName(market.name);
      setArea(market.area);
      setDistrict(market.district);
      setStatus(market.status);
      setTiming(market.timing);
      setTagline(market.tagline);
      setAdminId(market.adminId || '');
      setError(null);
    }
  }, [market, isOpen]);

  if (!isOpen || !market) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);

      await platformAdminApi.updateMarket(market.id, {
        name: name.trim(),
        area: area.trim(),
        district,
        status,
        timing: timing.trim(),
        tagline: tagline.trim(),
        adminId: adminId || null,
      });

      setIsSubmitting(false);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : 'Failed to update market');
    }
  };

  const marketAdmins = admins.filter((a) => a.role === 'MARKET_ADMIN');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Store className="w-4 h-4 text-sky-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
              Market Configuration
            </span>
          </div>
          <h3 className="text-xl font-extrabold font-['Lexend'] tracking-tight">
            Edit {market.name} Market
          </h3>
          <p className="text-xs text-sky-100">
            Market ID: #{market.id} · Regional Governance
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Market Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3FA0C8] focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Area / Neighborhood</label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3FA0C8] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3FA0C8] focus:bg-white"
              >
                <option value="South Karachi">South Karachi</option>
                <option value="East Karachi">East Karachi</option>
                <option value="Central Karachi">Central Karachi</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'active' | 'pending' | 'inactive')}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3FA0C8] focus:bg-white"
              >
                <option value="active">ACTIVE (Visible on Map & Feed)</option>
                <option value="pending">PENDING (Verification in Progress)</option>
                <option value="inactive">INACTIVE (Deactivated / Hidden)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Operating Hours</label>
            <input
              type="text"
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3FA0C8] focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3FA0C8] focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Market Administrator</label>
            <select
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3FA0C8] focus:bg-white"
            >
              <option value="">VACANT (No Administrator Assigned)</option>
              {marketAdmins.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.email}) {a.assignedMarketId === market.id ? '[Current]' : ''}
                </option>
              ))}
            </select>
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
              disabled={isSubmitting}
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] hover:from-[#173e70] hover:to-[#358aa8] rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Saving Changes...' : 'Save Configuration'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
