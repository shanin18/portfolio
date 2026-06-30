import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

const stats = [
  { value: "50+", label: "Sites Built" },
  { value: "3+", label: "Years Exp." },
  { value: "16+", label: "Projects" },
  { value: "6+", label: "Technologies" },
];

const wordVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const AnimatedWords = ({ text, className, baseDelay = 0 }) => {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.35em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i + baseDelay}
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#080810]"
    >
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[15%] h-[500px] w-[500px] animate-float rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="absolute right-[-5%] top-[30%] h-[400px] w-[400px] animate-float-slow rounded-full bg-cyan-500/12 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[30%] h-[300px] w-[300px] animate-float-mid rounded-full bg-violet-700/10 blur-[90px]" />
      </div>

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" />

      {/* Parallax container */}
      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 mx-auto px-4 pb-20 pt-32"
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm text-white/60 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          Available for freelance &amp; full-time roles
        </motion.div>

        {/* Heading */}
        <h1 className="font-display font-bold leading-[1.02]">
          <div className="text-white/30 text-4xl sm:text-5xl lg:text-7xl mb-1">
            <AnimatedWords text="Hi, I'm" baseDelay={2} />
          </div>
          <div className="text-5xl sm:text-6xl lg:text-8xl">
            <span style={{ perspective: 800 }}>
              <AnimatedWords
                text="Shamim Hosan"
                baseDelay={3}
                className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
              />
            </span>
          </div>
          <div className="mt-2 text-4xl sm:text-5xl lg:text-7xl text-white/80">
            <AnimatedWords text="Frontend Developer" baseDelay={6} />
          </div>
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-8 max-w-xl font-body text-lg leading-relaxed text-white/50"
        >
          I craft interfaces that feel as good as they look — fast, accessible, and built to convert. React, Next.js, and everything in between.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a href="#projects">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-gradient font-body"
            >
              View Work
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </a>

          <a
            href="https://drive.google.com/file/d/1jNmv4UrHoPes1v8w4-sY2btUzlvREyd4/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-ghost font-body"
            >
              Resume
              <FiArrowUpRight />
            </motion.button>
          </a>

          <a href="#contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-ghost font-body"
            >
              Contact Me
            </motion.button>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <p className="font-display text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="mt-1 font-body text-xs font-medium uppercase tracking-widest text-white/40">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-white/25">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
