import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Palette, Code, Globe, Smartphone, Settings, ArrowRight, Check } from 'lucide-react';
import { fadeInLeft, fadeInDown, zoomIn, withDelay, withSlowDelay } from '@/lib/animations';

const services = [
  {
    id: 'design',
    title: 'Evaluation & Design',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=60',
    description: 'We analyze your requirements and create stunning designs that align with your brand identity and user expectations.',
    features: [
      'UI/UX Research & Analysis',
      'Wireframing & Prototyping',
      'Visual Design Systems',
      'User Testing & Validation',
      'Brand Identity Integration',
    ],
  },
  {
    id: 'software',
    title: 'Custom Software',
    icon: Code,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60',
    description: 'Tailored software solutions built from scratch to address your unique business challenges and requirements.',
    features: [
      'Enterprise Applications',
      'Process Automation',
      'Integration Solutions',
      'Legacy System Modernization',
      'API Development',
    ],
  },
  {
    id: 'web',
    title: 'Web Development',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60',
    description: 'Modern, responsive web applications built with cutting-edge technologies for optimal performance.',
    features: [
      'Progressive Web Apps',
      'E-commerce Platforms',
      'Content Management Systems',
      'Web Portals & Dashboards',
      'Real-time Applications',
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=60',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    features: [
      'iOS & Android Apps',
      'Cross-platform Solutions',
      'Mobile-first Design',
      'App Store Optimization',
      'Push Notifications',
    ],
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    icon: Settings,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60',
    description: 'Ongoing support and maintenance to ensure your applications run smoothly and stay up-to-date.',
    features: [
      '24/7 Technical Support',
      'Performance Monitoring',
      'Security Updates',
      'Bug Fixes & Patches',
      'Feature Enhancements',
    ],
  },
];

export function Services() {
  const [activeTab, setActiveTab] = useState('design');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const activeService = services.find(s => s.id === activeTab)!;

  return (
    <section id="services" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-900/95" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-500/20 rounded-full filter blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(0)}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Services
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInDown}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(500)}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            We offer comprehensive software development services tailored to your needs
          </motion.p>
        </div>

        {/* Tabs */}
        <motion.div
          variants={fadeInDown}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={withDelay(800)}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                className={`px-4 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                  activeTab === service.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{service.title}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <motion.div
              variants={zoomIn}
              initial="hidden"
              animate="visible"
              transition={withSlowDelay(900)}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 glass-card p-4">
                <activeService.icon className="w-8 h-8 text-purple-400" />
              </div>
            </motion.div>

            {/* Content */}
            <div className="space-y-6">
              <motion.h3
                variants={fadeInLeft}
                initial="hidden"
                animate="visible"
                transition={withDelay(0)}
                className="text-3xl font-bold text-white"
              >
                {activeService.title}
              </motion.h3>

              <motion.p
                variants={fadeInDown}
                initial="hidden"
                animate="visible"
                transition={withDelay(500)}
                className="text-gray-400"
              >
                {activeService.description}
              </motion.p>

              <motion.ul
                variants={fadeInDown}
                initial="hidden"
                animate="visible"
                transition={withDelay(800)}
                className="space-y-3"
              >
                {activeService.features.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button
                variants={fadeInDown}
                initial="hidden"
                animate="visible"
                transition={withDelay(1000)}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
