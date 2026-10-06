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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
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
              Personnel Profile
            </span>
          </div>
          <h3 className="text-xl font-extrabold font-['Lexend'] tracking-tight">
            {person.name}
          </h3>
          <p className="text-xs text-teal-100 font-mono mt-0.5">
            ID: {person.id}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Role and Status Badge */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Assigned Role
              </span>
              <span className="text-xs font-bold text-teal-700 font-['Lexend'] mt-0.5 inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                {person.role.replace('_', ' ')}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Status
              </span>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block mt-0.5 ${
                  person.status === 'ACTIVE'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {person.status}
              </span>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-3 text-xs">
            {/* Email */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Email Portal
                </span>
                <span className="font-mono text-slate-800 truncate block">
                  {person.email}
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Phone
                </span>
                <span className="font-mono text-slate-800">
                  {person.phone || 'Not configured'}
                </span>
              </div>
            </div>

            {/* Assigned Market */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Store className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Assigned Market
                </span>
                <span className="font-bold text-slate-800 font-['Lexend']">
                  {person.assignedMarketName || 'Unassigned'}
                </span>
              </div>
            </div>

            {/* Commissioned & Activity */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3" /> Commissioned
                </span>
                <span className="font-medium text-slate-700">
                  {person.joinedDate || '2024-01-15'}
                </span>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 mb-1">
                  <Clock className="w-3 h-3" /> Last Active
                </span>
                <span className="font-medium text-slate-700">
                  {person.lastActive || 'Active today'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
