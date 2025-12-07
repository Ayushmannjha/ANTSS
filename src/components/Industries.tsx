import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Building2, Truck, ShoppingCart, Landmark, HeartPulse, Droplet, ArrowRight } from 'lucide-react';
import { fadeInLeft, fadeInRight, fadeInDown, zoomIn, withDelay, withSlowDelay } from '@/lib/animations';

const industries = [
  {
    title: 'Real Estate',
    description: 'Property management systems, virtual tours, and listing platforms',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&auto=format&fit=crop&q=60',
    delay: 0,
    slow: false,
  },
  {
    title: 'Logistic',
    description: 'Supply chain management, fleet tracking, and delivery solutions',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60',
    delay: 300,
    slow: false,
  },
  {
    title: 'ECommerce',
    description: 'Online stores, payment gateways, and inventory management',
    icon: ShoppingCart,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format&fit=crop&q=60',
    delay: 400,
    slow: true,
  },
  {
    title: 'Government',
    description: 'Citizen portals, document management, and public services',
    icon: Landmark,
    image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=400&auto=format&fit=crop&q=60',
    delay: 500,
    slow: true,
  },
  {
    title: 'Healthcare',
    description: 'Patient management, telemedicine, and medical records',
    icon: HeartPulse,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop&q=60',
    delay: 600,
    slow: true,
  },
  {
    title: 'Oil & Gas',
    description: 'Asset tracking, safety compliance, and production monitoring',
    icon: Droplet,
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=400&auto=format&fit=crop&q=60',
    delay: 700,
    slow: true,
  },
];

function IndustryCard({ industry, index }: { industry: typeof industries[0]; index: number }) {
  const Icon = industry.icon;
  
  return (
    <motion.div
      variants={fadeInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={industry.slow ? withSlowDelay(industry.delay) : withDelay(industry.delay)}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300"
    >
      {/* Image */}
      <motion.div
        variants={zoomIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={withSlowDelay(900)}
        className="relative h-48 overflow-hidden"
      >
        <img
          src={industry.image}
          alt={industry.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        
        {/* Icon badge */}
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/80 to-blue-500/80 backdrop-blur-sm flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-6">
        <motion.h3
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={withDelay(1400)}
          className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors"
        >
          {industry.title}
        </motion.h3>
        
        <motion.p
          variants={fadeInDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={withDelay(1800)}
          className="text-gray-400 text-sm"
        >
          {industry.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

export function Industries() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="industries" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 to-slate-900" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <motion.h2
              variants={fadeInLeft}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={withDelay(0)}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Industries{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                We Serve
              </span>
            </motion.h2>
            
            <motion.p
              variants={fadeInDown}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={withDelay(500)}
              className="text-gray-400 max-w-xl"
            >
              We have extensive experience working with clients across various sectors, delivering tailored solutions that address industry-specific challenges.
            </motion.p>
            
            <motion.button
              variants={fadeInDown}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={withDelay(800)}
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
            >
              Discover Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <IndustryCard key={industry.title} industry={industry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
