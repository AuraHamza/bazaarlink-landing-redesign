import React from 'react';
import { Globe2, Store, ShieldCheck, Plus, UserPlus } from 'lucide-react';

interface CommandCenterProps {
  onOpenRegisterHub: () => void;
  onOpenRegisterMarket: () => void;
  onOpenRegisterAdmin: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  onOpenRegisterHub,
  onOpenRegisterMarket,
  onOpenRegisterAdmin,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-['Lexend'] tracking-tight">
            COMMAND CENTER
          </h2>
          <p className="text-xs text-slate-500">
            Provision and configure core BazaarLink entities
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Action A: Register Hub (Regional Expansion) */}
        <div className="bg-[#0A1128] text-white rounded-2xl p-6 border border-slate-800 shadow-xl hover:border-teal-500/40 transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-950/70 border border-teal-800/60 text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
              <Globe2 className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="text-base font-bold text-white font-['Lexend']">
              Regional Expansion
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Register a new regional city/hub to expand BazaarLink coverage across Pakistan.
            </p>
          </div>
          <div className="pt-5 border-t border-slate-800/80 mt-4">
            <button
              onClick={onOpenRegisterHub}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-[#0D9488] to-[#06B6D4] rounded-xl shadow-md shadow-teal-500/20 hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>+ Regional Expansion</span>
            </button>
          </div>
        </div>

        {/* Action B: Register Market (Market Deployment) */}
        <div className="bg-[#0A1128] text-white rounded-2xl p-6 border border-slate-800 shadow-xl hover:border-cyan-500/40 transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
              <Store className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-base font-bold text-white font-['Lexend']">
              Market Deployment
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Register a new market under an existing regional hub/city and appoint administrative leadership.
            </p>
          </div>
          <div className="pt-5 border-t border-slate-800/80 mt-4">
            <button
              onClick={onOpenRegisterMarket}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-[#0D9488] to-[#06B6D4] rounded-xl shadow-md shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>+ Market Deployment</span>
            </button>
          </div>
        </div>

        {/* Action C: Register Market Admin (Admin Commissioning) */}
        <div className="bg-[#0A1128] text-white rounded-2xl p-6 border border-slate-800 shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white font-['Lexend']">
              Admin Commissioning
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Directly register a Market Admin with credentials and assign market governance without approval delays.
            </p>
          </div>
          <div className="pt-5 border-t border-slate-800/80 mt-4">
            <button
              onClick={onOpenRegisterAdmin}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-[#0D9488] to-[#06B6D4] rounded-xl shadow-md shadow-emerald-500/20 hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Admin Commissioning</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
