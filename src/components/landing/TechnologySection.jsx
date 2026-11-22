import { motion } from 'framer-motion';
import { Cpu, Server, Database, Monitor, ShieldCheck, Zap, Wifi } from 'lucide-react';
import ScrollReveal from '@/components/core/ScrollReveal';

const TECH_CARDS = [
  {
    icon: Cpu,
    category: 'EDGE INTELLIGENCE',
    title: 'ESP32 & 4G Telemetry Engine',
    desc: 'Dual ADC calibration pipelines, interrupt-driven flow meter sampling, and autonomous condition assessment paired with robust SIM7600CE cellular transport.',
    specs: ['250ms sampling loop', 'Interrupt pulse counter', 'Multi-condition rules engine', 'Autonomous cellular reconnection'],
  },
  {
    icon: Wifi,
    category: 'CONNECTIVITY LAYER',
    title: 'SIM7600CE 4G LTE Modem',
    desc: 'Industrial-grade cellular module with multi-band support, automatic network selection, and TCP/IP stack for reliable telemetry uplink.',
    specs: ['LTE Cat 1/4/12 fallback', 'GNSS positioning', 'SMS + Data dual mode', 'AT command interface'],
  },
  {
    icon: Server,
    category: 'CLOUD GATEWAY',
    title: 'Python FastAPI Microservice',
    desc: 'High-throughput async endpoints delivering schema validation, bound verification, secondary blockage inference, and instant Firebase synchronization.',
    specs: ['Pydantic v2 schemas', 'Sub-millisecond processing', 'Automated alert generation', 'CORS & REST compliant'],
  },
  {
    icon: Database,
    category: 'REALTIME STORAGE',
    title: 'Cloud Firebase Integration',
    desc: 'Persistent chronological storage for historical depth analysis, time-series aggregation, and instantaneous operational alert broadcasts.',
    specs: ['Firestore & RTDB support', 'Zero client credential exposure', 'Scalable time-series indexing', 'Historical window queries'],
  },
  {
    icon: Monitor,
    category: 'OBSERVABILITY UI',
    title: 'React & Motion Visualization',
    desc: 'Interactive dual-tank fluid level simulation, Recharts historical trends, spring-based micro-interactions, and Apple-style dock navigation.',
    specs: ['Framer Motion animations', 'Recharts SVG rendering', 'Tailwind custom palette', 'Accessible ARIA semantics'],
  },
  {
    icon: ShieldCheck,
    category: 'SYSTEM HEALTH',
    title: 'Diagnostics & Telemetry',
    desc: 'Built-in device heartbeat monitoring, signal quality metrics, uptime tracking, and automated health check endpoints for ops visibility.',
    specs: ['Heartbeat ping interval', 'RSSI / SNR tracking', 'Uptime SLA dashboard', 'Self-health API endpoint'],
  },
];

export default function TechnologySection() {
  return (
    <section id="technology" className="py-24 md:py-32 bg-deep-900 relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-deep-800 border border-border text-xs font-mono text-teal-100 uppercase tracking-wider mb-4">
              Production Architecture
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.1]">
              Engineered for Mission-Critical Reliability
            </h2>
            <p className="mt-4 text-text-secondary text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              A modern software architecture uniting embedded controller logic, cellular telemetry, performant cloud APIs, and responsive operator dashboards.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={card.title} variant="fadeUp" delay={idx * 0.08}>
                <div className="bg-surface hover:bg-surface-elevated transition-all duration-300 border border-border hover:border-teal-400/40 rounded-2xl p-6 sm:p-8 h-full flex flex-col group">
                  <div className="w-12 h-12 rounded-xl bg-deep-800 border border-border flex items-center justify-center text-teal-400 group-hover:bg-teal-400 group-hover:text-text-primary transition-all duration-300 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-xs font-mono uppercase tracking-wider text-text-muted mb-1 block">
                    {card.category}
                  </span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary mb-3">
                    {card.title}
                  </h3>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6 flex-1">
                    {card.desc}
                  </p>

                  <div className="pt-4 border-t border-border/60 space-y-2">
                    {card.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2 text-xs font-mono text-text-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
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