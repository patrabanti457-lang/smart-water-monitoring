import clsx from 'clsx';

export default function ScenarioSelector({ scenario, onScenarioChange }) {
  const scenarios = [
    { key: 'normal', label: 'Normal Flow', desc: 'Standard operating level' },
    { key: 'high_water', label: 'High Water Surge', desc: 'Above 60cm threshold' },
    { key: 'possible_blockage', label: 'Possible Blockage', desc: 'High upstream + low downstream + low flow' },
    { key: 'emergency', label: 'Float Switch Alarm', desc: 'Physical high-limit switch' },
    { key: 'sensor_fault', label: 'Sensor Error', desc: 'ADC transducer disconnected' },
  ];

  return (
    <div className="bg-surface rounded-2xl border border-border p-5 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
            Telemetry Simulation Sandbox
          </span>
          <div className="font-display font-bold text-sm text-text-primary">
            Trigger Field Scenarios
          </div>
        </div>
        <span className="text-[10px] font-mono text-text-muted">
          Active: {scenario.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {scenarios.map((s) => {
          const isActive = scenario === s.key;
          const isCritical = s.key === 'possible_blockage' || s.key === 'emergency';

          return (
            <button
              key={s.key}
              onClick={() => onScenarioChange(s.key)}
              className={clsx(
                'p-3 rounded-xl border text-left transition-all duration-200 relative',
                isActive
                  ? isCritical
                    ? 'bg-alert-red text-text-primary border-alert-red shadow-lg shadow-alert-red/20'
                    : 'bg-cobalt text-text-primary border-cobalt shadow-lg shadow-cobalt/20'
                  : 'bg-navy-900/60 border-border text-text-secondary hover:text-text-primary hover:border-cobalt/40'
              )}
            >
              <div className="font-display font-semibold text-xs mb-0.5">
                {s.label}
              </div>
              <div
                className={clsx(
                  'text-[10px] leading-tight line-clamp-2',
                  isActive ? 'text-white/80' : 'text-text-muted'
                )}
              >
                {s.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
