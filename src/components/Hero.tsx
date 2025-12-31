import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, Code, Smartphone, Globe, Zap, Users, Award, TrendingUp } from "lucide-react";

// Testimonial clients to showcase
const testimonialClients = [
  { name: "Manisha Shrivastava", project: "Portfolio Website" },
  { name: "Shreeaura", project: "E-commerce Website" },
  { name: "Rozomeal", project: "Food Delivery System" },
];

// Service pills for quick display
const servicePills = [
  { icon: Code, label: "Web Development" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Globe, label: "Digital Solutions" },
];

// Stats for the hero
const heroStats = [
  { icon: Users, value: "50+", label: "Happy Clients" },
  { icon: Award, value: "100+", label: "Projects Done" },
  { icon: TrendingUp, value: "98%", label: "Success Rate" },
];

// Keyword Builder - Ants Building Words Animation (Enhanced)
const keywordsToBuild = [
  { word: "FAST", emoji: "⚡" },
  { word: "SECURE", emoji: "🔒" },
  { word: "SCALABLE", emoji: "📈" },
  { word: "MODERN", emoji: "✨" },
  { word: "RELIABLE", emoji: "💎" },
];

function KeywordBuilder() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentKeyword = keywordsToBuild[currentWordIndex];

  // Cycle through words
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % keywordsToBuild.length);
    }, 5000); // 5 seconds per word for better readability
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 hidden lg:flex flex-col items-center">
      {/* Glass Card Container */}
      <motion.div
        className="px-8 py-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        {/* Intro Text */}
        <motion.p
          className="text-gray-400 text-sm mb-4 tracking-widest uppercase text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          We build software that is...
        </motion.p>

        {/* The Word Being Built */}
        <div className="flex items-center justify-center gap-2 min-h-[80px]" style={{ perspective: "1000px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentKeyword.word}
              className="flex gap-2 items-center"
              initial={{ opacity: 0, rotateX: -30 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 30, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              {currentKeyword.word.split("").map((letter, i) => (
                <motion.div
                  key={`${currentKeyword.word}-${i}`}
                  initial={{ opacity: 0, y: 50, rotateY: -90, scale: 0 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  className="relative group"
                >
                  {/* Glow Background */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-orange-500/40 blur-xl"
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />

                  {/* The Letter Block */}
                  <motion.div
                    className="relative w-12 h-14 rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.6)] border border-orange-400/50"
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(249,115,22,0.4)",
                        "0 0 40px rgba(249,115,22,0.8)",
                        "0 0 20px rgba(249,115,22,0.4)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                  >
                    <span className="text-white font-bold text-3xl font-mono drop-shadow-lg">{letter}</span>
                  </motion.div>

                  {/* Animated Ant Below */}
                  <motion.div
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                  >
                    <motion.span
                      className="text-sm"
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 0.3, repeat: Infinity }}
                    >
                      🐜
                    </motion.span>
                  </motion.div>
                </motion.div>
              ))}

              {/* Emoji Indicator */}
              <motion.span
                className="text-3xl ml-3"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: currentKeyword.word.length * 0.1 + 0.3,
                  type: "spring",
                  stiffness: 300
                }}
              >
                {currentKeyword.emoji}
              </motion.span>
            </motion.div>
          </AnimatePresence>

          {/* Blinking Cursor */}
          <motion.div
            className="w-1 h-12 bg-gradient-to-b from-orange-400 to-red-500 rounded-full ml-2"
            animate={{ opacity: [1, 0, 1], scaleY: [1, 0.8, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {keywordsToBuild.map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === currentWordIndex
                ? "bg-orange-500"
                : "bg-gray-600"
                }`}
              animate={i === currentWordIndex ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}


export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const laptopY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Auto-rotate testimonial names
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialClients.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen lg:min-h-[120vh] flex flex-col items-center justify-center lg:justify-start pt-24 sm:pt-28 lg:pt-32 overflow-hidden px-4"
    >
      {/* Background Shape */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/80 z-10" /> {/* Overlay for readability */}
        <img
          src="/ant_hero_hq.png"
          alt="Ants Building Digital Structure"
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
      </div>

      {/* Keyword Builder - Words being built by ants */}
      <KeywordBuilder />

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-[60px] pointer-events-none z-5" />
      <div className="absolute bottom-40 left-10 w-40 h-40 bg-red-500/15 rounded-full blur-[80px] pointer-events-none z-5" />
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-amber-400/10 rounded-full blur-[50px] pointer-events-none z-5" />

      {/* Animated Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-orange-500/30 rounded-full pointer-events-none hidden lg:block z-5"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

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
            className="mb-4"
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
            className="text-gray-400 text-base sm:text-lg max-w-md mb-4 px-2"
          >
            We transform your ideas into powerful digital solutions. Innovation drives us forward.
          </motion.p>

          {/* Mobile Service Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-2 justify-center mb-6"
          >
            {servicePills.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
                >
                  <Icon className="w-4 h-4 text-orange-400" />
                  <span className="text-white text-sm">{service.label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mobile Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex gap-6 mb-6"
          >
            {heroStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                  <div className="text-white font-bold text-lg">{stat.value}</div>
                  <div className="text-gray-500 text-xs">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mobile Testimonial Clients Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mb-6 px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
          >
            <p className="text-orange-400 text-xs uppercase tracking-widest mb-2 font-semibold">★ Trusted by Clients</p>
            <div className="flex flex-col items-center gap-2">
              <div className="flex -space-x-3">
                {testimonialClients.map((client, i) => (
                  <motion.div
                    key={client.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 + i * 0.1 }}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center border-2 border-slate-900 shadow-lg"
                  >
                    <span className="text-white text-xs font-bold">{client.name.charAt(0)}</span>
                  </motion.div>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-white text-sm font-medium"
                >
                  {testimonialClients[currentIndex].name}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

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

              {/* Floating Card - Left - Services */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -left-20 top-1/4 glass-card p-5 rounded-2xl border-l-4 border-l-orange-500"
              >
                <div className="text-sm text-gray-400 uppercase tracking-widest mb-1">Evaluation & Design</div>
                <div className="text-white font-bold text-lg">Custom Software</div>
              </motion.div>

              {/* Floating Card - Right - Stats */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="absolute -right-20 top-1/3 glass-card p-5 rounded-2xl border-r-4 border-r-red-500"
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  <div>
                    <div className="text-white font-bold text-xl">100+</div>
                    <div className="text-gray-400 text-sm">Projects Delivered</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card - Bottom Right - Tech */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="absolute -right-16 bottom-1/4 glass-card p-4 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">React & Next.js</span>
                </div>
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

          {/* Service Pills Row - Above CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="absolute bottom-44 right-20 flex gap-3 z-30"
          >
            {servicePills.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.0 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full cursor-pointer hover:border-orange-500/50 transition-colors"
                >
                  <Icon className="w-4 h-4 text-orange-400" />
                  <span className="text-white text-sm">{service.label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Card with Testimonials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="absolute bottom-20 left-20 p-6 glass-card rounded-2xl max-w-xs z-30"
          >
            <p className="text-gray-400 text-sm mb-4">
              We transform your ideas into powerful digital solutions. Innovation drives us.
            </p>

            {/* Desktop Testimonial Showcase */}
            <div className="border-t border-white/10 pt-4">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Happy Clients</p>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {testimonialClients.map((client, i) => (
                    <motion.div
                      key={client.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.8 + i * 0.1 }}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center border-2 border-slate-800"
                    >
                      <span className="text-white text-xs font-bold">{client.name.charAt(0)}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-white text-sm mt-2"
                >
                  {testimonialClients[currentIndex].name} <span className="text-gray-500">• {testimonialClients[currentIndex].project}</span>
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

