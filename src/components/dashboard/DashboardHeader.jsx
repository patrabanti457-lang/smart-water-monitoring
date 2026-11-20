import { RefreshCw, Radio, Wifi, WifiOff } from 'lucide-react';
import StatusBadge from '@/components/core/StatusBadge';
import clsx from 'clsx';

export default function DashboardHeader({
  status = 'NORMAL',
  deviceId = 'DRAIN_001',
  lastUpdated,
  isDemo = false,
  onRefresh,
  loading = false,
}) {
  const formattedTime = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString()
    : 'Waiting for device...';

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/80">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight">
            Monitoring Dashboard
          </h1>
          <StatusBadge status={status} size="md" pulse={status !== 'NORMAL'} />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-text-secondary">
          <span className="text-text-muted">DEVICE ID:</span>
          <span className="text-cobalt-light font-bold px-2 py-0.5 rounded bg-navy-800 border border-border">
            {deviceId}
          </span>
          <span className="text-border">|</span>
          <span className="text-text-muted">UPLINK:</span>
          <span className="text-text-primary">SIM7600CE 4G</span>
          <span className="text-border">|</span>
          <span className="text-text-muted">LAST REPORT:</span>
          <span className="text-text-primary">{formattedTime}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isDemo ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>DEMO MODE (SIMULATED TELEMETRY)</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Wifi className="w-3.5 h-3.5" />
            <span>LIVE 4G LINK ACTIVE</span>
          </div>
        )}

        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-2 rounded-xl bg-surface border border-border hover:border-cobalt/50 text-text-secondary hover:text-text-primary transition-all duration-200 disabled:opacity-50"
            title="Refresh Readings"
          >
            <RefreshCw className={clsx('w-4 h-4', loading && 'animate-spin text-cobalt')} />
          </button>
        )}
      </div>
    </div>
  );
}
