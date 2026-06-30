import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";

const navItems = [
  { id: "home", label: "Home", href: "#" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Work", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const Logo = () => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 text-sm font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
  >
    SH
  </motion.div>
);

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setScrolled(v > 0.01));
    return unsub;
  }, [scrollYProgress]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`sticky top-0 z-50 font-body transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.07] bg-[#080810]/85 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        {/* Scroll progress beam */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] origin-left bg-gradient-to-r from-purple-500 to-cyan-400"
          style={{ scaleX: scrollYProgress }}
        />

        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <a href="#" className="flex items-center gap-3">
            <Logo />
            <span className="font-display text-lg font-bold text-white">
              Shamim
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 text-sm font-medium lg:flex">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                <a
                  href={item.href}
                  onClick={() => setActive(item.id)}
                  className={`transition-colors duration-200 ${
                    active === item.id
                      ? "text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
                {active === item.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-purple-500 to-cyan-400"
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={() => setActive("contact")}
              className="hidden rounded-xl border border-white/[0.12] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-purple-400/60 hover:bg-purple-500/10 lg:inline-flex"
            >
              Let&apos;s Talk
            </a>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="rounded-lg border border-white/[0.08] p-2 text-white/70 hover:text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? (
                <HiOutlineXMark className="h-5 w-5" />
              ) : (
                <HiOutlineBars3 className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 h-screen w-72 border-l border-white/[0.07] bg-[#0c0c1a] font-body lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
                <div className="flex items-center gap-3">
                  <Logo />
                  <span className="font-display font-bold text-white">Shamim</span>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white">
                  <HiOutlineXMark className="h-5 w-5" />
                </button>
              </div>
              <ul className="space-y-1 px-4 py-6">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => { setOpen(false); setActive(item.id); }}
                      className={`flex rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                        active === item.id
                          ? "bg-purple-500/15 text-purple-300"
                          : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="px-4">
                <a
                  href="#contact"
                  onClick={() => { setOpen(false); setActive("contact"); }}
                  className="btn-gradient block text-center"
                >
                  Let&apos;s Talk
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
