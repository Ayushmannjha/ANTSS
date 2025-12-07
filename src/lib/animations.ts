// Animation variants for Framer Motion
export const fadeInRight = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

export const zoomIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Animation transition presets
export const defaultTransition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
};

export const slowTransition = {
  duration: 0.9,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15
};

// Delay helper
export const withDelay = (delay: number) => ({
  duration: 0.6,
  delay: delay / 1000,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
});

export const withSlowDelay = (delay: number) => ({
  duration: 0.9,
  delay: delay / 1000,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
});
