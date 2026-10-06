import React, { useState, useRef } from 'react';
import { MapPin, ArrowRight, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { platformAdminApi } from '../../services/platformAdminApi';
import { PlatformPersonnel } from '../../types/platformAdmin';
import { LoadingScreen } from '../LoadingScreen';

interface AdminLoginPageProps {
  onPlatformAdminLoginSuccess: (user: PlatformPersonnel) => void;
  onNavigateHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onPlatformAdminLoginSuccess,
  onNavigateHome,
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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white relative">
      {/* 6. Existing BazaarLink LoadingScreen for Platform Admin login flow */}
      {showLoadingScreen && (
        <LoadingScreen
          minDuration={2000}
          onComplete={handleLoadingScreenComplete}
        />
      )}

      {/* LEFT AUTHENTICATION PANEL - LIGHT WORKSPACE */}
      <div className="flex flex-col justify-between p-6 sm:p-12 lg:p-16 w-full max-w-xl mx-auto my-auto min-h-screen md:min-h-0 bg-white">
        <div>
          {/* Header */}
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-teal-600 font-mono block">
              SECURE PORTAL
            </span>
            <h1 className="text-3xl font-bold text-[#0F172A] font-['Lexend'] mt-1">
              Admin Login
            </h1>
            <p className="text-sm text-slate-500 mt-1.5">
              Authenticate to access the internal platform dashboards.
            </p>
          </div>

          {/* Segmented Role Selector */}
          <div className="bg-[#F8FAFC] border border-slate-200/80 p-1 rounded-xl flex gap-1 mt-6">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                setRole('MARKET_ADMIN');
                setErrorMessage(null);
                setMarketAdminNotice(null);
              }}
              className={`transition-all cursor-pointer flex-1 text-center py-2 px-4 rounded-lg text-xs font-semibold ${
                role === 'MARKET_ADMIN'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-900 font-medium'
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
              className={`transition-all cursor-pointer flex-1 text-center py-2 px-4 rounded-lg text-xs font-semibold ${
                role === 'PLATFORM_ADMIN'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-900 font-medium'
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              Platform Admin
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Market Admin Success Notice */}
          {marketAdminNotice && (
            <div className="mt-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{marketAdminNotice}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email Field */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                disabled={isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'PLATFORM_ADMIN' ? 'admin@bazaarlink.pk' : 'marketadmin@bazaarlink.pk'}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:bg-white text-[#0F172A] transition-colors placeholder:text-slate-400 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                disabled={isSubmitting}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:bg-white text-[#0F172A] transition-colors placeholder:text-slate-400 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#1E4E8C] to-[#0D9488] hover:from-[#173e70] hover:to-[#0b7a70] text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                <span>Login to Dashboard</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </form>
        </div>

        {/* Back Link to Public Marketplace */}
        <div className="pt-8">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onNavigateHome}
            className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to public marketplace</span>
          </button>
        </div>
      </div>

      {/* RIGHT BAZAARLINK BRANDING PANEL - PREMIUM DARK CONTROL PALETTE */}
      <div className="hidden md:flex flex-col justify-between p-12 lg:p-16 bg-gradient-to-br from-[#0A1128] via-[#0F1E36] to-[#064E4A] text-white relative overflow-hidden">
        {/* Faint geometric/grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(20,184,166,0.1)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

        {/* Subtle ecosystem/map-inspired network shapes */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ecosystemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0B2A43" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M 120 180 L 260 280 L 400 220 L 480 340"
            stroke="url(#ecosystemGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d="M 260 280 L 290 420 L 420 460"
            stroke="url(#ecosystemGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
          />
          <circle cx="120" cy="180" r="3.5" fill="#14B8A6" opacity="0.7" />
          <circle cx="260" cy="280" r="4.5" fill="#14B8A6" opacity="0.9" />
          <circle cx="400" cy="220" r="3.5" fill="#14B8A6" opacity="0.7" />
          <circle cx="480" cy="340" r="4" fill="#14B8A6" opacity="0.8" />
          <circle cx="290" cy="420" r="3" fill="#14B8A6" opacity="0.6" />
          <circle cx="420" cy="460" r="3.5" fill="#14B8A6" opacity="0.7" />
        </svg>

        {/* Very subtle radial glow & soft lighting */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#14B8A6]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#0B2A43]/70 blur-3xl pointer-events-none" />

        {/* Top Branding (Top-Right aligned) */}
        <div className="flex justify-end relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 shadow-xs">
              <MapPin className="w-5 h-5 text-[#14B8A6]" strokeWidth={2.3} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold tracking-tight text-white font-['Lexend'] leading-none">
                Bazaar<span className="text-[#14B8A6]">Link</span>
              </span>
              <span className="text-[10px] font-medium text-slate-300 tracking-wider uppercase mt-0.5 font-['Inter']">
                Karachi Markets
              </span>
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="my-auto space-y-4 max-w-md relative z-10">
          <h2 className="text-4xl font-extrabold leading-tight font-['Lexend'] text-white">
            Control the Ecosystem.
          </h2>
          <p className="text-base text-slate-300 max-w-md mt-4 leading-relaxed font-normal">
            Oversee shops, manage market regions, and ensure seamless operations across the platform.
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-6 border-t border-white/10">
          <span>© BazaarLink 2026</span>
          <span className="font-mono text-[11px] text-[#14B8A6]/80">RBAC Secured · Node/PostgreSQL</span>
        </div>
      </div>
    </div>
  );
};
