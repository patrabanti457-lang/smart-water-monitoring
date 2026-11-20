import { motion } from 'framer-motion';
import { AlertCircle, Waves, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import AnimatedNumber from '@/components/core/AnimatedNumber';
import clsx from 'clsx';

export default function WaterTanks({
  upstreamLevel = 0,
  downstreamLevel = 0,
  threshold = 60,
  status = 'NORMAL',
}) {
  const isUpstreamCritical = upstreamLevel >= threshold;
  const isDownstreamCritical = downstreamLevel >= threshold;
  const isBlockage = status === 'POSSIBLE_BLOCKAGE';

  const clampedUpstream = Math.max(0, Math.min(100, upstreamLevel ?? 0));
  const clampedDownstream = Math.max(0, Math.min(100, downstreamLevel ?? 0));
  const difference = (upstreamLevel ?? 0) - (downstreamLevel ?? 0);

  return (
    <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="font-display font-bold text-lg text-text-primary">
            Dual-Chamber Water Level Elevation
          </h2>
          <p className="text-xs text-text-secondary">
            Comparative hydrological cross-section with calibrated 60cm threshold
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-text-secondary">
            <div className="w-3 h-0.5 bg-alert-red border-t border-dashed" />
            <span>Threshold (60 cm)</span>
          </div>
          <div className="text-text-muted">
            Delta: <span className={clsx('font-bold', isBlockage ? 'text-alert-red' : 'text-cobalt-light')}>{difference.toFixed(1)} cm</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        {/* Upstream Tank */}
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-text-secondary font-semibold">UPSTREAM SENSOR</span>
            <span className={clsx('font-bold', isUpstreamCritical ? 'text-alert-red' : 'text-text-primary')}>
              {upstreamLevel !== null ? `${upstreamLevel.toFixed(1)} cm` : 'NO DATA'}
            </span>
          </div>

          <div className="w-full h-56 sm:h-64 rounded-2xl border border-border bg-navy-950 relative overflow-hidden flex flex-col justify-end p-2 shadow-inner">
            {/* Background calibration tick marks */}
            <div className="absolute inset-y-0 left-2 flex flex-col justify-between py-2 text-[10px] font-mono text-text-muted select-none pointer-events-none opacity-40">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            {/* Threshold dashed line */}
            <div
              className="absolute left-0 right-0 border-t-2 border-dashed border-alert-red/70 z-20 pointer-events-none"
              style={{ bottom: `${threshold}%` }}
            >
              <span className="absolute right-2 -top-4 text-[10px] font-mono text-alert-red bg-navy-950/80 px-1 rounded">
                60 cm
              </span>
            </div>

            {/* Fluid fill with animated height */}
            <motion.div
              initial={false}
              animate={{ height: `${clampedUpstream}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={clsx(
                'w-full rounded-xl transition-colors duration-500 relative overflow-hidden',
                isBlockage || isUpstreamCritical
                  ? 'bg-gradient-to-t from-alert-red/80 via-alert-red to-rose-400'
                  : 'bg-gradient-to-t from-cobalt-dark via-cobalt to-cobalt-light'
              )}
            >
              {/* Wave surface shimmer */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-white/30 animate-pulse" />
            </motion.div>
          </div>

          <div className="mt-3 text-center">
            <div className="text-xs font-mono text-text-muted">Inlet Drainage Point</div>
            <div className="text-sm font-display font-semibold text-text-primary flex items-center justify-center gap-1 mt-0.5">
              <span>Upstream</span>
              {isUpstreamCritical && <ArrowUpRight className="w-4 h-4 text-alert-red" />}
            </div>
          </div>
        </div>

        {/* Downstream Tank */}
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-text-secondary font-semibold">DOWNSTREAM SENSOR</span>
            <span className={clsx('font-bold', isDownstreamCritical ? 'text-alert-red' : 'text-text-primary')}>
              {downstreamLevel !== null ? `${downstreamLevel.toFixed(1)} cm` : 'NO DATA'}
            </span>
          </div>

          <div className="w-full h-56 sm:h-64 rounded-2xl border border-border bg-navy-950 relative overflow-hidden flex flex-col justify-end p-2 shadow-inner">
            {/* Background calibration tick marks */}
            <div className="absolute inset-y-0 left-2 flex flex-col justify-between py-2 text-[10px] font-mono text-text-muted select-none pointer-events-none opacity-40">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            {/* Threshold dashed line */}
            <div
              className="absolute left-0 right-0 border-t-2 border-dashed border-alert-red/70 z-20 pointer-events-none"
              style={{ bottom: `${threshold}%` }}
            >
              <span className="absolute right-2 -top-4 text-[10px] font-mono text-alert-red bg-navy-950/80 px-1 rounded">
                60 cm
              </span>
            </div>

            {/* Fluid fill with animated height */}
            <motion.div
              initial={false}
              animate={{ height: `${clampedDownstream}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={clsx(
                'w-full rounded-xl transition-colors duration-500 relative overflow-hidden',
                isDownstreamCritical
                  ? 'bg-gradient-to-t from-alert-red/80 via-alert-red to-rose-400'
                  : 'bg-gradient-to-t from-cobalt-dark via-cobalt to-cobalt-light'
              )}
            >
              {/* Wave surface shimmer */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-white/30 animate-pulse" />
            </motion.div>
          </div>

          <div className="mt-3 text-center">
            <div className="text-xs font-mono text-text-muted">Outlet Drain Point</div>
            <div className="text-sm font-display font-semibold text-text-primary flex items-center justify-center gap-1 mt-0.5">
              <span>Downstream</span>
              {isBlockage && <ArrowDownRight className="w-4 h-4 text-alert-red" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
