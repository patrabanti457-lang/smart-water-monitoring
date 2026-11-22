import { motion } from 'framer-motion';
import { ArrowRight, Activity, ShieldCheck, Zap, Waves } from 'lucide-react';
import GlowButton from '@/components/core/GlowButton';
import ScrollReveal from '@/components/core/ScrollReveal';

const trustIndicators = [
  { icon: Activity, label: 'FastAPI Endpoints Active', color: 'bg-emerald-400' },
  { icon: Waves, label: 'Firebase Database Sync', color: 'bg-teal-400' },
  { icon: ShieldCheck, label: 'Continuous Incident Triggers', color: 'bg-alert-red' },
  { icon: Zap, label: 'Sub-ms Cloud Inference', color: 'bg-amber-400' },
];

export default function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-deep-900 relative border-t border-border overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 md:px-8 relative z-10 text-center">
        <ScrollReveal variant="fadeUp">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-deep-800 border border-border text-xs font-mono text-teal-100 uppercase tracking-wider mb-6">
            Intelligent Drainage Surveillance
          </div>

          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary tracking-tight leading-tight mb-6">
            Monitor. Detect. Respond.
          </h2>

          <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Equip municipal teams, facility supervisors, and stormwater operators with continuous telemetry to pinpoint possible blockages and prevent flood damage.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-12">
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

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-xs font-mono text-text-muted">
            {trustIndicators.map((item, idx) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}