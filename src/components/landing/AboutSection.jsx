import { motion } from 'framer-motion';
import { AlertTriangle, Search, Activity, ShieldCheck, Droplets, Waves, MapPin } from 'lucide-react';
import ScrollReveal from '@/components/core/ScrollReveal';

export default function AboutSection() {
  const problemPoints = [
    {
      icon: Droplets,
      title: 'Silent Accumulation',
      desc: 'Debris, silt, and waste build up unseen beneath grates until extreme rainfall triggers flash flooding.',
      color: 'text-cobalt-light',
    },
    {
      icon: Waves,
      title: 'Reactive Maintenance',
      desc: 'Fixed inspection schedules miss developing blockages. Teams respond after damage occurs, not before.',
      color: 'text-amber-400',
    },
    {
      icon: MapPin,
      title: 'Imprecise Localization',
      desc: 'Without differential telemetry, crews cannot pinpoint which segment of a culvert network is obstructed.',
      color: 'text-alert-red',
    },
  ];

  const principles = [
    {
      icon: Activity,
      title: 'Differential Sensing',
      desc: 'Continuous comparative depth monitoring at upstream and downstream locations isolates flow restrictions with high specificity.',
    },
    {
      icon: Search,
      title: 'Early Dispatch',
      desc: 'Directs municipal teams to exact canal segments before overflow occurs, reducing response time from hours to minutes.',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Actions',
      desc: 'Clear protocol: telemetry prompts timely physical inspection. Alerts are diagnostic, not confirmatory.',
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-deep-900 relative border-t border-border/50">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-400/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left Column: Problem Statement */}
          <div>
            <ScrollReveal variant="fadeUp">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-deep-800 border border-border text-xs font-mono text-teal-100 uppercase tracking-wider mb-6">
                The Problem
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight leading-[1.15] mb-8">
                Blocked drains are noticed after the water has already risen.
              </h2>

              <div className="space-y-5 mb-10">
                {problemPoints.map((point, idx) => (
                  <ScrollReveal key={point.title} variant="fadeUp" delay={idx * 0.1}>
                    <div className="flex gap-4 p-5 rounded-xl bg-surface border border-border/50 hover:border-teal-400/40 hover:bg-surface-elevated transition-all duration-300 group">
                      <div className={`w-11 h-11 rounded-xl bg-deep-800 border border-border flex items-center justify-center shrink-0 group-hover:bg-teal-400 group-hover:text-white group-hover:border-teal-400 transition-all duration-300 ${point.color}`}>
                        <point.icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-text-primary mb-1">
                          {point.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Critical Operating Principle */}
              <div className="p-6 rounded-2xl bg-surface border border-border/80">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-alert-red/10 border border-alert-red/30 text-alert-red shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-text-primary text-base mb-1">
                      Critical Operating Principle
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      An alert indicates a <strong className="text-text-primary">Possible Blockage pattern</strong> based on differential telemetry. Only physical on-site inspection can confirm and clear obstructions.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Solution Principles */}
          <div>
            <ScrollReveal variant="fadeUp" delay={0.15}>
              <div className="space-y-6 text-text-secondary text-base sm:text-lg leading-relaxed border-l-2 border-teal-400/60 pl-6 sm:pl-8 mb-10">
                <p>
                  Urban drains, culverts, and collection channels are traditionally checked on arbitrary maintenance schedules rather than continuous telemetry. Debris, silt, and municipal waste accumulate quietly beneath grates until rainfall causes localized flash flooding.
                </p>
                <p>
                  This system measures water elevation simultaneously at two strategic points—upstream and downstream of potential choke points—alongside the active water flow rate.
                </p>
                <p>
                  When water behind a choke point ascends while the downstream level remains low and flow velocity drops below expected thresholds, our algorithms generate an immediate <span className="text-teal-100 font-semibold">Possible Blockage</span> notification.
                </p>
              </div>
            </ScrollReveal>

            {/* Three key pillars */}
            <ScrollReveal variant="fadeUp" delay={0.3}>
              <h3 className="font-display font-bold text-xl text-text-primary mb-6">
                Core Detection Principles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {principles.map((principle, idx) => (
                  <ScrollReveal key={principle.title} variant="fadeUp" delay={idx * 0.1}>
                    <div className="p-5 rounded-xl bg-surface border border-border hover:border-teal-400/40 hover:bg-surface-elevated transition-all duration-300 h-full">
                      <div className="w-10 h-10 rounded-lg bg-deep-800 border border-border flex items-center justify-center text-teal-400 mb-3">
                        <principle.icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="font-display font-semibold text-text-primary text-sm mb-1">
                        {principle.title}
                      </div>
                      <div className="text-xs text-text-secondary leading-relaxed">
                        {principle.desc}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
