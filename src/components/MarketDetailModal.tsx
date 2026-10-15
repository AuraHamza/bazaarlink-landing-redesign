import React, { useState } from 'react';
import { Market, Shop, Product } from '../types/market';
import { 
  X, 
  MapPin, 
  Clock, 
  Store, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  ShoppingBag, 
  ShoppingCart,
  Check,
  ChevronLeft
} from 'lucide-react';

interface MarketDetailModalProps {
  market: Market | null;
  onClose: () => void;
}

export const MarketDetailModal: React.FC<MarketDetailModalProps> = ({ market, onClose }) => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [lastAddedProduct, setLastAddedProduct] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  if (!market) return null;

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    setLastAddedProduct(product.name);
    setTimeout(() => {
      setLastAddedProduct(null);
    }, 2500);
  };

  const handleSimulateOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setCartCount(0);
      setSelectedShop(null);
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-[#0A0E1A] w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[90vh] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0F172A] border-b border-slate-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Breadcrumb journey bar */}
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-300 mb-3 flex-wrap font-mono">
            <span className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-md">Market: {market.name}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <span className={`px-2 py-0.5 rounded-md border ${selectedShop ? 'bg-teal-950/80 text-teal-300 border-teal-600' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
              {selectedShop ? `Shop: ${selectedShop.name}` : 'Browse Shops'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <span className={`px-2 py-0.5 rounded-md border ${cartCount > 0 ? 'bg-teal-600 text-white font-bold border-teal-500' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
              Cart ({cartCount})
            </span>
            {orderPlaced && (
              <>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded-md animate-pulse">
                  Order Placed!
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider bg-teal-950/70 border border-teal-800/60 px-2.5 py-0.5 rounded-full text-teal-300 font-mono">
                  {market.district}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {market.timing}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Lexend'] tracking-tight text-white">
                {market.name} Market
              </h2>
              <p className="text-slate-300 text-sm mt-1 max-w-xl">
                {market.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl text-center border border-slate-700">
                <span className="block text-xl font-bold font-['Lexend'] leading-none text-teal-400">
                  {market.shopsCount}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium font-mono">
                  Verified Shops
                </span>
              </div>
              <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl text-center border border-slate-700">
                <span className="block text-xl font-bold font-['Lexend'] leading-none text-cyan-400">
                  {market.productsCount}+
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium font-mono">
                  Products
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body: Shops List or Shop Product Details */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-[#0A1128] text-white">
          {/* Notification when product added */}
          {lastAddedProduct && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-xs text-emerald-300 flex items-center justify-between animate-in fade-in">
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4 text-emerald-400" />
                Added &ldquo;{lastAddedProduct}&rdquo; to local market cart
              </span>
              <span className="text-emerald-400 font-semibold font-mono">Ready for checkout</span>
            </div>
          )}

          {/* Success screen when order simulated */}
          {orderPlaced && (
            <div className="p-6 bg-emerald-950/60 border-2 border-emerald-800/80 rounded-2xl text-center space-y-2 animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-6 h-6" strokeWidth={3} />
              </div>
              <h3 className="text-xl font-bold text-white font-['Lexend']">
                Order Placed Successfully!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                BazaarLink tracking ID: <strong className="font-mono text-teal-300">#BZK-{(Math.random() * 89999 + 10000).toFixed(0)}</strong>
                <br />
                Your order is routed directly to the shopkeeper in {market.name}.
              </p>
            </div>
          )}

          {/* View: Shop Products if selectedShop is chosen */}
          {selectedShop ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <button
                  onClick={() => setSelectedShop(null)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-teal-400 hover:text-cyan-300 cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to {market.name} shops</span>
                </button>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedShop.floor} · {selectedShop.shopNumber}
                </span>
              </div>

              {/* Shop Header Details */}
              <div className="bg-[#0F172A] rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white font-['Lexend']">
                      {selectedShop.name}
                    </h3>
                    {selectedShop.isVerified && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-800/60 font-mono">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        Verified Merchant
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1 max-w-lg">
                    {selectedShop.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{selectedShop.rating}</span>
                      <span className="text-slate-400 text-xs font-normal">
                        ({selectedShop.reviewsCount})
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {selectedShop.productCount} Products cataloged
                    </span>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white font-['Lexend'] uppercase tracking-wider">
                    Featured Products ({selectedShop.featuredProducts.length})
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">All prices in PKR</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedShop.featuredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-[#0F172A] rounded-2xl p-4 border border-slate-800 hover:border-teal-500/50 hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-[11px] font-medium text-slate-300 bg-slate-800/90 border border-slate-700/60 px-2 py-0.5 rounded-md font-mono">
                            {product.category}
                          </span>
                          {product.tag && (
                            <span className="text-[10px] font-bold text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded-md border border-teal-800/60 font-mono">
                              {product.tag}
                            </span>
                          )}
                        </div>

                        <h5 className="text-sm font-semibold text-white font-['Lexend'] mb-2">
                          {product.name}
                        </h5>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-base font-bold text-teal-400 font-['Lexend']">
                            Rs. {product.price.toLocaleString()}
                          </span>
                          {product.unit && (
                            <span className="text-[11px] text-slate-400 ml-1">/{product.unit}</span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#0D9488] to-[#06B6D4] hover:brightness-110 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulated Cart Checkout Bar */}
              {cartCount > 0 && (
                <div className="bg-[#0F172A] rounded-2xl p-4 border border-teal-800/60 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-950/70 border border-teal-800/60 text-teal-400 flex items-center justify-center font-bold">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white font-['Lexend']">
                        BazaarLink Cart: {cartCount} items selected
                      </h5>
                      <p className="text-xs text-slate-400">
                        Market: {market.name} · Direct Shop Order
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleSimulateOrder}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0D9488] to-[#06B6D4] hover:brightness-110 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                  >
                    <span>Place Test Order & Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* View: List of Shops in the Market */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-['Lexend']">
                    Shops in {market.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Step 2 of BazaarLink Journey: Select a shop to browse its authentic catalog
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-400 font-mono">
                  {market.sampleShops.length} Featured Shops
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {market.sampleShops.map((shop) => (
                  <div
                    key={shop.id}
                    onClick={() => setSelectedShop(shop)}
                    className="bg-[#0F172A] rounded-2xl p-5 border border-slate-800 hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-950/30 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-teal-950/70 text-teal-400 border border-teal-800/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Store className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-white font-['Lexend'] group-hover:text-teal-400 transition-colors">
                              {shop.name}
                            </h4>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {shop.floor} · {shop.shopNumber}
                            </span>
                          </div>
                        </div>

                        {shop.isVerified && (
                          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-800/60 font-mono">
                            Verified
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2">
                        {shop.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{shop.rating}</span>
                        <span className="text-slate-400">({shop.reviewsCount})</span>
                      </div>

                      <span className="text-teal-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Browse Products ({shop.productCount})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#0F172A] px-6 py-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span>GPS: {market.latitude.toFixed(4)}° N, {market.longitude.toFixed(4)}° E</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
