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
      {/* Subtle background ambient gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-sky-100/50 via-teal-50/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Header Content */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-semibold text-[#1E4E8C] shadow-2xs">
            <span>✨ Explore Karachi&apos;s local markets</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-['Lexend'] leading-[1.12]">
            Explore Karachi&apos;s Markets.{' '}
            <span className="bg-gradient-to-r from-[#1E4E8C] via-[#3FA0C8] to-[#2EC4B6] bg-clip-text text-transparent">
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
              className="px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] hover:from-[#173e70] hover:to-[#358aa8] rounded-2xl shadow-md shadow-[#1E4E8C]/25 transition-all duration-200 cursor-pointer flex items-center gap-2 group active:scale-[0.98]"
            >
              <span>Explore Markets</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onExploreMapClick}
              className="px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl shadow-2xs transition-all duration-200 cursor-pointer flex items-center gap-2 text-slate-800"
            >
              <Compass className="w-4 h-4 text-[#3FA0C8]" />
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
