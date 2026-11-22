import { motion } from 'framer-motion';
import { Activity, Layers, BellRing, Gauge, ArrowDownRight, ArrowUpRight, Waves, Cpu, Shield, Zap } from 'lucide-react';
import ScrollReveal from '@/components/core/ScrollReveal';

const features = [
  {
    icon: Waves,
    category: 'PRIMARY DETECTION ENGINE',
    title: 'Differential Water Elevation Analysis',
    description: 'A single high water sensor cannot differentiate between overall canal surge and an internal localized choke point. By computing the real-time Delta between upstream and downstream monitoring points, the platform isolates flow restrictions with high specificity.',
    specs: [
      { label: 'Threshold Delta', value: '≥ 15 cm' },
      { label: 'Critical Surge Limit', value: '60 cm' },
      { label: 'Low Flow Gate', value: '< 2.0 L/min' },
    ],
    visual: 'dual-chamber',
  },
  {
    icon: Gauge,
    category: 'SECONDARY TELEMETRY',
    title: 'Dynamic Flow Rate Telemetry',
    description: 'Water elevation alone doesn\'t reveal fluid velocity. Flow sensors capture pulse frequencies via interrupt handlers, converting raw pulses to liters-per-minute metrics to verify whether water is actively draining or stagnating behind an impediment.',
    specs: [
      { label: 'Calculation', value: 'Sliding ms window' },
      { label: 'Method', value: 'Interrupt-driven' },
      { label: 'Precision', value: '0.1 L/min resolution' },
    ],
    visual: 'flow-meter',
  },
  {
    icon: BellRing,
    category: 'ALERT ORCHESTRATION',
    title: 'Graduated Alert Hierarchy',
    description: 'Prevents alert fatigue through structured severity tiers: NORMAL, HIGH_WATER_WARNING, LOW_FLOW, POSSIBLE_BLOCKAGE, and emergency float switch activations. Teams prioritize responses based on verified risk.',
    specs: [
      { label: 'Tiers', value: '5 severity levels' },
      { label: 'Latency', value: '< 2s end-to-end' },
      { label: 'Validation', value: 'Human required' },
    ],
    visual: 'alert-hierarchy',
  },
  {
    icon: Cpu,
    category: 'EDGE COMPUTE',
    title: 'Autonomous Condition Assessment',
    description: 'On-device rule engine evaluates multi-condition logic without cloud dependency. Local inference ensures alert generation persists during cellular network interruptions.',
    specs: [
      { label: 'Sampling', value: '250 ms loop' },
      { label: 'Autonomy', value: 'Full offline ops' },
      { label: 'Reconnection', value: 'Auto-exponential backoff' },
    ],
    visual: 'edge-compute',
  },
  {
    icon: Shield,
    category: 'DATA INTEGRITY',
    title: 'Firebase Realtime Synchronization',
    description: 'Dual-write to Firestore for historical analytics and Realtime Database for instant operational dashboards. Zero client credential exposure via server-side proxy.',
    specs: [
      { label: 'Storage', value: 'Firestore + RTDB' },
      { label: 'Queries', value: 'Time-window indexed' },
      { label: 'Security', value: 'Server auth only' },
    ],
    visual: 'data-sync',
  },
  {
    icon: Zap,
    category: 'CLOUD INFERENCE',
    title: 'FastAPI Secondary Analysis',
    description: 'Cloud microservice performs bound verification, secondary blockage inference, and alert enrichment. Sub-millisecond processing with Pydantic v2 schema validation.',
    specs: [
      { label: 'Processing', value: 'Sub-ms per payload' },
      { label: 'Validation', value: 'Pydantic v2 strict' },
      { label: 'API', value: 'REST + WebSocket' },
    ],
    visual: 'cloud-inference',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-deep-900 relative">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-400/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-deep-800 border border-border text-xs font-mono text-teal-100 uppercase tracking-wider mb-4">
              Monitoring Capabilities
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.1]">
              Continuous Hydrological Intelligence
            </h2>
            <p className="mt-4 text-text-secondary text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Sophisticated differential analysis designed to catch anomalies early and alert field crews with accurate context.
            </p>
          </ScrollReveal>
        </div>

        {/* Feature Grid - Responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <ScrollReveal key={feature.title} variant="fadeUp" delay={idx * 0.08}>
              <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 h-full flex flex-col transition-all duration-300 group hover:border-teal-400/40 hover:shadow-xl hover:shadow-teal-400/10">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-400/10 border border-teal-400/30 text-xs font-mono text-teal-100 mb-5">
                  {feature.category}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-deep-800 border border-border flex items-center justify-center text-teal-400 mb-5 group-hover:bg-teal-400 group-hover:text-text-primary transition-all duration-300">
                  <feature.icon className="w-6 h-6" aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary mb-3 flex-1">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-5 flex-1">
                  {feature.description}
                </p>

                {/* Specs */}
                <div className="pt-4 border-t border-border/60 space-y-2.5">
                  {feature.specs.map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between text-xs font-mono">
                      <span className="text-text-muted">{spec.label}</span>
                      <span className="text-text-primary font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}