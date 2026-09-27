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
          <h2 className="text-lg font-bold text-slate-900 font-['Lexend']">
            COMMAND CENTER
          </h2>
          <p className="text-xs text-slate-500">
            Provision and configure core BazaarLink entities
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Action A: Register Hub (Regional Expansion) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#3FA0C8]/60 transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#1E4E8C] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-['Lexend']">
              Regional Expansion
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Register a new regional city/hub to expand BazaarLink coverage across Pakistan.
            </p>
          </div>
          <div className="pt-5 border-t border-slate-100 mt-4">
            <button
              onClick={onOpenRegisterHub}
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] hover:from-[#173e70] hover:to-[#358aa8] rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Regional Expansion</span>
            </button>
          </div>
        </div>

        {/* Action B: Register Market (Market Deployment) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#3FA0C8]/60 transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 text-[#3FA0C8] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-['Lexend']">
              Market Deployment
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Register a new market under an existing regional hub/city and appoint administrative leadership.
            </p>
          </div>
          <div className="pt-5 border-t border-slate-100 mt-4">
            <button
              onClick={onOpenRegisterMarket}
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] hover:from-[#173e70] hover:to-[#358aa8] rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Market Deployment</span>
            </button>
          </div>
        </div>

        {/* Action C: Register Market Admin (Admin Commissioning) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#3FA0C8]/60 transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 text-[#2EC4B6] flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-['Lexend']">
              Admin Commissioning
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Directly register a Market Admin with credentials and assign market governance without approval delays.
            </p>
          </div>
          <div className="pt-5 border-t border-slate-100 mt-4">
            <button
              onClick={onOpenRegisterAdmin}
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] hover:from-[#173e70] hover:to-[#358aa8] rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
            >
              <UserPlus className="w-4 h-4" />
              <span>Admin Commissioning</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
