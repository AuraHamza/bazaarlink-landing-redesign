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
import { MapPage } from './components/MapPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'landing' | 'map'>('landing');
  const [markets, setMarkets] = useState<Market[]>([]);
  const [selectedMarketId, setSelectedMarketId] = useState<number | null>(null);
  const [inspectingMarket, setInspectingMarket] = useState<Market | null>(null);
  const [authModalState, setAuthModalState] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login',
  });
  const [isDbSimulatorOpen, setIsDbSimulatorOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Load active markets from simulated API
  const refreshMarkets = async () => {
    try {
      setApiError(null);
      const active = await marketApi.getMarkets();
      setMarkets(active);
      if (active.length > 0 && (!selectedMarketId || !active.some((m) => m.id === selectedMarketId))) {
        setSelectedMarketId(active[0].id);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to retrieve markets';
      setApiError(message);
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
        currentView={currentView}
        onNavigateView={(v) => setCurrentView(v)}
        onOpenAuth={(mode) => setAuthModalState({ isOpen: true, mode })}
        onNavigateToSection={handleScrollToSection}
        onExploreMarkets={() => {
          if (currentView === 'map') {
            // Already on map/markets page
          } else {
            handleScrollToSection('markets-preview');
          }
        }}
      />

      <main className="flex-1">
        {currentView === 'map' ? (
          /* Redesigned Dedicated BazaarLink Map / Markets Page */
          <MapPage
            markets={markets}
            selectedMarketId={selectedMarketId}
            onSelectMarket={handleSelectMarket}
            onOpenShopModal={(market) => setInspectingMarket(market)}
            onOpenDbSimulator={() => setIsDbSimulatorOpen(true)}
            onNavigateHome={() => setCurrentView('landing')}
            error={apiError}
            onRetry={refreshMarkets}
          />
        ) : (
          /* Landing Page Experience */
          <>
            {/* 2 & 3 & 4. Hero Section with Interactive Map Preview and Dynamic Stats */}
            <HeroSection
              markets={markets}
              selectedMarketId={selectedMarketId}
              onSelectMarket={handleSelectMarket}
              onExploreMarketsClick={() => setCurrentView('map')}
              onExploreMapClick={() => setCurrentView('map')}
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
                if (step === 1) setCurrentView('map');
                if (step === 2 && markets.length > 0) handleSelectMarket(markets[0]);
              }}
            />

            {/* 6. Features Section: "Everything you need to shop locally" */}
            <FeaturesSection
              onExploreMarkets={() => setCurrentView('map')}
              onExploreMap={() => setCurrentView('map')}
            />

            {/* 7. Final CTA Banner */}
            <CTASection
              onGetStarted={() => setAuthModalState({ isOpen: true, mode: 'register' })}
              onExploreMarkets={() => setCurrentView('map')}
            />
          </>
        )}
      </main>

      {/* 8. Footer */}
      <Footer
        onOpenAuth={(mode) => setAuthModalState({ isOpen: true, mode })}
        onNavigateToSection={(sec) => {
          if (currentView === 'map') {
            setCurrentView('landing');
            setTimeout(() => handleScrollToSection(sec), 50);
          } else {
            handleScrollToSection(sec);
          }
        }}
        onExploreMarkets={() => setCurrentView('map')}
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
