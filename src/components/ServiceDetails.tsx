import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Circle, Check } from 'lucide-react';
import { fadeInRight, fadeInLeft, fadeInDown, withDelay } from '@/lib/animations';

const serviceDetails = [
  {
    title: 'Discovery & Planning',
    description: 'We start by understanding your business goals, target audience, and project requirements.',
    features: [
      'Requirements gathering',
      'Market research',
      'Technical feasibility analysis',
      'Project roadmap creation',
    ],
    animation: fadeInRight,
    delay: 400,
  },
  {
    title: 'UI/UX Design',
    description: 'Our designers create intuitive and visually appealing interfaces that engage users.',
    features: [
      'User research & personas',
      'Wireframing & prototyping',
      'Visual design systems',
      'Usability testing',
    ],
    animation: fadeInLeft,
    delay: 800,
  },
  {
    title: 'Development',
    description: 'Our developers bring designs to life using modern technologies and best practices.',
    features: [
      'Agile development sprints',
      'Code reviews & quality checks',
      'Continuous integration',
      'Performance optimization',
    ],
    animation: fadeInRight,
    delay: 400,
  },
  {
    title: 'Quality Assurance',
    description: 'Rigorous testing ensures your product is bug-free and performs flawlessly.',
    features: [
      'Automated testing',
      'Manual QA testing',
      'Performance testing',
      'Security audits',
    ],
    animation: fadeInDown,
    delay: 1200,
  },
  {
    title: 'Deployment',
    description: 'We handle the launch process to ensure a smooth transition to production.',
    features: [
      'Cloud infrastructure setup',
      'CI/CD pipeline configuration',
      'Database migration',
      'Monitoring setup',
    ],
    animation: fadeInRight,
    delay: 1400,
  },
  {
    title: 'Support & Maintenance',
    description: 'Ongoing support to keep your application running smoothly and up-to-date.',
    features: [
      '24/7 technical support',
      'Regular updates & patches',
      'Performance monitoring',
      'Feature enhancements',
    ],
    animation: fadeInLeft,
    delay: 800,
  },
];

export function ServiceDetails() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 to-slate-900" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-red-500/20 rounded-full filter blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            variants={fadeInDown}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(0)}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              Process
            </span>
          </motion.h2>
          
          <motion.p
            variants={fadeInDown}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(500)}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            A systematic approach to deliver exceptional results every time.
          </motion.p>
        </div>

        {/* Service Details Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceDetails.map((service, index) => (
            <motion.div
              key={service.title}
              variants={service.animation}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={withDelay(service.delay)}
              whileHover={{ y: -5 }}
              className="glass-card p-6 relative group"
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: (service.delay + featureIndex * 100) / 1000 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Circle className="w-2 h-2 text-orange-400 fill-orange-400" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Hover indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-orange-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
