import clsx from 'clsx';

// ---------------------------------------------------------------------------
// LoadingSkeleton — lightweight CSS shimmer placeholders
// ---------------------------------------------------------------------------

/*
 * We inject the shimmer keyframes once via a <style> tag rather than relying
 * on Tailwind @keyframes config, keeping the component self-contained.
 */
const SHIMMER_CSS = `
@keyframes skeleton-shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    #151F35 25%,
    #1C2942 37%,
    #151F35 63%
  );
  background-size: 800px 100%;
  animation: skeleton-shimmer 1.6s ease-in-out infinite;
}
`;

let styleInjected = false;

function ensureStyle() {
  if (typeof document === 'undefined' || styleInjected) return;
  const tag = document.createElement('style');
  tag.id = 'dw-skeleton-shimmer';
  tag.textContent = SHIMMER_CSS;
  document.head.appendChild(tag);
  styleInjected = true;
}

// ---------------------------------------------------------------------------
// Variant renderers
// ---------------------------------------------------------------------------

function TextSkeleton({ className }) {
  return (
    <div className={clsx('space-y-3', className)}>
      <div className="skeleton-shimmer h-4 w-3/4 rounded" />
      <div className="skeleton-shimmer h-4 w-full rounded" />
      <div className="skeleton-shimmer h-4 w-5/6 rounded" />
      <div className="skeleton-shimmer h-4 w-2/3 rounded" />
    </div>
  );
}

function CardSkeleton({ className }) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-navy-500/40 bg-navy-700 p-5 space-y-4',
        className
      )}
    >
      <div className="skeleton-shimmer h-5 w-1/3 rounded" />
      <div className="skeleton-shimmer h-16 w-full rounded-lg" />
      <div className="flex gap-3">
        <div className="skeleton-shimmer h-4 w-20 rounded" />
        <div className="skeleton-shimmer h-4 w-16 rounded" />
      </div>
    </div>
  );
}

function ChartSkeleton({ className }) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-navy-500/40 bg-navy-700 p-5',
        className
      )}
    >
      {/* Fake axis + bars */}
      <div className="skeleton-shimmer mb-4 h-4 w-24 rounded" />
      <div className="flex items-end gap-2 h-32">
        {[40, 65, 50, 80, 55, 70, 45, 60].map((h, i) => (
          <div
            key={i}
            className="skeleton-shimmer flex-1 rounded-t"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-shimmer h-3 w-10 rounded" />
        ))}
      </div>
    </div>
  );
}

function ReadingSkeleton({ className }) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-navy-500/40 bg-navy-700 p-4 flex items-center gap-4',
        className
      )}
    >
      <div className="skeleton-shimmer h-10 w-10 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="skeleton-shimmer h-3 w-20 rounded" />
        <div className="skeleton-shimmer h-5 w-16 rounded" />
      </div>
    </div>
  );
}

const VARIANT_MAP = {
  text: TextSkeleton,
  card: CardSkeleton,
  chart: ChartSkeleton,
  reading: ReadingSkeleton,
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function LoadingSkeleton({
  variant = 'text',
  count = 1,
  className,
}) {
  ensureStyle();

  const Skeleton = VARIANT_MAP[variant] ?? VARIANT_MAP.text;

  return (
    <div className={clsx('space-y-4', className)} aria-busy="true" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} />
      ))}
    </div>
  );
}

export { LoadingSkeleton };
