import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const laptopY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen lg:min-h-[120vh] flex flex-col items-center justify-center lg:justify-start pt-24 sm:pt-28 lg:pt-32 overflow-hidden px-4"
    >
      {/* Background Shape */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] opacity-40 pointer-events-none z-0">
        <img
          src="/shape.png"
          alt="Abstract Shape"
          className="w-full h-full object-contain opacity-60 mix-blend-screen"
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-40 h-40 bg-red-500/15 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">

        {/* ========== MOBILE LAYOUT ========== */}
        <div className="flex flex-col items-center text-center lg:hidden">
          {/* Mobile Title */}
          <motion.div
            style={{ opacity: textOpacity }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Your Vision
            </h1>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mt-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Our Code
              </span>
            </h1>
          </motion.div>

          {/* Mobile Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-400 text-base sm:text-lg max-w-md mb-8 px-2"
          >
            We transform your ideas into powerful digital solutions. Innovation drives us forward.
          </motion.p>



          {/* Mobile Laptop Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative w-full max-w-sm"
          >
            <motion.div
              animate={{ y: [-8, 8] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
            >
              <img
                src="/laptop.png"
                alt="Dashboard Preview"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ========== DESKTOP LAYOUT ========== */}
        <div className="hidden lg:flex lg:flex-col lg:items-center w-full">
          {/* Top Text */}
          <div className="w-full flex justify-start px-10 mb-[-4rem] z-20">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-[8rem] xl:text-[10rem] font-serif font-bold leading-none bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
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

              {/* Floating Card - Stats */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -left-16 top-1/4 glass-card p-6 rounded-2xl border-l-4 border-l-primary"
              >
                <div className="text-sm text-gray-400 uppercase tracking-widest mb-1">Evaluation & Design</div>
                <div className="text-white font-bold text-lg">Custom Software</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom Text */}
          <div className="w-full flex justify-end px-10 mt-[-4rem] z-20">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              className="text-[8rem] xl:text-[10rem] font-serif font-bold leading-none bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
            >
              Our Code
            </motion.h1>
          </div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="absolute bottom-20 left-20 p-6 glass-card rounded-2xl max-w-xs z-30"
          >
            <p className="text-gray-400 text-sm mb-4">
              We transform your ideas into powerful digital solutions. Innovation drives us.
            </p>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
