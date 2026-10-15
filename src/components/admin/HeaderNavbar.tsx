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
    <header className="sticky top-0 z-30 bg-[#0A0E1A] border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Platform Admin Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-xs shadow-teal-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white font-['Lexend'] tracking-tight">
                Platform Admin
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-slate-700 bg-slate-800/80 text-[10px] font-bold text-slate-300 tracking-wider uppercase font-mono">
                Central Administrator
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Centralized command center for BazaarLink regional hubs, markets, and administrators
            </p>
          </div>
        </div>

        {/* Right: Status, Navigation, and Admin Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Status Indicator: bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-xs shadow-inner">
            <span
              className={`w-2 h-2 rounded-full shadow-xs ${
                systemStatusOnline
                  ? 'bg-emerald-400 shadow-emerald-400/80 animate-pulse'
                  : 'bg-amber-400'
              }`}
            />
            <span className="font-semibold text-emerald-400 font-['Lexend'] tracking-tight text-[11px] sm:text-xs">
              {systemStatusText}
            </span>
          </div>

          {/* Platform Admin Navigation (Switch to Marketplace: border border-slate-700 text-slate-200 hover:bg-slate-800) */}
          <button
            onClick={onNavigateToPublic}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 border border-slate-700 bg-slate-900/40 hover:bg-slate-800 transition-all cursor-pointer"
            title="Switch to public marketplace view"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">Public Marketplace</span>
          </button>

          {/* Admin Profile & Status */}
          <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-teal-400 font-bold text-xs flex items-center justify-center">
              {currentAdmin.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>

            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-tight">
                {currentAdmin.name}
              </span>
              <span className="text-[9px] font-bold text-teal-300 bg-teal-950/70 border border-teal-800/60 px-1.5 py-0.2 rounded w-fit uppercase tracking-wider font-mono">
                Platform Admin
              </span>
            </div>

            {/* Logout button */}
            <button
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded-xl transition-colors cursor-pointer"
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
