import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Zap, Cpu, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FloatingParticles from "@/components/animations/FloatingParticles";
import GlowingOrbs from "@/components/animations/GlowingOrbs";
import TiltCard from "@/components/animations/TiltCard";
import MagneticButton from "@/components/animations/MagneticButton";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Counter from "@/components/animations/Counter";

const HeroSection = () => {
  const stats = [
    { value: "500+", label: "Participants" },
    { value: "4", label: "Major Events" },
    { value: "50+", label: "Workshops" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const floatingIcons = [
    { Icon: Brain, delay: 0, x: "12%", y: "20%", rotate: 15 },
    { Icon: Cpu, delay: 1, x: "85%", y: "28%", rotate: -10 },
    { Icon: Bot, delay: 2, x: "8%", y: "55%", rotate: -20 },
    { Icon: Zap, delay: 1.5, x: "88%", y: "70%", rotate: 25 },
    { Icon: Sparkles, delay: 0.5, x: "18%", y: "85%", rotate: 10 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Animated Background */}
      <GlowingOrbs />
      <FloatingParticles count={30} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Floating Icons with enhanced rotation */}
      {floatingIcons.map(({ Icon, delay, x, y, rotate }, index) => (
        <motion.div
          key={index}
          className="absolute hidden md:block"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0.1, 0.2, 0.15],
            scale: [1, 1.1, 1],
            rotate: [rotate, rotate + 10, rotate - 10, rotate],
            y: [0, -30, 0],
          }}
          transition={{
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            y: { delay: delay, duration: 8, repeat: Infinity, ease: "easeInOut" },
            delay: delay,
          }}
        >
          <Icon className="w-12 h-12 md:w-16 md:h-16 text-primary" />
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 relative z-10 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.div variants={itemVariants}>
            <h1 className="flex flex-col items-center justify-center font-display font-bold mb-6 text-primary-foreground">
              <span className="text-xl sm:text-3xl md:text-4xl mb-4 tracking-widest text-cyan-100 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">WELCOME TO</span>
              <motion.span
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl bg-gradient-to-b from-[#bccbf3] via-[#7ae0ff] to-[#4ade80] bg-clip-text text-transparent bg-[length:200%_auto] font-black tracking-tighter drop-shadow-[0_0_40px_rgba(45,212,191,0.5)] leading-tight px-2"
                animate={{ backgroundPosition: ["0% center", "200% center"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                CSE (AI&ML)
              </motion.span>
              <motion.div
                className="w-full h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-2 rounded-full blur-[2px]"
                animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </h1>
          </motion.div>

          {/* Subheading with staggered reveal */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-primary-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed px-4"
          >
            {"Innovating the Future with ".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.02 }}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              className="text-secondary font-semibold inline-block"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.05, 1], opacity: 1 }}
              transition={{
                scale: { duration: 2, repeat: Infinity },
                opacity: { delay: 1.8 }
              }}
            >
              Artificial Intelligence
            </motion.span>
            {" & Machine Learning".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 + i * 0.02 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>

          {/* CTA Buttons with Magnetic effect */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/register">
              <MagneticButton>
                <div className="relative group">
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Button variant="hero" size="xl" className="group relative overflow-hidden rounded-full px-8 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 border-none text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                    <span className="flex items-center gap-2 font-bold tracking-wide">
                      Register for AI Vorse 4.0
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </div>
              </MagneticButton>
            </Link>
            <a href="#events">
              <MagneticButton>
                <Button
                  size="xl"
                  variant="outline"
                  className="rounded-full px-8 bg-transparent text-primary-foreground border-primary/30 hover:bg-primary/10 hover:border-primary/60 backdrop-blur-md transition-all duration-300 shadow-lg"
                >
                  Explore Past Events
                </Button>
              </MagneticButton>
            </a>
          </motion.div>

          {/* Stats Cards with 3D Tilt */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-20 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.15, type: "spring" }}
              >
                <TiltCard tiltAmount={12} className="h-full">
                  <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-cyan-500/30 rounded-2xl p-3 sm:p-4 md:p-6 text-center h-full shadow-[0_0_30px_rgba(34,211,238,0.1)] backdrop-blur-xl group hover:border-cyan-400/50 transition-colors">
                    <motion.div
                      className="text-2xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 mb-1"
                      animate={{
                        textShadow: [
                          "0 0 10px rgba(34, 211, 238, 0.3)",
                          "0 0 20px rgba(34, 211, 238, 0.5)",
                          "0 0 10px rgba(34, 211, 238, 0.3)",
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs md:text-sm text-cyan-200/70 font-medium tracking-wide">{stat.label}</div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div
            className="w-1.5 h-3 rounded-full bg-primary-foreground/50"
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
