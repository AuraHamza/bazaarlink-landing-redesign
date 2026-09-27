import React from 'react';
import { ShieldCheck, ExternalLink, LogOut } from 'lucide-react';
import { PlatformPersonnel } from '../../types/platformAdmin';

interface HeaderNavbarProps {
  currentAdmin: PlatformPersonnel;
  onNavigateToPublic: () => void;
  onLogout: () => void;
  systemStatusText?: string;
  systemStatusOnline?: boolean;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  currentAdmin,
  onNavigateToPublic,
  onLogout,
  systemStatusText = 'ALL SYSTEMS NOMINAL',
  systemStatusOnline = true,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Platform Admin Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E4E8C] to-[#3FA0C8] flex items-center justify-center text-white shadow-xs">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Lexend'] tracking-tight">
                Platform Admin
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-[10px] font-bold text-[#1E4E8C] tracking-wide uppercase">
                Central Administrator
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Centralized command center for BazaarLink regional hubs, markets, and administrators
            </p>
          </div>
        </div>

        {/* Right: Status, Navigation, and Admin Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                systemStatusOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span className="font-semibold text-slate-700 font-['Lexend'] tracking-tight text-[11px] sm:text-xs">
              {systemStatusText}
            </span>
          </div>

          {/* Platform Admin Navigation (Switch to Marketplace) */}
          <button
            onClick={onNavigateToPublic}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            title="Switch to public marketplace view"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Public Marketplace</span>
          </button>

          {/* Admin Profile & Status */}
          <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
              {currentAdmin.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>

            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {currentAdmin.name}
              </span>
              <span className="text-[9px] font-bold text-[#1E4E8C] bg-blue-50 px-1 rounded w-fit uppercase tracking-wider">
                Platform Admin
              </span>
            </div>

            {/* Logout button */}
            <button
              onClick={onLogout}
              className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              title="Logout from administrative session"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
