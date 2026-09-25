import React from 'react';
import { MapPin } from 'lucide-react';

interface FooterProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onNavigateToSection: (sectionId: string) => void;
  onExploreMarkets: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAuth,
  onNavigateToSection,
  onExploreMarkets,
}) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1E4E8C] to-[#3FA0C8] flex items-center justify-center text-white shadow-xs">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1E4E8C] font-['Lexend']">
                Bazaar<span className="text-[#3FA0C8]">Link</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Discover local markets and shops through an interactive marketplace experience. Connecting Karachi shoppers with verified neighborhood merchants.
            </p>
          </div>

          {/* Column 1: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-['Lexend']">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <button
                  onClick={onExploreMarkets}
                  className="hover:text-[#1E4E8C] transition-colors cursor-pointer"
                >
                  Markets
                </button>
              </li>
              <li>
                <button
                  onClick={onExploreMarkets}
                  className="hover:text-[#1E4E8C] transition-colors cursor-pointer"
                >
                  Shops
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('map-section')}
                  className="hover:text-[#1E4E8C] transition-colors cursor-pointer"
                >
                  Map
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Account */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-['Lexend']">
              Account
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="hover:text-[#1E4E8C] transition-colors cursor-pointer"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="hover:text-[#1E4E8C] transition-colors cursor-pointer"
                >
                  Register
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="hover:text-[#1E4E8C] transition-colors cursor-pointer"
                >
                  Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-['Lexend']">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <span className="hover:text-[#1E4E8C] transition-colors cursor-pointer">
                  About
                </span>
              </li>
              <li>
                <span className="hover:text-[#1E4E8C] transition-colors cursor-pointer">
                  Contact
                </span>
              </li>
              <li>
                <span className="hover:text-[#1E4E8C] transition-colors cursor-pointer">
                  Privacy
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 BazaarLink. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Karachi Local Marketplace Prototype</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-400">Node/Express + PostgreSQL Ready</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
