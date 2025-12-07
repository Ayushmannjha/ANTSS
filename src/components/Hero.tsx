import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ArrowRight, Monitor, Code, Users, Building } from 'lucide-react';
import { fadeInRight, fadeInLeft, fadeInDown, zoomIn, withDelay } from '@/lib/animations';
import { useCountUp } from '@/hooks/useAnimations';

const features = [
  'User-Centered Design',
  'Agile Development',
  'Cutting-Edge Technology',
  'Scalable Solutions',
];

const stats = [
  { value: 12, suffix: '+', label: 'Years Of Experience', icon: Monitor },
  { value: 2554, suffix: '+', label: 'Success Projects', icon: Code },
  { value: 154, suffix: '+', label: 'Professional Teams', icon: Users },
  { value: 25, suffix: '+', label: 'Modern Offices', icon: Building },
];

function StatCard({ stat, delay }: { stat: typeof stats[0]; delay: number }) {
  const { count, ref } = useCountUp(stat.value);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      variants={fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={withDelay(delay)}
      className="glass-card p-6 flex items-center gap-4"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
        <Icon className="w-6 h-6 text-purple-400" />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">
          {count}{stat.suffix}
        </div>
        <div className="text-sm text-gray-400">{stat.label}</div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="home" className="min-h-screen pt-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full filter blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full filter blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.h1
              variants={fadeInRight}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={withDelay(500)}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Your Vision,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Our Code
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInRight}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={withDelay(600)}
              className="text-lg text-gray-400 max-w-lg"
            >
              We transform your ideas into powerful digital solutions. Our expert team delivers custom software that drives growth and innovation.
            </motion.p>

            {/* Features list */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  variants={fadeInRight}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={withDelay(300 + index * 100)}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInDown}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={withDelay(800)}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-colors"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>

          {/* Right Content - Image and Cards */}
          <div className="relative">
            {/* Main Image */}
            <motion.div
              variants={zoomIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={withDelay(400)}
              className="relative z-10"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60"
                  alt="Developer workspace"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              </div>
            </motion.div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-10 -left-10 right-10 z-20 grid grid-cols-2 gap-4">
              {stats.slice(0, 2).map((stat, index) => (
                <StatCard key={stat.label} stat={stat} delay={400 + index * 100} />
              ))}
            </div>

            {/* Get Started Card */}
            <motion.div
              variants={fadeInDown}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={withDelay(600)}
              className="absolute -top-5 -right-5 z-20"
            >
              <div className="glass-card p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">Get Started</div>
                  <div className="text-sm text-gray-400">Free Consultation</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats Row */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={withDelay(600)}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-white mb-8">
            Our Code,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Your Success
            </span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} delay={index * 100} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
