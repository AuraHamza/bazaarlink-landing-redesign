import { Market } from './market';

export type UserRole = 'PLATFORM_ADMIN' | 'MARKET_ADMIN' | 'SHOP_ADMIN' | 'CUSTOMER';

export interface RegionalHub {
  id: string;
  hubCode: string;
  name: string;
  city: string;
  province: string;
  country: string;
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE';
  createdAt: string;
  centerCoordinates: {
    latitude: number;
    longitude: number;
  };
  timezone: string;
  notes?: string;
}

export interface PlatformPersonnel {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  assignedMarketId: number | null;
  assignedMarketName: string | null;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  joinedDate: string;
  lastActive: string;
}

export interface SystemHealthData {
  status: 'ALL SYSTEMS NOMINAL' | 'DEGRADED' | 'SERVICE UNAVAILABLE';
  database: 'CONNECTED' | 'DISCONNECTED' | 'RECONNECTING';
  databaseEngine: string;
  latencyMs: number;
  uptimeSeconds: number;
  lastHealthCheck: string;
  activeConnections: number;
  apiEndpointsActive: number;
  services: {
    name: string;
    status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
    latency: string;
  }[];
}

export interface PlatformMetrics {
  totalHubs: number;
  activeMarkets: number;
  totalMarkets: number;
  verifiedAdmins: number;
  totalShops: number;
  totalPersonnel: number;
  pendingApprovals: number;
}

export type StatisticsPeriod = 'today' | 'week' | 'month' | 'year' | 'custom';

export interface FinancialMetricPoint {
  period: string;
  revenue: number;
  profit: number;
  orders: number;
}

export interface PlatformStatistics {
  status: 'AVAILABLE' | 'UNAVAILABLE' | 'PENDING_INTEGRATION';
  period: StatisticsPeriod;
  startDate?: string;
  endDate?: string;
  totalRevenue: number | null;
  platformEarnings: number | null;
  totalProfit: number | null;
  totalOrders: number | null;
  completedOrders: number | null;
  cancelledOrders: number | null;
  transactionVolume: number | null;
  transactionValue: number | null;
  trendData: FinancialMetricPoint[] | null;
  lastUpdated?: string;
}
