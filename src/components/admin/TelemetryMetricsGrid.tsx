import React from 'react';
import { Globe2, Store, ShieldCheck } from 'lucide-react';

interface TelemetryMetricsGridProps {
  totalHubs: number;
  activeMarkets: number;
  totalMarkets: number;
  verifiedAdmins: number;
}

export const TelemetryMetricsGrid: React.FC<TelemetryMetricsGridProps> = ({
  totalHubs,
  activeMarkets,
  totalMarkets,
  verifiedAdmins,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* 1. Regional Hubs / Cities */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            REGIONAL HUBS / CITIES
          </span>
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1E4E8C] flex items-center justify-center">
            <Globe2 className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl font-extrabold text-slate-900 font-['Lexend'] leading-none">
          {String(totalHubs).padStart(2, '0')}
        </div>
        <span className="text-xs text-slate-500 mt-1 block">
          Active regional metropolitan hubs
        </span>
      </div>

      {/* 2. Active Markets */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            ACTIVE MARKETS
          </span>
          <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#3FA0C8] flex items-center justify-center">
            <Store className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl font-extrabold text-slate-900 font-['Lexend'] leading-none">
          {String(activeMarkets).padStart(2, '0')}
        </div>
        <span className="text-xs text-slate-500 mt-1 block">
          Of {totalMarkets} registered markets
        </span>
      </div>

      {/* 3. Verified Market Admins */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            VERIFIED MARKET ADMINS
          </span>
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#2EC4B6] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl font-extrabold text-slate-900 font-['Lexend'] leading-none">
          {String(verifiedAdmins).padStart(2, '0')}
        </div>
        <span className="text-xs text-slate-500 mt-1 block">
          Commissioned market personnel
        </span>
      </div>
    </div>
  );
};
