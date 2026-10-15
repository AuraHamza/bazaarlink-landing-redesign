import React from 'react';
import { X, ShieldCheck, Mail, Phone, Calendar, Clock, Store } from 'lucide-react';
import { PlatformPersonnel } from '../../../types/platformAdmin';

interface ViewPersonnelModalProps {
  person: PlatformPersonnel | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ViewPersonnelModal: React.FC<ViewPersonnelModalProps> = ({
  person,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !person) return null;

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
            className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
              Personnel Profile
            </span>
          </div>
          <h3 className="text-xl font-extrabold font-['Lexend'] tracking-tight text-white">
            {person.name}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            ID: {person.id}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 bg-[#0A0E1A] text-white">
          {/* Role and Status Badge */}
          <div className="flex items-center justify-between p-3.5 bg-[#0F172A] rounded-2xl border border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-mono">
                Assigned Role
              </span>
              <span className="text-xs font-bold text-teal-300 font-['Lexend'] mt-0.5 inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                {person.role.replace('_', ' ')}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-mono">
                Status
              </span>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block mt-0.5 font-mono ${
                  person.status === 'ACTIVE'
                    ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/60'
                    : 'bg-amber-950/70 text-amber-400 border border-amber-800/60'
                }`}
              >
                {person.status}
              </span>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-3 text-xs">
            {/* Email */}
            <div className="flex items-center gap-3 p-3 bg-[#0F172A] rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-teal-950/70 text-teal-400 border border-teal-800/60 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                  Email Portal
                </span>
                <span className="font-mono text-slate-200 truncate block">
                  {person.email}
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-3 bg-[#0F172A] rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/70 text-cyan-400 border border-cyan-800/60 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                  Phone
                </span>
                <span className="font-mono text-slate-200">
                  {person.phone || 'Not configured'}
                </span>
              </div>
            </div>

            {/* Assigned Market */}
            <div className="flex items-center gap-3 p-3 bg-[#0F172A] rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 flex items-center justify-center shrink-0">
                <Store className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                  Assigned Market
                </span>
                <span className="font-bold text-white font-['Lexend']">
                  {person.assignedMarketName || 'Unassigned'}
                </span>
              </div>
            </div>

            {/* Commissioned & Activity */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 bg-[#0F172A] rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 mb-1 font-mono">
                  <Calendar className="w-3 h-3 text-teal-400" /> Commissioned
                </span>
                <span className="font-medium text-slate-200 font-mono">
                  {person.joinedDate || '2024-01-15'}
                </span>
              </div>
              <div className="p-3 bg-[#0F172A] rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 mb-1 font-mono">
                  <Clock className="w-3 h-3 text-cyan-400" /> Last Active
                </span>
                <span className="font-medium text-slate-200 font-mono">
                  {person.lastActive || 'Active today'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0F172A] border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
