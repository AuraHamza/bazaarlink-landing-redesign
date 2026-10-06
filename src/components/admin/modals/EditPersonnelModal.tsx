import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, AlertCircle, Save } from 'lucide-react';
import { PlatformPersonnel } from '../../../types/platformAdmin';
import { Market } from '../../../types/market';
import { platformAdminApi } from '../../../services/platformAdminApi';

interface EditPersonnelModalProps {
  person: PlatformPersonnel | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  markets: Market[];
}

export const EditPersonnelModal: React.FC<EditPersonnelModalProps> = ({
  person,
  isOpen,
  onClose,
  onSuccess,
  markets,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [assignedMarketId, setAssignedMarketId] = useState<string>('');
  const [status, setStatus] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (person) {
      setName(person.name);
      setEmail(person.email);
      setPhone(person.phone || '');
      setAssignedMarketId(person.assignedMarketId ? String(person.assignedMarketId) : '');
      setStatus(person.status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE');
      setError(null);
    }
  }, [person, isOpen]);

  if (!isOpen || !person) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Name and Email are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const parsedMarketId = assignedMarketId ? parseInt(assignedMarketId, 10) : null;

      await platformAdminApi.updateMarketAdmin(person.id, {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        status,
        assignedMarketId: parsedMarketId,
      });

      setIsSubmitting(false);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : 'Failed to update administrator.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0A1128] via-[#1E4E8C] to-[#0D9488] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-teal-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 font-mono">
              Personnel Administration
            </span>
          </div>
          <h3 className="text-xl font-extrabold font-['Lexend'] tracking-tight">
            Edit Market Administrator
          </h3>
          <p className="text-xs text-teal-100 font-mono mt-0.5">
            Admin ID: {person.id}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              FULL IDENTITY / NAME <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Shahzain Khan"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              EMAIL PORTAL <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. shahzain@bazaarlink.pk"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-colors font-mono"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              PHONE CONTACT
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +92 300 8291002"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-colors font-mono"
            />
          </div>

          {/* Assigned Market & Status Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Assigned Market */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                ASSIGNED MARKET
              </label>
              <select
                value={assignedMarketId}
                onChange={(e) => setAssignedMarketId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-colors"
              >
                <option value="">Unassigned</option>
                {markets.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.area})
                  </option>
                ))}
              </select>
            </div>

            {/* Account Status */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                ACCOUNT STATUS
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'ACTIVE' | 'INACTIVE')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-colors"
              >
                <option value="ACTIVE">ACTIVE (Authorized)</option>
                <option value="INACTIVE">INACTIVE (Deactivated)</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
