/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Market } from './types/market';
import { marketApi } from './services/marketApi';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarketsDirectorySection } from './components/MarketsDirectorySection';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesSection } from './components/FeaturesSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { MarketDetailModal } from './components/MarketDetailModal';
import { DbSimulatorModal } from './components/DbSimulatorModal';
import { AuthModal } from './components/AuthModal';
import { LoadingScreen } from './components/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [selectedMarketId, setSelectedMarketId] = useState<number | null>(null);
  const [inspectingMarket, setInspectingMarket] = useState<Market | null>(null);
  const [authModalState, setAuthModalState] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login',
  });
  const [isDbSimulatorOpen, setIsDbSimulatorOpen] = useState(false);

  // Load active markets from simulated API
  const refreshMarkets = async () => {
    const active = await marketApi.getMarkets();
    setMarkets(active);
    if (active.length > 0 && (!selectedMarketId || !active.some((m) => m.id === selectedMarketId))) {
      setSelectedMarketId(active[0].id);
    }
  };

  useEffect(() => {
    refreshMarkets();
    // Subscribe to database changes (e.g. market status toggle, newly added market)
    const unsubscribe = marketApi.subscribe(() => {
      refreshMarkets();
    });
    return () => unsubscribe();
  }, []);

  const handleSelectMarket = (market: Market) => {
    setSelectedMarketId(market.id);
    setInspectingMarket(market);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans relative">
      {/* Premium Branded BazaarLink Loading / Splash Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* 1. Sticky Navbar */}
      <Navbar
        onOpenAuth={(mode) => setAuthModalState({ isOpen: true, mode })}
        onNavigateToSection={handleScrollToSection}
        onExploreMarkets={() => handleScrollToSection('markets-preview')}
      />

      <main className="flex-1">
        {/* 2 & 3 & 4. Hero Section with Interactive Map Preview and Dynamic Stats */}
        <HeroSection
          markets={markets}
          selectedMarketId={selectedMarketId}
          onSelectMarket={handleSelectMarket}
          onExploreMarketsClick={() => handleScrollToSection('markets-preview')}
          onExploreMapClick={() => handleScrollToSection('map-section')}
          onOpenDbSimulator={() => setIsDbSimulatorOpen(true)}
        />

        {/* Dynamic Markets Directory */}
        <MarketsDirectorySection
          markets={markets}
          onSelectMarket={handleSelectMarket}
          onOpenDbSimulator={() => setIsDbSimulatorOpen(true)}
        />

        {/* 5. "How BazaarLink Works" (Market -> Shop -> Product -> Order) */}
        <HowItWorks
          onStepClick={(step) => {
            if (step === 1) handleScrollToSection('map-section');
            if (step === 2 && markets.length > 0) handleSelectMarket(markets[0]);
          }}
        />

        {/* 6. Features Section: "Everything you need to shop locally" */}
        <FeaturesSection
          onExploreMarkets={() => handleScrollToSection('markets-preview')}
          onExploreMap={() => handleScrollToSection('map-section')}
        />

        {/* 7. Final CTA Banner */}
        <CTASection
          onGetStarted={() => setAuthModalState({ isOpen: true, mode: 'register' })}
          onExploreMarkets={() => handleScrollToSection('markets-preview')}
        />
      </main>

      {/* 8. Footer */}
      <Footer
        onOpenAuth={(mode) => setAuthModalState({ isOpen: true, mode })}
        onNavigateToSection={handleScrollToSection}
        onExploreMarkets={() => handleScrollToSection('markets-preview')}
      />

      {/* Modals & Overlays */}
      <MarketDetailModal
        market={inspectingMarket}
        onClose={() => setInspectingMarket(null)}
      />

      <DbSimulatorModal
        isOpen={isDbSimulatorOpen}
        onClose={() => setIsDbSimulatorOpen(false)}
        onDataChanged={refreshMarkets}
      />

      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={() => setAuthModalState({ isOpen: false, mode: 'login' })}
      />
    </div>
  );
}
