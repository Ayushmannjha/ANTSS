import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
// Removed local hooks/animations to use direct Framer Motion for this custom complex section

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // y was unused, removed it
  const laptopY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[120vh] flex flex-col items-center justify-start pt-32 overflow-hidden"
    >
      {/* Background Shape */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 pointer-events-none z-0">
        <img
          src="/shape.png"
          alt="Abstract Shape"
          className="w-full h-full object-contain opacity-60 mix-blend-screen"
        />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl h-full flex flex-col items-center">

        {/* Top Text */}
        <div className="w-full flex justify-center md:justify-start px-4 md:px-10 mb-[-2rem] md:mb-[-4rem] z-20">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl md:text-[8rem] lg:text-[10rem] font-serif font-bold leading-none bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mix-blend-overlay"
          >
            Your Vision
          </motion.h1>
        </div>

        {/* Center Laptop */}
        <motion.div
          style={{ y: laptopY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative w-full max-w-4xl aspect-[16/10] my-[-2rem] z-10"
        >
          {/* Floating Animation Wrapper */}
          <motion.div
            animate={{ y: [-15, 15] }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 4,
              ease: "easeInOut",
            }}
            className="w-full h-full relative flex justify-center items-center"
          >
            <img
              src="/laptop.png"
              alt="Dashboard Preview"
              className="w-full h-full object-contain drop-shadow-2xl"
            />

            {/* Floating Card 1 - Stats */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -left-4 md:-left-16 top-1/4 glass-card p-6 rounded-2xl hidden md:block border-l-4 border-l-primary"
            >
              <div className="text-sm text-gray-400 uppercase tracking-widest mb-1">Evaluation & Design</div>
              <div className="text-white font-bold text-lg">Custom Software</div>
            </motion.div>


          </motion.div>
        </motion.div>

        {/* Bottom Text */}
        <div className="w-full flex justify-center md:justify-end px-4 md:px-10 mt-[-2rem] md:mt-[-4rem] z-20">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="text-6xl md:text-[8rem] lg:text-[10rem] font-serif font-bold leading-none bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mix-blend-overlay"
          >
            Our Code
          </motion.h1>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-10 md:bottom-20 left-4 md:left-20 p-6 glass-card rounded-2xl max-w-xs z-30"
        >
          <p className="text-gray-400 text-sm mb-4">
            We transform your ideas into powerful digital solutions. Innovation drives us.
          </p>
          <button className="bg-primary hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(255,87,34,0.4)] hover:shadow-[0_0_30px_rgba(255,87,34,0.6)]">
            Get Started
          </button>
        </motion.div>

      </div>
    </section>
  );
}
