import { Activity, Gauge, Droplets, AlertTriangle, ArrowUpDown, Shield } from 'lucide-react';
import AnimatedNumber from '@/components/core/AnimatedNumber';
import clsx from 'clsx';

export default function ReadingsGrid({ reading }) {
  const upstream = reading?.upstream_level;
  const downstream = reading?.downstream_level;
  const flow = reading?.flow_rate;
  const floatSwitch = reading?.float_switch;
  const status = reading?.status || 'NORMAL';

  const diff = upstream !== null && downstream !== null && upstream !== undefined && downstream !== undefined
    ? parseFloat((upstream - downstream).toFixed(1))
    : null;

  const cards = [
    {
      label: 'Upstream Level',
      value: upstream,
      unit: 'cm',
      sub: 'Inlet ultrasonic transducer',
      icon: Droplets,
      isWarning: upstream !== null && upstream >= 60,
    },
    {
      label: 'Downstream Level',
      value: downstream,
      unit: 'cm',
      sub: 'Outlet ultrasonic transducer',
      icon: Droplets,
      isWarning: downstream !== null && downstream >= 60,
    },
    {
      label: 'Level Difference (Δ)',
      value: diff,
      unit: 'cm',
      sub: 'Blockage differential factor',
      icon: ArrowUpDown,
      isWarning: diff !== null && diff >= 15,
    },
    {
      label: 'Water Flow Rate',
      value: flow,
      unit: 'L/min',
      sub: 'Turbine pulse frequency ISR',
      icon: Gauge,
      isWarning: flow !== null && flow < 2 && upstream >= 60,
    },
    {
      label: 'Float Switch Condition',
      valueText: floatSwitch ? 'SURGE ACTIVE' : 'NORMAL (DISARMED)',
      sub: 'Physical high-limit sensor',
      icon: Shield,
      isWarning: Boolean(floatSwitch),
    },
    {
      label: 'System Status',
      valueText: status.replace(/_/g, ' '),
      sub: 'ESP32 edge evaluation',
      icon: Activity,
      isWarning: status !== 'NORMAL',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.label}
            className={clsx(
              'bg-surface border rounded-xl p-4 transition-all duration-300 relative overflow-hidden',
              c.isWarning ? 'border-alert-red/50 shadow-sm shadow-alert-red/10' : 'border-border'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider truncate">
                {c.label}
              </span>
              <Icon
                className={clsx(
                  'w-4 h-4 shrink-0',
                  c.isWarning ? 'text-alert-red' : 'text-cobalt-light'
                )}
              />
            </div>

            <div className="my-1">
              {c.value !== undefined ? (
                <div className="flex items-baseline gap-1">
                  <AnimatedNumber
                    value={c.value}
                    decimals={1}
                    className={clsx(
                      'text-xl sm:text-2xl font-bold font-mono tracking-tight',
                      c.isWarning ? 'text-alert-red' : 'text-text-primary'
                    )}
                  />
                  {c.unit && (
                    <span className="text-xs font-mono text-text-secondary">{c.unit}</span>
                  )}
                </div>
              ) : (
                <div
                  className={clsx(
                    'text-sm sm:text-base font-bold font-mono tracking-tight truncate',
                    c.isWarning ? 'text-alert-red' : 'text-text-primary'
                  )}
                >
                  {c.valueText}
                </div>
              )}
            </div>

            <div className="text-[10px] text-text-muted truncate mt-1">
              {c.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
}
