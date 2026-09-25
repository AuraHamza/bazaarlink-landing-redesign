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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Breadcrumb journey bar */}
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-100 mb-3 flex-wrap">
            <span className="bg-white/20 px-2 py-0.5 rounded-md">Market: {market.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
            <span className={`px-2 py-0.5 rounded-md ${selectedShop ? 'bg-white text-[#1E4E8C]' : 'bg-white/10 text-white'}`}>
              {selectedShop ? `Shop: ${selectedShop.name}` : 'Browse Shops'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
            <span className={`px-2 py-0.5 rounded-md ${cartCount > 0 ? 'bg-[#2EC4B6] text-white font-bold' : 'bg-white/10 text-white/70'}`}>
              Cart ({cartCount})
            </span>
            {orderPlaced && (
              <>
                <ArrowRight className="w-3.5 h-3.5" />
                <span className="bg-emerald-400 text-slate-900 font-bold px-2 py-0.5 rounded-md animate-pulse">
                  Order Placed!
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full text-white">
                  {market.district}
                </span>
                <span className="text-xs text-sky-100 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {market.timing}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Lexend'] tracking-tight">
                {market.name} Market
              </h2>
              <p className="text-sky-100 text-sm mt-1 max-w-xl">
                {market.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-2xl text-center border border-white/20">
                <span className="block text-xl font-bold font-['Lexend'] leading-none">
                  {market.shopsCount}
                </span>
                <span className="text-[10px] text-sky-100 uppercase tracking-wider font-medium">
                  Verified Shops
                </span>
              </div>
              <div className="bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-2xl text-center border border-white/20">
                <span className="block text-xl font-bold font-['Lexend'] leading-none">
                  {market.productsCount}+
                </span>
                <span className="text-[10px] text-sky-100 uppercase tracking-wider font-medium">
                  Products
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body: Shops List or Shop Product Details */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Notification when product added */}
          {lastAddedProduct && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between animate-in fade-in">
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                Added &ldquo;{lastAddedProduct}&rdquo; to local market cart
              </span>
              <span className="text-emerald-700 font-semibold">Ready for checkout</span>
            </div>
          )}

          {/* Success screen when order simulated */}
          {orderPlaced && (
            <div className="p-6 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center space-y-2 animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                <Check className="w-6 h-6" strokeWidth={3} />
              </div>
              <h3 className="text-xl font-bold text-emerald-950 font-['Lexend']">
                Order Placed Successfully!
              </h3>
              <p className="text-sm text-emerald-800 max-w-md mx-auto">
                BazaarLink tracking ID: <strong className="font-mono">#BZK-{(Math.random() * 89999 + 10000).toFixed(0)}</strong>
                <br />
                Your order is routed directly to the shopkeeper in {market.name}.
              </p>
            </div>
          )}

          {/* View: Shop Products if selectedShop is chosen */}
          {selectedShop ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <button
                  onClick={() => setSelectedShop(null)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E4E8C] hover:text-[#3FA0C8] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to {market.name} shops</span>
                </button>
                <span className="text-xs text-slate-500">
                  {selectedShop.floor} · {selectedShop.shopNumber}
                </span>
              </div>

              {/* Shop Header Details */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900 font-['Lexend']">
                      {selectedShop.name}
                    </h3>
                    {selectedShop.isVerified && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Verified Merchant
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 max-w-lg">
                    {selectedShop.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{selectedShop.rating}</span>
                      <span className="text-slate-400 text-xs font-normal">
                        ({selectedShop.reviewsCount})
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {selectedShop.productCount} Products cataloged
                    </span>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 font-['Lexend'] uppercase tracking-wider">
                    Featured Products ({selectedShop.featuredProducts.length})
                  </h4>
                  <span className="text-xs text-slate-500">All prices in Pakistani Rupees (PKR)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedShop.featuredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            {product.category}
                          </span>
                          {product.tag && (
                            <span className="text-[10px] font-bold text-[#1E4E8C] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                              {product.tag}
                            </span>
                          )}
                        </div>

                        <h5 className="text-sm font-semibold text-slate-900 font-['Lexend'] mb-2">
                          {product.name}
                        </h5>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-base font-bold text-[#1E4E8C] font-['Lexend']">
                            Rs. {product.price.toLocaleString()}
                          </span>
                          {product.unit && (
                            <span className="text-[11px] text-slate-500 ml-1">/{product.unit}</span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#1E4E8C] to-[#3FA0C8] hover:from-[#173e70] hover:to-[#358aa8] rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
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
                <div className="bg-[#1E4E8C]/5 rounded-2xl p-4 border border-[#3FA0C8]/30 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1E4E8C] text-white flex items-center justify-center font-bold">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 font-['Lexend']">
                        BazaarLink Cart: {cartCount} items selected
                      </h5>
                      <p className="text-xs text-slate-600">
                        Market: {market.name} · Direct Shop Order
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleSimulateOrder}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-[#2EC4B6] hover:bg-[#25aa9e] rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
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
                  <h3 className="text-lg font-bold text-slate-900 font-['Lexend']">
                    Shops in {market.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Step 2 of BazaarLink Journey: Select a shop to browse its authentic catalog
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {market.sampleShops.length} Featured Shops
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {market.sampleShops.map((shop) => (
                  <div
                    key={shop.id}
                    onClick={() => setSelectedShop(shop)}
                    className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200 hover:border-[#3FA0C8] hover:bg-white hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1E4E8C] flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform">
                            <Store className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-slate-900 font-['Lexend'] group-hover:text-[#1E4E8C] transition-colors">
                              {shop.name}
                            </h4>
                            <span className="text-[11px] text-slate-500">
                              {shop.floor} · {shop.shopNumber}
                            </span>
                          </div>
                        </div>

                        {shop.isVerified && (
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Verified
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {shop.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-amber-500 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{shop.rating}</span>
                        <span className="text-slate-400">({shop.reviewsCount})</span>
                      </div>

                      <span className="text-[#3FA0C8] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
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
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#3FA0C8]" />
            <span>GPS: {market.latitude.toFixed(4)}° N, {market.longitude.toFixed(4)}° E</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
