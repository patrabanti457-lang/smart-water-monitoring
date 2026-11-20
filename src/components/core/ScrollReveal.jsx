import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import clsx from 'clsx';
import {
  fadeInUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
} from '@/animations/variants';

// ---------------------------------------------------------------------------
// ScrollReveal — scroll-triggered animation wrapper
// ---------------------------------------------------------------------------

const VARIANT_MAP = {
  fadeUp: fadeInUp,
  fadeIn: fadeIn,
  scaleIn: scaleIn,
  slideLeft: slideInLeft,
  slideRight: slideInRight,
};

/**
 * Checks (once) whether the user prefers reduced motion.
 */
function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  className,
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    amount: 0.15, // threshold
  });

  // Respect reduced-motion — render children without animation wrapper
  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>;
  }

  const motionVariant = VARIANT_MAP[variant] ?? VARIANT_MAP.fadeUp;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={motionVariant}
      transition={{ delay }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
}

export { ScrollReveal };
