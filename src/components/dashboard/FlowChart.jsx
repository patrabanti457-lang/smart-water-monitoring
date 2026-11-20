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

export default function FlowChart({ data = [] }) {
  const chartData = data.map((d) => ({
    ...d,
    time: d.timestamp ? new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-navy-800 border border-border p-3 rounded-xl shadow-xl font-mono text-xs">
          <div className="text-text-muted mb-1">{label}</div>
          <div className="text-cobalt-light font-bold">
            Flow Rate: {payload[0]?.value?.toFixed(1) ?? '—'} L/min
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-lg text-text-primary">
            Flow Rate Velocity Trend
          </h3>
          <p className="text-xs text-text-secondary">
            Interrupt pulse frequency translated to L/min
          </p>
        </div>

        <div className="text-xs font-mono text-text-muted px-2.5 py-1 rounded-lg bg-navy-900 border border-border">
          Gate Limit: 2.0 L/min
        </div>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
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
              domain={[0, 15]}
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#27344D' }}
              tickFormatter={(v) => `${v}L`}
            />
            <Tooltip content={<CustomTooltip />} />

            <ReferenceLine
              y={2.0}
              stroke="#EF4444"
              strokeDasharray="4 4"
              label={{
                value: 'Min Flow 2L',
                fill: '#EF4444',
                fontSize: 10,
                position: 'insideTopRight',
              }}
            />

            <Area
              type="monotone"
              dataKey="flow_rate"
              name="Flow Rate"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#flowGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
