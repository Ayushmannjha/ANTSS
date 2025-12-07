import { useEffect, useState, useRef } from 'react';
import { useInView, useMotionValue, useSpring, MotionValue } from 'framer-motion';

// Hook for counting animation
export function useCountUp(
  end: number,
  duration: number = 2000,
  startOnView: boolean = true
): { count: number; ref: React.RefObject<HTMLDivElement> } {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!startOnView || (inView && !hasStarted.current)) {
      hasStarted.current = true;
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOut * end));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [end, duration, inView, startOnView]);

  return { count, ref };
}

// Hook for scroll-triggered animations
export function useScrollAnimation(threshold: number = 0.1) {
  const ref = useRef<HTMLDivElement>(null!);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

// Hook for parallax effect
export function useParallax(value: MotionValue<number>, distance: number) {
  return useSpring(
    useMotionValue(0),
    { stiffness: 100, damping: 30 }
  );
}

// Hook for sticky header
export function useScrollHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isScrolled;
}

// Hook for reduced motion preference
export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}
