import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import clsx from 'clsx';

export default function WaterChart({ data = [] }) {
  const [timeFilter, setTimeFilter] = useState('1h');

  // Format timestamp for display
  const chartData = data.map((d) => ({
    ...d,
    time: d.timestamp ? new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-navy-800 border border-border p-3 rounded-xl shadow-xl font-mono text-xs">
          <div className="text-text-muted mb-1.5">{label}</div>
          <div className="flex items-center gap-2 text-cobalt-light font-bold">
            <div className="w-2 h-2 rounded-full bg-cobalt" />
            <span>Upstream: {payload[0]?.value?.toFixed(1) ?? '—'} cm</span>
          </div>
          <div className="flex items-center gap-2 text-amber-400 font-bold mt-1">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Downstream: {payload[1]?.value?.toFixed(1) ?? '—'} cm</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="font-display font-bold text-lg text-text-primary">
            Water Depth Historical Trend
          </h3>
          <p className="text-xs text-text-secondary">
            Comparative upstream vs downstream levels (0–100 cm range)
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-navy-900 border border-border text-xs font-mono">
          {['15m', '1h', '6h', '24h'].map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={clsx(
                'px-2.5 py-1 rounded-lg transition-colors',
                timeFilter === filter
                  ? 'bg-cobalt text-text-primary font-bold'
                  : 'text-text-muted hover:text-text-primary'
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="upstreamGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="downstreamGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1C2942" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#27344D' }}
            />
            <YAxis
              domain={[0, 100]}
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#27344D' }}
              tickFormatter={(v) => `${v}cm`}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Threshold Reference Line */}
            <ReferenceLine
              y={60}
              stroke="#EF4444"
              strokeDasharray="4 4"
              label={{
                value: 'Limit 60cm',
                fill: '#EF4444',
                fontSize: 10,
                position: 'insideTopRight',
              }}
            />

            <Area
              type="monotone"
              dataKey="upstream_level"
              name="Upstream"
              stroke="#2563EB"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#upstreamGradient)"
            />
            <Area
              type="monotone"
              dataKey="downstream_level"
              name="Downstream"
              stroke="#F59E0B"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#downstreamGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-text-muted mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-cobalt" />
            <span>Upstream Level</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Downstream Level</span>
          </div>
        </div>
        <div>Continuous Telemetry Log</div>
      </div>
    </div>
  );
}
