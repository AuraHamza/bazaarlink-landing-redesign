import React, { useState } from 'react';
import { Market } from '../types/market';
import { MapPin, Store, Clock, ArrowRight, Search, Sparkles } from 'lucide-react';

interface MarketsDirectorySectionProps {
  markets: Market[];
  onSelectMarket: (market: Market) => void;
  onOpenDbSimulator?: () => void;
}

export const MarketsDirectorySection: React.FC<MarketsDirectorySectionProps> = ({
  markets,
  onSelectMarket,
  onOpenDbSimulator,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  const districts = ['All', 'Central', 'East', 'South'];

  const filteredMarkets = markets.filter((m) => {
    const matchesDistrict =
      selectedDistrict === 'All' ||
      m.district.toLowerCase().includes(selectedDistrict.toLowerCase());
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDistrict && matchesSearch;
  });

  return (
    <section id="markets-preview" className="py-16 lg:py-24 bg-white border-t border-slate-200/80 scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold tracking-widest text-[#1E4E8C] uppercase">
              Karachi Market Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Lexend'] tracking-tight">
              Featured Karachi Markets
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Select any local market to explore verified shops, floor layouts, and authentic items.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search market or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA0C8] focus:bg-white w-full sm:w-64"
              />
            </div>

            <div className="flex items-center p-1 bg-slate-100 rounded-xl">
              {districts.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDistrict(d)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedDistrict === d
                      ? 'bg-white text-[#1E4E8C] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Markets Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMarkets.map((market) => (
            <div
              key={market.id}
              onClick={() => onSelectMarket(market)}
              className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200 hover:border-[#3FA0C8] hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1E4E8C] to-[#3FA0C8] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#1E4E8C] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {market.district}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-['Lexend'] group-hover:text-[#1E4E8C] transition-colors">
                    {market.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {market.area}
                  </p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {market.tagline}
                </p>

                {/* Specialties chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {market.specialties.slice(0, 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] text-slate-600 bg-white border border-slate-200/80 px-2 py-0.5 rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Store className="w-3.5 h-3.5 text-[#3FA0C8]" />
                  <span>{market.shopsCount} Shops</span>
                </div>

                <span className="text-xs font-semibold text-[#1E4E8C] flex items-center gap-1 group-hover:text-[#3FA0C8] group-hover:translate-x-1 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredMarkets.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-200 p-8 space-y-3">
            <p className="text-slate-600 font-medium">
              No active markets match your current filter.
            </p>
            {onOpenDbSimulator && (
              <button
                onClick={onOpenDbSimulator}
                className="px-4 py-2 text-xs font-semibold text-[#1E4E8C] bg-white border border-slate-300 rounded-xl hover:bg-blue-50 cursor-pointer inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#3FA0C8]" />
                Open DB Simulator to activate more markets
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
