import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Droplets } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', hash: '#about' },
    { label: 'How It Works', hash: '#how-it-works' },
    { label: 'Technology', hash: '#technology' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Alerts', to: '/alerts' },
    { label: 'Contact', to: '/contact' },
  ];

  const handleNavClick = (e, link) => {
    setMobileMenuOpen(false);

    if (link.hash) {
      e.preventDefault();
      if (location.pathname === '/') {
        const el = document.querySelector(link.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/${link.hash}`);
        setTimeout(() => {
          const el = document.querySelector(link.hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16',
        scrolled
          ? 'bg-navy-900/90 backdrop-blur-xl border-b border-border shadow-lg shadow-navy-950/50'
          : 'bg-navy-900/50 backdrop-blur-md border-b border-border/40'
      )}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group cursor-pointer"
          data-cursor="explore"
        >
          <div className="w-8 h-8 rounded-lg bg-cobalt/20 border border-cobalt/40 flex items-center justify-center text-cobalt group-hover:bg-cobalt group-hover:text-text-primary transition-all duration-300">
            <Droplets className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight text-text-primary">
              Drain<span className="text-cobalt-light">Watch</span>
            </span>
            <span className="text-[10px] text-text-muted font-mono leading-none -mt-0.5 tracking-wider uppercase">
              Smart Water System
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isRoute = Boolean(link.to);
            const isActive = isRoute && location.pathname === link.to;

            if (link.hash) {
              return (
                <a
                  key={link.label}
                  href={`/${link.hash}`}
                  onClick={(e) => handleNavClick(e, link)}
                  className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-navy-800/60 transition-all duration-200 cursor-pointer"
                >
                  {link.label}
                </a>
              );
            }

            return (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={(e) => handleNavClick(e, link)}
                className={clsx(
                  'px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative cursor-pointer',
                  isActive
                    ? 'text-text-primary font-semibold'
                    : 'text-text-secondary hover:text-text-primary hover:bg-navy-800/60'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-cobalt rounded-full shadow-[0_0_8px_#2563EB]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop Status Pulse Indicator */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-800/80 border border-border hover:border-cobalt/50 transition-colors duration-200 text-xs font-mono text-text-secondary hover:text-text-primary cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>SYSTEM ACTIVE</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-navy-800/80 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-navy-900/98 border-b border-border backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={(e) => {
                    handleNavClick(e, link);
                    if (link.to) navigate(link.to);
                  }}
                  className="w-full text-left block px-4 py-2.5 rounded-lg text-base font-medium text-text-secondary hover:text-text-primary hover:bg-navy-800/80 transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 border-t border-navy-800 mt-2">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 px-4 text-center rounded-lg bg-cobalt hover:bg-cobalt-light text-text-primary font-medium text-sm transition-colors cursor-pointer"
                >
                  Open Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
