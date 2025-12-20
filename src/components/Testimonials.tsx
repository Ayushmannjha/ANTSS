import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { zoomIn, fadeInDown, fadeInLeft, fadeInRight, fadeInUp, withDelay } from '@/lib/animations';
import { useCountUp } from '@/hooks/useAnimations';

const testimonials = [
  {
    name: 'David Wilson',
    role: 'CEO, TechStart Inc.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=60',
    quote: 'Pemogan delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise is outstanding.',
    rating: 5,
  },
  {
    name: 'Jennifer Martinez',
    role: 'CTO, HealthPlus',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=60',
    quote: 'Working with Pemogan was a game-changer for our healthcare app. They understood our needs perfectly and delivered a solution that our users love. The team communication was excellent throughout.',
    rating: 5,
    featured: true,
  },
  {
    name: 'Robert Chen',
    role: 'Founder, LogiFlow',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60',
    quote: 'The logistics dashboard Pemogan built for us has transformed our operations. Real-time tracking and analytics have improved our efficiency by 40%.',
    rating: 5,
  },
];

const stats = [
  { value: 500, suffix: '+', label: 'Happy Clients' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
  { value: 50, suffix: '+', label: 'Countries Served' },
];

function StatCounter({ stat }: { stat: typeof stats[0] }) {
  const { count, ref } = useCountUp(stat.value);
  
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-white">
        {count}{stat.suffix}
      </div>
      <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
    </div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-900/95" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full filter blur-[128px]" />

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
            Client{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              Testimonials
            </span>
          </motion.h2>
          
          <motion.p
            variants={fadeInDown}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(500)}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </motion.p>
        </div>

        {/* Stats Row */}
        <motion.div
          variants={fadeInDown}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={withDelay(300)}
          className="flex justify-center gap-12 md:gap-24 mb-16"
        >
          {stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} />
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {testimonials.map((testimonial, index) => {
            const variants = index === 0 ? fadeInLeft : index === 1 ? fadeInUp : fadeInRight;
            const isFeatured = testimonial.featured;
            
            return (
              <motion.div
                key={testimonial.name}
                variants={variants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={withDelay(index * 200)}
                className={`relative ${isFeatured ? 'md:-mt-8 md:mb-8' : ''}`}
              >
                <div className={`h-full ${isFeatured ? 'bg-gradient-to-br from-orange-500/20 to-red-500/20' : 'bg-white/5'} backdrop-blur-sm border border-white/10 rounded-2xl p-6 ${isFeatured ? 'border-orange-500/30' : ''}`}>
                  {/* Quote Icon */}
                  <Quote className={`w-10 h-10 ${isFeatured ? 'text-orange-400' : 'text-gray-600'} mb-4`} />
                  
                  {/* Quote */}
                  <p className={`${isFeatured ? 'text-white' : 'text-gray-300'} mb-6 ${isFeatured ? 'text-lg' : ''}`}>
                    "{testimonial.quote}"
                  </p>
                  
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-white font-medium">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
