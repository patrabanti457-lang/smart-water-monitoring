import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Droplets, Activity, ShieldAlert, Cpu } from 'lucide-react';
import GlowButton from '@/components/core/GlowButton';
import { heroReveal, lineReveal } from '@/animations/variants';

export default function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityParallax = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-28 overflow-hidden hero-bg">
      {/* 4K Cinematic Water Infrastructure Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/assets/water-infrastructure-4k.png"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
      </div>

      {/* Sophisticated Dark Navy Gradient Overlay for Readability */}
      <div className="absolute inset-0 z-1 hero-overlay" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10 w-full">
        <motion.div
          style={{ y: yParallax, opacity: opacityParallax }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy-800/80 border border-border shadow-inner text-xs font-mono text-text-secondary mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse" />
            <span className="tracking-wide text-text-primary">TELEMETRY & DRAINAGE INTELLIGENCE</span>
            <span className="text-border">|</span>
            <span className="text-cobalt-light font-semibold">ESP32 + 4G + FASTAPI</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={heroReveal}
            initial="hidden"
            animate="visible"
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-text-primary leading-[1.1] mb-6"
          >
            Smarter Water Monitoring.{' '}
            <span className="bg-gradient-to-r from-cobalt via-cobalt-light to-cobalt bg-clip-text text-transparent">
              Safer Communities.
            </span>
          </motion.h1>

          {/* Line separator accent */}
          <motion.div
            variants={lineReveal}
            initial="hidden"
            animate="visible"
            className="w-28 h-1 bg-gradient-to-r from-cobalt to-transparent rounded-full mb-6"
          />

          {/* Subheading description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-text-secondary text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl font-light mb-10"
          >
            An intelligent monitoring platform designed to track water conditions, identify unusual drainage patterns, and help communities respond to possible blockages before overflows occur.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-5"
          >
            <GlowButton
              href="#how-it-works"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              cursorLabel="Explore"
            >
              Explore System
            </GlowButton>

            <GlowButton
              href="/dashboard"
              variant="secondary"
              size="lg"
              cursorLabel="View"
            >
              View Live Dashboard
            </GlowButton>
          </motion.div>

          {/* Live System Spec Overview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-16 w-full max-w-3xl"
          >
            <div className="bg-navy-800/50 backdrop-blur-md border border-border/80 rounded-xl p-3.5 text-left">
              <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-1">Differential</div>
              <div className="font-display font-bold text-lg text-text-primary">Dual Depth</div>
              <div className="text-xs text-text-secondary mt-0.5">Upstream & downstream</div>
            </div>
            <div className="bg-navy-800/50 backdrop-blur-md border border-border/80 rounded-xl p-3.5 text-left">
              <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-1">Flow Meter</div>
              <div className="font-display font-bold text-lg text-text-primary">Pulse ISR</div>
              <div className="text-xs text-text-secondary mt-0.5">Dynamic frequency calc</div>
            </div>
            <div className="bg-navy-800/50 backdrop-blur-md border border-border/80 rounded-xl p-3.5 text-left">
              <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-1">Uplink</div>
              <div className="font-display font-bold text-lg text-text-primary">SIM7600CE</div>
              <div className="text-xs text-text-secondary mt-0.5">Cellular 4G connectivity</div>
            </div>
            <div className="bg-navy-800/50 backdrop-blur-md border border-border/80 rounded-xl p-3.5 text-left">
              <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-1">Detection</div>
              <div className="font-display font-bold text-lg text-cobalt-light">Probable Block</div>
              <div className="text-xs text-text-secondary mt-0.5">Physical confirmation cue</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Cinematic waves at bottom */}
      <div className="absolute left-0 right-0 bottom-0 h-28 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-[200%] h-full animate-drift opacity-25"
        >
          <path
            d="M0,60 C320,100 420,20 720,60 C1020,100 1120,20 1440,60 L1440,120 L0,120 Z"
            fill="#2563EB"
          />
        </svg>
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-[200%] h-full animate-drift-reverse opacity-20"
        >
          <path
            d="M0,40 C360,10 520,90 840,40 C1160,-10 1320,80 1440,40 L1440,120 L0,120 Z"
            fill="#1D4ED8"
          />
        </svg>
      </div>
    </section>
  );
}
