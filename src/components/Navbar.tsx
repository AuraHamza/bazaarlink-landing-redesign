import React, { useState } from 'react';
import { MapPin, Menu, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onNavigateToSection: (sectionId: string) => void;
  onExploreMarkets: () => void;
  currentView?: 'landing' | 'map' | 'admin' | 'login' | 'admin-login';
  onNavigateView?: (view: 'landing' | 'map' | 'admin' | 'login' | 'admin-login') => void;
  onNavigateToLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onNavigateToSection,
  onExploreMarkets,
  currentView = 'landing',
  onNavigateView,
  onNavigateToLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView === 'map') {
      onNavigateView?.('landing');
      setTimeout(() => {
        onNavigateToSection(sectionId);
      }, 50);
    } else {
      onNavigateToSection(sectionId);
    }
  };

  const handleGoToMap = () => {
    setMobileMenuOpen(false);
    if (onNavigateView) {
      onNavigateView('map');
    } else {
      onNavigateToSection('map-section');
    }
  };

  const handleExplore = () => {
    setMobileMenuOpen(false);
    if (currentView === 'map') {
      onNavigateView?.('landing');
      setTimeout(() => {
        onExploreMarkets();
        handleNavClick('markets-preview');
      }, 50);
    } else {
      onExploreMarkets();
      handleNavClick('markets-preview');
    }
  };

  const handleGoToHome = () => {
    setMobileMenuOpen(false);
    onNavigateView?.('landing');
    onNavigateToSection('hero');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0E1A]/95 backdrop-blur-md border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Left: BazaarLink Logo & Brand */}
          <button
            onClick={handleGoToHome}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-xs shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
              <MapPin className="w-5 h-5 text-white" strokeWidth={2.3} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white font-['Lexend'] leading-none">
                Bazaar<span className="text-teal-400">Link</span>
              </span>
              <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase mt-0.5 font-mono">
                Karachi Markets
              </span>
            </div>
          </button>

          {/* Center Navigation Links: Map and Explore */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={handleGoToMap}
              className={`text-sm font-medium transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
                currentView === 'map'
                  ? 'text-teal-400 font-bold border-b-2 border-teal-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Map</span>
              {currentView === 'map' && (
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              )}
            </button>
            <button
              onClick={handleExplore}
              className={`text-sm font-medium transition-colors cursor-pointer py-1 ${
                currentView === 'landing'
                  ? 'text-slate-200 hover:text-teal-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Explore
            </button>
          </nav>

          {/* Right: Appropriate Public Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => {
                if (onNavigateToLogin) {
                  onNavigateToLogin();
                } else {
                  onOpenAuth('login');
                }
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-200 border border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:text-white transition-all cursor-pointer rounded-xl"
            >
              Login
            </button>
            <button
              onClick={() => onOpenAuth('register')}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:brightness-110 rounded-xl shadow-md shadow-teal-500/20 transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-[0.98]"
            >
              Get Started
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/60 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0A0E1A]/98 backdrop-blur-md px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2">
            <button
              onClick={handleGoToMap}
              className="text-left px-3 py-2 text-base font-semibold text-teal-400 hover:bg-slate-800/60 rounded-xl"
            >
              Map
            </button>
            <button
              onClick={handleExplore}
              className="text-left px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800/60 rounded-xl"
            >
              Explore
            </button>
          </div>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigateToLogin) {
                  onNavigateToLogin();
                } else {
                  onOpenAuth('login');
                }
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-200 border border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:text-white rounded-xl"
            >
              Login
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('register');
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-md shadow-teal-500/20 hover:brightness-110"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
