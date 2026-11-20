import { useState, useEffect, useCallback, useRef } from 'react';
import { api, generateDemoReading, generateDemoHistory } from '@/services/api';

// Hook to fetch data from API with demo fallback
export function useApiData(fetcher, deps = [], interval = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemo, setIsDemo] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const result = await fetcher();
      setData(result);
      setIsDemo(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsDemo(true);
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    fetchData();
    if (interval) {
      const id = setInterval(fetchData, interval);
      return () => clearInterval(id);
    }
  }, [fetchData, interval]);

  return { data, loading, error, isDemo, refetch: fetchData };
}

// Hook for current readings with demo fallback
export function useCurrentReadings(deviceId = 'DRAIN_001') {
  const [reading, setReading] = useState(null);
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scenario, setScenario] = useState('normal');
  const intervalRef = useRef(null);

  const fetchLive = useCallback(async () => {
    try {
      const data = await api.getCurrentReadings(deviceId);
      setReading(data);
      setIsDemo(false);
    } catch {
      setReading(generateDemoReading(scenario));
      setIsDemo(true);
    } finally {
      setLoading(false);
    }
  }, [deviceId, scenario]);

  useEffect(() => {
    fetchLive();
    intervalRef.current = setInterval(fetchLive, 2000);
    return () => clearInterval(intervalRef.current);
  }, [fetchLive]);

  return { reading, loading, isDemo, scenario, setScenario };
}

// Hook for historical data
export function useReadingsHistory(deviceId = 'DRAIN_001', hours = 24) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    async function fetch() {
      try {
        const data = await api.getReadingsHistory(deviceId, hours);
        setHistory(data);
        setIsDemo(false);
      } catch {
        setHistory(generateDemoHistory(60));
        setIsDemo(true);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [deviceId, hours]);

  return { history, loading, isDemo };
}

// Scroll position hook
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { scrollY, scrollProgress };
}

// Intersection observer hook
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.once !== false) observer.unobserve(el);
        } else if (options.once === false) {
          setInView(false);
        }
      },
      { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

// Detect touch device
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  return isTouch;
}

// Reduced motion preference
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return prefersReduced;
}
