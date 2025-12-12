import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Palette, Code, Globe, Smartphone, Settings, Check } from 'lucide-react';

const services = [
  {
    id: 'design',
    title: 'Evaluation & Design',
    icon: Palette,
    image: '/design.png',
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
    image: '/software.png',
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
    image: '/services-abstract.png',
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
    image: '/mobile.png',
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
    image: '/maintenance.png',
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

// Animation variants for left-to-right slide-in
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const slideInVariants = {
  hidden: {
    x: -80,
    opacity: 0,
    scale: 0.95
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const tabVariants = {
  hidden: {
    x: -50,
    opacity: 0,
    scale: 0.95
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const contentVariants = {
  hidden: {
    x: -80,
    opacity: 0,
    scale: 0.95
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
  exit: {
    x: 80,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: "easeIn" as const,
    },
  },
};

const imageVariants = {
  hidden: {
    x: -120,
    opacity: 0,
    scale: 0.9
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut" as const,
    },
  },
};

const floatAnimation = {
  y: [0, 15, 0],
  rotate: [0, 2, 0],
  transition: {
    duration: 6,
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
};

export function Services() {
  const [activeTab, setActiveTab] = useState('design');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const activeService = services.find(s => s.id === activeTab)!;

  const handleTabChange = (id: string) => {
    if (id === activeTab) return;
    setActiveTab(id);
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-slate-950" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header - Slide in from left */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16 space-y-4"
        >
          <motion.h2
            variants={slideInVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Expertise</span>
          </motion.h2>
          <motion.p
            variants={slideInVariants}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Comprehensive solutions engineered for scale, performance, and impact.
          </motion.p>
        </motion.div>

        {/* Tabs - Staggered slide in from left */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {services.map((service) => (
            <motion.button
              key={service.id}
              variants={tabVariants}
              onClick={() => handleTabChange(service.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border border-transparent
                ${activeTab === service.id
                  ? 'bg-[#ff5a2a] text-white shadow-[0_6px_20px_rgba(255,90,42,0.25)]'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}
            >
              {service.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Main Content Card - Animated on tab change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
          >
            <div className="grid lg:grid-cols-2 gap-0 lg:gap-12 items-center p-8 lg:p-12">

              {/* Visual Side - Image slides in from left */}
              <motion.div
                className="relative h-[300px] lg:h-[400px] flex items-center justify-center order-2 lg:order-1"
                variants={imageVariants}
              >
                {/* 3D Asset with float animation */}
                <motion.div
                  className="relative z-10 w-full h-full flex items-center justify-center"
                  animate={floatAnimation}
                >
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-auto h-full max-h-[350px] object-contain drop-shadow-2xl [mix-blend-mode:screen]"
                  />
                </motion.div>
                {/* Glow behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px]" />
              </motion.div>

              {/* Text Side - Staggered slide in */}
              <motion.div
                className="space-y-8 order-1 lg:order-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={slideInVariants} className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold tracking-wider uppercase">
                    <activeService.icon className="w-3 h-3" />
                    {activeService.title}
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white">
                    {activeService.title}
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    {activeService.description}
                  </p>
                </motion.div>

                <motion.div
                  className="grid sm:grid-cols-2 gap-4"
                  variants={containerVariants}
                >
                  {activeService.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      variants={slideInVariants}
                      className="flex items-start gap-3 group"
                    >
                      <div className="mt-1 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff5a2a] transition-colors duration-300">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
