import clsx from 'clsx';
import { statusConfig } from '@/utils/designTokens';

// ---------------------------------------------------------------------------
// StatusBadge — status indicator with coloured dot + label
// ---------------------------------------------------------------------------

const SIZE_CLASSES = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
};

const DOT_SIZES = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
};

export default function StatusBadge({ status, size = 'md', pulse = false }) {
  const config = statusConfig[status];

  if (!config) {
    return (
      <span
        className={clsx(
          'inline-flex items-center gap-1.5 rounded-full font-medium text-text-secondary',
          SIZE_CLASSES[size] ?? SIZE_CLASSES.md
        )}
        style={{
          backgroundColor: 'rgba(100,116,139,0.1)',
          border: '1px solid rgba(100,116,139,0.3)',
        }}
      >
        <span
          className={clsx('rounded-full bg-text-muted', DOT_SIZES[size] ?? DOT_SIZES.md)}
        />
        Unknown
      </span>
    );
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        SIZE_CLASSES[size] ?? SIZE_CLASSES.md
      )}
      style={{
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        color: config.color,
      }}
    >
      {/* Dot with optional pulse ring */}
      <span className="relative flex">
        <span
          className={clsx('rounded-full', DOT_SIZES[size] ?? DOT_SIZES.md)}
          style={{ backgroundColor: config.color }}
        />
        {pulse && (
          <span
            className={clsx(
              'absolute inset-0 rounded-full animate-ping',
              DOT_SIZES[size] ?? DOT_SIZES.md
            )}
            style={{ backgroundColor: config.color, opacity: 0.4 }}
          />
        )}
      </span>

      {config.label}
    </span>
  );
}

export { StatusBadge };
