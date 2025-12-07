import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { zoomIn, fadeInRight, fadeInLeft, fadeInDown, withDelay, withSlowDelay } from '@/lib/animations';

const caseStudies = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Complete e-commerce solution with inventory management and payment integration.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&auto=format&fit=crop&q=60',
    stats: [
      { label: 'Sales Increase', value: '150%' },
      { label: 'Page Speed', value: '2.1s' },
    ],
  },
  {
    title: 'Healthcare App',
    category: 'Mobile Development',
    description: 'Telemedicine platform connecting patients with healthcare providers.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=60',
    stats: [
      { label: 'Active Users', value: '50K+' },
      { label: 'Rating', value: '4.9' },
    ],
  },
  {
    title: 'Logistics Dashboard',
    category: 'Enterprise Software',
    description: 'Real-time tracking and fleet management system for logistics companies.',
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&auto=format&fit=crop&q=60',
    stats: [
      { label: 'Efficiency', value: '+40%' },
      { label: 'Cost Saved', value: '25%' },
    ],
  },
];

export function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="case-studies" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 to-slate-900" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            variants={zoomIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(0)}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Case Studies
            </span>
          </motion.h2>
          
          <motion.p
            variants={fadeInDown}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(500)}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Explore our portfolio of successful projects across various industries and technologies.
          </motion.p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => {
            const variants = index === 0 ? fadeInRight : index === 1 ? fadeInDown : fadeInLeft;
            const delay = index === 0 ? 900 : index === 1 ? 0 : 900;
            
            return (
              <motion.div
                key={study.title}
                variants={variants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={withSlowDelay(delay)}
                whileHover={{ y: -10 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium text-white bg-purple-500/80 backdrop-blur-sm rounded-full">
                      {study.category}
                    </span>
                  </div>

                  {/* External Link */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {study.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4">
                    {study.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-6 mb-4">
                    {study.stats.map((stat) => (
                      <div key={stat.label}>
                        <div className="text-lg font-bold text-purple-400">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* View Button */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-purple-400 font-medium text-sm group/btn"
                  >
                    View Case Study
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          variants={fadeInDown}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={withDelay(800)}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
            className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            All Case Studies
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
