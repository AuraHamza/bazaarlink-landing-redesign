import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Market } from '../types/market';
import { 
  MapPin, 
  Store, 
  ExternalLink, 
  Layers, 
  Clock, 
  Compass, 
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move
} from 'lucide-react';

interface InteractiveMapPreviewProps {
  markets: Market[];
  selectedMarketId: number | null;
  onSelectMarket: (market: Market) => void;
  onExploreShops?: (market: Market) => void;
  onOpenDbSimulator?: () => void;
  hideBottomBar?: boolean;
  hideInspector?: boolean;
}

export const InteractiveMapPreview: React.FC<InteractiveMapPreviewProps> = ({
  markets,
  selectedMarketId,
  onSelectMarket,
  onExploreShops,
  onOpenDbSimulator,
  hideBottomBar = false,
  hideInspector = false,
}) => {
  const [hoveredMarketId, setHoveredMarketId] = useState<number | null>(null);
  const [activeDistrictFilter, setActiveDistrictFilter] = useState<string>('All');
  
  // Pan and Zoom state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const districts = ['All', 'Central', 'East', 'South'];

  const filteredMarkets = markets.filter((m) => {
    if (activeDistrictFilter === 'All') return true;
    return m.district.toLowerCase().includes(activeDistrictFilter.toLowerCase());
  });

  const activeMarket = markets.find((m) => m.id === (hoveredMarketId || selectedMarketId)) || markets[0];

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 2.4));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.85));
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Center pan when a market is selected
  const centerOnMarket = useCallback((market: Market) => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    // Calculate market pixel position relative to 1000x650 viewport
    const targetX = (market.mapX / 100) * width;
    const targetY = (market.mapY / 100) * height;
    const centerX = width / 2;
    const centerY = height / 2;
    setPan({
      x: (centerX - targetX) * 0.5,
      y: (centerY - targetY) * 0.5,
    });
  }, []);

  useEffect(() => {
    if (selectedMarketId) {
      const selected = markets.find((m) => m.id === selectedMarketId);
      if (selected && zoom > 1.1) {
        centerOnMarket(selected);
      }
    }
  }, [selectedMarketId, markets, zoom, centerOnMarket]);

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag with left mouse button and not on interactive buttons
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...pan };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch pan handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      panStartRef.current = { ...pan };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full bg-[#0A0E1A] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
      {/* Top Map Header & Controls - Dark Command Bar */}
      <div className="px-5 py-4 border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-white z-20">
        {/* Journey Breadcrumb indicator: City -> Market -> Shop */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
            <Compass className="w-4 h-4 text-teal-400" />
            <span>Karachi City</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <div className="flex items-center gap-1.5 text-teal-300 font-semibold bg-teal-950/70 px-2.5 py-0.5 rounded-lg border border-teal-800/60 font-mono">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>{activeMarket ? activeMarket.name : 'Select Market'}</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <div className="flex items-center gap-1 text-slate-400">
            <Store className="w-3.5 h-3.5" />
            <span>Browse Shops</span>
          </div>
        </div>

        {/* Filter & Database Sync Pill - Dark Glass Controls */}
        <div className="flex items-center gap-2">
          {/* District Selector */}
          <div className="flex items-center p-1 bg-slate-950/90 rounded-xl border border-slate-800 shadow-inner text-xs">
            {districts.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDistrictFilter(d)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeDistrictFilter === d
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-xs font-semibold'
                    : 'text-slate-400 hover:text-white'
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
              className="px-2.5 py-1 text-xs font-semibold text-teal-300 bg-slate-900 border border-slate-700 hover:border-teal-500 hover:bg-slate-800 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-mono"
            >
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">DB Simulator</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Map Canvas Area with Drag & Pan - LIGHT MAP CANVAS (#F5F7FA) inside Dark Container */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full h-[420px] sm:h-[480px] lg:h-[540px] bg-[#F5F7FA] overflow-hidden select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Transformable Map Canvas Layer */}
        <div 
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '50% 50%',
            transition: isDragging ? 'none' : 'transform 0.25s ease-out',
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Stylized Karachi City SVG Map Backdrop - Light Map Palette */}
          <svg
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            viewBox="0 0 1000 650"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Coastal water gradient - subtle serene cyan/blue */}
              <linearGradient id="seaGradient" x1="0%" y1="100%" x2="40%" y2="40%">
                <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#E0F2FE" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#F5F7FA" stopOpacity="0" />
              </linearGradient>

              {/* Faint subtle grid pattern on light map */}
              <pattern id="cityGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" strokeWidth="0.5" strokeOpacity="0.5" />
              </pattern>
            </defs>

            {/* Light canvas base */}
            <rect width="1000" height="650" fill="#F5F7FA" />
            <rect width="1000" height="650" fill="url(#cityGrid)" />

            {/* Arabian Sea Coastline (South-West) */}
            <path
              d="M 0,420 Q 120,440 220,490 T 380,560 T 560,650 L 0,650 Z"
              fill="url(#seaGradient)"
            />
            {/* Coastal edge - Cyan dashed line */}
            <path
              d="M 0,420 Q 120,440 220,490 T 380,560 T 560,650"
              fill="none"
              stroke="#0D9488"
              strokeWidth="2.5"
              strokeDasharray="6 3"
            />

            {/* Manora Island / Sandspit contour */}
            <path
              d="M 80,580 Q 140,550 200,590 Q 230,620 180,630 Z"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="1.2"
            />

            {/* Major Karachi Arteries & Expressways */}
            {/* Lyari River / Expressway */}
            <path
              d="M 50,380 Q 220,360 420,340 T 700,280"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="3.5"
              strokeOpacity="0.6"
            />

            {/* Sher Shah Suri Rd (Leading to Nazimabad / Haideri in North) */}
            <path
              d="M 380,480 L 410,340 L 430,220 L 450,100"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="3.5"
            />
            {/* Cyan transit overlay */}
            <path
              d="M 410,340 L 430,220 L 450,100"
              fill="none"
              stroke="#0D9488"
              strokeWidth="2"
              strokeOpacity="0.85"
            />

            {/* Shahrah-e-Faisal (Connecting Saddar to PECHS Tariq Rd and Airport) */}
            <path
              d="M 360,480 Q 480,420 640,360 T 920,290"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="4"
            />
            {/* Cyan Transit Line */}
            <path
              d="M 360,480 Q 480,420 640,360 T 920,290"
              fill="none"
              stroke="#0891B2"
              strokeWidth="2"
              strokeOpacity="0.8"
            />

            {/* M.A. Jinnah Road (Saddar to Central) */}
            <path
              d="M 350,510 L 415,410 L 480,310"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="3"
            />

            {/* University Road */}
            <path
              d="M 480,310 Q 640,240 850,210"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="2.5"
            />

            {/* Cyan Connection Lines Between Karachi Market Nodes */}
            <path
              d="M 360,480 Q 430,410 490,440 T 620,370"
              fill="none"
              stroke="#00F5D4"
              strokeWidth="2"
              strokeDasharray="6 4"
              strokeOpacity="0.85"
            />
            <path
              d="M 360,480 Q 390,320 440,200"
              fill="none"
              stroke="#0891B2"
              strokeWidth="1.8"
              strokeDasharray="5 3"
              strokeOpacity="0.75"
            />
            <path
              d="M 440,200 Q 530,290 620,370"
              fill="none"
              stroke="#0D9488"
              strokeWidth="1.8"
              strokeDasharray="5 3"
              strokeOpacity="0.75"
            />

            {/* Geographic Text Landmarks on light map */}
            <text x="50" y="600" fill="#0284C7" fontSize="13" fontWeight="600" opacity="0.75" letterSpacing="2">
              ARABIAN SEA / CLIFTON
            </text>
            <text x="320" y="140" fill="#64748B" fontSize="12" fontWeight="600" opacity="0.8" letterSpacing="1.5">
              DISTRICT CENTRAL
            </text>
            <text x="680" y="320" fill="#64748B" fontSize="12" fontWeight="600" opacity="0.8" letterSpacing="1.5">
              DISTRICT EAST
            </text>
            <text x="260" y="470" fill="#64748B" fontSize="12" fontWeight="600" opacity="0.8" letterSpacing="1.5">
              DISTRICT SOUTH (SADDAR)
            </text>
          </svg>

          {/* Live Dynamic Markers Layer - Cyan / Emerald Market Markers (High Contrast on Light Map) */}
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
                className="absolute z-20 transition-all duration-200 group"
                onMouseEnter={() => setHoveredMarketId(market.id)}
                onMouseLeave={() => setHoveredMarketId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectMarket(market);
                }}
              >
                {/* Outer pulsing radar ring */}
                <div className={`absolute inset-0 -m-3 rounded-full pointer-events-none ${
                  isSelected ? 'bg-teal-500/40 animate-ping-subtle' : 'bg-cyan-500/25'
                }`} />

                {/* Interactive Market Pin Button - High Contrast Dark Navy with Cyan/Emerald Accents */}
                <button
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full shadow-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0A0E1A] text-white border-teal-400 ring-2 ring-teal-400/80 scale-110 shadow-lg shadow-teal-900/40 z-30'
                      : isHovered
                      ? 'bg-[#0F172A] text-white border-cyan-400 scale-105 shadow-md shadow-cyan-900/30 z-30'
                      : 'bg-[#0A0E1A] text-slate-100 border-slate-700 hover:border-teal-400 shadow-md'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                      isSelected
                        ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold'
                        : isHovered
                        ? 'bg-gradient-to-tr from-teal-400 to-cyan-400 text-slate-950'
                        : 'bg-gradient-to-tr from-teal-500 to-cyan-500 text-white'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold leading-tight font-['Lexend'] tracking-tight">
                      {market.name}
                    </span>
                    <span
                      className={`text-[10px] leading-tight font-mono ${
                        isSelected || isHovered ? 'text-teal-300 font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {market.shopsCount} Shops
                    </span>
                  </div>
                </button>

                {/* Hover Tooltip Preview Card - Dark HUD Card */}
                {isHovered && !isSelected && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3.5 bg-[#0A0E1A]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 text-left z-40 text-white animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <h4 className="text-sm font-bold text-white font-['Lexend']">
                          {market.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">{market.area}</p>
                      </div>
                      <span className="text-[10px] font-semibold text-teal-300 bg-teal-950/70 px-2 py-0.5 rounded-full border border-teal-800/60 font-mono">
                        {market.district}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 mb-2">
                      {market.tagline}
                    </p>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">
                        {market.shopsCount} verified shops
                      </span>
                      <span className="text-teal-400 font-semibold flex items-center gap-1 group-hover:underline">
                        Select
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 2.2 Left-Side Map Controls - Dark Glass HUD */}
        <div className="absolute left-4 top-1/4 z-10 flex flex-col gap-2 bg-[#0F172A]/90 backdrop-blur-md border border-slate-800 rounded-xl p-2 shadow-2xl">
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            aria-label="Zoom In"
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 flex items-center justify-center text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-full h-px bg-slate-800" />
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            aria-label="Zoom Out"
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 flex items-center justify-center text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-full h-px bg-slate-800" />
          <button
            onClick={handleResetView}
            title="Reset View"
            aria-label="Reset View"
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 flex items-center justify-center text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <div className="w-full h-px bg-slate-800" />
          <div className="flex items-center justify-center pt-0.5 text-slate-400" title="Drag / Pan to explore">
            <Move className="w-3.5 h-3.5 text-teal-400" />
          </div>
        </div>

        {/* Floating Active Market Inspector Drawer (Bottom Left - Dark Glass HUD) */}
        {!hideInspector && activeMarket && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-[#0A0E1A]/95 backdrop-blur-md rounded-2xl p-4 border border-slate-800 shadow-2xl z-20 text-white transition-all">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wide font-mono">
                    Live Active Market
                  </span>
                </div>
                <h3 className="text-base font-bold text-white font-['Lexend'] mt-0.5">
                  {activeMarket.name} Market
                </h3>
                <p className="text-xs text-slate-400">
                  {activeMarket.area} · {activeMarket.district}
                </p>
              </div>

              <div className="text-right">
                <span className="text-lg font-bold text-teal-400 font-['Lexend']">
                  {activeMarket.shopsCount}
                </span>
                <span className="block text-[10px] text-slate-400 font-medium font-mono">
                  Shops Inside
                </span>
              </div>
            </div>

            {/* Specialties tags */}
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {activeMarket.specialties.slice(0, 3).map((spec, i) => (
                <span
                  key={i}
                  className="text-[11px] text-slate-300 bg-slate-800/90 border border-slate-700/60 px-2 py-0.5 rounded-md"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Action button */}
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{activeMarket.timing}</span>
              </div>
              <button
                onClick={() => {
                  onSelectMarket(activeMarket);
                  onExploreShops?.(activeMarket);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:brightness-110 rounded-xl shadow-md shadow-teal-500/20 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <span>Explore Shops</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Database Reactive Logic Explainer Badge (Top Right - Dark HUD) */}
        <div className="hidden lg:flex absolute top-4 right-4 items-center gap-2 bg-[#0F172A]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-200 shadow-xl pointer-events-none z-10">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Dynamic DB markers: <strong className="font-mono text-teal-300">status = &apos;active&apos;</strong></span>
        </div>
      </div>

      {/* Bottom Market Quick-Bar - Dark Surface */}
      {!hideBottomBar && (
        <div className="px-5 py-3.5 bg-[#0F172A] border-t border-slate-800 flex items-center justify-between flex-wrap gap-3 z-20">
          <div className="text-xs text-slate-400">
            Click any market node to inspect local shops or select below:
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {markets.map((m) => (
              <button
                key={m.id}
                onClick={() => onSelectMarket(m)}
                className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedMarketId === m.id
                    ? 'bg-teal-950/80 text-teal-300 border-teal-500 font-semibold shadow-xs'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-teal-400 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                {m.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
