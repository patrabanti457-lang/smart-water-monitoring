import { motion } from 'framer-motion';
import { ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import GlowButton from '@/components/core/GlowButton';
import ScrollReveal from '@/components/core/ScrollReveal';

export default function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-navy-950 relative border-t border-border overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cobalt/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 md:px-8 relative z-10 text-center">
        <ScrollReveal variant="fadeUp">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-800 border border-border text-xs font-mono text-cobalt-light uppercase tracking-wider mb-6">
            Intelligent Drainage Surveillance
          </div>

          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight leading-tight mb-6">
            Monitor. Detect. Respond.
          </h2>

          <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Equip municipal teams, facility supervisors, and stormwater operators with continuous telemetry to pinpoint possible blockages and prevent flood damage.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <GlowButton
              href="/dashboard"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              cursorLabel="Dashboard"
            >
              Open Monitoring Dashboard
            </GlowButton>
            <GlowButton
              href="/alerts"
              variant="secondary"
              size="lg"
              cursorLabel="Alerts"
            >
              View Active Alerts
            </GlowButton>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-text-muted">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>FastAPI Endpoints Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cobalt" />
              <span>Firebase Database Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-alert-red" />
              <span>Continuous Incident Triggers</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
