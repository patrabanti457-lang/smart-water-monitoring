import { Link } from 'react-router-dom';
import { Droplets, Heart, Globe, Mail, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Overview', to: '/' },
    { label: 'Problem', hash: '#about' },
    { label: 'How It Works', hash: '#how-it-works' },
    { label: 'Technology', hash: '#technology' },
    { label: 'Monitoring', hash: '#features' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Alerts', to: '/alerts' },
    { label: 'Contact', to: '/contact' },
  ];

  const footerLinks = {
    Product: [
      { label: 'Live Dashboard', to: '/dashboard' },
      { label: 'Historical Analytics', to: '/analytics' },
      { label: 'Alert Management', to: '/alerts' },
      { label: 'System Diagnostics', to: '/system' },
      { label: 'API Documentation', to: '/api-docs' },
    ],
    Company: [
      { label: 'About FloodGuard', to: '/about' },
      { label: 'Technology Stack', to: '/technology' },
      { label: 'Deployment Guide', to: '/deploy' },
      { label: 'Careers', to: '/careers' },
      { label: 'Blog', to: '/blog' },
    ],
    Resources: [
      { label: 'Documentation', to: '/docs' },
      { label: 'ESP32 Firmware', to: '/firmware' },
      { label: 'Integration Guide', to: '/integrate' },
      { label: 'Support', to: '/support' },
      { label: 'Status Page', to: '/status' },
    ],
    Legal: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Cookie Policy', to: '/cookies' },
      { label: 'Security', to: '/security' },
      { label: 'Compliance', to: '/compliance' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/floodguard', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/floodguard', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/floodguard', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@floodguard.example', label: 'Email' },
  ];

  return (
    <footer id="contact" className="bg-deep-950 border-t border-border pt-16 pb-12 md:pb-16 text-text-secondary text-sm">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 pb-12 border-b border-border/60">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-teal-400/20 border border-teal-400/40 flex items-center justify-center text-teal-400">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-text-primary">
                Flood<span className="text-teal-100">Guard</span>
              </span>
            </div>
            <p className="text-text-muted leading-relaxed max-w-xs font-light">
              Smart Water Level, Flow & Possible Blockage Monitoring Platform. Engineered for real-time stormwater and urban drainage resilience.
            </p>
            <div className="text-xs font-mono text-text-muted pt-2">
              Stack: ESP32 · SIM7600CE 4G · FastAPI · Firebase · React
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-deep-800 border border-border flex items-center justify-center text-text-muted hover:text-teal-100 hover:border-teal-400/40 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="col-span-2 md:col-span-2">
            <h4 className="font-display font-semibold text-text-primary text-sm uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.Product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-text-muted hover:text-teal-100 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-2 md:col-span-2">
            <h4 className="font-display font-semibold text-text-primary text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.Company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-text-muted hover:text-teal-100 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="col-span-2 md:col-span-2">
            <h4 className="font-display font-semibold text-text-primary text-sm uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.Resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-text-muted hover:text-teal-100 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-span-2 md:col-span-2">
            <h4 className="font-display font-semibold text-text-primary text-sm uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.Legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-text-muted hover:text-teal-100 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3">
            <span>&copy; {currentYear} FloodGuard Platform. All rights reserved.</span>
            <span className="w-1 h-1 rounded-full bg-border/50 sm:w-px sm:h-4 sm:rounded-none hidden sm:block" />
            <span>Deep Navy & Teal Architecture</span>
            <span className="w-1 h-1 rounded-full bg-border/50 sm:w-px sm:h-4 sm:rounded-none hidden sm:block" />
            <span>Built for Safer Communities</span>
          </div>

          <div className="flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-alert-red" aria-hidden="true" />
            <span className="font-normal">Made with care for municipal resilience</span>
          </div>
        </div>
      </div>
    </footer>
  );
}