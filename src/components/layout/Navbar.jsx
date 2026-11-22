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
    { label: 'Overview', to: '/' },
    { label: 'Problem', hash: '#about' },
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
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 sm:px-6">
      <header
        className={clsx(
          'pointer-events-auto h-14 rounded-full transition-all duration-500 flex items-center px-4 sm:px-6 shadow-2xl w-full max-w-[1200px]',
          scrolled
            ? 'bg-deep-950/90 backdrop-blur-2xl border border-teal-400/20 shadow-teal-400/5'
            : 'bg-deep-950/70 backdrop-blur-xl border border-border/60 shadow-deep-950/20'
        )}
      >
        <div className="flex items-center justify-between gap-4 w-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group cursor-pointer shrink-0"
            data-cursor="explore"
            aria-label="FloodGuard Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center">
              <Droplets className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-text-primary" />
            </div>
            <span className="font-display font-bold text-base sm:text-lg tracking-tight text-text-primary hidden sm:block">
              Flood<span className="text-teal-100">Guard</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.slice(0, 5).map((link) => {
              const isRoute = Boolean(link.to);
              const isActive = isRoute && location.pathname === link.to;

              if (link.hash) {
                return (
                  <a
                    key={link.label}
                    href={`/${link.hash}`}
                    onClick={(e) => handleNavClick(e, link)}
                    className="px-4 py-2 rounded-full text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-teal-400/10 transition-all duration-200 cursor-pointer whitespace-nowrap"
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
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative cursor-pointer whitespace-nowrap',
                    isActive
                      ? 'text-text-primary font-semibold bg-teal-400/15 shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-teal-400/10'
                  )}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/contact"
              className="hidden sm:block px-6 py-2.5 rounded-full bg-teal-400 text-text-primary text-sm font-semibold shadow-lg shadow-teal-400/25 hover:shadow-teal-400/40 hover:scale-[1.02] transition-all duration-300"
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-teal-400/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden py-4 border-t border-border/60"
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isRoute = Boolean(link.to);
                  const isActive = isRoute && location.pathname === link.to;

                  if (link.hash) {
                    return (
                      <a
                        key={link.label}
                        href={`/${link.hash}`}
                        onClick={(e) => handleNavClick(e, link)}
                        className="px-4 py-3 rounded-xl text-base font-medium text-text-secondary hover:text-text-primary hover:bg-teal-400/10 transition-all duration-200"
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
                        'px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                        isActive
                          ? 'text-text-primary font-semibold bg-teal-400/15'
                          : 'text-text-secondary hover:text-text-primary hover:bg-teal-400/10'
                      )}
                    >
                      {link.label}
                    </NavLink>
                  );
                })}
                <Link
                  to="/contact"
                  className="mt-2 px-6 py-3 rounded-xl bg-teal-400 text-text-primary text-center font-semibold shadow-lg shadow-teal-400/25 hover:shadow-teal-400/40 transition-all duration-300"
                >
                  Get Started
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
