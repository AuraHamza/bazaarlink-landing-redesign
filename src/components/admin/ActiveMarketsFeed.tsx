import React from 'react';
import { Store, Edit3, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { Market } from '../../types/market';

interface ActiveMarketsFeedProps {
  markets: Market[];
  onOpenEditMarket: (market: Market) => void;
  onOpenDeleteMarket: (market: Market) => void;
  onToggleMarketStatus: (market: Market) => void;
}

export const ActiveMarketsFeed: React.FC<ActiveMarketsFeedProps> = ({
  markets,
  onOpenEditMarket,
  onOpenDeleteMarket,
  onToggleMarketStatus,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-['Lexend']">
            ACTIVE MARKETS FEED
          </h2>
          <p className="text-xs text-slate-500">
            Real-time feed of onboarded physical commercial bazaars and markets
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          Total: <strong className="text-slate-800">{markets.length} Registered Market{markets.length === 1 ? '' : 's'}</strong>
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Market</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Market Administrator</th>
                <th className="py-3.5 px-4">Shops</th>
                <th className="py-3.5 px-4">Created</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {markets.map((market) => {
                const isActive = market.status === 'active';

                return (
                  <tr
                    key={market.id}
                    className="hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* Market Name */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E4E8C] flex items-center justify-center font-bold text-xs shrink-0">
                          <Store className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 font-['Lexend'] block">
                            {market.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ID: #{market.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="font-medium text-slate-800 block">
                        {market.area}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {market.district}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        {isActive ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </td>

                    {/* Market Administrator */}
                    <td className="py-3.5 px-4">
                      {market.adminName ? (
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-teal-50 text-[#2EC4B6] border border-teal-200 flex items-center justify-center font-bold text-[9px] shrink-0">
                            {market.adminName.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-800">
                            {market.adminName}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">
                          Unassigned
                        </span>
                      )}
                    </td>

                    {/* Shops Count */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {market.shopsCount || market.sampleShops?.length || 0} Shops
                    </td>

                    {/* Created */}
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {market.createdAt || '2024-01-15'}
                    </td>

                    {/* Actions: Edit, Toggle Status, Delete */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onToggleMarketStatus(market)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isActive
                              ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'
                              : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={isActive ? 'Deactivate market' : 'Activate market'}
                        >
                          {isActive ? (
                            <XCircle className="w-4 h-4" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() => onOpenEditMarket(market)}
                          className="p-1.5 text-slate-400 hover:text-[#1E4E8C] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit market details"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onOpenDeleteMarket(market)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete market"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
