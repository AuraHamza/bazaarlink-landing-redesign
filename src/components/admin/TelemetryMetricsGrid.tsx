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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 1. Regional Hubs / Cities: Emerald to Teal Gradient */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 shadow-md shadow-emerald-950/10 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 font-mono">
            REGIONAL HUBS / CITIES
          </span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest bg-emerald-500/30 border border-emerald-300/40 text-emerald-100 px-2 py-0.5 rounded-full font-mono">
            ACTIVE
          </span>
        </div>
        <div>
          <div className="text-4xl sm:text-5xl font-black font-['Lexend'] tracking-tight leading-none text-white drop-shadow-xs">
            {String(totalHubs).padStart(2, '0')}
          </div>
          <span className="text-xs text-emerald-100/90 mt-2 block font-medium">
            Active regional metropolitan hubs
          </span>
        </div>
      </div>

      {/* 2. Active Markets: Teal to Cyan Gradient */}
      <div className="bg-gradient-to-r from-teal-700 to-cyan-700 text-white rounded-2xl p-6 shadow-md shadow-cyan-950/10 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100 font-mono">
            ACTIVE MARKETS
          </span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest bg-cyan-500/30 border border-cyan-300/40 text-cyan-100 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
            LIVE
          </span>
        </div>
        <div>
          <div className="text-4xl sm:text-5xl font-black font-['Lexend'] tracking-tight leading-none text-white drop-shadow-xs">
            {String(activeMarkets).padStart(2, '0')}
          </div>
          <span className="text-xs text-teal-100/90 mt-2 block font-medium">
            Of {totalMarkets} registered markets
          </span>
        </div>
      </div>

      {/* 3. Verified Market Admins: White / Slate Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-slate-900 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            VERIFIED MARKET ADMINS
          </span>
          <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200/60 text-teal-700 flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <div className="text-4xl sm:text-5xl font-black font-['Lexend'] tracking-tight leading-none text-slate-900">
            {String(verifiedAdmins).padStart(2, '0')}
          </div>
          <span className="text-xs text-slate-500 mt-2 block font-medium">
            Commissioned market personnel
          </span>
        </div>
      </div>
    </div>
  );
};
