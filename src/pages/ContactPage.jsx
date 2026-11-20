import { Mail, Droplets, MapPin, Phone, ShieldCheck } from 'lucide-react';
import GlowButton from '@/components/core/GlowButton';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-text-primary pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-5 md:px-8 space-y-8">
        <div className="pb-6 border-b border-border text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt/10 border border-cobalt/30 text-xs font-mono text-cobalt-light uppercase tracking-wider mb-2">
            Project Overview & Inquiries
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
            Smart Water Monitoring Platform
          </h1>
          <p className="text-text-secondary text-sm sm:text-base mt-2">
            Engineered for municipal authorities, water resource managers, and community stormwater protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Project Details */}
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 space-y-6">
            <h2 className="font-display font-bold text-xl text-text-primary">
              Mission & Core Objectives
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              DrainWatch was developed to transform reactive drainage management into proactive, telemetry-informed dispatch. By combining dual-depth transducers with real-time flow measurement, the system empowers crews to inspect localized canal blockages before water crests street level.
            </p>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-cobalt shrink-0 mt-0.5" />
                <div className="text-xs font-mono text-text-secondary">
                  <strong className="text-text-primary">Physical Verification Standard:</strong> Every alert triggers a prompt for visual inspection. The platform assists human decision-making with high-confidence indicators.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Droplets className="w-5 h-5 text-cobalt-light shrink-0 mt-0.5" />
                <div className="text-xs font-mono text-text-secondary">
                  <strong className="text-text-primary">Scalable Deployment:</strong> Built on industry-standard ESP32 edge microcontrollers and 4G cellular links to function without localized Wi-Fi infrastructure.
                </div>
              </div>
            </div>
          </div>

          {/* Contact / Inquiries Box */}
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 space-y-6">
            <h2 className="font-display font-bold text-xl text-text-primary">
              Municipal & Technical Contact
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              For technical integration assistance, API telemetry schemas, or regional pilot deployment inquiries, reach out to the project engineering group.
            </p>

            <div className="space-y-4 text-xs font-mono text-text-secondary">
              <div className="p-3.5 rounded-xl bg-navy-900 border border-border flex items-center gap-3">
                <Mail className="w-4 h-4 text-cobalt" />
                <span>telemetry@drainwatch-monitor.local</span>
              </div>
              <div className="p-3.5 rounded-xl bg-navy-900 border border-border flex items-center gap-3">
                <MapPin className="w-4 h-4 text-cobalt-light" />
                <span>Stormwater Monitoring Division · Drainage Sector 4</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <GlowButton
                href="/dashboard"
                variant="primary"
                size="md"
                className="w-full justify-center"
              >
                Access Live Monitoring Console
              </GlowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
