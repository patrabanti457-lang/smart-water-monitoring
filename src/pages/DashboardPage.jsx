import { useState } from 'react';
import { useCurrentReadings, useReadingsHistory } from '@/hooks/useData';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WaterTanks from '@/components/dashboard/WaterTanks';
import ReadingsGrid from '@/components/dashboard/ReadingsGrid';
import WaterChart from '@/components/dashboard/WaterChart';
import FlowChart from '@/components/dashboard/FlowChart';
import AlertsFeed from '@/components/dashboard/AlertsFeed';
import SystemHealth from '@/components/dashboard/SystemHealth';
import ScenarioSelector from '@/components/dashboard/ScenarioSelector';

export default function DashboardPage() {
  const { reading, loading, isDemo, scenario, setScenario } = useCurrentReadings('DRAIN_001');
  const { history } = useReadingsHistory('DRAIN_001', 24);

  // Generate live/demo alerts based on status
  const currentStatus = reading?.status || 'NORMAL';
  const alertsList = [
    ...(currentStatus !== 'NORMAL'
      ? [
          {
            alert_id: 'live-alert-001',
            alert_type: currentStatus,
            severity: currentStatus === 'POSSIBLE_BLOCKAGE' || currentStatus === 'EMERGENCY' ? 'critical' : 'warning',
            description:
              currentStatus === 'POSSIBLE_BLOCKAGE'
                ? 'Elevated upstream depth detected with low downstream depth and low flow rate. Physical on-site inspection required to confirm blockage.'
                : currentStatus === 'HIGH_WATER'
                ? 'Water depth has reached or exceeded the 60cm threshold. Stormwater runoff accumulation detected.'
                : currentStatus === 'EMERGENCY'
                ? 'Float switch high-water mechanical alarm triggered at culvert entrance.'
                : 'Sensor telemetry fault: invalid transducer ADC reading detected.',
            device_id: 'DRAIN_001',
            timestamp: reading?.timestamp || new Date().toISOString(),
          },
        ]
      : []),
    {
      alert_id: 'hist-002',
      alert_type: 'HIGH_WATER_WARNING',
      severity: 'warning',
      description: 'Upstream level peaked at 64.2 cm following heavy rainfall runoff.',
      device_id: 'DRAIN_001',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      alert_id: 'hist-003',
      alert_type: 'POSSIBLE_BLOCKAGE',
      severity: 'critical',
      description: 'Transient blockage pattern resolved after debris cleared culvert grate.',
      device_id: 'DRAIN_001',
      timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
    },
  ];

  return (
    <div className="min-h-screen bg-navy-900 text-text-primary pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 space-y-6">
        {/* Header Bar */}
        <DashboardHeader
          status={reading?.status || 'NORMAL'}
          deviceId={reading?.device_id || 'DRAIN_001'}
          lastUpdated={reading?.timestamp}
          isDemo={isDemo}
          loading={loading}
        />

        {/* Scenario Simulator Selector (visible in demo mode) */}
        {isDemo && (
          <ScenarioSelector
            scenario={scenario}
            onScenarioChange={setScenario}
          />
        )}

        {/* Main Telemetry Grid (Readings) */}
        <ReadingsGrid reading={reading} />

        {/* 2-Column Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Visual Tank Simulation & Charts */}
          <div className="lg:col-span-8 space-y-6">
            <WaterTanks
              upstreamLevel={reading?.upstream_level}
              downstreamLevel={reading?.downstream_level}
              threshold={60}
              status={reading?.status}
            />

            <WaterChart data={history} />

            <FlowChart data={history} />
          </div>

          {/* Right Column: Infrastructure Health & Alerts Feed */}
          <div className="lg:col-span-4 space-y-6">
            <SystemHealth isDemo={isDemo} />

            <AlertsFeed alerts={alertsList} />
          </div>
        </div>
      </div>
    </div>
  );
}
