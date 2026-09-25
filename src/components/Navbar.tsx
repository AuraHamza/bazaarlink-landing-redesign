import React, { useState } from 'react';
import { MapPin, Menu, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onNavigateToSection: (sectionId: string) => void;
  onExploreMarkets: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onNavigateToSection,
  onExploreMarkets,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateToSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8FAFC]/90 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Left: BazaarLink Logo & Brand */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3FA0C8] rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E4E8C] to-[#3FA0C8] flex items-center justify-center text-white shadow-sm shadow-[#1E4E8C]/20 group-hover:scale-105 transition-transform duration-200">
              <MapPin className="w-5 h-5 text-white" strokeWidth={2.3} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#1E4E8C] font-['Lexend'] leading-none">
                Bazaar<span className="text-[#3FA0C8]">Link</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase mt-0.5">
                Karachi Markets
              </span>
            </div>
          </button>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => {
                onExploreMarkets();
                handleNavClick('markets-preview');
              }}
              className="text-sm font-medium text-slate-600 hover:text-[#1E4E8C] transition-colors cursor-pointer py-1"
            >
              Markets
            </button>
            <button
              onClick={() => handleNavClick('map-section')}
              className="text-sm font-medium text-slate-600 hover:text-[#1E4E8C] transition-colors cursor-pointer py-1"
            >
              Map
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-sm font-medium text-slate-600 hover:text-[#1E4E8C] transition-colors cursor-pointer py-1"
            >
              How It Works
            </button>
          </nav>

          {/* Right: Auth Actions (No Cart here as per user prompt constraints) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onOpenAuth('login')}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-[#1E4E8C] transition-colors cursor-pointer rounded-lg hover:bg-slate-100/70"
            >
              Login
            </button>
            <button
              onClick={() => onOpenAuth('register')}
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] hover:from-[#173e70] hover:to-[#358aa8] rounded-xl shadow-sm shadow-[#1E4E8C]/25 transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-[0.98]"
            >
              Get Started
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                onExploreMarkets();
                handleNavClick('markets-preview');
              }}
              className="text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Markets
            </button>
            <button
              onClick={() => handleNavClick('map-section')}
              className="text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Map
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              How It Works
            </button>
          </div>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
              className="w-full py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Login
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('register');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] rounded-xl shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
