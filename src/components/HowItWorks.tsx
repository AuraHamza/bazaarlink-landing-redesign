import React from 'react';
import { MapPin, Store, ShoppingBag, Truck, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStepClick?: (stepNumber: number) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStepClick }) => {
  const steps = [
    {
      number: '01',
      title: 'Choose a Market',
      description: 'Explore available markets on the interactive map.',
      journeyLabel: 'Market',
      icon: MapPin,
      accent: 'text-teal-400 bg-teal-950/70 border-teal-800/60',
    },
    {
      number: '02',
      title: 'Explore Shops',
      description: 'Open a market and browse the shops inside it.',
      journeyLabel: 'Shop',
      icon: Store,
      accent: 'text-cyan-400 bg-cyan-950/70 border-cyan-800/60',
    },
    {
      number: '03',
      title: 'Find Products',
      description: 'Browse products offered by local shops.',
      journeyLabel: 'Product',
      icon: ShoppingBag,
      accent: 'text-emerald-400 bg-emerald-950/70 border-emerald-800/60',
    },
    {
      number: '04',
      title: 'Shop & Track',
      description: 'Add products to your cart, place an order, and track it.',
      journeyLabel: 'Order',
      icon: Truck,
      accent: 'text-teal-300 bg-teal-950/50 border-teal-800/50',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-transparent border-y border-slate-200 scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading & Journey Indicator */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-teal-600 uppercase font-mono">
            Simple Customer Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Lexend'] tracking-tight">
            How BazaarLink Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From discovering Karachi&apos;s heritage bazaars to doorstep delivery in 4 clear steps.
          </p>

          {/* Visual Progression Banner: Market → Shop → Product → Order */}
          <div className="inline-flex items-center gap-2 sm:gap-4 p-2 sm:px-5 sm:py-2.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 shadow-xs font-mono">
            <span className="text-teal-600 flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              Market
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-cyan-600 flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Shop
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-emerald-600 flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Product
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              Order
            </span>
          </div>
        </div>

        {/* 4 Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                onClick={() => onStepClick && onStepClick(idx + 1)}
                className="relative bg-[#0A0E1A] rounded-3xl p-6 border border-slate-800 hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-950/30 transition-all duration-200 group flex flex-col justify-between text-white cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-2xl border ${step.accent} group-hover:scale-110 transition-transform duration-200 shadow-inner`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 font-['Lexend'] group-hover:text-teal-500/40 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-['Lexend'] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-teal-400 font-mono">Step {step.number}</span>
                  <span className="text-slate-400 group-hover:text-cyan-300 font-medium transition-colors font-mono">
                    {step.journeyLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
