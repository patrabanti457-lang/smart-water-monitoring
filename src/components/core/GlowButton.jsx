import { forwardRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { GlowEffect } from '@/components/core/glow-effect';

// ---------------------------------------------------------------------------
// GlowButton — premium interactive button with animated glow & rock-solid navigation
// ---------------------------------------------------------------------------

const VARIANTS = {
  primary: {
    base: 'bg-navy-800 border border-cobalt/40 text-text-primary hover:border-cobalt hover:bg-navy-750',
    glowColors: ['#2563EB', '#1D4ED8', '#3B82F6'],
    hasGlow: true,
  },
  secondary: {
    base: 'bg-navy-800 border border-cobalt/25 text-text-primary hover:border-cobalt/60 hover:bg-navy-750',
    glowColors: null,
    hasGlow: false,
  },
  danger: {
    base: 'bg-navy-800 border border-alert-red/40 text-text-primary hover:border-alert-red hover:bg-navy-750',
    glowColors: ['#EF4444', '#DC2626', '#EF4444'],
    hasGlow: true,
  },
  ghost: {
    base: 'bg-transparent text-text-secondary hover:text-text-primary border border-transparent hover:bg-navy-800/50',
    glowColors: null,
    hasGlow: false,
  },
};

const SIZES = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
};

function isExternalUrl(href) {
  return typeof href === 'string' && /^https?:\/\//.test(href);
}

const GlowButton = forwardRef(function GlowButton(
  {
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'right',
    href,
    onClick,
    disabled = false,
    loading = false,
    cursorLabel,
    className,
    type = 'button',
    ...rest
  },
  ref
) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const showGlow = v.hasGlow && !disabled && !loading;

  const isLink = Boolean(href);
  const isExternal = isExternalUrl(href);
  const isAnchor = typeof href === 'string' && href.startsWith('#');

  const handleClick = useCallback(
    (e) => {
      if (disabled || loading) {
        e.preventDefault();
        return;
      }

      if (onClick) {
        onClick(e);
      }

      // If it's an anchor on the landing page, perform smooth scrolling
      if (isAnchor) {
        e.preventDefault();
        if (location.pathname !== '/') {
          // Navigate to home with hash
          navigate(`/${href}`);
        } else {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    },
    [disabled, loading, onClick, isAnchor, href, location.pathname, navigate]
  );

  // Common motion wrapper props
  const motionProps = {
    ref,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    whileHover: disabled || loading ? undefined : { y: -2, transition: { duration: 0.15 } },
    whileTap: disabled || loading ? undefined : { scale: 0.97 },
    'data-cursor': cursorLabel || undefined,
    'data-variant': variant,
    className: clsx(
      'relative inline-flex items-center justify-center rounded-xl font-display font-semibold cursor-pointer select-none',
      'transition-all duration-200 outline-none',
      'focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900',
      v.base,
      SIZES[size] ?? SIZES.md,
      (disabled || loading) && 'opacity-50 pointer-events-none cursor-not-allowed',
      className
    ),
    ...rest,
  };

  const content = (
    <>
      {/* Glow layer */}
      {showGlow && (
        <GlowEffect
          colors={v.glowColors}
          mode="colorShift"
          blur="medium"
          duration={3}
          scale={0.88}
          className={clsx(
            'transition-opacity duration-300 pointer-events-none',
            hovered ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}

      {/* Loading spinner */}
      {loading && (
        <Loader2
          className="animate-spin shrink-0"
          size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
        />
      )}

      {/* Icon left */}
      {!loading && icon && iconPosition === 'left' && (
        <motion.span
          className="inline-flex shrink-0 pointer-events-none"
          animate={hovered ? { x: -3 } : { x: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {icon}
        </motion.span>
      )}

      {/* Label */}
      <span className="pointer-events-none">{children}</span>

      {/* Icon right */}
      {!loading && icon && iconPosition === 'right' && (
        <motion.span
          className="inline-flex shrink-0 pointer-events-none"
          animate={hovered ? { x: 4 } : { x: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {icon}
        </motion.span>
      )}
    </>
  );

  // If anchor link
  if (isAnchor) {
    return (
      <motion.a href={href} onClick={handleClick} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  // If external link
  if (isExternal) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  // If internal route link
  if (isLink) {
    return (
      <motion.button
        type="button"
        onClick={(e) => {
          handleClick(e);
          navigate(href);
        }}
        {...motionProps}
      >
        {content}
      </motion.button>
    );
  }

  // Regular button
  return (
    <motion.button type={type} onClick={handleClick} disabled={disabled || loading} {...motionProps}>
      {content}
    </motion.button>
  );
});

export { GlowButton };
export default GlowButton;
