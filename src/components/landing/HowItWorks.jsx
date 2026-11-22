import { motion } from 'framer-motion';
import { Search, Droplets, Zap, ShieldCheck, ArrowRight, Cpu, Database, Wifi } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/core/ScrollReveal';

export default function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      number: '01',
      title: 'Deploy Sensors',
      description: 'Install dual ultrasonic sensors upstream and downstream of critical choke points. ESP32 controller with SIM7600CE 4G modem enables autonomous cellular telemetry.',
      icon: Droplets,
      color: 'teal',
      bgColor: 'bg-teal-400/10 border-teal-400/30',
      iconColor: 'text-teal-400',
    },
    {
      number: '02',
      title: 'Real-Time Analysis',
      description: 'Continuous differential depth measurement computes delta between monitoring points. Interrupt-driven flow meter captures pulse frequency for velocity verification.',
      icon: Zap,
      color: 'amber',
      bgColor: 'bg-amber/10 border-amber/30',
      iconColor: 'text-amber-400',
    },
    {
      number: '03',
      title: 'Instant Alerting',
      description: 'When upstream surge exceeds downstream with flow velocity drop, FastAPI cloud engine generates graduated alerts: NORMAL → HIGH_WATER_WARNING → POSSIBLE_BLOCKAGE.',
      icon: ShieldCheck,
      color: 'emerald',
      bgColor: 'bg-emerald/10 border-emerald/30',
      iconColor: 'text-emerald-400',
    },
  ];

  const techStack = [
    { icon: Cpu, label: 'ESP32 Edge', desc: 'Dual ADC sampling' },
    { icon: Wifi, label: '4G LTE Uplink', desc: 'SIM7600CE modem' },
    { icon: Database, label: 'Firebase Sync', desc: 'Firestore + RTDB' },
    { icon: Search, label: 'FastAPI Core', desc: 'Async inference' },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-deep-900 relative">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-400/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-deep-800 border border-border text-xs font-mono text-teal-100 uppercase tracking-wider mb-5">
              System Operation
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.1]">
              How FloodGuard Works
            </h2>
            <p className="mt-5 text-text-secondary text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Three phases from sensor deployment to actionable intelligence. Autonomous operation with zero manual intervention required.
            </p>
          </ScrollReveal>
        </div>

        {/* Three Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-20">
          {steps.map((step, idx) => (
            <ScrollReveal key={step.number} variant="fadeUp" delay={idx * 0.1}>
              <div className="group relative bg-surface border border-border rounded-2xl p-6 sm:p-8 h-full flex flex-col transition-all duration-300 hover:border-teal-400/40 hover:shadow-xl hover:shadow-teal-400/10">
                {/* Step Number */}
                <div className="absolute top-6 right-6 text-5xl md:text-6xl font-display font-bold text-white/5" aria-hidden="true">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${step.bgColor} flex items-center justify-center mb-6 relative z-10 group-hover:scale-105 transition-transform duration-300`}>
                  <step.icon className={`w-7 h-7 ${step.iconColor}`} aria-hidden="true" />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary mb-3 relative z-10">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed flex-1 relative z-10">
                  {step.description}
                </p>

                {/* Connector Arrow (desktop only) */}
                {idx < 2 && (
                  <div className="hidden lg:block absolute top-14 right-[-24px] w-12 h-1 flex items-center justify-center z-10">
                    <div className="w-full h-0.5 bg-gradient-to-r from-border to-teal-400/40" />
                    <ArrowRight className="w-5 h-5 text-teal-400/60 -ml-2" />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}

          {/* Mobile connectors */}
          <div className="lg:hidden grid grid-cols-2 gap-6 mt-8">
            <div className="flex items-center justify-center">
              <div className="w-0.5 h-12 bg-gradient-to-b from-teal-400/40 to-border" />
            </div>
            <div className="flex items-center justify-center">
              <div className="w-0.5 h-12 bg-gradient-to-b from-teal-400/40 to-border" />
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="border-t border-border/50 pt-16">
          <div className="text-center mb-12">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-text-primary mb-2">
              Technology Stack
            </h3>
            <p className="text-text-secondary text-sm max-w-xl mx-auto">
              Purpose-built hardware and software architecture for resilient field deployment.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech, idx) => (
              <ScrollReveal key={tech.label} variant="fadeUp" delay={idx * 0.08}>
                <div className="bg-surface border border-border rounded-xl p-5 text-center hover:border-teal-400/40 hover:bg-surface-elevated transition-all duration-300 group">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-deep-800 border border-border flex items-center justify-center text-teal-400 group-hover:bg-teal-400 group-hover:text-text-primary transition-all duration-300">
                    <tech.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="font-display font-semibold text-text-primary text-sm mb-1">
                    {tech.label}
                  </div>
                  <div className="text-xs text-text-muted">
                    {tech.desc}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-400 to-teal-500 text-text-primary font-semibold rounded-xl shadow-lg shadow-teal-400/25 hover:from-teal-500 hover:to-teal-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span>View Live Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
