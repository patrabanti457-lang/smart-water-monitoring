import { motion } from 'framer-motion';
import { Activity, Layers, BellRing, Gauge, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/core/ScrollReveal';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-800 border border-border text-xs font-mono text-cobalt-light uppercase tracking-wider mb-4">
              Monitoring Capabilities
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight">
              Continuous Hydrological Intelligence
            </h2>
            <p className="mt-4 text-text-secondary text-base sm:text-lg">
              Sophisticated differential analysis designed to catch anomalies early and alert field crews with accurate context.
            </p>
          </ScrollReveal>
        </div>

        {/* Editorial Layout: Large Showcase Feature */}
        <div className="space-y-8">
          {/* Feature 1: Large Banner on Differential Analysis */}
          <ScrollReveal variant="fadeUp">
            <div className="bg-surface rounded-3xl border border-border p-8 md:p-12 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cobalt/10 border border-cobalt/30 text-xs font-mono text-cobalt-light mb-4">
                    PRIMARY DETECTION ENGINE
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-text-primary mb-4">
                    Differential Water Elevation Analysis
                  </h3>
                  <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-6">
                    A single high water sensor cannot differentiate between overall canal surge and an internal localized choke point. By computing the real-time Delta between upstream and downstream monitoring points, the platform isolates flow restrictions with high specificity.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm font-mono text-text-muted">
                    <span className="px-3 py-1.5 rounded-lg bg-navy-900 border border-border">
                      Threshold Delta: &ge; 15 cm
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-navy-900 border border-border">
                      Critical Surge Limit: 60 cm
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-navy-900 border border-border">
                      Low Flow Gate: &lt; 2.0 L/min
                    </span>
                  </div>
                </div>

                {/* Right Visual Simulation: Dual Chamber Cross-Section */}
                <div className="lg:col-span-5 bg-navy-950/70 border border-border rounded-2xl p-6">
                  <div className="text-xs font-mono text-text-muted uppercase mb-4 text-center">
                    Visual Demonstration: Possible Blockage
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Upstream Chamber */}
                    <div className="flex flex-col items-center">
                      <div className="text-xs font-mono text-text-secondary mb-1">Upstream (78 cm)</div>
                      <div className="w-full h-44 rounded-xl border border-border bg-navy-900 relative overflow-hidden flex flex-col justify-end">
                        <div className="w-full h-[78%] bg-gradient-to-t from-cobalt-dark via-cobalt to-cobalt-light opacity-90 transition-all duration-700 relative">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-white/40 animate-pulse" />
                        </div>
                        <div className="absolute top-[40%] left-0 right-0 border-t border-dashed border-alert-red/70" />
                        <span className="absolute top-[42%] right-2 text-[10px] font-mono text-alert-red">Surge Limit</span>
                      </div>
                      <div className="mt-2 text-xs font-mono text-alert-red flex items-center gap-1">
                        <ArrowUpRight className="w-3.5 h-3.5" /> Surge State
                      </div>
                    </div>

                    {/* Downstream Chamber */}
                    <div className="flex flex-col items-center">
                      <div className="text-xs font-mono text-text-secondary mb-1">Downstream (24 cm)</div>
                      <div className="w-full h-44 rounded-xl border border-border bg-navy-900 relative overflow-hidden flex flex-col justify-end">
                        <div className="w-full h-[24%] bg-gradient-to-t from-cobalt-dark to-cobalt opacity-70 transition-all duration-700 relative" />
                      </div>
                      <div className="mt-2 text-xs font-mono text-text-muted flex items-center gap-1">
                        <ArrowDownRight className="w-3.5 h-3.5" /> Restricted Outflow
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/70 text-center text-xs font-mono text-alert-red font-semibold">
                    STATUS TRIGGERED: POSSIBLE_BLOCKAGE
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Features 2 & 3: Two Split Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <div className="bg-surface rounded-3xl border border-border p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-cobalt/15 border border-cobalt/30 text-cobalt flex items-center justify-center mb-6">
                  <Gauge className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-xl text-text-primary mb-3">
                  Dynamic Flow Rate Telemetry
                </h4>
                <p className="text-text-secondary text-base leading-relaxed mb-4">
                  Water elevation alone doesn't reveal fluid velocity. Flow sensors capture pulse frequencies via interrupt handlers, converting raw pulses to liters-per-minute metrics to verify whether water is actively draining or stagnating behind an impediment.
                </p>
                <div className="text-xs font-mono text-text-muted">
                  Non-blocking sliding millisecond window calculation
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.2}>
              <div className="bg-surface rounded-3xl border border-border p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-alert-red/15 border border-alert-red/30 text-alert-red flex items-center justify-center mb-6">
                  <BellRing className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-xl text-text-primary mb-3">
                  Graduated Alert Hierarchy
                </h4>
                <p className="text-text-secondary text-base leading-relaxed mb-4">
                  Prevents alert fatigue through structured severity tiers: <code>NORMAL</code>, <code>HIGH_WATER_WARNING</code>, <code>LOW_FLOW</code>, <code>POSSIBLE_BLOCKAGE</code>, and emergency float switch activations. Teams prioritize responses based on verified risk.
                </p>
                <div className="text-xs font-mono text-text-muted">
                  Strictly avoids false confirmation of blockages without human validation
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
