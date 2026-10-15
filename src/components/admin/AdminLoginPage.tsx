import React, { useState, useRef } from 'react';
import { MapPin, ArrowRight, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { platformAdminApi } from '../../services/platformAdminApi';
import { PlatformPersonnel } from '../../types/platformAdmin';
import { LoadingScreen } from '../LoadingScreen';

interface AdminLoginPageProps {
  onPlatformAdminLoginSuccess: (user: PlatformPersonnel) => void;
  onNavigateHome: () => void;
  onNavigateToCustomerLogin?: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onPlatformAdminLoginSuccess,
  onNavigateHome,
  onNavigateToCustomerLogin,
}) => {
  const [role, setRole] = useState<'MARKET_ADMIN' | 'PLATFORM_ADMIN'>('PLATFORM_ADMIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [marketAdminNotice, setMarketAdminNotice] = useState<string | null>(null);

  // References to coordinate authentication completion with the existing LoadingScreen sequence
  const authenticatedUserRef = useRef<PlatformPersonnel | null>(null);
  const animationFinishedRef = useRef(false);

  const handleLoadingScreenComplete = () => {
    animationFinishedRef.current = true;
    if (authenticatedUserRef.current) {
      onPlatformAdminLoginSuccess(authenticatedUserRef.current);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple form submissions while request is processing

    setErrorMessage(null);
    setMarketAdminNotice(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    if (role === 'PLATFORM_ADMIN') {
      // Reuse the exact existing BazaarLink LoadingScreen component for Platform Admin authentication
      setIsSubmitting(true);
      setShowLoadingScreen(true);
      authenticatedUserRef.current = null;
      animationFinishedRef.current = false;

      try {
        const result = await platformAdminApi.adminLogin({
          email: email.trim(),
          password,
          role: 'PLATFORM_ADMIN',
        });

        authenticatedUserRef.current = result.user;

        // If the LoadingScreen animation sequence already completed, transition immediately
        if (animationFinishedRef.current) {
          onPlatformAdminLoginSuccess(result.user);
        }
      } catch (err: unknown) {
        // Stop loading immediately and display the appropriate error message
        setShowLoadingScreen(false);
        setIsSubmitting(false);
        authenticatedUserRef.current = null;
        const msg = err instanceof Error ? err.message : 'Authentication failed. Please check credentials.';
        setErrorMessage(msg);
      }
    } else {
      // Market Admin role: authenticated without inventing an unauthorized dashboard
      setIsSubmitting(true);
      try {
        const result = await platformAdminApi.adminLogin({
          email: email.trim(),
          password,
          role: 'MARKET_ADMIN',
        });
        setIsSubmitting(false);
        setMarketAdminNotice(
          `Market Administrator authenticated successfully (${result.user.name} · ${result.user.assignedMarketName || 'Unassigned'}). Market Admin dashboard module will be provisioned in a subsequent release.`
        );
      } catch (err: unknown) {
        setIsSubmitting(false);
        const msg = err instanceof Error ? err.message : 'Authentication failed. Please check credentials.';
        setErrorMessage(msg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative flex flex-col justify-center items-center lg:grid lg:grid-cols-12 overflow-x-hidden font-sans">
      {/* Subtle top radial glow on light canvas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(13,148,136,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* 6. Existing BazaarLink LoadingScreen for Platform Admin login flow */}
      {showLoadingScreen && (
        <LoadingScreen
          minDuration={2000}
          onComplete={handleLoadingScreenComplete}
        />
      )}

      {/* LEFT / CENTER COLUMN: LIGHT CANVAS HOSTING DARK FLOATING AUTH CARD */}
      <div className="w-full col-span-12 lg:col-span-6 flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 relative z-10 min-h-screen lg:min-h-0">
        {/* Floating Dark Auth Card */}
        <div className="w-full max-w-md bg-[#0A0E1A] rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 text-white relative">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold tracking-wider uppercase text-teal-400 font-mono px-2.5 py-0.5 rounded-md bg-teal-950/70 border border-teal-800/80">
                SECURE PORTAL
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                PORT: 443 · TLS 1.3
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-['Lexend'] tracking-tight">
              Admin Login
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Authenticate to access the internal platform dashboards.
            </p>
          </div>

          {/* Segmented Role Selector */}
          <div className="bg-[#0F172A] border border-slate-800 p-1 rounded-xl flex gap-1 mt-5">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                setRole('MARKET_ADMIN');
                setErrorMessage(null);
                setMarketAdminNotice(null);
              }}
              className={`transition-all cursor-pointer flex-1 text-center py-2 px-3 rounded-lg text-xs font-semibold ${
                role === 'MARKET_ADMIN'
                  ? 'bg-slate-800 text-teal-300 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white font-medium'
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              Market Admin
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                setRole('PLATFORM_ADMIN');
                setErrorMessage(null);
                setMarketAdminNotice(null);
              }}
              className={`transition-all cursor-pointer flex-1 text-center py-2 px-3 rounded-lg text-xs font-semibold ${
                role === 'PLATFORM_ADMIN'
                  ? 'bg-slate-800 text-teal-300 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white font-medium'
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              Platform Admin
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-300 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Market Admin Success Notice */}
          {marketAdminNotice && (
            <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-xs text-emerald-300 flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{marketAdminNotice}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Email Field */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                disabled={isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'PLATFORM_ADMIN' ? 'admin@bazaarlink.pk' : 'marketadmin@bazaarlink.pk'}
                className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-slate-900 text-white transition-colors placeholder:text-slate-500 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                disabled={isSubmitting}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-slate-900 text-white transition-colors placeholder:text-slate-500 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 hover:brightness-110 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-teal-500/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                <span>Login to Dashboard</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </form>

          {/* Back Link to Public Marketplace & Customer/Shop Login */}
          <div className="pt-5 mt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onNavigateHome}
              className="text-xs text-slate-400 hover:text-teal-300 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to marketplace</span>
            </button>
            <div className="flex items-center gap-2">
              {onNavigateToCustomerLogin && (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={onNavigateToCustomerLogin}
                  className="text-xs text-teal-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer disabled:opacity-50"
                >
                  Customer / Shop Login (/login) →
                </button>
              )}
              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">v2.4</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: LIGHT BRAND HERO ARCHITECTURE */}
      <div className="hidden lg:flex col-span-6 flex-col justify-between p-12 lg:p-16 bg-gradient-to-br from-slate-100 via-teal-50/30 to-slate-200/70 border-l border-slate-200 relative overflow-hidden min-h-screen">
        {/* Faint geometric/grid pattern on light hero */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Subtle ecosystem/map-inspired network shapes with teal & cyan lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ecosystemLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M 120 180 L 260 280 L 400 220 L 480 340"
            stroke="url(#ecosystemLightGrad)"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d="M 260 280 L 290 420 L 420 460"
            stroke="url(#ecosystemLightGrad)"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />
          <circle cx="120" cy="180" r="4.5" fill="#0D9488" />
          <circle cx="260" cy="280" r="5.5" fill="#06B6D4" />
          <circle cx="400" cy="220" r="4.5" fill="#0D9488" />
          <circle cx="480" cy="340" r="5" fill="#06B6D4" />
          <circle cx="290" cy="420" r="4" fill="#0D9488" />
          <circle cx="420" cy="460" r="4.5" fill="#06B6D4" />
        </svg>

        {/* Soft lighting accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

        {/* Top Branding (Top-Right aligned) */}
        <div className="flex justify-end relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <MapPin className="w-5 h-5 text-white" strokeWidth={2.3} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-['Lexend'] leading-none">
                Bazaar<span className="text-teal-600">Link</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5 font-mono">
                Karachi Markets
              </span>
            </div>
          </div>
        </div>

        {/* Center Content in Light Brand Hero */}
        <div className="my-auto space-y-5 max-w-md relative z-10">
          <span className="text-[11px] font-bold tracking-widest uppercase text-teal-800 bg-teal-100/80 border border-teal-200 px-3 py-1 rounded-full font-mono inline-block">
            CENTRAL PLATFORM CONTROL
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight font-['Lexend'] text-slate-900">
            Control the Ecosystem.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Oversee shops, manage market regions, and ensure seamless operations across the platform with enterprise-grade reliability and RBAC separation.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-3">
            <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/90 shadow-sm">
              <div className="text-2xl font-black font-['Lexend'] text-slate-900">99.9%</div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">Uptime Guarantee</div>
            </div>
            <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/90 shadow-sm">
              <div className="text-2xl font-black font-['Lexend'] text-slate-900">Multi-Role</div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">RBAC Separation</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 pt-6 border-t border-slate-300/70">
          <span>© BazaarLink 2026</span>
          <span className="font-mono text-[11px] text-teal-800 font-semibold bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
            RBAC Secured · Node/PostgreSQL
          </span>
        </div>
      </div>
    </div>
  );
};
