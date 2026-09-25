import { Market } from '../types/market';
import { INITIAL_MARKETS } from './marketData';

// Conceptual in-memory store simulating Express + PostgreSQL backend
let databaseMarkets: Market[] = [...INITIAL_MARKETS];
type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((cb) => cb());
}

export const marketApi = {
  // Simulates GET /markets (defaults to active markets for customer frontend)
  getMarkets: async (includeAll = false): Promise<Market[]> => {
    // slight delay simulating network
    await new Promise((res) => setTimeout(res, 30));
    if (includeAll) {
      return [...databaseMarkets];
    }
    return databaseMarkets.filter((m) => m.status === 'active');
  },

  getMarketById: async (id: number): Promise<Market | undefined> => {
    return databaseMarkets.find((m) => m.id === id);
  },

  // Simulates PATCH /markets/:id/status
  toggleMarketStatus: (id: number): Market | undefined => {
    const market = databaseMarkets.find((m) => m.id === id);
    if (market) {
      market.status = market.status === 'active' ? 'inactive' : 'active';
      notify();
      return { ...market };
    }
    return undefined;
  },

  // Simulates POST /markets
  addMarket: (newMarketData: Omit<Market, 'id'>): Market => {
    const newId = Math.max(...databaseMarkets.map((m) => m.id), 0) + 1;
    const newMarket: Market = {
      ...newMarketData,
      id: newId,
    };
    databaseMarkets.push(newMarket);
    notify();
    return newMarket;
  },

  // Reset to initial
  resetToDefault: () => {
    databaseMarkets = [...INITIAL_MARKETS];
    notify();
  },

  subscribe: (callback: Listener) => {
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  },
};
