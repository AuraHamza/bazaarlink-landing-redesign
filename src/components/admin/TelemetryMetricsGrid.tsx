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
      {/* 1. Regional Hubs / Cities: Dark Emerald to Teal to Cyan Gradient */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-cyan-950 text-white rounded-2xl p-6 border border-teal-700/50 shadow-lg flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 font-mono">
            REGIONAL HUBS / CITIES
          </span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
            ACTIVE
          </span>
        </div>
        <div>
          <div className="text-4xl sm:text-5xl font-black font-['Lexend'] tracking-tight leading-none text-white drop-shadow-xs">
            {String(totalHubs).padStart(2, '0')}
          </div>
          <span className="text-xs text-emerald-200/80 mt-2 block font-medium">
            Active regional metropolitan hubs
          </span>
        </div>
      </div>

      {/* 2. Active Markets: Dark Teal to Cyan Gradient */}
      <div className="bg-gradient-to-r from-teal-900 to-cyan-950 text-white rounded-2xl p-6 border border-teal-700/50 shadow-lg flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 font-mono">
            ACTIVE MARKETS
          </span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            LIVE
          </span>
        </div>
        <div>
          <div className="text-4xl sm:text-5xl font-black font-['Lexend'] tracking-tight leading-none text-white drop-shadow-xs">
            {String(activeMarkets).padStart(2, '0')}
          </div>
          <span className="text-xs text-teal-200/80 mt-2 block font-medium">
            Of {totalMarkets} registered markets
          </span>
        </div>
      </div>

      {/* 3. Verified Market Admins: Dark Teal to Cyan Gradient */}
      <div className="bg-gradient-to-r from-teal-900 to-cyan-950 text-white rounded-2xl p-6 border border-teal-700/50 shadow-lg flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 font-mono">
            VERIFIED MARKET ADMINS
          </span>
          <div className="w-7 h-7 rounded-lg bg-teal-800/40 border border-teal-600/50 text-teal-300 flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <div className="text-4xl sm:text-5xl font-black font-['Lexend'] tracking-tight leading-none text-white drop-shadow-xs">
            {String(verifiedAdmins).padStart(2, '0')}
          </div>
          <span className="text-xs text-cyan-200/80 mt-2 block font-medium">
            Commissioned market personnel
          </span>
        </div>
      </div>
    </div>
  );
};
