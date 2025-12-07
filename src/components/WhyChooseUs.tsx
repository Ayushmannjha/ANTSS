import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { zoomIn, fadeInDown, fadeInRight, fadeInLeft, fadeInUp, withDelay } from '@/lib/animations';
import { useCountUp } from '@/hooks/useAnimations';

const stats = [
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
  { value: 150, suffix: '+', label: 'Team Members' },
  { value: 12, suffix: '+', label: 'Years Experience' },
];

function StatCounter({ stat }: { stat: typeof stats[0] }) {
  const { count, ref } = useCountUp(stat.value);
  
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold text-white">
        {count}{stat.suffix}
      </div>
      <div className="text-sm text-gray-400">{stat.label}</div>
    </div>
  );
}

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-900/95" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full filter blur-[100px]" />

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
            Why{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Choose Us
            </span>
          </motion.h2>
          
          <motion.p
            variants={fadeInDown}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(500)}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            We combine technical expertise with creative innovation to deliver exceptional results that exceed expectations.
          </motion.p>
        </div>

        {/* Images Grid */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={withDelay(300)}
          className="grid lg:grid-cols-3 gap-6 mb-12"
        >
          {/* Left Image */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(800)}
            className="relative rounded-2xl overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60"
              alt="Team collaboration"
              className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-semibold">Expert Team</h3>
              <p className="text-gray-400 text-sm">Skilled professionals</p>
            </div>
          </motion.div>

          {/* Center Image */}
          <motion.div
            variants={zoomIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(500)}
            className="relative rounded-2xl overflow-hidden group lg:row-span-2"
          >
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&auto=format&fit=crop&q=60"
              alt="Modern office"
              className="w-full h-64 lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            
            {/* Glass Card Overlay */}
            <div className="absolute bottom-4 left-4 right-4 glass-card p-4">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <StatCounter key={stat.label} stat={stat} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(800)}
            className="relative rounded-2xl overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=500&auto=format&fit=crop&q=60"
              alt="Innovation"
              className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-semibold">Innovation First</h3>
              <p className="text-gray-400 text-sm">Cutting-edge solutions</p>
            </div>
          </motion.div>

          {/* Bottom Left */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(1000)}
            className="relative rounded-2xl overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60"
              alt="Quality assurance"
              className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-semibold">Quality Assured</h3>
              <p className="text-gray-400 text-sm">Rigorous testing</p>
            </div>
          </motion.div>

          {/* Bottom Right */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(1000)}
            className="relative rounded-2xl overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&auto=format&fit=crop&q=60"
              alt="Support"
              className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-semibold">24/7 Support</h3>
              <p className="text-gray-400 text-sm">Always available</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Features List */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            { title: 'Agile Methodology', desc: 'Iterative development for faster delivery' },
            { title: 'Transparent Process', desc: 'Clear communication at every stage' },
            { title: 'Cost Effective', desc: 'Maximum value for your investment' },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={withDelay(1200 + index * 200)}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
