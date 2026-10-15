import React from 'react';
import { Globe2 } from 'lucide-react';
import { RegionalHub } from '../../types/platformAdmin';
import { Market } from '../../types/market';

interface RegionalHubsListProps {
  hubs: RegionalHub[];
  markets: Market[];
}

export const RegionalHubsList: React.FC<RegionalHubsListProps> = ({
  hubs,
  markets,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-['Lexend']">
            REGIONAL HUBS / CITIES
          </h2>
          <p className="text-xs text-slate-500">
            Active metropolitan regional hubs (Regional Hub = City)
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          Total: <strong className="text-slate-800">{hubs.length} Hub{hubs.length === 1 ? '' : 's'}</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hubs.map((hub) => {
          const connectedMarkets = markets.filter((m) => m.hubId === hub.id);

          return (
            <div
              key={hub.id}
              className="bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 border border-teal-700/60 text-white rounded-2xl p-6 shadow-md space-y-4 hover:border-teal-500/70 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-950/70 border border-teal-700/50 text-teal-400 flex items-center justify-center shrink-0 shadow-inner">
                    <Globe2 className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-['Lexend']">
                      {hub.city}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">
                      {hub.name}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/80 flex items-center gap-1.5 shrink-0 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {hub.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-teal-800/40">
                <div>
                  <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider block font-mono">
                    HUB CODE
                  </span>
                  <span className="font-mono text-white font-semibold text-xs truncate block mt-0.5">
                    {hub.hubCode || hub.id}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider block font-mono">
                    CONNECTED MARKETS
                  </span>
                  <span className="text-white font-bold text-xs block mt-0.5">
                    {connectedMarkets.length} Market{connectedMarkets.length === 1 ? '' : 's'}
                  </span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-teal-800/40 text-xs text-slate-300 flex items-center justify-between font-medium">
                <span>Province: <strong className="text-white font-semibold">{hub.province}</strong></span>
                <span>Created: {hub.createdAt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
