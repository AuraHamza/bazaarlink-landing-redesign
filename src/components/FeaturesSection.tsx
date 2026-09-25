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
      accent: 'from-[#1E4E8C] to-[#1E4E8C]/80',
      iconColor: 'text-[#1E4E8C]',
      bgColor: 'bg-blue-50/70',
      highlights: ['Karachi-wide dynamic map', 'Live open & timing details', 'District neighborhood filters'],
      action: onExploreMap,
      actionText: 'View Map Preview',
    },
    {
      title: 'Local Shops',
      description: 'Browse shops and discover what they offer.',
      icon: Store,
      accent: 'from-[#3FA0C8] to-[#3FA0C8]/80',
      iconColor: 'text-[#3FA0C8]',
      bgColor: 'bg-sky-50/70',
      highlights: ['Verified Karachi shopkeepers', 'Floor & shop unit locations', 'Authentic bazaar catalogs'],
      action: onExploreMarkets,
      actionText: 'Explore Shops',
    },
    {
      title: 'Easy Shopping',
      description: 'Add products to your cart, place orders, and track them.',
      icon: ShoppingCart,
      accent: 'from-[#2EC4B6] to-[#2EC4B6]/80',
      iconColor: 'text-[#2EC4B6]',
      bgColor: 'bg-teal-50/70',
      highlights: ['Local PKR pricing & deals', 'Multi-shop combined checkout', 'End-to-end delivery tracking'],
      action: onExploreMarkets,
      actionText: 'Learn More',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#1E4E8C] uppercase">
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
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl ${feature.bgColor} flex items-center justify-center border border-slate-200/60`}>
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>

                  {/* Heading & description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 font-['Lexend']">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bullet features */}
                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {feature.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2.5 text-xs text-slate-600">
                        <CheckCircle className={`w-3.5 h-3.5 ${feature.iconColor} shrink-0`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {feature.action && (
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      onClick={feature.action}
                      className="text-xs font-semibold text-[#1E4E8C] hover:text-[#3FA0C8] flex items-center gap-1 transition-colors cursor-pointer"
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
