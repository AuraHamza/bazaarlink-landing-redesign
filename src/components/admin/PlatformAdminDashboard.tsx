import React, { useState, useEffect } from 'react';
import { HeaderNavbar } from './HeaderNavbar';
import { TelemetryMetricsGrid } from './TelemetryMetricsGrid';
import { CommandCenter } from './CommandCenter';
import { RegionalHubsList } from './RegionalHubsList';
import { ActiveMarketsFeed } from './ActiveMarketsFeed';
import { PersonnelDirectory } from './PersonnelDirectory';

import { RegisterHubModal } from './modals/RegisterHubModal';
import { RegisterMarketModal } from './modals/RegisterMarketModal';
import { RegisterAdminModal } from './modals/RegisterAdminModal';
import { EditMarketModal } from './modals/EditMarketModal';
import { ConfirmActionModal } from './modals/ConfirmActionModal';

import { platformAdminApi } from '../../services/platformAdminApi';
import { RegionalHub, PlatformPersonnel, SystemHealthData, PlatformMetrics } from '../../types/platformAdmin';
import { Market } from '../../types/market';

interface PlatformAdminDashboardProps {
  onNavigateToPublic: () => void;
  onLogout: () => void;
  onOpenShopModal?: (market: Market) => void;
  onViewOnMap?: (market: Market) => void;
}

export const PlatformAdminDashboard: React.FC<PlatformAdminDashboardProps> = ({
  onNavigateToPublic,
  onLogout,
}) => {
  // Core Backend Data
  const [metrics, setMetrics] = useState<PlatformMetrics>({
    totalHubs: 1,
    activeMarkets: 5,
    totalMarkets: 6,
    verifiedAdmins: 4,
    totalShops: 87,
    totalPersonnel: 6,
    pendingApprovals: 0,
  });

  const [health, setHealth] = useState<SystemHealthData>({
    status: 'ALL SYSTEMS NOMINAL',
    database: 'CONNECTED',
    databaseEngine: 'PostgreSQL 16.2',
    latencyMs: 14,
    uptimeSeconds: 124800,
    lastHealthCheck: new Date().toLocaleTimeString(),
    activeConnections: 8,
    apiEndpointsActive: 24,
    services: [],
  });

  const [hubs, setHubs] = useState<RegionalHub[]>([]);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [personnel, setPersonnel] = useState<PlatformPersonnel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isRegisterHubOpen, setIsRegisterHubOpen] = useState(false);
  const [isRegisterMarketOpen, setIsRegisterMarketOpen] = useState(false);
  const [isRegisterAdminOpen, setIsRegisterAdminOpen] = useState(false);
  const [editingMarket, setEditingMarket] = useState<Market | null>(null);
  const [deletingMarket, setDeletingMarket] = useState<Market | null>(null);

  // Single Platform Admin
  const currentAdmin: PlatformPersonnel = personnel.find((p) => p.role === 'PLATFORM_ADMIN') || {
    id: 'USR-ADM-001',
    name: 'Dr. Zeeshan Haider',
    email: 'admin@bazaarlink.pk',
    phone: '+92 300 8291001',
    role: 'PLATFORM_ADMIN',
    assignedMarketId: null,
    assignedMarketName: null,
    status: 'ACTIVE',
    joinedDate: '2024-01-01',
    lastActive: 'Active now',
  };

  // Refresh All Data from Backend
  const refreshAllData = async () => {
    try {
      const [hubsData, marketsData, personnelData, metricsData, healthData] = await Promise.all([
        platformAdminApi.getRegionalHubs(),
        platformAdminApi.getMarkets(),
        platformAdminApi.getPersonnel(),
        platformAdminApi.getPlatformMetrics(),
        platformAdminApi.getSystemHealth(),
      ]);

      setHubs(hubsData);
      setMarkets(marketsData);
      setPersonnel(personnelData);
      setMetrics(metricsData);
      setHealth(healthData);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to load platform admin data', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAllData();
    const unsubscribe = platformAdminApi.subscribe(() => {
      refreshAllData();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggleMarketStatus = async (market: Market) => {
    try {
      if (market.status === 'active') {
        await platformAdminApi.deactivateMarket(market.id);
      } else {
        await platformAdminApi.activateMarket(market.id);
      }
      refreshAllData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleConfirmDeleteMarket = async () => {
    if (!deletingMarket) return;
    try {
      await platformAdminApi.deleteMarket(deletingMarket.id);
      setDeletingMarket(null);
      refreshAllData();
    } catch (e) {
      console.error(e);
    }
  };

  const activeMarketsCount = markets.filter((m) => m.status === 'active').length;
  const verifiedMarketAdminsCount = personnel.filter(
    (p) => p.role === 'MARKET_ADMIN' && p.status === 'ACTIVE'
  ).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      {/* 1. Header Navbar */}
      <HeaderNavbar
        currentAdmin={currentAdmin}
        onNavigateToPublic={onNavigateToPublic}
        onLogout={onLogout}
        systemStatusText={health.status}
        systemStatusOnline={health.database === 'CONNECTED'}
      />

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* 2. Telemetry Metrics Grid */}
          <TelemetryMetricsGrid
            totalHubs={hubs.length || metrics.totalHubs}
            activeMarkets={activeMarketsCount}
            totalMarkets={markets.length}
            verifiedAdmins={verifiedMarketAdminsCount}
          />

          {/* 3. Command Center */}
          <CommandCenter
            onOpenRegisterHub={() => setIsRegisterHubOpen(true)}
            onOpenRegisterMarket={() => setIsRegisterMarketOpen(true)}
            onOpenRegisterAdmin={() => setIsRegisterAdminOpen(true)}
          />

          {/* 4. Regional Hubs List */}
          <RegionalHubsList
            hubs={hubs}
            markets={markets}
          />

          {/* 5. Active Markets Feed */}
          <ActiveMarketsFeed
            markets={markets}
            onOpenEditMarket={(m) => setEditingMarket(m)}
            onOpenDeleteMarket={(m) => setDeletingMarket(m)}
            onToggleMarketStatus={handleToggleMarketStatus}
          />

          {/* 6. Personnel Directory */}
          <PersonnelDirectory
            personnel={personnel}
          />
        </div>
      </main>

      {/* Modals for Command Center & Market Management */}
      <RegisterHubModal
        isOpen={isRegisterHubOpen}
        onClose={() => setIsRegisterHubOpen(false)}
        onSuccess={refreshAllData}
      />

      <RegisterMarketModal
        isOpen={isRegisterMarketOpen}
        onClose={() => setIsRegisterMarketOpen(false)}
        onSuccess={refreshAllData}
        hubs={hubs}
        admins={personnel}
      />

      <RegisterAdminModal
        isOpen={isRegisterAdminOpen}
        onClose={() => setIsRegisterAdminOpen(false)}
        onSuccess={refreshAllData}
      />

      <EditMarketModal
        market={editingMarket}
        isOpen={editingMarket !== null}
        onClose={() => setEditingMarket(null)}
        onSuccess={refreshAllData}
        admins={personnel}
      />

      <ConfirmActionModal
        isOpen={deletingMarket !== null}
        title="Delete Market"
        message={`Are you sure you want to delete ${deletingMarket?.name}? This will remove the market record from the platform.`}
        confirmLabel="Delete Market"
        confirmVariant="danger"
        onConfirm={handleConfirmDeleteMarket}
        onClose={() => setDeletingMarket(null)}
      />
    </div>
  );
};
