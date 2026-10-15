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
import { PlatformAdminDashboard } from './components/admin/PlatformAdminDashboard';
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { CustomerShopLoginPage } from './components/CustomerShopLoginPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'landing' | 'map' | 'login' | 'admin-login' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (
        pathname === '/login' ||
        pathname.startsWith('/login') ||
        hash === '#login' ||
        hash.startsWith('#login')
      ) {
        return 'login';
      }
      if (
        pathname === '/admin/login' ||
        pathname.startsWith('/admin/login') ||
        hash === '#admin/login' ||
        hash.startsWith('#admin/login')
      ) {
        return 'admin-login';
      }
      if (
        pathname === '/admin' ||
        pathname.startsWith('/admin') ||
        hash === '#admin' ||
        hash.startsWith('#admin')
      ) {
        return 'admin';
      }
      if (pathname === '/map' || hash === '#map') {
        return 'map';
      }
    }
    return 'landing';
  });
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

    const handleUrlRouting = () => {
      if (typeof window === 'undefined') return;
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (
        pathname === '/login' ||
        pathname.startsWith('/login') ||
        hash === '#login' ||
        hash.startsWith('#login')
      ) {
        setCurrentView('login');
      } else if (
        pathname === '/admin/login' ||
        pathname.startsWith('/admin/login') ||
        hash === '#admin/login' ||
        hash.startsWith('#admin/login')
      ) {
        setCurrentView('admin-login');
      } else if (
        pathname === '/admin' ||
        pathname.startsWith('/admin') ||
        hash === '#admin' ||
        hash.startsWith('#admin')
      ) {
        setCurrentView('admin');
      } else if (pathname === '/map' || hash === '#map') {
        setCurrentView('map');
      } else if (pathname === '/' && !hash.startsWith('#admin') && !hash.startsWith('#login')) {
        setCurrentView('landing');
      }
    };

    window.addEventListener('popstate', handleUrlRouting);
    window.addEventListener('hashchange', handleUrlRouting);

    return () => {
      unsubscribe();
      window.removeEventListener('popstate', handleUrlRouting);
      window.removeEventListener('hashchange', handleUrlRouting);
    };
  }, []);

  const handleSelectMarket = (market: Market) => {
    setSelectedMarketId(market.id);
  };

  const handleOpenShopModal = (market: Market) => {
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans relative">
      {/* Premium Branded BazaarLink Loading / Splash Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {currentView === 'login' ? (
        /* Dedicated Customer + Shop Admin Authentication Portal (/login) */
        <CustomerShopLoginPage
          onNavigateHome={() => {
            if (typeof window !== 'undefined') {
              window.history.pushState(null, '', '/');
            }
            setCurrentView('landing');
          }}
        />
      ) : currentView === 'admin-login' ? (
        /* Dedicated BazaarLink Admin Login Page (/admin/login) */
        <AdminLoginPage
          onPlatformAdminLoginSuccess={() => {
            if (typeof window !== 'undefined') {
              window.history.pushState(null, '', '/admin');
            }
            setCurrentView('admin');
          }}
          onNavigateHome={() => {
            if (typeof window !== 'undefined') {
              window.history.pushState(null, '', '/');
            }
            setCurrentView('landing');
          }}
          onNavigateToCustomerLogin={() => {
            if (typeof window !== 'undefined') {
              window.history.pushState(null, '', '/login');
            }
            setCurrentView('login');
          }}
        />
      ) : currentView === 'admin' ? (
        /* Dedicated BazaarLink Platform Admin Dashboard */
        <PlatformAdminDashboard
          onNavigateToPublic={() => {
            if (typeof window !== 'undefined') {
              window.history.pushState(null, '', '/');
            }
            setCurrentView('landing');
          }}
          onLogout={() => {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('bazaarlink_admin_token');
              localStorage.removeItem('bazaarlink_admin_user');
              window.history.pushState(null, '', '/admin/login');
            }
            setCurrentView('admin-login');
          }}
          onOpenShopModal={handleOpenShopModal}
          onViewOnMap={(market) => {
            setSelectedMarketId(market.id);
            setCurrentView('map');
          }}
        />
      ) : (
        <>
          {/* 1. Sticky Navbar */}
          <Navbar
            currentView={currentView}
            onNavigateView={(v) => {
              if (v === 'landing') {
                if (typeof window !== 'undefined') window.history.pushState(null, '', '/');
              } else if (v === 'map') {
                if (typeof window !== 'undefined') window.history.pushState(null, '', '/map');
              } else if (v === 'login') {
                if (typeof window !== 'undefined') window.history.pushState(null, '', '/login');
              } else if (v === 'admin-login') {
                if (typeof window !== 'undefined') window.history.pushState(null, '', '/admin/login');
              } else if (v === 'admin') {
                if (typeof window !== 'undefined') window.history.pushState(null, '', '/admin');
              }
              setCurrentView(v);
            }}
            onNavigateToLogin={() => {
              if (typeof window !== 'undefined') {
                window.history.pushState(null, '', '/login');
              }
              setCurrentView('login');
            }}
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
                  onSelectMarket={handleOpenShopModal}
                  onExploreMarketsClick={() => setCurrentView('map')}
                  onExploreMapClick={() => setCurrentView('map')}
                  onOpenDbSimulator={() => setIsDbSimulatorOpen(true)}
                />

                {/* Dynamic Markets Directory */}
                <MarketsDirectorySection
                  markets={markets}
                  onSelectMarket={handleOpenShopModal}
                  onOpenDbSimulator={() => setIsDbSimulatorOpen(true)}
                />

                {/* 5. "How BazaarLink Works" (Market -> Shop -> Product -> Order) */}
                <HowItWorks
                  onStepClick={(step) => {
                    if (step === 1) setCurrentView('map');
                    if (step === 2 && markets.length > 0) handleOpenShopModal(markets[0]);
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
            onNavigateToLogin={() => {
              if (typeof window !== 'undefined') {
                window.history.pushState(null, '', '/login');
              }
              setCurrentView('login');
            }}
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
        </>
      )}

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
