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
      accent: 'text-[#1E4E8C] bg-blue-50 border-blue-100',
    },
    {
      number: '02',
      title: 'Explore Shops',
      description: 'Open a market and browse the shops inside it.',
      journeyLabel: 'Shop',
      icon: Store,
      accent: 'text-[#3FA0C8] bg-sky-50 border-sky-100',
    },
    {
      number: '03',
      title: 'Find Products',
      description: 'Browse products offered by local shops.',
      journeyLabel: 'Product',
      icon: ShoppingBag,
      accent: 'text-[#2EC4B6] bg-teal-50 border-teal-100',
    },
    {
      number: '04',
      title: 'Shop & Track',
      description: 'Add products to your cart, place an order, and track it.',
      journeyLabel: 'Order',
      icon: Truck,
      accent: 'text-[#1E4E8C] bg-slate-100 border-slate-200',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white border-y border-slate-200/70 scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading & Journey Indicator */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#3FA0C8] uppercase">
            Simple Customer Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Lexend'] tracking-tight">
            How BazaarLink Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From discovering Karachi&apos;s heritage bazaars to doorstep delivery in 4 clear steps.
          </p>

          {/* Visual Progression Banner: Market → Shop → Product → Order */}
          <div className="inline-flex items-center gap-2 sm:gap-4 p-2 sm:px-5 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs">
            <span className="text-[#1E4E8C] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1E4E8C]" />
              Market
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#3FA0C8] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3FA0C8]" />
              Shop
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#2EC4B6] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2EC4B6]" />
              Product
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-700" />
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
                className="relative bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200 hover:border-[#3FA0C8]/50 hover:shadow-lg hover:shadow-slate-100 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-2xl border ${step.accent} group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 font-['Lexend'] group-hover:text-[#3FA0C8]/50 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-['Lexend'] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-[#1E4E8C]">Step {step.number}</span>
                  <span className="text-slate-400 group-hover:text-[#3FA0C8] font-medium transition-colors">
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
