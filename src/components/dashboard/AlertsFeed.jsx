import { Link } from 'react-router-dom';
import { AlertCircle, Clock, ArrowRight, ShieldAlert } from 'lucide-react';
import clsx from 'clsx';

export default function AlertsFeed({ alerts = [] }) {
  const displayAlerts = alerts.slice(0, 5);

  return (
    <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-alert-red" />
          <h3 className="font-display font-bold text-base text-text-primary">
            Operational Alerts Feed
          </h3>
        </div>
        <span className="text-xs font-mono text-text-muted px-2 py-0.5 rounded bg-navy-900 border border-border">
          {alerts.length} Total
        </span>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar max-h-72">
        {displayAlerts.length === 0 ? (
          <div className="py-8 text-center text-text-muted text-xs font-mono">
            No active alerts detected. All thresholds within normal tolerance.
          </div>
        ) : (
          displayAlerts.map((a, i) => {
            const isCritical = a.severity === 'critical' || a.alert_type === 'POSSIBLE_BLOCKAGE';

            return (
              <div
                key={a.alert_id || i}
                className={clsx(
                  'p-3.5 rounded-xl border text-xs font-mono transition-all',
                  isCritical
                    ? 'bg-alert-red/10 border-alert-red/40 text-text-primary'
                    : 'bg-navy-900/60 border-border text-text-secondary'
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={clsx(
                      'font-bold px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider',
                      isCritical ? 'bg-alert-red text-text-primary' : 'bg-navy-700 text-cobalt-light'
                    )}
                  >
                    {a.alert_type}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-text-muted">
                    <Clock className="w-3 h-3" />
                    <span>{a.timestamp ? new Date(a.timestamp).toLocaleTimeString() : 'Recent'}</span>
                  </div>
                </div>

                <p className="text-xs text-text-primary font-sans leading-relaxed mb-2">
                  {a.description}
                </p>

                <div className="flex items-center justify-between text-[10px] text-text-muted pt-1.5 border-t border-border/50">
                  <span>Device: {a.device_id || 'DRAIN_001'}</span>
                  <span className={clsx('font-bold', isCritical ? 'text-alert-red' : 'text-text-secondary')}>
                    {a.severity?.toUpperCase() || 'WARNING'}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="pt-4 border-t border-border mt-4">
        <Link
          to="/alerts"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 border border-border text-xs font-mono text-text-primary hover:text-cobalt-light transition-colors"
        >
          <span>Open Full Alerts Console</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
