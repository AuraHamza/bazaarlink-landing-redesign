import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDuration?: number; // default ~2000ms
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDuration = 2100,
}) => {
  const [stage, setStage] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) {
      // Immediate clean fade for accessibility
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onComplete?.();
        }, 300);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Sequence stages (total ~2.1 seconds)
    // Stage 1: Icon sharpens and scales to 1 (0 - 350ms)
    const t1 = setTimeout(() => setStage(1), 100);

    // Stage 2: Radar ripple pulse activates (350ms)
    const t2 = setTimeout(() => setStage(2), 350);

    // Stage 3: Brand text "BazaarLink" smoothly reveals (650ms)
    const t3 = setTimeout(() => setStage(3), 650);

    // Stage 4: Map route path draws across (950ms)
    const t4 = setTimeout(() => setStage(4), 950);

    // Stage 5: Secondary status text & dots appear (1200ms)
    const t5 = setTimeout(() => setStage(5), 1200);

    // Stage 6: Smooth exit fade starts (minDuration)
    const tExit = setTimeout(() => {
      setIsExiting(true);
      // Wait for exit transition (400ms) then trigger onComplete
      const tDone = setTimeout(() => {
        onComplete?.();
      }, 420);
      return () => clearTimeout(tDone);
    }, minDuration);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(tExit);
    };
  }, [minDuration, onComplete]);

  return (
    <div
      aria-label="Loading BazaarLink"
      role="status"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#F8FAFC] select-none transition-all duration-400 ease-out ${
        isExiting
          ? 'opacity-0 scale-[1.02] pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* 1. Ambient Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft primary blue glow */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#1E4E8C]/12 via-[#3FA0C8]/15 to-[#2EC4B6]/10 blur-3xl transition-opacity duration-1000 ${
            stage >= 1 ? 'opacity-100 scale-100' : 'opacity-40 scale-75'
          } ${reducedMotion ? '' : 'animate-ambient-glow'}`}
        />
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Main Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-sm w-full text-center">
        {/* 2. Map-Pin Icon Discovery with Concentric Radar Wave */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Expanding Radar Wave 1 */}
          {stage >= 2 && !reducedMotion && (
            <span
              className="absolute w-16 h-16 rounded-3xl bg-[#3FA0C8]/25 animate-radar-ripple pointer-events-none"
              style={{ animationDuration: '2s' }}
            />
          )}

          {/* Expanding Radar Wave 2 (delayed offset) */}
          {stage >= 2 && !reducedMotion && (
            <span
              className="absolute w-16 h-16 rounded-3xl bg-[#2EC4B6]/20 animate-radar-ripple pointer-events-none"
              style={{ animationDelay: '0.6s', animationDuration: '2.2s' }}
            />
          )}

          {/* The Location-Pin Icon Badge */}
          <div
            className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1E4E8C] to-[#3FA0C8] flex items-center justify-center text-white shadow-xl shadow-[#1E4E8C]/25 transition-all duration-500 ease-out ${
              stage >= 1
                ? 'scale-100 blur-none opacity-100'
                : 'scale-75 blur-sm opacity-0'
            } ${stage >= 2 && !reducedMotion ? 'animate-splash-pulse' : ''}`}
          >
            <MapPin
              className={`w-8 h-8 sm:w-9 sm:h-9 text-white transition-transform duration-500 ${
                stage >= 1 ? 'scale-100' : 'scale-50'
              }`}
              strokeWidth={2.4}
            />

            {/* Subtle inner pin highlight */}
            <span className="absolute top-2 left-2 w-3.5 h-3.5 rounded-full bg-white/20 blur-2xs pointer-events-none" />
          </div>
        </div>

        {/* 3. Brand Reveal: BazaarLink */}
        <div
          className={`flex flex-col items-center transition-all duration-500 ease-out ${
            stage >= 3
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="flex items-center justify-center">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E4E8C] font-['Lexend'] leading-none">
              Bazaar<span className="text-[#3FA0C8]">Link</span>
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 tracking-widest uppercase mt-1.5 font-['Inter']">
            Karachi Local Markets
          </span>
        </div>

        {/* 4. Map-inspired Animated Route Path */}
        <div
          className={`w-48 h-12 my-3 relative flex items-center justify-center transition-opacity duration-500 ${
            stage >= 4 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 160 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background path trace */}
            <path
              d="M 15 28 L 55 12 L 105 26 L 145 14"
              stroke="#e2e8f0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Animated drawing path */}
            {stage >= 4 && (
              <path
                d="M 15 28 L 55 12 L 105 26 L 145 14"
                stroke="url(#routeGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={reducedMotion ? '' : 'animate-draw-path'}
              />
            )}

            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E4E8C" />
                <stop offset="50%" stopColor="#3FA0C8" />
                <stop offset="100%" stopColor="#2EC4B6" />
              </linearGradient>
            </defs>

            {/* Route Market Nodes */}
            {/* Node 1: Start market */}
            <circle
              cx="15"
              cy="28"
              r="3.5"
              fill="#1E4E8C"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            {/* Node 2: Discovered shop node */}
            <circle
              cx="55"
              cy="12"
              r="2.5"
              fill="#3FA0C8"
              stroke="#ffffff"
              strokeWidth="1"
              className={stage >= 4 && !reducedMotion ? 'animate-pulse' : ''}
            />
            {/* Node 3: Discovered market node */}
            <circle
              cx="105"
              cy="26"
              r="2.5"
              fill="#3FA0C8"
              stroke="#ffffff"
              strokeWidth="1"
            />
            {/* Node 4: Destination pin node with subtle pulse */}
            <circle
              cx="145"
              cy="14"
              r="3.5"
              fill="#2EC4B6"
              stroke="#ffffff"
              strokeWidth="1.5"
              className={stage >= 4 && !reducedMotion ? 'animate-pulse' : ''}
            />
          </svg>
        </div>

        {/* 5. Minimal Loading Indicator & Discovery Text */}
        <div
          className={`flex flex-col items-center gap-2 transition-all duration-400 ${
            stage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          {/* Subtle 3 dots loading indicator */}
          <div className="flex items-center justify-center gap-1.5 h-4">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#1E4E8C]"
              style={{
                animation: reducedMotion ? 'none' : 'dot-bounce 1.2s infinite ease-in-out',
                animationDelay: '0s',
              }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#3FA0C8]"
              style={{
                animation: reducedMotion ? 'none' : 'dot-bounce 1.2s infinite ease-in-out',
                animationDelay: '0.2s',
              }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#2EC4B6]"
              style={{
                animation: reducedMotion ? 'none' : 'dot-bounce 1.2s infinite ease-in-out',
                animationDelay: '0.4s',
              }}
            />
          </div>

          {/* Secondary Status Text */}
          <p className="text-xs font-medium text-slate-500 tracking-wide">
            Discovering local markets...
          </p>
        </div>
      </div>
    </div>
  );
};
