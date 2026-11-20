import { useMemo, useId } from 'react';
import clsx from 'clsx';

// ---------------------------------------------------------------------------
// GlowEffect — absolutely-positioned glow layer for premium elements
// ---------------------------------------------------------------------------

const BLUR_MAP = {
  soft: 20,
  medium: 40,
  strong: 60,
};

/**
 * Build a CSS gradient string from an array of hex colours.
 */
function buildGradient(colors) {
  if (!colors || colors.length === 0) return 'transparent';
  if (colors.length === 1) return colors[0];
  return `linear-gradient(135deg, ${colors.join(', ')})`;
}

/**
 * Returns keyframe CSS for colour-shift animation.
 */
function colorShiftKeyframes(id, colors) {
  if (!colors || colors.length < 2) return '';

  const steps = colors.length;
  const frames = colors
    .map((c, i) => {
      const pct = Math.round((i / steps) * 100);
      return `${pct}% { background: linear-gradient(135deg, ${c}, ${
        colors[(i + 1) % colors.length]
      }); }`;
    })
    .join('\n    ');

  return `
  @keyframes ${id} {
    ${frames}
    100% { background: linear-gradient(135deg, ${colors[0]}, ${colors[1]}); }
  }`;
}

export function GlowEffect({
  colors = ['#2563EB', '#1D4ED8'],
  mode = 'colorShift',
  blur = 'medium',
  duration = 3,
  scale = 0.85,
  className,
}) {
  const uid = useId();
  const animName = `glow-shift-${uid.replace(/:/g, '')}`;
  const blurPx = BLUR_MAP[blur] ?? BLUR_MAP.medium;

  // Inset: smaller inset = bigger glow area; scale 1 → inset 0, scale 0 → inset 50%
  const insetPct = `${Math.round((1 - scale) * 50)}%`;

  const keyframeCss = useMemo(
    () => (mode === 'colorShift' ? colorShiftKeyframes(animName, colors) : ''),
    [mode, animName, colors]
  );

  const baseStyle = {
    position: 'absolute',
    inset: insetPct,
    borderRadius: 'inherit',
    zIndex: -1,
    pointerEvents: 'none',
    filter: `blur(${blurPx}px)`,
    background: buildGradient(colors),
    willChange: 'opacity, background',
  };

  let animationStyle = {};

  if (mode === 'colorShift') {
    animationStyle = {
      animation: `${animName} ${duration}s ease infinite`,
    };
  } else if (mode === 'pulse') {
    animationStyle = {
      animation: `glow-pulse ${duration}s ease-in-out infinite`,
    };
  }
  // 'static' — no extra animation

  return (
    <>
      {keyframeCss && <style>{keyframeCss}</style>}
      {/* Shared pulse keyframes — injected once, harmless if duplicated */}
      {mode === 'pulse' && (
        <style>{`
          @keyframes glow-pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}</style>
      )}
      <span
        className={clsx('glow-effect-layer', className)}
        style={{ ...baseStyle, ...animationStyle }}
        aria-hidden="true"
      />
    </>
  );
}

export default GlowEffect;
