import { motion, useScroll, useSpring } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const Footer = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#080810] py-10">
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-px origin-left bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Brand */}
          <a href="#" className="flex items-center gap-3" onClick={scrollToTop}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 font-display text-xs font-bold text-white shadow-[0_0_16px_rgba(168,85,247,0.35)]">
              SH
            </div>
            <div>
              <p className="font-display font-bold text-white">Shamim</p>
              <p className="font-body text-[10px] text-white/30">Frontend Developer</p>
            </div>
          </a>

          {/* Copyright */}
          <p className="font-body text-sm text-white/25">
            &copy; {new Date().getFullYear()} Syed Shamim Hosan &mdash; Built with React &amp; Framer Motion
          </p>

          {/* Links + Back to top */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://www.linkedin.com/in/syed-shamim-hosan/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, color: "#60a5fa" }}
              className="text-white/35 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="https://github.com/shanin18"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, color: "#fff" }}
              className="text-white/35 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </motion.a>

            {/* Scroll to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/50 transition-all hover:border-purple-500/50 hover:text-purple-400"
              aria-label="Scroll to top"
            >
              <FiArrowUp className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
