import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { zoomIn, fadeInLeft, fadeInRight, fadeInDown, withDelay } from '@/lib/animations';

const teamMembers = [
  {
    name: 'Nishu Jha',
    role: 'CEO & Founder',
    image: '/ceo1.png',
    social: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    name: 'Rahul Srivastava',
    role: 'CTO',
    image: '/cte2.png',
    social: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    name: 'Emily Rodriguez',
    role: 'CMO',
    image: '/market2.png',
    social: { linkedin: '#', twitter: '#', github: '#' },
  },
];

export function Teams() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-16 sm:py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-900/95" />

      {/* Team Photo Background */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=60"
          alt="Team background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            variants={zoomIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(0)}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Meet Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              Team
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInDown}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(500)}
            className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg"
          >
            Our talented team of professionals is dedicated to delivering exceptional results.
          </motion.p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {teamMembers.map((member, index) => {
            const variants = index === 0 ? fadeInLeft : index === 1 ? fadeInDown : fadeInRight;
            const delay = index === 0 ? 400 : index === 1 ? 0 : 400;

            return (
              <motion.div
                key={member.name}
                variants={variants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={withDelay(delay)}
                whileHover={{ y: -10 }}
                className="group relative sm:last:col-span-2 lg:last:col-span-1 sm:last:w-[90%] sm:last:mx-auto lg:last:w-full"
              >
                {/* Card */}
                <div className="relative rounded-2xl overflow-hidden">
                  {/* Image */}
                  <motion.div
                    variants={zoomIn}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={withDelay(400 + index * 100)}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </motion.div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-orange-400 text-sm mb-4">{member.role}</p>

                    {/* Social Links */}
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                      <motion.a
                        href={member.social.linkedin}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-orange-500 transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-white" />
                      </motion.a>
                      <motion.a
                        href={member.social.twitter}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-orange-500 transition-colors"
                      >
                        <Twitter className="w-5 h-5 text-white" />
                      </motion.a>
                      <motion.a
                        href={member.social.github}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-orange-500 transition-colors"
                      >
                        <Github className="w-5 h-5 text-white" />
                      </motion.a>
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
