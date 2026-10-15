import React from 'react';
import { ArrowRight, MapPin, Store } from 'lucide-react';

interface CTASectionProps {
  onGetStarted: () => void;
  onExploreMarkets: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onGetStarted,
  onExploreMarkets,
}) => {
  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0A0E1A] via-[#0F172A] to-[#042F2E] border border-slate-800 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          {/* Subtle geometric circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/70 border border-teal-800/60 text-xs font-semibold text-teal-300 font-mono">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Karachi&apos;s Local Markets Await</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Lexend'] leading-tight text-white">
              Start exploring Karachi&apos;s markets
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl leading-relaxed">
              Discover local shops and products on BazaarLink.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onGetStarted}
                className="px-6 py-3.5 text-base font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:brightness-110 rounded-2xl shadow-lg shadow-teal-500/25 transition-all duration-200 cursor-pointer flex items-center gap-2 group active:scale-[0.98]"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreMarkets}
                className="px-6 py-3.5 text-base font-semibold text-slate-200 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-700 rounded-2xl backdrop-blur-sm transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <Store className="w-4 h-4 text-teal-400" />
                <span>Explore Markets</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
