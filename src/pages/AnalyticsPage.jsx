import { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { BarChart3, TrendingUp, Calendar, Download, Droplets, Gauge, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

// Simulated 7-day historical dataset for analytics
const ANALYTICS_DATA = [
  { day: 'Mon', avgUpstream: 32.1, avgDownstream: 30.4, maxUpstream: 58.2, avgFlow: 9.2, alerts: 0 },
  { day: 'Tue', avgUpstream: 44.5, avgDownstream: 42.0, maxUpstream: 64.1, avgFlow: 8.8, alerts: 1 },
  { day: 'Wed', avgUpstream: 68.3, avgDownstream: 31.2, maxUpstream: 82.0, avgFlow: 1.4, alerts: 3 }, // Blockage surge day
  { day: 'Thu', avgUpstream: 35.0, avgDownstream: 33.5, maxUpstream: 52.0, avgFlow: 7.9, alerts: 0 },
  { day: 'Fri', avgUpstream: 28.2, avgDownstream: 27.0, maxUpstream: 44.5, avgFlow: 9.5, alerts: 0 },
  { day: 'Sat', avgUpstream: 51.0, avgDownstream: 49.2, maxUpstream: 71.0, avgFlow: 8.1, alerts: 1 },
  { day: 'Sun', avgUpstream: 38.6, avgDownstream: 36.8, maxUpstream: 55.0, avgFlow: 8.9, alerts: 0 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('7d');

  return (
    <div className="min-h-screen bg-deep-900 text-text-primary pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/30 text-xs font-mono text-teal-100 uppercase tracking-wider mb-2">
              <BarChart3 className="w-3.5 h-3.5" /> Historical Intelligence
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
              Hydrological Analytics
            </h1>
            <p className="text-text-secondary text-sm sm:text-base mt-1">
              Multi-day trend analysis, blockage correlation, and flow volume metrics
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-surface border border-border text-xs font-mono">
              {['24h', '7d', '30d', '90d'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={clsx(
                    'px-3 py-1.5 rounded-lg transition-colors',
                    period === p
                      ? 'bg-teal-400 text-text-primary font-bold'
                      : 'text-text-muted hover:text-text-primary'
                  )}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              disabled
              title="Telemetry Export (CSV/JSON) Available on Production Link"
              className="px-3.5 py-1.5 rounded-xl bg-surface border border-border text-text-muted text-xs font-mono flex items-center gap-1.5 opacity-60 cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface border border-border rounded-xl p-5">
            <div className="text-xs font-mono text-text-muted uppercase">Avg Upstream Level</div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-text-primary mt-1">
              42.5 <span className="text-xs font-mono text-text-secondary font-normal">cm</span>
            </div>
            <div className="text-[11px] font-mono text-text-muted mt-2">Baseline depth</div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5">
            <div className="text-xs font-mono text-text-muted uppercase">Avg Downstream Level</div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-text-primary mt-1">
              35.7 <span className="text-xs font-mono text-text-secondary font-normal">cm</span>
            </div>
            <div className="text-[11px] font-mono text-text-muted mt-2">Mean outflow depth</div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5">
            <div className="text-xs font-mono text-text-muted uppercase">Avg Flow Velocity</div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-text-primary mt-1">
              7.7 <span className="text-xs font-mono text-text-secondary font-normal">L/min</span>
            </div>
            <div className="text-[11px] font-mono text-text-muted mt-2">Turbine pulse average</div>
          </div>

          <div className="bg-surface border border-alert-red/30 rounded-xl p-5">
            <div className="text-xs font-mono text-alert-red uppercase">Blockage Incidents</div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-alert-red mt-1">
              5 <span className="text-xs font-mono text-text-secondary font-normal">events</span>
            </div>
            <div className="text-[11px] font-mono text-text-muted mt-2">All dispatched & cleared</div>
          </div>
        </div>

        {/* Chart 1: Daily Comparison Bar Chart */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="font-display font-bold text-lg text-text-primary">
                Daily Mean Level Comparison (Upstream vs Downstream)
              </h3>
              <p className="text-xs text-text-secondary">
                Highlights Wednesday anomaly where upstream spiked while downstream remained restricted
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2942" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} tickFormatter={(v) => `${v}cm`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111A2E', borderColor: '#27344D', borderRadius: '12px' }}
                />
                <Legend />
                <Bar dataKey="avgUpstream" name="Upstream Level (cm)" fill="#5B91A3" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avgDownstream" name="Downstream Level (cm)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Flow Rate vs Alert Correlation */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
          <div className="mb-6">
            <h3 className="font-display font-bold text-lg text-text-primary">
              Flow Rate Correlation with Blockage Incidents
            </h3>
            <p className="text-xs text-text-secondary">
              Direct inverse relationship: flow velocity crashes during suspected culvert obstructions
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="flowAnaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B91A3" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#5B91A3" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2942" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} tickFormatter={(v) => `${v}L`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111A2E', borderColor: '#27344D', borderRadius: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="avgFlow"
                  name="Mean Flow Rate (L/min)"
                  stroke="#5B91A3"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#flowAnaGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
