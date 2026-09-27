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
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4 hover:border-[#3FA0C8] transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1E4E8C] flex items-center justify-center shrink-0">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-['Lexend']">
                      {hub.city}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {hub.name}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {hub.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-100">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Hub Code
                  </span>
                  <span className="font-mono text-slate-800 font-semibold text-[11px] truncate block">
                    {hub.hubCode || hub.id}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Connected Markets
                  </span>
                  <span className="text-slate-800 font-bold">
                    {connectedMarkets.length} Market{connectedMarkets.length === 1 ? '' : 's'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Province: <strong className="text-slate-700 font-medium">{hub.province}</strong></span>
                <span>Created: {hub.createdAt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
