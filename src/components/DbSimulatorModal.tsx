import React, { useState } from 'react';
import { Market } from '../types/market';
import { marketApi } from '../services/marketApi';
import { X, Database, Plus, RefreshCw, CheckCircle, AlertCircle, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';

interface DbSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const DbSimulatorModal: React.FC<DbSimulatorModalProps> = ({
  isOpen,
  onClose,
  onDataChanged,
}) => {
  const [allMarkets, setAllMarkets] = useState<Market[]>([]);
  const [apiLogs, setApiLogs] = useState<string[]>([
    'Initialized PostgreSQL connection pool: bazaarlink_db',
    'SELECT * FROM markets WHERE status = "active"; -- 4 rows returned',
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMarketName, setNewMarketName] = useState('');
  const [newMarketArea, setNewMarketArea] = useState('');
  const [newMarketDistrict, setNewMarketDistrict] = useState('District South');

  const loadData = async () => {
    const list = await marketApi.getMarkets(true);
    setAllMarkets(list);
  };

  React.useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggle = (id: number) => {
    const updated = marketApi.toggleMarketStatus(id);
    if (updated) {
      const log = `PATCH /markets/${id} -> Status changed to "${updated.status}" (Map markers updated)`;
      setApiLogs((prev) => [log, ...prev.slice(0, 7)]);
      loadData();
      onDataChanged();
    }
  };

  const handleReset = () => {
    marketApi.resetToDefault();
    setApiLogs((prev) => ['POST /admin/reset -> Database reverted to seed state', ...prev.slice(0, 7)]);
    loadData();
    onDataChanged();
  };

  const handleAddCustomMarket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMarketName.trim() || !newMarketArea.trim()) return;

    const added = marketApi.addMarket({
      name: newMarketName.trim(),
      area: newMarketArea.trim(),
      district: newMarketDistrict,
      latitude: 24.8607,
      longitude: 67.0011,
      mapX: Math.floor(Math.random() * 40) + 30,
      mapY: Math.floor(Math.random() * 40) + 30,
      status: 'active',
      shopsCount: 15,
      productsCount: 140,
      tagline: `Dynamic Karachi bazaar added via API: ${newMarketName}`,
      timing: '11:00 AM – 10:00 PM',
      specialties: ['Local Crafts', 'Apparel', 'Street Bazaar'],
      sampleShops: [
        {
          id: `custom-${Date.now()}`,
          marketId: 99,
          name: `${newMarketName} General Store`,
          shopNumber: 'Shop 01',
          floor: 'Ground Floor',
          category: 'General Retail',
          rating: 4.8,
          reviewsCount: 24,
          isVerified: true,
          productCount: 20,
          description: 'Authentic local merchants directly onboarded to BazaarLink.',
          featuredProducts: [
            { id: `p-${Date.now()}`, name: 'Handcrafted Heritage Item', category: 'Crafts', price: 1500, inStock: true }
          ]
        }
      ]
    });

    setApiLogs((prev) => [`POST /markets -> Inserted "${added.name}" (status: active, ID: ${added.id})`, ...prev.slice(0, 7)]);
    setNewMarketName('');
    setNewMarketArea('');
    setShowAddForm(false);
    loadData();
    onDataChanged();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1E4E8C] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 text-sky-200">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-['Lexend']">
                BazaarLink Database Sync Simulator
              </h3>
              <p className="text-xs text-sky-200">
                Test database-driven map markers: Active vs Inactive reactivity
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm">
          {/* Architecture requirement callout */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-xs text-sky-900 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#3FA0C8] shrink-0 mt-0.5" />
            <p>
              <strong>Architecture Verification:</strong> BazaarLink markers are populated from{' '}
              <code className="bg-white px-1.5 py-0.5 rounded border border-sky-200 font-mono">GET /markets WHERE status = &apos;active&apos;</code>.
              Toggle any market below to watch it instantly appear on or disappear from the map!
            </p>
          </div>

          {/* Markets Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 font-['Lexend'] text-sm">
                Markets in Database ({allMarkets.length})
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="px-2.5 py-1 text-xs font-semibold text-[#1E4E8C] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Market</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  title="Reset to default seed data"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Form to add custom market */}
            {showAddForm && (
              <form onSubmit={handleAddCustomMarket} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-slate-700 block">
                  Simulate New Market Onboarding (POST /markets)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Market Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Empress Market"
                      value={newMarketName}
                      onChange={(e) => setNewMarketName(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4E8C]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Area / Neighborhood</label>
                    <input
                      type="text"
                      placeholder="e.g. Saddar"
                      value={newMarketArea}
                      onChange={(e) => setNewMarketArea(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4E8C]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">District</label>
                    <select
                      value={newMarketDistrict}
                      onChange={(e) => setNewMarketDistrict(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4E8C]"
                    >
                      <option value="District South">District South</option>
                      <option value="District Central">District Central</option>
                      <option value="District East">District East</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1 text-xs text-slate-500 hover:bg-slate-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs font-semibold text-white bg-[#1E4E8C] rounded-lg shadow-xs hover:bg-[#173e70]"
                  >
                    Save & Inject into DB
                  </button>
                </div>
              </form>
            )}

            {/* List */}
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
              {allMarkets.map((m) => {
                const isActive = m.status === 'active';
                return (
                  <div key={m.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 font-['Lexend'] text-sm">
                          {m.name}
                        </span>
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {m.area}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ID: #{m.id}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {m.shopsCount} shops · {m.productsCount} products · {m.district}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          isActive
                            ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                            : 'text-slate-500 bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {isActive ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>Active on Map</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3 text-slate-400" />
                            <span>Hidden / Inactive</span>
                          </>
                        )}
                      </span>

                      <button
                        onClick={() => handleToggle(m.id)}
                        className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-blue-50 text-[#1E4E8C] border-blue-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        }`}
                        title={isActive ? 'Deactivate (remove from map)' : 'Activate (render on map)'}
                      >
                        {isActive ? (
                          <ToggleRight className="w-5 h-5" />
                        ) : (
                          <ToggleLeft className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live REST API Logs Console */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Simulated Express / PostgreSQL API Activity
            </span>
            <div className="bg-slate-900 text-sky-400 font-mono text-[11px] p-3.5 rounded-2xl space-y-1 overflow-x-auto max-h-36">
              {apiLogs.map((log, i) => (
                <div key={i} className="leading-relaxed">
                  <span className="text-slate-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1E4E8C] hover:bg-[#173e70] rounded-xl transition-colors cursor-pointer"
          >
            Apply & View Map
          </button>
        </div>
      </div>
    </div>
  );
};
