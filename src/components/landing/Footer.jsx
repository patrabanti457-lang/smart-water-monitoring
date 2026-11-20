import { Link } from 'react-router-dom';
import { Droplets, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy-950 border-t border-border pt-16 pb-28 text-text-secondary text-sm">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border/60">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cobalt/20 border border-cobalt/40 flex items-center justify-center text-cobalt">
                <Droplets className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-text-primary">
                Drain<span className="text-cobalt-light">Watch</span>
              </span>
            </div>
            <p className="text-text-muted leading-relaxed max-w-sm">
              Smart Water Level, Flow & Possible Blockage Monitoring Platform. Engineered for real-time stormwater and urban drainage resilience.
            </p>
            <div className="text-xs font-mono text-text-muted">
              Stack: ESP32 · SIM7600CE 4G · FastAPI · Firebase · React
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-display font-semibold text-text-primary text-sm uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-text-primary transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-text-primary transition-colors">
                  Live Dashboard
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-text-primary transition-colors">
                  Historical Analytics
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="hover:text-text-primary transition-colors">
                  Alert Management
                </Link>
              </li>
              <li>
                <Link to="/system" className="hover:text-text-primary transition-colors">
                  System Diagnostics
                </Link>
              </li>
            </ul>
          </div>

          {/* Operational Policy */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-display font-semibold text-text-primary text-sm uppercase tracking-wider">
              Operating Standard
            </div>
            <p className="text-text-muted text-xs leading-relaxed">
              <strong>Mandatory Protocol:</strong> Statuses flagged as <span className="text-cobalt-light">Possible Blockage</span> or <span className="text-alert-red">High Water Warning</span> are diagnostic prompts directing municipal teams to inspect specific canal sections. Physical inspection is mandatory for confirmation.
            </p>
            <div className="pt-2 text-xs font-mono text-text-muted">
              Device Channel: DRAIN_001 · SIM7600CE LTE Link
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div>
            &copy; {new Date().getFullYear()} DrainWatch Platform. All rights reserved.
          </div>
          <div>
            Midnight Navy & Cobalt Blue Architecture · Built for Safer Communities
          </div>
        </div>
      </div>
    </footer>
  );
}
