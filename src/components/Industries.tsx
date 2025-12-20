import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Building2, Truck, ShoppingCart, Landmark, HeartPulse, Droplet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ============================================
// TYPES & INTERFACES
// ============================================
interface IndustryCardData {
  title: string;
  description: string;
  meta?: string;
  icon: LucideIcon;
  image: string;
  cta?: {
    label: string;
    href: string;
  };
}

interface AnimatedCardListProps {
  items: IndustryCardData[];
}

// ============================================
// ANIMATION VARIANTS
// ============================================

// Container variant for staggered children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Card variant: right-to-left slide-in
const cardVariants = {
  hidden: {
    x: 80,
    opacity: 0,
    scale: 0.98
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1], // cubic-bezier(.22,1,.36,1)
    },
  },
};

// Header variants: left-to-right slide-in
const headerVariants = {
  hidden: {
    x: -60,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Reduced motion variants (no transform, just fade)
const reducedMotionCardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// ============================================
// SAMPLE DATA
// ============================================
const industries: IndustryCardData[] = [
  {
    title: 'Real Estate',
    meta: 'Property Tech',
    description: 'Property management systems, virtual tours, and listing platforms',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&auto=format&fit=crop&q=60',
  },
  {
    title: 'Logistic',
    meta: 'Supply Chain',
    description: 'Supply chain management, fleet tracking, and delivery solutions',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60',
  },
  {
    title: 'ECommerce',
    meta: 'Digital Commerce',
    description: 'Online stores, payment gateways, and inventory management',
    icon: ShoppingCart,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format&fit=crop&q=60',
  },
  {
    title: 'Government',
    meta: 'Public Sector',
    description: 'Citizen portals, document management, and public services',
    icon: Landmark,
    image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=400&auto=format&fit=crop&q=60',
  },
  {
    title: 'Hotel Management',
    meta: 'Hospitality',
    description: 'Hotel  management systems, room booking, and guest services',
    icon: HeartPulse,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop&q=60',
  },
  {
    title: 'Oil & Gas',
    meta: 'Energy Sector',
    description: 'Asset tracking, safety compliance, and production monitoring',
    icon: Droplet,
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=400&auto=format&fit=crop&q=60',
  },
];

// ============================================
// ANIMATED CARD COMPONENT
// ============================================
function AnimatedCard({ item, shouldReduceMotion }: { item: IndustryCardData; shouldReduceMotion: boolean }) {
  const Icon = item.icon;
  const variants = shouldReduceMotion ? reducedMotionCardVariants : cardVariants;

  return (
    <motion.div
      variants={variants}
      className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

        {/* Icon badge */}
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/90 to-red-500/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-3">
        {/* Meta text */}
        {item.meta && (
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
            {item.meta}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed">
          {item.description}
        </p>

        {/* Optional CTA */}
        {item.cta && (
          <a
            href={item.cta.href}
            className="inline-flex items-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors mt-2"
          >
            {item.cta.label}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// ANIMATED CARD LIST (REUSABLE)
// ============================================
export function AnimatedCardList({ items }: AnimatedCardListProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {items.map((item) => (
        <AnimatedCard
          key={item.title}
          item={item}
          shouldReduceMotion={shouldReduceMotion ?? false}
        />
      ))}
    </motion.div>
  );
}

// ============================================
// MAIN INDUSTRIES COMPONENT
// ============================================
export function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="industries" className="py-24 relative overflow-hidden bg-slate-950" ref={sectionRef}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12 mb-16"
        >
          <div className="space-y-6">
            <motion.h2
              variants={shouldReduceMotion ? reducedMotionCardVariants : headerVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
            >
              Solutions for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Every Industry
              </span>
            </motion.h2>

            <motion.p
              variants={shouldReduceMotion ? reducedMotionCardVariants : headerVariants}
              className="text-lg text-slate-400 max-w-xl leading-relaxed"
            >
              We have extensive experience working with clients across various sectors, delivering tailored solutions that address industry-specific challenges.
            </motion.p>
          </div>
        </motion.div>

        {/* Animated Card Grid */}
        <AnimatedCardList items={industries} />
      </div>
    </section>
  );
}
