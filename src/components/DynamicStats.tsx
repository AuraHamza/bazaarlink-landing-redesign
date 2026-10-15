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
      gradient: 'bg-gradient-to-r from-teal-900 to-cyan-950 border-teal-700/50',
      accent: 'text-teal-300 bg-teal-950/70 border-teal-600/50',
    },
    {
      label: 'Verified Shops',
      value: `${totalShops}+ Shops`,
      sub: 'Local market vendors',
      icon: Store,
      gradient: 'bg-gradient-to-r from-emerald-800 via-teal-900 to-cyan-950 border-teal-700/50',
      accent: 'text-emerald-300 bg-emerald-950/70 border-emerald-600/50',
    },
    {
      label: 'Cataloged Products',
      value: `${totalProducts.toLocaleString()}+ Products`,
      sub: 'Clothing, jewelry, decor & more',
      icon: Package,
      gradient: 'bg-gradient-to-r from-teal-900 to-cyan-950 border-teal-700/50',
      accent: 'text-cyan-300 bg-cyan-950/70 border-cyan-600/50',
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
              className={`${stat.gradient} text-white rounded-2xl p-5 border shadow-lg hover:brightness-105 transition-all flex items-start justify-between gap-4`}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-wider text-slate-300 uppercase font-mono">
                  {stat.label}
                </span>
                <div className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white font-['Lexend']">
                  {stat.value}
                </div>
                <p className="text-xs text-slate-300/80">
                  {stat.sub}
                </p>
              </div>
              <div className={`p-3 rounded-xl border ${stat.accent} shadow-inner`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Database sync status pill showing architectural reality */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-xs shadow-emerald-400/80" />
          <span>
            Database State: <span className="text-teal-400 font-semibold">GET /markets</span> ({totalMarkets} active loaded)
          </span>
        </div>
        {onOpenDbSimulator && (
          <button
            onClick={onOpenDbSimulator}
            className="text-teal-400 hover:text-cyan-300 font-medium underline underline-offset-2 cursor-pointer flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Test DB Sync Simulator
          </button>
        )}
      </div>
    </div>
  );
};
