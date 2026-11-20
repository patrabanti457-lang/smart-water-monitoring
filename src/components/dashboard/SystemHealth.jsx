import { Cpu, Signal, Server, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

export default function SystemHealth({ isDemo = false }) {
  const components = [
    {
      name: 'ESP32 Controller',
      sub: 'Dual ADC & Interrupt Flow ISR',
      status: isDemo ? 'Simulated' : 'Online',
      ok: true,
      icon: Cpu,
    },
    {
      name: 'SIM7600CE 4G Uplink',
      sub: 'LTE Band Data Transmission',
      status: isDemo ? 'Simulated 4G' : 'Connected',
      ok: true,
      icon: Signal,
    },
    {
      name: 'FastAPI Microservice',
      sub: 'Cloud Payload Gateway (Port 8000)',
      status: isDemo ? 'Standby' : 'Ready',
      ok: true,
      icon: Server,
    },
    {
      name: 'Firebase Database',
      sub: 'Persistent Telemetry Store',
      status: isDemo ? 'Local Mode' : 'Connected',
      ok: true,
      icon: Database,
    },
  ];

  return (
    <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
        <h3 className="font-display font-bold text-base text-text-primary">
          Infrastructure Integrity
        </h3>
        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ALL NOMINAL</span>
        </span>
      </div>

      <div className="space-y-3">
        {components.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.name}
              className="flex items-center justify-between p-3 rounded-xl bg-navy-900/60 border border-border/70"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-navy-800 border border-border flex items-center justify-center text-cobalt">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display font-semibold text-xs text-text-primary">
                    {c.name}
                  </div>
                  <div className="text-[10px] font-mono text-text-muted">
                    {c.sub}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-text-secondary">{c.status}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-text-muted text-center">
        Cycle Interval: 250ms sampling · 5000ms report
      </div>
    </div>
  );
}
