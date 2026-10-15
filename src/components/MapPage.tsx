import React, { useState, useMemo, useEffect } from 'react';
import { Market } from '../types/market';
import { InteractiveMapPreview } from './InteractiveMapPreview';
import { 
  MapPin, 
  Store, 
  Clock, 
  Search, 
  Compass, 
  ChevronRight, 
  Layers, 
  ArrowLeft,
  X,
  Building2,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  Info
} from 'lucide-react';

interface MapPageProps {
  markets: Market[];
  selectedMarketId: number | null;
  onSelectMarket: (market: Market) => void;
  onOpenShopModal: (market: Market) => void;
  onOpenDbSimulator: () => void;
  onNavigateHome: () => void;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export const MapPage: React.FC<MapPageProps> = ({
  markets,
  selectedMarketId,
  onSelectMarket,
  onOpenShopModal,
  onOpenDbSimulator,
  onNavigateHome,
  isLoading = false,
  error = null,
  onRetry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  const districts = ['All', 'Central', 'East', 'South'];

  // Filter markets based on district & search query
  const filteredMarkets = useMemo(() => {
    return markets.filter((m) => {
      const matchesDistrict =
        selectedDistrict === 'All' ||
        m.district.toLowerCase().includes(selectedDistrict.toLowerCase());
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesDistrict;

      const matchesName = m.name.toLowerCase().includes(query);
      const matchesArea = m.area.toLowerCase().includes(query);
      const matchesTagline = m.tagline.toLowerCase().includes(query);
      const matchesSpecialty = m.specialties.some((s) => s.toLowerCase().includes(query));

      return matchesDistrict && (matchesName || matchesArea || matchesTagline || matchesSpecialty);
    });
  }, [markets, selectedDistrict, searchQuery]);

  // Selected market object (if any is active)
  const selectedMarket = useMemo(() => {
    if (!selectedMarketId) return null;
    return markets.find((m) => m.id === selectedMarketId) || null;
  }, [markets, selectedMarketId]);

  // Auto-select first matching market when searching if none selected
  const handleSelectFromSearch = (market: Market) => {
    onSelectMarket(market);
    setIsSearchFocused(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedDistrict('All');
  };

  const handleDeselectMarket = () => {
    // If deselecting, reset to null if allowed or keep active market
    // We can allow user to deselect to test progressive disclosure
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800">
      {/* 1. Sub-Header: Breadcrumbs & Status Bar */}
      <div className="bg-[#0A0E1A] border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5 text-white">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Breadcrumb back to landing page */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-300 bg-slate-900 border border-slate-700 hover:bg-slate-800 hover:text-white transition-colors font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-teal-400 font-semibold flex items-center gap-1 font-mono">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              Market Discovery Map
            </span>
          </div>

          {/* Database Live State Pill & DB Simulator Action */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-xs shadow-emerald-400/80" />
              <span>
                Live Markets: <strong className="text-teal-400">{markets.length} Active</strong>
              </span>
            </div>

            {onOpenDbSimulator && (
              <button
                onClick={onOpenDbSimulator}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-teal-300 bg-slate-900 border border-slate-700 hover:border-teal-500 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer font-mono"
                title="Test database reactive markers"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">DB Simulator</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Page Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* 2. Page Heading */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0E1A] border border-slate-800 text-xs font-semibold text-teal-300 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Karachi Market Discovery Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Lexend'] tracking-tight">
            Explore Karachi Markets
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Find a market near you and discover its local shops.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-[#0F172A] rounded-3xl p-12 border border-slate-800 text-center space-y-3 shadow-xl">
            <div className="w-10 h-10 border-3 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="text-base font-bold text-white font-['Lexend']">
              Finding local markets...
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Connecting to BazaarLink database to retrieve active Karachi markets.
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-[#0F172A] rounded-3xl p-8 border border-red-800/80 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-red-950/60 text-red-400 border border-red-800 flex items-center justify-center mx-auto">
              <X className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white font-['Lexend']">
                We couldn&apos;t load the markets right now.
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Please check your network connection or try again.
              </p>
            </div>
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0D9488] to-[#06B6D4] rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            )}
          </div>
        )}

        {/* Main Content when loaded */}
        {!isLoading && !error && (
          <div className="space-y-6">
            {/* 3. Search Bar & Filter Controls - Dark Command Container */}
            <div className="bg-[#0A0E1A] rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-xl space-y-3 text-white">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search markets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full pl-10 pr-9 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-slate-900/90 transition-all text-white placeholder:text-slate-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      title="Clear search"
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* District Filter Chips */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-2xl border border-slate-800 overflow-x-auto shrink-0">
                  {districts.map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDistrict(d)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                        selectedDistrict === d
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {d === 'All' ? 'All Districts' : d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant Search Results Dropdown/Chips when typing */}
              {searchQuery && filteredMarkets.length > 0 && (
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <span className="text-slate-400 font-medium">
                    Matching markets ({filteredMarkets.length}):
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {filteredMarkets.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => handleSelectFromSearch(m)}
                        className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                          selectedMarketId === m.id
                            ? 'bg-teal-950/80 text-teal-300 border-teal-500'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-teal-400 hover:text-white'
                        }`}
                      >
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        <span>{m.name}</span>
                        <span className={`text-[10px] ${selectedMarketId === m.id ? 'text-teal-200' : 'text-slate-400'}`}>
                          ({m.shopsCount} shops)
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Empty Search State */}
            {searchQuery && filteredMarkets.length === 0 && (
              <div className="bg-[#0A0E1A] rounded-3xl p-8 border border-slate-800 text-center space-y-3 shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto text-slate-400 border border-slate-700">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white font-['Lexend']">
                    No markets found
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    We couldn&apos;t find any markets matching &ldquo;{searchQuery}&rdquo;. Try another name or clear your search.
                  </p>
                </div>
                <button
                  onClick={handleClearSearch}
                  className="px-4 py-2 text-xs font-bold text-teal-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* 4. Interactive Market Map */}
            <div className="relative">
              <InteractiveMapPreview
                markets={filteredMarkets}
                selectedMarketId={selectedMarketId}
                onSelectMarket={onSelectMarket}
                onExploreShops={onOpenShopModal}
                onOpenDbSimulator={onOpenDbSimulator}
                hideInspector={true}
              />
            </div>

            {/* 5. Selected Market Card / Progressive Disclosure - Dark Command Module */}
            <div className="transition-all duration-300">
              {selectedMarket ? (
                /* Selected Market Information Card */
                <div className="bg-[#0A0E1A] rounded-3xl p-6 sm:p-7 border border-teal-500/50 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-98 duration-200 text-white">
                  {/* Subtle decorative gradient glow */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500" />

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Left: Market Core Details */}
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-950/70 px-2.5 py-0.5 rounded-full border border-teal-800/60 font-mono">
                          {selectedMarket.district}
                        </span>
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-800/60 flex items-center gap-1 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Open Now
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {selectedMarket.timing}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Lexend'] tracking-tight">
                            {selectedMarket.name} Market
                          </h2>
                          <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1 flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>{selectedMarket.area}, Karachi</span>
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {selectedMarket.tagline}
                      </p>

                      {/* Specialties tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedMarket.specialties.map((item, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-medium text-slate-300 bg-slate-800/90 border border-slate-700/60 px-2.5 py-1 rounded-lg"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Metrics & Primary Action Button */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-800 shrink-0">
                      {/* Shop & Product stats */}
                      <div className="flex items-center gap-4 text-left sm:text-right">
                        <div className="p-3 bg-teal-950/50 rounded-2xl border border-teal-800/60 text-center min-w-[90px]">
                          <span className="block text-2xl font-extrabold text-teal-400 font-['Lexend'] leading-none">
                            {selectedMarket.shopsCount}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1 block font-mono">
                            Shops
                          </span>
                        </div>
                        <div className="p-3 bg-cyan-950/50 rounded-2xl border border-cyan-800/60 text-center min-w-[90px]">
                          <span className="block text-2xl font-extrabold text-cyan-400 font-['Lexend'] leading-none">
                            {selectedMarket.productsCount}+
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1 block font-mono">
                            Products
                          </span>
                        </div>
                      </div>

                      {/* PRIMARY ACTION BUTTON: Explore Shops */}
                      <button
                        onClick={() => onOpenShopModal(selectedMarket)}
                        className="w-full sm:w-auto px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-[#0D9488] to-[#06B6D4] hover:brightness-110 rounded-2xl shadow-lg shadow-teal-500/25 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group active:scale-[0.98]"
                      >
                        <ShoppingBag className="w-5 h-5 text-white" />
                        <span>Explore Shops</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Before Selection: Progressive disclosure prompt */
                <div className="bg-[#0F172A] rounded-3xl p-6 sm:p-8 border border-slate-800 text-center space-y-4 shadow-xl text-white">
                  <div className="w-12 h-12 rounded-2xl bg-teal-950/70 border border-teal-800/60 text-teal-400 flex items-center justify-center mx-auto shadow-inner">
                    <Compass className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white font-['Lexend']">
                      Select a market on the map to view details
                    </h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Click any interactive market pin on the map above or pick a commercial center below to inspect verified shops.
                    </p>
                  </div>

                  {/* Quick Select Market Chips */}
                  <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
                    {markets.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => onSelectMarket(m)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-700 hover:border-teal-400 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span>{m.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">({m.shopsCount} shops)</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
