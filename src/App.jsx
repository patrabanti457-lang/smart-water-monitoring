import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import CustomCursor from '@/components/core/CustomCursor';
import ScrollProgress from '@/components/layout/ScrollProgress';
import Navbar from '@/components/layout/Navbar';
import { Dock } from '@/components/core/dock';

// Lazy load pages for optimal initial chunk load
const LandingPage = lazy(() => import('@/pages/LandingPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const AlertsPage = lazy(() => import('@/pages/AlertsPage'));
const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'));
const SystemPage = lazy(() => import('@/pages/SystemPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-cobalt border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
        <span className="text-xs font-mono text-text-muted">LOADING TELEMETRY...</span>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-navy-900 text-text-primary selection:bg-cobalt/30 selection:text-white relative">
      {/* Custom Spring Cursor (active on non-touch desktop) */}
      <CustomCursor />

      {/* Top Scrolling Progress Bar */}
      <ScrollProgress />

      {/* Top Fixed Navigation */}
      <Navbar />

      {/* Animated Route Transitions */}
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/system" element={<SystemPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>

      {/* Apple-Style Floating Dock Navigation */}
      <Dock />
    </div>
  );
}
