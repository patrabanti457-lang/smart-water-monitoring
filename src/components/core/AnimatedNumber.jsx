import { useEffect, useRef } from 'react';
import { useSpring, useMotionValue, animate } from 'framer-motion';
import clsx from 'clsx';

// ---------------------------------------------------------------------------
// AnimatedNumber — smoothly animates between numeric values
// ---------------------------------------------------------------------------

export default function AnimatedNumber({
  value,
  duration = 800,
  prefix = '',
  suffix = '',
  decimals = 1,
  className,
}) {
  const nodeRef = useRef(null);
  const prevValue = useRef(0);

  useEffect(() => {
    if (value == null || nodeRef.current == null) return;

    const from = prevValue.current;
    const to = Number(value);
    prevValue.current = to;

    const controls = animate(from, to, {
      duration: duration / 1000,
      ease: 'easeOut',
      onUpdate(latest) {
        if (nodeRef.current) {
          nodeRef.current.textContent =
            prefix + latest.toFixed(decimals) + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [value, duration, prefix, suffix, decimals]);

  // Null / undefined → placeholder
  if (value == null) {
    return (
      <span className={clsx('font-mono', className)} aria-label="No data">
        {prefix}—{suffix}
      </span>
    );
  }

  return (
    <span
      ref={nodeRef}
      className={clsx('font-mono tabular-nums', className)}
      aria-live="polite"
    >
      {prefix}
      {Number(value).toFixed(decimals)}
      {suffix}
    </span>
  );
}

export { AnimatedNumber };
