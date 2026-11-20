import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplets,
  Radio,
  Cpu,
  Signal,
  Server,
  Database,
  Monitor,
  Users,
  ChevronRight,
  Activity,
  AlertCircle
} from 'lucide-react';
import clsx from 'clsx';
import ScrollReveal from '@/components/core/ScrollReveal';

const ARCHITECTURE_STEPS = [
  {
    id: 0,
    title: 'Water Monitoring',
    subtitle: 'Drainage Environment',
    tag: 'Monitored Segment',
    icon: Droplets,
    desc: 'The system continuously monitors water depth and flow dynamics in drainage culverts, canals, and stormwater collection areas.',
    telemetry: 'Real-time hydrological flow, level variance, stormwater surge',
    criticalNote: null,
  },
  {
    id: 1,
    title: 'Dual Sensor Collection',
    subtitle: 'Ultrasonic & Flow Meters',
    tag: 'Transducers',
    icon: Radio,
    desc: 'Measures upstream water level and downstream water level via dual non-contact transducers, accompanied by an interrupt-driven flow rate sensor and auxiliary float switch.',
    telemetry: 'Upstream ADC / Distance, Downstream ADC, Pulse Frequency (Hz)',
    criticalNote: null,
  },
  {
    id: 2,
    title: 'ESP32 Controller',
    subtitle: 'Edge Decision Engine',
    tag: 'Edge Processing',
    icon: Cpu,
    desc: 'The ESP32 controller samples ADC readings every 250ms, computes flow rate windows, tests calibrated thresholds, and generates multi-reading condition evaluations.',
    telemetry: 'Difference = Upstream - Downstream; Threshold = 60cm; Flow < 2L/min',
    criticalNote: 'Executes non-blocking millis() scheduled task cycles',
  },
  {
    id: 3,
    title: 'SIM7600CE 4G Link',
    subtitle: 'Cellular Telemetry Uplink',
    tag: 'Cellular Uplink',
    icon: Signal,
    desc: 'Transmits JSON structured telemetry packets over high-speed cellular networks to eliminate dependency on local Wi-Fi in remote drainage locations.',
    telemetry: 'LTE Band support, HTTP POST payload, fallback retry buffers',
    criticalNote: null,
  },
  {
    id: 4,
    title: 'FastAPI Backend',
    subtitle: 'High-Throughput Validation',
    tag: 'Cloud Gateway',
    icon: Server,
    desc: 'Ingests incoming telemetry, validates schema integrity, sanitizes sensor bounds, evaluates secondary blockage criteria, and attaches microsecond timestamps.',
    telemetry: 'Pydantic schema validation, status evaluation, REST endpoints',
    criticalNote: null,
  },
  {
    id: 5,
    title: 'Firebase Database',
    subtitle: 'Realtime Storage & History',
    tag: 'Persistent Store',
    icon: Database,
    desc: 'Stores validated readings, active alerts, and time-series telemetry so historical curves, daily aggregates, and event logs can be retrieved reliably.',
    telemetry: 'Collections: /readings, /alerts, /devices; Realtime indexing',
    criticalNote: 'Zero credentials exposed on client bundle',
  },
  {
    id: 6,
    title: 'React Dashboard',
    subtitle: 'Cinematic Command Center',
    tag: 'Operator UI',
    icon: Monitor,
    desc: 'Renders live dual-tank water depth animations, responsive Recharts trends, diagnostic status badges, and device health indicators in real time.',
    telemetry: 'Framer motion visualizers, WebSocket / polling refresh, offline states',
    criticalNote: null,
  },
  {
    id: 7,
    title: 'Maintenance Team',
    subtitle: 'Targeted Field Response',
    tag: 'Physical Verification',
    icon: Users,
    desc: 'Field crew receives categorized notifications (High Water, Low Flow, Possible Blockage) with exact coordinate references to inspect and clear the physical segment.',
    telemetry: 'Incident acknowledgment, prompt dispatch, physical confirmation',
    criticalNote: 'Physical inspection is mandatory to confirm blockages',
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [simulatedAlertActive, setSimulatedAlertActive] = useState(false);
  const stepRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Activate step when its top is within the middle third of the viewport
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.3) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-800 border border-border text-xs font-mono text-cobalt-light uppercase tracking-wider mb-4">
              End-To-End Architecture
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight">
              From the Drain to the Maintenance Team
            </h2>
            <p className="mt-4 text-text-secondary text-base sm:text-lg">
              Follow the complete telemetry pathway through embedded edge controllers, cellular uplinks, cloud validation, and actionable municipal dispatch.
            </p>
          </ScrollReveal>

          {/* Interactive alert simulation toggle */}
          <div className="mt-6 inline-flex items-center gap-3 p-1.5 rounded-full bg-navy-800 border border-border">
            <button
              onClick={() => setSimulatedAlertActive(false)}
              className={clsx(
                'px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200',
                !simulatedAlertActive
                  ? 'bg-cobalt text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              Normal Telemetry Flow
            </button>
            <button
              onClick={() => setSimulatedAlertActive(true)}
              className={clsx(
                'px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5',
                simulatedAlertActive
                  ? 'bg-alert-red text-text-primary shadow-sm shadow-alert-red/30'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              Simulate Blockage Alert Path
            </button>
          </div>
        </div>

        {/* 2-Column Split: Left Steps + Right Sticky Architecture Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Narrative steps that drive scroll */}
          <div className="lg:col-span-7 space-y-12 lg:space-y-24">
            {ARCHITECTURE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.id}
                  ref={(el) => (stepRefs.current[idx] = el)}
                  onClick={() => setActiveStep(idx)}
                  className={clsx(
                    'p-6 sm:p-8 rounded-2xl transition-all duration-300 border cursor-pointer',
                    isActive
                      ? simulatedAlertActive && idx >= 2
                        ? 'bg-surface-elevated border-alert-red/50 shadow-lg shadow-alert-red/5'
                        : 'bg-surface-elevated border-cobalt/50 shadow-lg shadow-cobalt/10'
                      : 'bg-surface/50 border-border/60 opacity-60 hover:opacity-90'
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={clsx(
                          'w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm',
                          isActive
                            ? simulatedAlertActive && idx >= 2
                              ? 'bg-alert-red text-text-primary'
                              : 'bg-cobalt text-text-primary'
                            : 'bg-navy-800 text-text-muted border border-border'
                        )}
                      >
                        0{idx + 1}
                      </div>
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                          Stage {idx + 1}
                        </span>
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <span
                      className={clsx(
                        'text-xs font-mono px-3 py-1 rounded-full border',
                        isActive
                          ? 'border-cobalt/40 bg-cobalt/10 text-cobalt-light'
                          : 'border-border bg-navy-800 text-text-muted'
                      )}
                    >
                      {step.tag}
                    </span>
                  </div>

                  <p className="text-text-secondary text-base leading-relaxed mb-4">
                    {step.desc}
                  </p>

                  <div className="p-3.5 rounded-lg bg-navy-900/80 border border-border/80 font-mono text-xs text-text-secondary space-y-1">
                    <div className="text-text-muted uppercase text-[10px] tracking-wider">Payload / Function:</div>
                    <div className="text-text-primary">{step.telemetry}</div>
                  </div>

                  {step.criticalNote && (
                    <div className="mt-3 flex items-center gap-2 text-xs font-mono text-alert-red">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{step.criticalNote}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Diagram with Moving Data Packets */}
          <div className="hidden lg:block lg:col-span-5 sticky top-24 self-start">
            <div className="bg-surface rounded-2xl border border-border p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <div>
                  <div className="font-display font-semibold text-text-primary text-base">
                    Live Data Flow Circuit
                  </div>
                  <div className="text-xs font-mono text-text-muted">
                    {simulatedAlertActive ? 'STATE: POSSIBLE_BLOCKAGE ALERT' : 'STATE: NORMAL POLLING TELEMETRY'}
                  </div>
                </div>
                <div
                  className={clsx(
                    'w-3 h-3 rounded-full',
                    simulatedAlertActive ? 'bg-alert-red animate-ping' : 'bg-emerald-400 animate-pulse'
                  )}
                />
              </div>

              {/* Vertical node list */}
              <div className="space-y-2 relative">
                {ARCHITECTURE_STEPS.map((s, i) => {
                  const SIcon = s.icon;
                  const isCurrent = activeStep === s.id;
                  const isPassed = activeStep > s.id;
                  const isCritical = simulatedAlertActive && s.id >= 2;

                  return (
                    <div key={s.id} className="relative">
                      {/* Node button */}
                      <button
                        onClick={() => setActiveStep(s.id)}
                        className={clsx(
                          'w-full flex items-center gap-3.5 px-4 py-3 rounded-xl border text-left transition-all duration-300 relative z-10',
                          isCurrent
                            ? isCritical
                              ? 'bg-alert-red/10 border-alert-red text-text-primary shadow-md shadow-alert-red/10'
                              : 'bg-cobalt/15 border-cobalt text-text-primary shadow-md shadow-cobalt/20'
                            : isPassed
                            ? 'bg-navy-800/40 border-border/80 text-text-secondary'
                            : 'bg-navy-900/40 border-border/40 text-text-muted'
                        )}
                      >
                        <div
                          className={clsx(
                            'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                            isCurrent
                              ? isCritical
                                ? 'bg-alert-red text-text-primary'
                                : 'bg-cobalt text-text-primary'
                              : 'bg-navy-800 text-text-muted'
                          )}
                        >
                          <SIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-mono text-text-muted leading-none mb-1">
                            0{i + 1} · {s.tag}
                          </div>
                          <div className="font-display font-semibold text-sm truncate text-text-primary">
                            {s.title}
                          </div>
                        </div>

                        {isCurrent && (
                          <motion.div
                            layoutId="activePill"
                            className="w-2 h-2 rounded-full bg-cobalt shadow-[0_0_8px_#2563EB]"
                          />
                        )}
                      </button>

                      {/* Connecting Line between nodes */}
                      {i < ARCHITECTURE_STEPS.length - 1 && (
                        <div className="w-0.5 h-4 bg-navy-600 mx-auto my-0.5 relative overflow-hidden">
                          {(isPassed || isCurrent) && (
                            <motion.div
                              className={clsx(
                                'absolute top-0 left-0 right-0 h-2 rounded-full',
                                isCritical ? 'bg-alert-red' : 'bg-cobalt'
                              )}
                              animate={{ y: [-8, 20] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Active Node Detail Card */}
              <div className="mt-6 pt-5 border-t border-border">
                <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-1">
                  Active Subsystem Detail:
                </div>
                <div className="font-display font-bold text-base text-text-primary">
                  {ARCHITECTURE_STEPS[activeStep].title}
                </div>
                <div className="text-xs text-text-secondary mt-1">
                  {ARCHITECTURE_STEPS[activeStep].desc}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
