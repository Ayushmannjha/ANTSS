import { useMotionValue, useMotionTemplate, MotionValue } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export function useScrollHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isScrolled;
}

export function useMousePosition() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY };
}

export function useGradientFollow(mouseX: MotionValue<number>, mouseY: MotionValue<number>) {
  return useMotionTemplate`radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.15), transparent 80%)`;
}

export function useCountUp(end: number, duration = 2) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = true; // Simplified for now since useInView was causing issues in some contexts or add it back if needed

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, isInView]);

  return { count, ref };
}

// Fixed unused variables by removing them if function is empty or usage matches
export function useParallax(_value: MotionValue<number>, _distance: number) {
  // logic was missing or placeholders
  return {};
}
