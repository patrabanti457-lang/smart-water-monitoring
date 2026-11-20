import { motion } from 'framer-motion';
import { Cpu, Server, Monitor, ShieldCheck, Zap, Database } from 'lucide-react';
import ScrollReveal from '@/components/core/ScrollReveal';

const TECH_CARDS = [
  {
    icon: Cpu,
    category: 'Edge Intelligence',
    title: 'ESP32 & 4G Telemetry Engine',
    desc: 'Dual ADC calibration pipelines, interrupt-driven flow meter sampling, and autonomous condition assessment paired with robust SIM7600CE cellular transport.',
    specs: ['250ms sampling loop', 'Interrupt pulse counter', 'Multi-condition rules engine', 'Autonomous cellular reconnection'],
  },
  {
    icon: Server,
    category: 'Cloud Gateway',
    title: 'Python FastAPI Microservice',
    desc: 'High-throughput async endpoints delivering schema validation, bound verification, secondary blockage inference, and instant Firebase synchronization.',
    specs: ['Pydantic v2 schemas', 'Sub-millisecond processing', 'Automated alert generation', 'CORS & REST compliant'],
  },
  {
    icon: Database,
    category: 'Realtime Storage',
    title: 'Cloud Firebase Integration',
    desc: 'Persistent chronological storage for historical depth analysis, time-series aggregation, and instantaneous operational alert broadcasts.',
    specs: ['Firestore & RTDB support', 'Zero client credential exposure', 'Scalable time-series indexing', 'Historical window queries'],
  },
  {
    icon: Monitor,
    category: 'Observability UI',
    title: 'React & Motion Visualization',
    desc: 'Interactive dual-tank fluid level simulation, Recharts historical trends, spring-based micro-interactions, and Apple-style dock navigation.',
    specs: ['Framer Motion animations', 'Recharts SVG rendering', 'Tailwind custom palette', 'Accessible ARIA semantics'],
  },
];

export default function TechnologySection() {
  return (
    <section id="technology" className="py-24 md:py-32 bg-navy-950 relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-800 border border-border text-xs font-mono text-cobalt-light uppercase tracking-wider mb-4">
              Production Architecture
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight">
              Engineered for Mission-Critical Reliability
            </h2>
            <p className="mt-4 text-text-secondary text-base sm:text-lg">
              A modern software architecture uniting embedded controller logic, cellular telemetry, performant cloud APIs, and responsive operator dashboards.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={card.title} variant="fadeUp" delay={idx * 0.1}>
                <div className="bg-surface hover:bg-surface-elevated transition-all duration-300 border border-border hover:border-cobalt/40 rounded-2xl p-6 h-full flex flex-col group">
                  <div className="w-12 h-12 rounded-xl bg-navy-800 border border-border flex items-center justify-center text-cobalt group-hover:bg-cobalt group-hover:text-text-primary transition-all duration-300 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-xs font-mono uppercase tracking-wider text-text-muted mb-1">
                    {card.category}
                  </span>
                  <h3 className="font-display font-bold text-lg text-text-primary mb-3">
                    {card.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                    {card.desc}
                  </p>

                  <div className="pt-4 border-t border-border/60 space-y-2">
                    {card.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2 text-xs font-mono text-text-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-cobalt-light" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
