import { useEffect, useRef, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

// ---------------------------------------------------------------------------
// CustomCursor — premium animated cursor with 0-lag dot + spring trailing ring
// ---------------------------------------------------------------------------

const SPRING_RING = { stiffness: 220, damping: 18, mass: 0.15 };

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor], .cursor-pointer';

function isTouchDevice() {
  if (typeof window === 'undefined') return true;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function CustomCursor() {
  const disabled = isTouchDevice() || prefersReducedMotion();

  // Instant direct motion values for 0-lag dot accuracy
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing springs for the outer ring only
  const ringX = useSpring(mouseX, SPRING_RING);
  const ringY = useSpring(mouseY, SPRING_RING);

  // Dynamic ring sizing (36px default -> 56px on hover)
  const ringSize = useMotionValue(36);
  const ringSizeSpring = useSpring(ringSize, { stiffness: 350, damping: 22 });

  // Dot scaling (1.0 default -> 0.5 on hover)
  const dotScale = useMotionValue(1);
  const dotScaleSpring = useSpring(dotScale, { stiffness: 400, damping: 25 });

  // Opacity for leaving/entering viewport
  const cursorOpacity = useMotionValue(1);
  const opacitySpring = useSpring(cursorOpacity, { stiffness: 300, damping: 30 });

  // Ring border color
  const ringBorderColor = useMotionValue('rgba(37,99,235,0.7)');

  // Blue glow on interactive elements
  const glowOpacity = useMotionValue(0);
  const glowSpring = useSpring(glowOpacity, { stiffness: 300, damping: 25 });

  // Quick click reaction
  const clickScale = useMotionValue(1);
  const clickSpring = useSpring(clickScale, { stiffness: 600, damping: 20 });

  // Text label inside ring
  const labelRef = useRef(null);

  // Transform helpers: Dot has 0 latency (directly follows mouseX/mouseY)
  const dotTranslate = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `translate3d(${x - 4}px, ${y - 4}px, 0)`
  );

  // Ring has smooth trailing lag
  const ringTranslate = useTransform(
    [ringX, ringY],
    ([x, y]) => `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
  );

  const ringWidthHeight = useTransform(ringSizeSpring, (s) => `${s}px`);
  const dotScaleTransform = useTransform(
    [dotScaleSpring, clickSpring],
    ([ds, cs]) => `scale(${ds * cs})`
  );
  const ringScaleTransform = useTransform(clickSpring, (cs) => `scale(${cs})`);
  const glowShadow = useTransform(
    glowSpring,
    (o) => `0 0 20px rgba(37,99,235,${o * 0.5}), 0 0 40px rgba(37,99,235,${o * 0.25})`
  );

  const handleMouseMove = useCallback(
    (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY]
  );

  const handleMouseOver = useCallback(
    (e) => {
      const target = e.target.closest?.(INTERACTIVE_SELECTOR);
      if (!target) {
        ringSize.set(36);
        dotScale.set(1);
        ringBorderColor.set('rgba(37,99,235,0.7)');
        glowOpacity.set(0);
        if (labelRef.current) {
          labelRef.current.textContent = '';
          labelRef.current.style.opacity = '0';
        }
        return;
      }

      // Interactive hover
      ringSize.set(54);
      dotScale.set(0.6);

      const isCritical =
        target.dataset.cursor === 'critical' ||
        target.classList.contains('text-alert-red') ||
        target.dataset.variant === 'danger';

      ringBorderColor.set(
        isCritical ? 'rgba(239,68,68,0.8)' : 'rgba(37,99,235,0.85)'
      );

      glowOpacity.set(1);

      // Label
      const cursorAttr = target.dataset.cursor;
      let text = '';
      if (cursorAttr === 'view') text = 'View';
      else if (cursorAttr === 'explore') text = 'Explore';
      else if (cursorAttr === 'dashboard') text = 'Open';

      if (labelRef.current) {
        labelRef.current.textContent = text;
        labelRef.current.style.opacity = text ? '1' : '0';
      }
    },
    [ringSize, dotScale, ringBorderColor, glowOpacity]
  );

  const handleMouseDown = useCallback(() => {
    clickScale.set(0.8);
  }, [clickScale]);

  const handleMouseUp = useCallback(() => {
    clickScale.set(1);
  }, [clickScale]);

  const handleDocumentLeave = useCallback(() => {
    cursorOpacity.set(0);
  }, [cursorOpacity]);

  const handleDocumentEnter = useCallback(() => {
    cursorOpacity.set(1);
  }, [cursorOpacity]);

  useEffect(() => {
    if (disabled) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleDocumentLeave);
    document.documentElement.addEventListener('mouseenter', handleDocumentEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleDocumentLeave);
      document.documentElement.removeEventListener('mouseenter', handleDocumentEnter);
    };
  }, [
    disabled,
    handleMouseMove,
    handleMouseOver,
    handleMouseDown,
    handleMouseUp,
    handleDocumentLeave,
    handleDocumentEnter,
  ]);

  if (disabled) return null;

  return (
    <>
      {/* Outer trailing ring with spring physics */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: ringWidthHeight,
          height: ringWidthHeight,
          borderRadius: '50%',
          border: '1.5px solid',
          borderColor: ringBorderColor,
          pointerEvents: 'none',
          zIndex: 99999,
          transform: ringTranslate,
          scale: ringScaleTransform,
          opacity: opacitySpring,
          boxShadow: glowShadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontSize: '9px',
            fontWeight: 700,
            color: '#F8FAFC',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            opacity: 0,
            transition: 'opacity 0.15s ease',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </motion.div>

      {/* Center dot with 0 latency (exact 1:1 hardware accuracy) */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 0 6px rgba(37,99,235,0.8)',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: dotTranslate,
          scale: dotScaleTransform,
          opacity: opacitySpring,
        }}
      />
    </>
  );
}
