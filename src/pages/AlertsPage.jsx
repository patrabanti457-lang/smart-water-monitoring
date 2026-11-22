import { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Info,
  Droplets,
  Gauge,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import StatusBadge from '@/components/core/StatusBadge';
import clsx from 'clsx';

const INITIAL_ALERTS = [
  {
    id: 'ALT-1092',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    device_id: 'DRAIN_001',
    alert_type: 'POSSIBLE_BLOCKAGE',
    severity: 'critical',
    status: 'ACTIVE',
    acknowledged: false,
    upstream_level: 79.4,
    downstream_level: 28.1,
    flow_rate: 0.7,
    description:
      'Elevated differential detected: Upstream is 79.4cm, Downstream is 28.1cm, Flow dropped to 0.7 L/min. Prompt field inspection required to verify obstruction.',
    zone: 'Sector 4 North Culvert',
  },
  {
    id: 'ALT-1091',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    device_id: 'DRAIN_001',
    alert_type: 'HIGH_WATER',
    severity: 'warning',
    status: 'ACTIVE',
    acknowledged: true,
    upstream_level: 68.2,
    downstream_level: 64.0,
    flow_rate: 8.4,
    description:
      'Water depth exceeded 60cm threshold. General stormwater surge observed across upstream and downstream segments.',
    zone: 'Sector 4 North Culvert',
  },
  {
    id: 'ALT-1090',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    device_id: 'DRAIN_001',
    alert_type: 'LOW_FLOW',
    severity: 'warning',
    status: 'RESOLVED',
    acknowledged: true,
    upstream_level: 42.0,
    downstream_level: 39.5,
    flow_rate: 1.1,
    description:
      'Abnormal reduction in flow velocity detected during normal baseline depth conditions.',
    zone: 'Sector 4 North Culvert',
  },
  {
    id: 'ALT-1089',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    device_id: 'DRAIN_001',
    alert_type: 'EMERGENCY',
    severity: 'critical',
    status: 'RESOLVED',
    acknowledged: true,
    upstream_level: 84.5,
    downstream_level: 81.0,
    flow_rate: 11.2,
    description:
      'Auxiliary mechanical float switch closed, confirming secondary high-limit flood hazard condition.',
    zone: 'Sector 4 North Culvert',
  },
  {
    id: 'ALT-1088',
    timestamp: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
    device_id: 'DRAIN_001',
    alert_type: 'SENSOR_FAULT',
    severity: 'warning',
    status: 'RESOLVED',
    acknowledged: true,
    upstream_level: null,
    downstream_level: 24.3,
    flow_rate: 5.1,
    description:
      'Upstream ADC returned out-of-range value (outside 40–4055 ADC bounds). Automatic transducer check executed.',
    zone: 'Sector 4 North Culvert',
  },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAcknowledge = (id) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const filteredAlerts = useMemo(() => {
    return alerts.filter((a) => {
      const matchesSeverity =
        filterSeverity === 'ALL' ||
        (filterSeverity === 'CRITICAL' && a.severity === 'critical') ||
        (filterSeverity === 'WARNING' && a.severity === 'warning') ||
        (filterSeverity === 'BLOCKAGE' && a.alert_type === 'POSSIBLE_BLOCKAGE') ||
        (filterSeverity === 'UNACKNOWLEDGED' && !a.acknowledged);

      const matchesSearch =
        a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.alert_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSeverity && matchesSearch;
    });
  }, [alerts, filterSeverity, searchQuery]);

  const stats = {
    total: alerts.length,
    critical: alerts.filter((a) => a.severity === 'critical').length,
    active: alerts.filter((a) => a.status === 'ACTIVE').length,
    unacknowledged: alerts.filter((a) => !a.acknowledged).length,
  };

  return (
    <div className="min-h-screen bg-deep-900 text-text-primary pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 space-y-8">
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-alert-red/10 border border-alert-red/30 text-xs font-mono text-alert-red uppercase tracking-wider mb-2">
              <ShieldAlert className="w-3.5 h-3.5" /> Incident Management
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
              Operational Alerts Console
            </h1>
            <p className="text-text-secondary text-sm sm:text-base mt-1">
              Field notification dispatch, differential telemetry triggers, and crew acknowledgment
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <span>MANDATORY PROTOCOL:</span>
            <span className="text-text-primary px-2.5 py-1 rounded bg-deep-800 border border-border">
              Inspection Confirms Blockage
            </span>
          </div>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface border border-border rounded-xl p-4">
            <div className="text-xs font-mono text-text-muted uppercase">Total Incidents</div>
            <div className="font-display font-bold text-2xl text-text-primary mt-1">{stats.total}</div>
          </div>
          <div className="bg-surface border border-alert-red/40 rounded-xl p-4">
            <div className="text-xs font-mono text-alert-red uppercase">Critical Severity</div>
            <div className="font-display font-bold text-2xl text-alert-red mt-1">{stats.critical}</div>
          </div>
          <div className="bg-surface border border-teal-400/40 rounded-xl p-4">
            <div className="text-xs font-mono text-teal-100 uppercase">Active Conditions</div>
            <div className="font-display font-bold text-2xl text-teal-100 mt-1">{stats.active}</div>
          </div>
          <div className="bg-surface border border-amber-500/40 rounded-xl p-4">
            <div className="text-xs font-mono text-amber-400 uppercase">Awaiting Acknowledgment</div>
            <div className="font-display font-bold text-2xl text-amber-400 mt-1">{stats.unacknowledged}</div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-surface border border-border">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL', label: 'All Alerts' },
              { id: 'BLOCKAGE', label: 'Possible Blockage' },
              { id: 'CRITICAL', label: 'Critical' },
              { id: 'WARNING', label: 'Warning' },
              { id: 'UNACKNOWLEDGED', label: 'Pending Ack' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterSeverity(f.id)}
                className={clsx(
                  'px-3.5 py-1.5 rounded-xl text-xs font-mono transition-colors',
                  filterSeverity === f.id
                    ? 'bg-teal-400 text-text-primary font-bold shadow-sm shadow-teal-400/30'
                    : 'bg-deep-800 text-text-secondary hover:text-text-primary border border-border'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search description, device, or ID..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-deep-800 border border-border text-xs font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-teal-400"
            />
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="bg-surface rounded-2xl border border-border p-12 text-center text-text-muted font-mono text-sm">
              No matching alerts found for selected criteria.
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const isCritical = alert.severity === 'critical';
              const isBlockage = alert.alert_type === 'POSSIBLE_BLOCKAGE';

              return (
                <div
                  key={alert.id}
                  className={clsx(
                    'bg-surface rounded-2xl border p-5 sm:p-6 transition-all duration-200 relative overflow-hidden',
                    isBlockage
                      ? 'border-alert-red/60 shadow-lg shadow-alert-red/5'
                      : isCritical
                      ? 'border-alert-red/40'
                      : 'border-border hover:border-teal-400/40'
                  )}
                >
                  {/* Left severity indicator bar */}
                  <div
                    className={clsx(
                      'absolute left-0 top-0 bottom-0 w-1.5',
                      isCritical ? 'bg-alert-red' : 'bg-amber-400'
                    )}
                  />

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pl-3">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="font-bold text-text-primary">{alert.id}</span>
                        <span className="text-border">·</span>
                        <span
                          className={clsx(
                            'px-2 py-0.5 rounded font-bold uppercase',
                            isBlockage
                              ? 'bg-alert-red text-text-primary'
                              : isCritical
                              ? 'bg-alert-red/20 text-alert-red'
                              : 'bg-amber-500/20 text-amber-400'
                          )}
                        >
                          {alert.alert_type.replace(/_/g, ' ')}
                        </span>
                        <span className="text-border">·</span>
                        <span className="text-text-muted flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(alert.timestamp).toLocaleString()}
                        </span>
                        <span className="text-border">·</span>
                        <span className="text-text-muted">{alert.zone}</span>
                      </div>

                      <p className="text-sm sm:text-base text-text-primary leading-relaxed font-sans">
                        {alert.description}
                      </p>

                      {/* Associated telemetry readings badge list */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted pt-1">
                        <div className="flex items-center gap-1.5">
                          <Droplets className="w-3.5 h-3.5 text-teal-400" />
                          <span>Upstream: <strong className="text-text-primary">{alert.upstream_level !== null ? `${alert.upstream_level}cm` : 'N/A'}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Droplets className="w-3.5 h-3.5 text-amber-400" />
                          <span>Downstream: <strong className="text-text-primary">{alert.downstream_level}cm</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Gauge className="w-3.5 h-3.5 text-teal-100" />
                          <span>Flow: <strong className="text-text-primary">{alert.flow_rate} L/min</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Right Action buttons */}
                    <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
                      {alert.acknowledged ? (
                        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Acknowledged</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAcknowledge(alert.id)}
                          className="px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-text-primary text-xs font-mono font-semibold transition-colors shadow-sm shadow-teal-400/20"
                        >
                          Acknowledge Dispatch
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
