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
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <Globe2 className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-['Lexend']">
                      {hub.city}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {hub.name}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5 shrink-0 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {hub.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                    HUB CODE
                  </span>
                  <span className="font-mono text-slate-900 font-semibold text-xs truncate block mt-0.5">
                    {hub.hubCode || hub.id}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                    CONNECTED MARKETS
                  </span>
                  <span className="text-slate-900 font-bold text-xs block mt-0.5">
                    {connectedMarkets.length} Market{connectedMarkets.length === 1 ? '' : 's'}
                  </span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between font-medium">
                <span>Province: <strong className="text-slate-800 font-semibold">{hub.province}</strong></span>
                <span>Created: {hub.createdAt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
