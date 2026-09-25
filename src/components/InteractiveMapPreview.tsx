import React, { useState } from 'react';
import { Market } from '../types/market';
import { 
  MapPin, 
  Store, 
  ExternalLink, 
  Navigation, 
  Layers, 
  Info,
  Clock,
  Compass,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface InteractiveMapPreviewProps {
  markets: Market[];
  selectedMarketId: number | null;
  onSelectMarket: (market: Market) => void;
  onOpenDbSimulator?: () => void;
}

export const InteractiveMapPreview: React.FC<InteractiveMapPreviewProps> = ({
  markets,
  selectedMarketId,
  onSelectMarket,
  onOpenDbSimulator,
}) => {
  const [hoveredMarketId, setHoveredMarketId] = useState<number | null>(null);
  const [activeDistrictFilter, setActiveDistrictFilter] = useState<string>('All');

  const districts = ['All', 'Central', 'East', 'South'];

  const filteredMarkets = markets.filter((m) => {
    if (activeDistrictFilter === 'All') return true;
    return m.district.toLowerCase().includes(activeDistrictFilter.toLowerCase());
  });

  const activeMarket = markets.find((m) => m.id === (hoveredMarketId || selectedMarketId)) || markets[0];

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 overflow-hidden flex flex-col">
      {/* Top Map Header & Controls */}
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-4">
        {/* Journey Breadcrumb indicator: City -> Market -> Shop */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
            <Compass className="w-4 h-4 text-[#1E4E8C]" />
            <span>Karachi City</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex items-center gap-1.5 text-[#1E4E8C] font-semibold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
            <MapPin className="w-3.5 h-3.5 text-[#3FA0C8]" />
            <span>{activeMarket ? activeMarket.name : 'Select Market'}</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex items-center gap-1 text-slate-400">
            <Store className="w-3.5 h-3.5" />
            <span>Browse Shops</span>
          </div>
        </div>

        {/* Filter & Database Sync Pill */}
        <div className="flex items-center gap-2">
          {/* District Selector */}
          <div className="flex items-center p-1 bg-white rounded-xl border border-slate-200 shadow-2xs text-xs">
            {districts.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDistrictFilter(d)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeDistrictFilter === d
                    ? 'bg-[#1E4E8C] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {d === 'All' ? 'All Districts' : d}
              </button>
            ))}
          </div>

          {onOpenDbSimulator && (
            <button
              onClick={onOpenDbSimulator}
              title="Test database reactive marker addition/removal"
              className="px-2.5 py-1 text-xs font-medium text-[#1E4E8C] bg-white border border-[#3FA0C8]/30 hover:border-[#1E4E8C] hover:bg-blue-50/50 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-[#3FA0C8]" />
              <span className="hidden sm:inline">DB Simulator</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] bg-gradient-to-b from-[#f1f5f9] to-[#e2e8f0] overflow-hidden select-none">
        {/* Realistic Stylized Karachi City SVG Map Backdrop */}
        <svg
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          viewBox="0 0 1000 650"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Coastal gradient */}
            <linearGradient id="seaGradient" x1="0%" y1="100%" x2="40%" y2="40%">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#e0f2fe" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f8fafc" stopOpacity="0" />
            </linearGradient>

            {/* Subtle grid pattern */}
            <pattern id="cityGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>
          </defs>

          {/* Grid lines */}
          <rect width="1000" height="650" fill="url(#cityGrid)" />

          {/* Arabian Sea Coastline (South-West) */}
          <path
            d="M 0,420 Q 120,440 220,490 T 380,560 T 560,650 L 0,650 Z"
            fill="url(#seaGradient)"
          />
          <path
            d="M 0,420 Q 120,440 220,490 T 380,560 T 560,650"
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="2.5"
            strokeDasharray="6 3"
          />

          {/* Manora Island / Sandspit contour */}
          <path
            d="M 80,580 Q 140,550 200,590 Q 230,620 180,630 Z"
            fill="#e2e8f0"
            stroke="#94a3b8"
            strokeWidth="1.2"
          />

          {/* Major Karachi Arteries & Expressways */}
          {/* Lyari River / Expressway */}
          <path
            d="M 50,380 Q 220,360 420,340 T 700,280"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="3.5"
            strokeOpacity="0.5"
          />

          {/* Sher Shah Suri Rd (Leading to Nazimabad / Haideri in North) */}
          <path
            d="M 380,480 L 410,340 L 430,220 L 450,100"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="3.5"
          />
          <path
            d="M 410,340 L 430,220 L 450,100"
            fill="none"
            stroke="#3FA0C8"
            strokeWidth="1.8"
            strokeOpacity="0.7"
          />

          {/* Shahrah-e-Faisal (Connecting Saddar to PECHS Tariq Rd and Airport) */}
          <path
            d="M 360,480 Q 480,420 640,360 T 920,290"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="4"
          />
          <path
            d="M 360,480 Q 480,420 640,360 T 920,290"
            fill="none"
            stroke="#1E4E8C"
            strokeWidth="1.8"
            strokeOpacity="0.6"
          />

          {/* M.A. Jinnah Road (Saddar to Central) */}
          <path
            d="M 350,510 L 415,410 L 480,310"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="3"
          />

          {/* University Road */}
          <path
            d="M 480,310 Q 640,240 850,210"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="2.5"
          />

          {/* Geographic Text Landmarks */}
          <text x="50" y="600" fill="#0284c7" fontSize="13" fontWeight="600" opacity="0.65" letterSpacing="2">
            ARABIAN SEA / CLIFTON
          </text>
          <text x="320" y="140" fill="#64748b" fontSize="12" fontWeight="600" opacity="0.6" letterSpacing="1.5">
            DISTRICT CENTRAL
          </text>
          <text x="680" y="320" fill="#64748b" fontSize="12" fontWeight="600" opacity="0.6" letterSpacing="1.5">
            DISTRICT EAST
          </text>
          <text x="260" y="470" fill="#64748b" fontSize="12" fontWeight="600" opacity="0.6" letterSpacing="1.5">
            DISTRICT SOUTH (SADDAR)
          </text>
        </svg>

        {/* Live Dynamic Markers Layer (Database Driven) */}
        {filteredMarkets.map((market) => {
          const isSelected = selectedMarketId === market.id;
          const isHovered = hoveredMarketId === market.id;

          return (
            <div
              key={market.id}
              style={{
                left: `${market.mapX}%`,
                top: `${market.mapY}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 transition-all duration-300 group"
              onMouseEnter={() => setHoveredMarketId(market.id)}
              onMouseLeave={() => setHoveredMarketId(null)}
              onClick={() => onSelectMarket(market)}
            >
              {/* Outer pulsing radar ring */}
              <div className="absolute inset-0 -m-3 rounded-full bg-[#3FA0C8]/30 animate-ping-subtle pointer-events-none" />

              {/* Interactive Market Pin Button */}
              <button
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full shadow-lg border transition-all duration-200 cursor-pointer ${
                  isSelected || isHovered
                    ? 'bg-[#1E4E8C] text-white border-white scale-110 shadow-[#1E4E8C]/30 z-30'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-[#3FA0C8] shadow-slate-300/40'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    isSelected || isHovered
                      ? 'bg-[#2EC4B6] text-white'
                      : 'bg-gradient-to-tr from-[#1E4E8C] to-[#3FA0C8] text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold leading-tight font-['Lexend'] tracking-tight">
                    {market.name}
                  </span>
                  <span
                    className={`text-[10px] leading-tight ${
                      isSelected || isHovered ? 'text-sky-100' : 'text-slate-500'
                    }`}
                  >
                    {market.shopsCount} Shops
                  </span>
                </div>
              </button>

              {/* Hover Tooltip Preview Card */}
              {isHovered && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 text-left z-40 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-['Lexend']">
                        {market.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">{market.area}</p>
                    </div>
                    <span className="text-[10px] font-semibold text-[#1E4E8C] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      {market.district}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-2">
                    {market.tagline}
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      {market.shopsCount} verified shops
                    </span>
                    <span className="text-[#3FA0C8] font-semibold flex items-center gap-1 group-hover:underline">
                      Explore
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Floating Active Market Inspector Drawer (Bottom Left) */}
        {activeMarket && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200/90 shadow-xl z-20 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide">
                    Live Active Market
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 font-['Lexend'] mt-0.5">
                  {activeMarket.name} Market
                </h3>
                <p className="text-xs text-slate-500">
                  {activeMarket.area} · {activeMarket.district}
                </p>
              </div>

              <div className="text-right">
                <span className="text-lg font-bold text-[#1E4E8C] font-['Lexend']">
                  {activeMarket.shopsCount}
                </span>
                <span className="block text-[10px] text-slate-500 font-medium">
                  Shops Inside
                </span>
              </div>
            </div>

            {/* Specialties tags */}
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {activeMarket.specialties.slice(0, 3).map((spec, i) => (
                <span
                  key={i}
                  className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Action button */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeMarket.timing}</span>
              </div>
              <button
                onClick={() => onSelectMarket(activeMarket)}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] hover:from-[#173e70] hover:to-[#358aa8] rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <span>Browse Shops</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Database Reactive Logic Explainer Badge (Top Right) */}
        <div className="hidden lg:flex absolute top-4 right-4 items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 shadow-sm pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#2EC4B6]" />
          <span>Dynamic DB node binding: <strong className="font-mono text-slate-900">status = &apos;active&apos;</strong></span>
        </div>
      </div>

      {/* Bottom Market Quick-Bar */}
      <div className="px-5 py-3.5 bg-white border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
        <div className="text-xs text-slate-500">
          Click any market node to inspect local shops or select below:
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {markets.map((m) => (
            <button
              key={m.id}
              onClick={() => onSelectMarket(m)}
              className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedMarketId === m.id
                  ? 'bg-blue-50 text-[#1E4E8C] border-[#1E4E8C] font-semibold'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-[#3FA0C8]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2EC4B6]" />
              {m.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
