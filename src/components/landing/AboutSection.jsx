import { motion } from 'framer-motion';
import { AlertTriangle, Search, Activity, ShieldCheck } from 'lucide-react';
import ScrollReveal from '@/components/core/ScrollReveal';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-navy-950 relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bold statement */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="fadeUp">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-800 border border-border text-xs font-mono text-cobalt-light uppercase tracking-wider mb-6">
                The Real Challenge
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight leading-[1.15]">
                Blocked drains are noticed after the water has already risen.
              </h2>
              <div className="mt-8 p-6 rounded-2xl bg-surface border border-border/80">
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

          {/* Right Column: Detailed narrative */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <ScrollReveal variant="fadeUp" delay={0.15}>
              <div className="space-y-6 text-text-secondary text-base sm:text-lg leading-relaxed border-l-2 border-cobalt/60 pl-6 sm:pl-8">
                <p>
                  Urban drains, culverts, and collection channels are traditionally checked on arbitrary maintenance schedules rather than continuous telemetry. Debris, silt, and municipal waste accumulate quietly beneath grates until rainfall causes localized flash flooding.
                </p>
                <p>
                  This system measures water elevation simultaneously at two strategic points—upstream and downstream of potential choke points—alongside the active water flow rate.
                </p>
                <p>
                  When water behind a choke point ascends while the downstream level remains low and flow velocity drops below expected thresholds, our algorithms generate an immediate <span className="text-cobalt-light font-semibold">Possible Blockage</span> notification.
                </p>
              </div>
            </ScrollReveal>

            {/* Three key pillars */}
            <ScrollReveal variant="fadeUp" delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-surface border border-border">
                  <Activity className="w-5 h-5 text-cobalt mb-2" />
                  <div className="font-display font-semibold text-text-primary text-sm mb-1">Differential Sensing</div>
                  <div className="text-xs text-text-secondary">Continuous comparative depth monitoring at two locations.</div>
                </div>
                <div className="p-4 rounded-xl bg-surface border border-border">
                  <Search className="w-5 h-5 text-cobalt-light mb-2" />
                  <div className="font-display font-semibold text-text-primary text-sm mb-1">Early Dispatch</div>
                  <div className="text-xs text-text-secondary">Directs municipal teams to exact segments before overflow occurs.</div>
                </div>
                <div className="p-4 rounded-xl bg-surface border border-border">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                  <div className="font-display font-semibold text-text-primary text-sm mb-1">Verified Actions</div>
                  <div className="text-xs text-text-secondary">Clear protocol: telemetry prompts timely physical inspection.</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
