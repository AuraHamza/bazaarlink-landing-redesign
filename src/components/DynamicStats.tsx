import React from 'react';
import { Store, Building2, Package, Sparkles } from 'lucide-react';
import { Market } from '../types/market';

interface DynamicStatsProps {
  markets: Market[];
  onOpenDbSimulator?: () => void;
}

export const DynamicStats: React.FC<DynamicStatsProps> = ({ markets, onOpenDbSimulator }) => {
  // Dynamically computed from database state
  const totalMarkets = markets.length;
  const totalShops = markets.reduce((sum, m) => sum + m.shopsCount, 0);
  const totalProducts = markets.reduce((sum, m) => sum + m.productsCount, 0);

  const stats = [
    {
      label: 'Active Markets',
      value: `${totalMarkets} Markets`,
      sub: 'Karachi commercial hubs',
      icon: Building2,
      accent: 'text-[#1E4E8C] bg-blue-50 border-blue-100',
    },
    {
      label: 'Verified Shops',
      value: `${totalShops}+ Shops`,
      sub: 'Local market vendors',
      icon: Store,
      accent: 'text-[#3FA0C8] bg-sky-50 border-sky-100',
    },
    {
      label: 'Cataloged Products',
      value: `${totalProducts.toLocaleString()}+ Products`,
      sub: 'Clothing, jewelry, decor & more',
      icon: Package,
      accent: 'text-[#2EC4B6] bg-teal-50 border-teal-100',
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  {stat.label}
                </span>
                <div className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 font-['Lexend']">
                  {stat.value}
                </div>
                <p className="text-xs text-slate-500">
                  {stat.sub}
                </p>
              </div>
              <div className={`p-3 rounded-xl border ${stat.accent}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Database sync status pill showing architectural reality */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            Database State: <span className="font-mono text-slate-700 font-medium">GET /markets</span> ({totalMarkets} active loaded)
          </span>
        </div>
        {onOpenDbSimulator && (
          <button
            onClick={onOpenDbSimulator}
            className="text-[#1E4E8C] hover:text-[#3FA0C8] font-medium underline underline-offset-2 cursor-pointer flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2EC4B6]" />
            Test DB Sync Simulator
          </button>
        )}
      </div>
    </div>
  );
};
