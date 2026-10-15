import React from 'react';
import { Map, Store, ShoppingCart, CheckCircle } from 'lucide-react';

interface FeaturesSectionProps {
  onExploreMarkets?: () => void;
  onExploreMap?: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onExploreMarkets,
  onExploreMap,
}) => {
  const features = [
    {
      title: 'Interactive Markets',
      description: 'Explore local markets through an interactive map.',
      icon: Map,
      accent: 'from-teal-600 to-cyan-600',
      iconColor: 'text-teal-400',
      bgColor: 'bg-teal-950/70 border-teal-800/60',
      highlights: ['Karachi-wide dynamic map', 'Live open & timing details', 'District neighborhood filters'],
      action: onExploreMap,
      actionText: 'View Map Preview',
    },
    {
      title: 'Local Shops',
      description: 'Browse shops and discover what they offer.',
      icon: Store,
      accent: 'from-cyan-600 to-teal-600',
      iconColor: 'text-cyan-400',
      bgColor: 'bg-cyan-950/70 border-cyan-800/60',
      highlights: ['Verified Karachi shopkeepers', 'Floor & shop unit locations', 'Authentic bazaar catalogs'],
      action: onExploreMarkets,
      actionText: 'Explore Shops',
    },
    {
      title: 'Easy Shopping',
      description: 'Add products to your cart, place orders, and track them.',
      icon: ShoppingCart,
      accent: 'from-emerald-600 to-teal-600',
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-950/70 border-emerald-800/60',
      highlights: ['Local PKR pricing & deals', 'Multi-shop combined checkout', 'End-to-end delivery tracking'],
      action: onExploreMarkets,
      actionText: 'Learn More',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-teal-600 uppercase font-mono">
            BazaarLink Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Lexend'] tracking-tight">
            Everything you need to shop locally
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Connecting Karachi&apos;s rich commercial bazaar heritage with modern digital convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-[#0F172A] rounded-3xl p-7 border border-slate-800 shadow-xl hover:border-teal-500/50 hover:shadow-teal-950/30 transition-all duration-300 flex flex-col justify-between text-white"
              >
                <div className="space-y-5">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl ${feature.bgColor} flex items-center justify-center border shadow-inner`}>
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>

                  {/* Heading & description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white font-['Lexend']">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bullet features */}
                  <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                    {feature.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle className={`w-3.5 h-3.5 ${feature.iconColor} shrink-0`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {feature.action && (
                  <div className="mt-6 pt-4 border-t border-slate-800/80">
                    <button
                      onClick={feature.action}
                      className="text-xs font-semibold text-teal-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer font-mono"
                    >
                      <span>{feature.actionText}</span>
                      <span>→</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
