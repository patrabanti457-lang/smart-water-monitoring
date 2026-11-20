import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, BarChart3, Bell, Cpu, Mail } from 'lucide-react';
import clsx from 'clsx';

// ---------------------------------------------------------------------------
// Dock — Apple-style floating navigation
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Alerts', path: '/alerts', icon: Bell },
  { label: 'System', path: '/system', icon: Cpu },
  { label: 'Contact', path: '/contact', icon: Mail },
];

const MOBILE_ITEMS = NAV_ITEMS.slice(0, 5);

export function DockLabel({ children, isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.span
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.9 }}
          transition={{ duration: 0.15 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg
                     bg-navy-700 px-3 py-1 text-xs font-mono font-medium text-text-primary
                     border border-navy-500/70 shadow-xl pointer-events-none z-50"
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function DockIcon({ children, className }) {
  return (
    <span className={clsx('flex items-center justify-center text-current pointer-events-none', className)}>
      {children}
    </span>
  );
}

export function DockItem({ item, isActive, mouseX }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(null);

  const distanceFromMouse = useTransform(mouseX, (mx) => {
    if (!ref.current || mx < 0) return 999;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return Math.abs(mx - center);
  });

  const scale = useTransform(distanceFromMouse, [0, 80, 160], [1.18, 1.06, 1]);
  const Icon = item.icon;

  const handleClick = useCallback(() => {
    if (item.path === '/' && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate(item.path);
  }, [item, location.pathname, navigate]);

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ scale }}
      className={clsx(
        'relative flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-200 cursor-pointer',
        isActive
          ? 'bg-cobalt border-cobalt/60 text-white shadow-lg shadow-cobalt/30'
          : 'bg-navy-800 border-navy-500 text-text-secondary hover:text-text-primary hover:border-cobalt/50 hover:bg-navy-750'
      )}
      data-cursor="view"
      aria-label={item.label}
      whileTap={{ scale: 0.93 }}
    >
      <DockLabel isVisible={hovered}>{item.label}</DockLabel>
      <DockIcon>
        <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
      </DockIcon>
    </motion.button>
  );
}

export function Dock() {
  const { pathname } = useLocation();
  const mouseX = useMotionValue(-1);

  const handleMouseMove = useCallback((e) => mouseX.set(e.clientX), [mouseX]);
  const handleMouseLeave = useCallback(() => mouseX.set(-1), [mouseX]);

  const isActive = useCallback(
    (path) => {
      if (path === '/') return pathname === '/';
      return pathname.startsWith(path);
    },
    [pathname]
  );

  return (
    <>
      {/* Desktop Floating Dock */}
      <nav
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="fixed bottom-6 left-1/2 z-[100] hidden -translate-x-1/2 md:block select-none"
        aria-label="Main floating dock"
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
          className="flex items-center gap-2 rounded-2xl border border-navy-500/70
                     bg-navy-800/90 px-3 py-2.5 backdrop-blur-xl shadow-2xl shadow-black/50"
        >
          {NAV_ITEMS.map((item) => (
            <DockItem
              key={item.path}
              item={item}
              isActive={isActive(item.path)}
              mouseX={mouseX}
            />
          ))}
        </motion.div>
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <MobileTabBar items={MOBILE_ITEMS} isActive={isActive} />

      {/* Spacer so bottom page content is never covered */}
      <div className="h-24 md:h-28 w-full pointer-events-none" aria-hidden="true" />
    </>
  );
}

function MobileTabBar({ items, isActive }) {
  const navigate = useNavigate();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[100] flex md:hidden border-t border-navy-500/60
                 bg-navy-900/95 backdrop-blur-xl safe-bottom select-none"
      aria-label="Mobile navigation"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={clsx(
              'flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-mono font-medium transition-colors cursor-pointer',
              active ? 'text-cobalt font-bold' : 'text-text-secondary hover:text-text-primary'
            )}
            aria-label={item.label}
            aria-current={active ? 'page' : undefined}
          >
            <Icon size={20} strokeWidth={active ? 2.2 : 1.6} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default Dock;
