import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { fadeInDown, fadeInLeft, zoomIn, withDelay } from '@/lib/animations';
import { useCountUp } from '@/hooks/useAnimations';

export function Approach() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { count, ref: counterRef } = useCountUp(98);

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-900/95" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full filter blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <motion.h2
              variants={fadeInDown}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={withDelay(0)}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            >
              Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                Approach
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInDown}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={withDelay(500)}
              className="text-gray-400 text-lg"
            >
              We follow a systematic approach to ensure every project is delivered on time, within budget, and exceeds expectations. Our process is transparent, collaborative, and focused on delivering real value.
            </motion.p>

            <motion.button
              variants={fadeInDown}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={withDelay(800)}
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/25 transition-shadow"
            >
              Discover Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            {/* Stat Card */}
            <motion.div
              ref={counterRef}
              variants={fadeInLeft}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={withDelay(400)}
              className="glass-card p-6 inline-flex items-center gap-4 mt-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                <Zap className="w-7 h-7 text-orange-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{count}%</div>
                <div className="text-sm text-gray-400">On-Time Delivery Rate</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Phone Image */}
          <motion.div
            variants={zoomIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(300)}
            className="relative"
          >
            <div className="relative mx-auto max-w-sm">
              {/* Phone Frame */}
              <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-6 bg-slate-900 rounded-full" />
                <div className="relative bg-slate-900 rounded-[2.5rem] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&auto=format&fit=crop&q=60"
                    alt="Mobile app"
                    className="w-full h-[500px] object-cover"
                  />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                  
                  {/* App UI Elements */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                    <div className="glass-card p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
                        <div>
                          <div className="w-24 h-3 bg-white/20 rounded" />
                          <div className="w-16 h-2 bg-white/10 rounded mt-1" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="w-full h-2 bg-white/10 rounded" />
                        <div className="w-3/4 h-2 bg-white/10 rounded" />
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <div className="flex-1 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500" />
                      <div className="w-12 h-12 rounded-xl bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-1/4 glass-card p-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                  <span className="text-white text-lg">✓</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 bottom-1/3 glass-card p-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center">
                  <span className="text-white text-lg">⚡</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
