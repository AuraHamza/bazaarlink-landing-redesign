import React from 'react';
import { AlertTriangle, Trash2, CheckCircle2, X } from 'lucide-react';

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  confirmVariant?: 'danger' | 'warning' | 'primary';
  isProcessing?: boolean;
}

export const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm Action',
  confirmVariant = 'danger',
  isProcessing = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Unified Modal Header */}
        <div className="bg-gradient-to-r from-[#0A1128] via-[#1E4E8C] to-[#0D9488] p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 font-mono">
              Confirmation Required
            </span>
          </div>
          <h3 className="text-lg font-bold font-['Lexend'] tracking-tight">
            {title}
          </h3>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 bg-white">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                confirmVariant === 'danger'
                  ? 'bg-red-50 text-[#EF4444] border border-red-200'
                  : 'bg-amber-50 text-[#F59E0B] border border-amber-200'
              }`}
            >
              {confirmVariant === 'danger' ? (
                <Trash2 className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {message}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isProcessing}
              className={`px-4 py-2 text-xs font-bold text-white rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-50 ${
                confirmVariant === 'danger'
                  ? 'bg-[#EF4444] hover:bg-red-600'
                  : confirmVariant === 'warning'
                  ? 'bg-[#F59E0B] hover:bg-amber-600'
                  : 'bg-[#0D9488] hover:bg-[#0F766E]'
              }`}
            >
              <span>{isProcessing ? 'Processing...' : confirmLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
