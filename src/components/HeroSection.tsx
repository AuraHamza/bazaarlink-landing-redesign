import React from 'react';
import { ArrowRight, MapPin, Compass } from 'lucide-react';
import { Market } from '../types/market';
import { InteractiveMapPreview } from './InteractiveMapPreview';
import { DynamicStats } from './DynamicStats';

interface HeroSectionProps {
  markets: Market[];
  selectedMarketId: number | null;
  onSelectMarket: (market: Market) => void;
  onExploreMarketsClick: () => void;
  onExploreMapClick: () => void;
  onOpenDbSimulator?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  markets,
  selectedMarketId,
  onSelectMarket,
  onExploreMarketsClick,
  onExploreMapClick,
  onOpenDbSimulator,
}) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Soft top radial glow on light canvas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(13,148,136,0.08),transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Header Content */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0E1A] border border-slate-800 text-xs font-semibold text-teal-300 shadow-sm font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Explore Karachi&apos;s local markets</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-['Lexend'] leading-[1.12]">
            Explore Karachi&apos;s Markets.{' '}
            <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Discover Local Shops.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Discover markets, local shops, and products through an interactive map — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {/* Primary CTA */}
            <button
              onClick={onExploreMarketsClick}
              className="px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:brightness-110 rounded-2xl shadow-md shadow-teal-500/20 transition-all duration-200 cursor-pointer flex items-center gap-2 group active:scale-[0.98]"
            >
              <span>Explore Markets</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onExploreMapClick}
              className="px-6 py-3.5 text-base font-semibold text-slate-200 hover:text-white bg-[#0A0E1A] hover:bg-slate-800 border border-slate-800 rounded-2xl shadow-sm transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-teal-400" />
              <span>Explore the Map</span>
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Map Section */}
        <div id="map-section" className="scroll-mt-24 space-y-6">
          <InteractiveMapPreview
            markets={markets}
            selectedMarketId={selectedMarketId}
            onSelectMarket={onSelectMarket}
            onOpenDbSimulator={onOpenDbSimulator}
          />

          {/* Dynamic Statistics below map */}
          <DynamicStats markets={markets} onOpenDbSimulator={onOpenDbSimulator} />
        </div>
      </div>
    </section>
  );
};
