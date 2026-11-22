import { Cpu, Signal, Server, Database, CheckCircle2, ShieldAlert, Activity, Wifi } from 'lucide-react';
import clsx from 'clsx';

export default function SystemPage() {
  const configs = [
    { key: 'HIGH_LEVEL_LIMIT', value: '60.0 cm', desc: 'Threshold for water surge warning alert' },
    { key: 'BLOCKAGE_LEVEL_DIFF', value: '15.0 cm', desc: 'Minimum upstream/downstream level divergence' },
    { key: 'LOW_FLOW_PULSE_HZ', value: '1.0 Hz (~2.0 L/min)', desc: 'Turbine pulse frequency blockage gate' },
    { key: 'SAMPLE_MS', value: '250 ms', desc: 'Continuous ADC sampling loop interval' },
    { key: 'REPORT_MS', value: '5000 ms', desc: 'Cellular 4G HTTP POST upload frequency' },
    { key: 'FLOW_WINDOW_MS', value: '1000 ms', desc: 'Sliding window for frequency calculation' },
  ];

  return (
    <div className="min-h-screen bg-deep-900 text-text-primary pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-border">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deep-800 border border-border text-xs font-mono text-teal-100 uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5" /> Hardware & Service Configuration
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
            System & Device Diagnostics
          </h1>
          <p className="text-text-secondary text-sm sm:text-base mt-1">
            Controller runtime parameters, cellular modem configuration, and cloud service endpoints
          </p>
        </div>

        {/* Device Identity Card */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <div className="text-xs font-mono text-text-muted uppercase">Registered Telemetry Unit</div>
              <div className="font-display font-bold text-2xl text-text-primary mt-1">
                DRAIN_001 <span className="text-xs font-mono text-teal-100 font-normal">(Primary Culvert Node)</span>
              </div>
              <div className="text-xs text-text-secondary mt-1">
                Firmware Build: v2.4.1-esp32-sim7600 · Location: Sector 4 North Main Canal
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> ONLINE & POLLING
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs font-mono">
            <div>
              <div className="text-text-muted mb-1">CONTROLLER</div>
              <div className="text-text-primary font-bold">ESP32 DevKit (Dual Core)</div>
            </div>
            <div>
              <div className="text-text-muted mb-1">CELLULAR MODEM</div>
              <div className="text-text-primary font-bold">SIM7600CE 4G LTE</div>
            </div>
            <div>
              <div className="text-text-muted mb-1">TRANSMISSION</div>
              <div className="text-text-primary font-bold">HTTP POST / JSON</div>
            </div>
            <div>
              <div className="text-text-muted mb-1">POWER SUPPLY</div>
              <div className="text-text-primary font-bold">Regulated 5V 2.5A Surge Cap</div>
            </div>
          </div>
        </div>

        {/* Calibrated Firmware Thresholds */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
          <h3 className="font-display font-bold text-lg text-text-primary mb-2">
            Active Calibrated Thresholds (From Firmware Parameters)
          </h3>
          <p className="text-xs text-text-secondary mb-6">
            Exact matching constants from <code>code.txt</code> firmware rules engine
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {configs.map((c) => (
              <div key={c.key} className="p-4 rounded-xl bg-deep-800 border border-border">
                <div className="font-mono text-xs text-teal-100 font-bold mb-1">{c.key}</div>
                <div className="font-mono text-lg font-bold text-text-primary">{c.value}</div>
                <div className="text-[11px] text-text-muted mt-1 leading-snug">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cloud Architecture Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface border border-border rounded-xl p-5">
            <Cpu className="w-6 h-6 text-teal-400 mb-3" />
            <div className="font-display font-bold text-base text-text-primary">ESP32 Core</div>
            <div className="text-xs text-text-secondary mt-1">Non-blocking millis() sensing & threshold evaluation</div>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <Signal className="w-6 h-6 text-teal-400 mb-3" />
            <div className="font-display font-bold text-base text-text-primary">SIM7600CE 4G</div>
            <div className="text-xs text-text-secondary mt-1">High-speed cellular uplink for field locations</div>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <Server className="w-6 h-6 text-teal-400 mb-3" />
            <div className="font-display font-bold text-base text-text-primary">FastAPI Gateway</div>
            <div className="text-xs text-text-secondary mt-1">Port 8000 validation & alert orchestration</div>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <Database className="w-6 h-6 text-teal-400 mb-3" />
            <div className="font-display font-bold text-base text-text-primary">Firebase Cloud</div>
            <div className="text-xs text-text-secondary mt-1">Realtime and persistent historical telemetry</div>
          </div>
        </div>
      </div>
    </div>
  );
}
