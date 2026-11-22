import { motion } from 'framer-motion';
import { Search, ArrowRight, Droplets, Waves, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background - Water infrastructure with atmospheric gradient */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/assets/water-infrastructure-4k.png"
          alt="Urban drainage infrastructure monitoring"
          className="w-full h-full object-cover scale-105"
        />
        {/* Dark atmospheric overlay with teal accent from Color Hunt palette */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-950/90 via-deep-900/70 to-deep-800/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-400/10 via-transparent to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-teal-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-alert-red/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-xs font-mono text-teal-100 uppercase tracking-wider mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          Live Telemetry Active
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1] mb-6 max-w-4xl"
        >
          Smart Water Level, Flow &{' '}
          <span className="text-teal-100">Possible Blockage</span>{' '}
          Monitoring
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-text-secondary text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10 font-light leading-relaxed"
        >
          ESP32 dual-sensor telemetry with 4G uplink. Real-time differential depth analysis
          flags flow restrictions before flood damage occurs.
        </motion.p>

        {/* Search/Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl"
        >
          {/* Search Input */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <label htmlFor="location-search" className="sr-only">Search monitoring location</label>
              <input
                id="location-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter drainage zone, sensor ID, or coordinates..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 pl-12 text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-transparent transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" aria-hidden="true" />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-400/25 hover:from-teal-500 hover:to-teal-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 whitespace-nowrap"
              aria-label="Search monitoring zones"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Stats */}
          <div className="mt-5 pt-5 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-teal-100">
              <Droplets className="w-3.5 h-3.5" />
              <span>Upstream / Downstream</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Waves className="w-3.5 h-3.5" />
              <span>Flow Rate L/min</span>
            </div>
            <div className="flex items-center gap-1.5 text-alert-red">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Blockage Alerts</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>System Health</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="text-xs font-mono uppercase tracking-wider">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-5 border-2 border-white/20 rounded-full flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 bg-white/40 rounded-full"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
