import React, { useState, useMemo } from 'react';
import { Market } from '../types/market';
import { InteractiveMapPreview } from './InteractiveMapPreview';
import { 
  MapPin, 
  Store, 
  Clock, 
  Search, 
  Compass, 
  Sparkles, 
  ChevronRight, 
  Layers, 
  ArrowLeft,
  X,
  Filter,
  CheckCircle,
  Building2,
  RefreshCw,
  ShoppingBag
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
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [mobileActiveTab, setMobileActiveTab] = useState<'map' | 'list'>('map');

  const districts = ['All', 'Central', 'East', 'South'];

  // Filter markets based on district & search
  const filteredMarkets = useMemo(() => {
    return markets.filter((m) => {
      const matchesDistrict =
        selectedDistrict === 'All' ||
        m.district.toLowerCase().includes(selectedDistrict.toLowerCase());
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesDistrict && matchesSearch;
    });
  }, [markets, selectedDistrict, searchQuery]);

  const activeMarket = useMemo(() => {
    return markets.find((m) => m.id === selectedMarketId) || filteredMarkets[0] || markets[0];
  }, [markets, selectedMarketId, filteredMarkets]);

  const totalShops = useMemo(() => {
    return markets.reduce((acc, m) => acc + m.shopsCount, 0);
  }, [markets]);

  const totalProducts = useMemo(() => {
    return markets.reduce((acc, m) => acc + m.productsCount, 0);
  }, [markets]);

  const handleCardClick = (market: Market) => {
    onSelectMarket(market);
  };

  const handleOpenMarketDetails = (e: React.MouseEvent, market: Market) => {
    e.stopPropagation();
    onSelectMarket(market);
    onOpenShopModal(market);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Top Map Page Sub-Header / Breadcrumb */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Back button & Breadcrumbs */}
          <div className="flex items-center gap-2.5 text-xs font-medium text-slate-600">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Landing Page</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#1E4E8C] font-semibold flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-[#3FA0C8]" />
              Interactive Karachi Map
            </span>
          </div>

          {/* Real-time DB sync pill */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Live DB: <strong className="font-mono">{markets.length} Markets</strong> ({totalShops}+ Shops)
              </span>
            </div>

            <button
              onClick={onOpenDbSimulator}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#1E4E8C] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors cursor-pointer"
              title="Open Database Reactive Marker Simulator"
            >
              <Layers className="w-3.5 h-3.5 text-[#3FA0C8]" />
              <span className="hidden sm:inline">DB Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Page Title & Intro */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-semibold text-[#1E4E8C]">
            <Sparkles className="w-3.5 h-3.5 text-[#2EC4B6]" />
            <span>Karachi Commercial Centers & Bazaars</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Lexend'] tracking-tight">
                Explore Karachi&apos;s Markets & Bazaars
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
                Browse verified local markets across Karachi. Click markers to inspect shop directories, floor layouts, and authentic items.
              </p>
            </div>

            {/* Mobile View Toggle */}
            <div className="flex lg:hidden items-center p-1 bg-slate-200/70 rounded-xl w-fit">
              <button
                onClick={() => setMobileActiveTab('map')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mobileActiveTab === 'map'
                    ? 'bg-[#1E4E8C] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                🗺️ Map View
              </button>
              <button
                onClick={() => setMobileActiveTab('list')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mobileActiveTab === 'list'
                    ? 'bg-[#1E4E8C] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                📋 Market List ({filteredMarkets.length})
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
            <div className="w-10 h-10 border-3 border-[#3FA0C8] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-700">Loading Karachi markets from database...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 rounded-3xl p-6 border border-red-200 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-red-900">Failed to load market data</h4>
              <p className="text-xs text-red-700 mt-0.5">{error}</p>
            </div>
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            )}
          </div>
        )}

        {/* Two-Panel Layout (Sidebar + Map) */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Filter & Markets List (Hidden on mobile if tab is 'map') */}
            <div
              className={`lg:col-span-5 space-y-4 ${
                mobileActiveTab === 'map' ? 'hidden lg:block' : 'block'
              }`}
            >
              {/* Search & Filter Card */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-[#1E4E8C]" />
                    Filter Markets
                  </span>
                  <span className="text-xs font-semibold text-[#1E4E8C] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    {filteredMarkets.length} of {markets.length} Markets
                  </span>
                </div>

                {/* Search input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search by market, area, or craft..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3FA0C8] focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* District Filter Pills */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Karachi District
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {districts.map((d) => {
                      const count =
                        d === 'All'
                          ? markets.length
                          : markets.filter((m) =>
                              m.district.toLowerCase().includes(d.toLowerCase())
                            ).length;
                      return (
                        <button
                          key={d}
                          onClick={() => setSelectedDistrict(d)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                            selectedDistrict === d
                              ? 'bg-[#1E4E8C] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <span>{d === 'All' ? 'All Districts' : d}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                              selectedDistrict === d
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Markets List Container */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs px-1 text-slate-500">
                  <span>Select a market to view on map or browse shops:</span>
                </div>

                {/* Empty State */}
                {filteredMarkets.length === 0 && (
                  <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                      <Search className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 font-['Lexend']">
                        No markets found
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                        No markets match &ldquo;{searchQuery}&rdquo; in {selectedDistrict} District.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedDistrict('All');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-[#1E4E8C] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}

                {/* Market Cards */}
                {filteredMarkets.map((market) => {
                  const isSelected = selectedMarketId === market.id;
                  return (
                    <div
                      key={market.id}
                      onClick={() => handleCardClick(market)}
                      className={`bg-white rounded-3xl p-5 border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md relative overflow-hidden group ${
                        isSelected
                          ? 'border-[#1E4E8C] ring-2 ring-[#3FA0C8]/30 shadow-blue-100'
                          : 'border-slate-200/90 hover:border-[#3FA0C8]'
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isSelected && (
                        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#1E4E8C] to-[#3FA0C8]" />
                      )}

                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105 ${
                                isSelected
                                  ? 'bg-gradient-to-br from-[#1E4E8C] to-[#2EC4B6]'
                                  : 'bg-gradient-to-br from-[#1E4E8C] to-[#3FA0C8]'
                              }`}
                            >
                              <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-slate-900 font-['Lexend'] group-hover:text-[#1E4E8C] transition-colors">
                                {market.name}
                              </h3>
                              <p className="text-xs text-slate-500">{market.area}</p>
                            </div>
                          </div>

                          <span className="text-[10px] font-semibold text-[#1E4E8C] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                            {market.district}
                          </span>
                        </div>

                        {/* Tagline */}
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {market.tagline}
                        </p>

                        {/* Specialties Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {market.specialties.slice(0, 3).map((item, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] text-slate-600 bg-slate-50 border border-slate-200/70 px-2 py-0.5 rounded-md"
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        {/* Card Footer Actions */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                            <Store className="w-3.5 h-3.5 text-[#3FA0C8]" />
                            <span>{market.shopsCount} Shops</span>
                            <span className="text-slate-300">·</span>
                            <span>{market.productsCount}+ Products</span>
                          </div>

                          <button
                            onClick={(e) => handleOpenMarketDetails(e, market)}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] hover:from-[#173e70] hover:to-[#358aa8] rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1"
                          >
                            <span>Browse Shops</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Interactive Map Component (Hidden on mobile if tab is 'list') */}
            <div
              className={`lg:col-span-7 space-y-4 ${
                mobileActiveTab === 'list' ? 'hidden lg:block' : 'block'
              }`}
            >
              {/* Map Preview Component with exact SVG and marker coordinates */}
              <InteractiveMapPreview
                markets={markets}
                selectedMarketId={selectedMarketId}
                onSelectMarket={onSelectMarket}
                onOpenDbSimulator={onOpenDbSimulator}
              />

              {/* Selected Market Highlights Banner */}
              {activeMarket && (
                <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1E4E8C] uppercase tracking-wider">
                        Active Selection
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        ● Open Now ({activeMarket.timing})
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-['Lexend']">
                      {activeMarket.name} Market ({activeMarket.area})
                    </h3>
                    <p className="text-xs text-slate-500 max-w-lg">
                      {activeMarket.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onOpenShopModal(activeMarket)}
                      className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] hover:from-[#173e70] hover:to-[#358aa8] rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Open Shop Directory</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
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
