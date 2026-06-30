import Reveal from "./Reveal";
import { motion } from "framer-motion";
import { FiCode, FiDatabase, FiLayers, FiTrendingUp, FiZap } from "react-icons/fi";

const stats = [
  { value: "50+", label: "Websites Shipped", color: "from-purple-400 to-fuchsia-400" },
  { value: "3+", label: "Years of Experience", color: "from-cyan-400 to-blue-400" },
  { value: "16+", label: "Projects Built", color: "from-amber-400 to-orange-400" },
  { value: "100%", label: "Client Satisfaction", color: "from-green-400 to-emerald-400" },
];

const pillars = [
  {
    icon: FiLayers,
    title: "CMS Mastery",
    description: "WordPress and Grav websites that non-devs can actually manage — clean, flexible, maintainable.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: FiCode,
    title: "UI Craftsmanship",
    description: "Responsive layouts, polished micro-interactions, and reusable component systems.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: FiDatabase,
    title: "Full-Stack Reach",
    description: "MongoDB, PostgreSQL, Prisma and Node.js — connecting the data layer to the interface.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: FiTrendingUp,
    title: "Business Focus",
    description: "Every pixel has a purpose: clearer offers, stronger trust, smoother user action.",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
];

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-[#0c0c1a] py-28">
      {/* Subtle orb */}
      <div className="pointer-events-none absolute right-[-15%] top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-purple-700/8 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <Reveal>
          <p className="section-label mb-4">About Me</p>
        </Reveal>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          {/* Left — Bio */}
          <div>
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl font-bold leading-tight text-white lg:text-5xl">
                Practical developer.{" "}
                <span className="gradient-text">Sharp interface.</span>{" "}
                Reliable delivery.
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 font-body leading-8 text-white/55">
                I&apos;m a frontend developer with 3+ years of professional experience turning product requirements into polished, performant web experiences. I care deeply about UI craftsmanship — the kind that users notice even when they can&apos;t articulate why it feels so good.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="mt-4 font-body leading-8 text-white/55">
                My stack spans CMS builds (WordPress, Grav), React/Next.js applications, and full-stack MERN work. Whether it&apos;s a service website, a data dashboard, or an eCommerce flow — my focus is always the same: make it clear, fast, and easy to use.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 font-body text-xs font-medium text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.38}>
              <div className="mt-8 flex gap-4">
                <a href="#projects">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-gradient font-body text-sm"
                  >
                    See My Work
                    <FiZap />
                  </motion.button>
                </a>
                <a href="#contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-ghost font-body text-sm"
                  >
                    Get In Touch
                  </motion.button>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — Stats + Pillars */}
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08} direction="scale">
                  <div className="glass-card rounded-2xl p-5">
                    <p className={`font-display text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                    <p className="mt-1 font-body text-xs text-white/40">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Pillars */}
            <div className="grid gap-3">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.title} delay={0.2 + i * 0.08}>
                    <motion.div
                      whileHover={{ x: 6, transition: { duration: 0.2 } }}
                      className={`flex items-start gap-4 rounded-xl border ${p.bg} p-4`}
                    >
                      <div className={`mt-0.5 shrink-0 ${p.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className={`font-display text-sm font-bold ${p.color}`}>{p.title}</h3>
                        <p className="mt-1 font-body text-xs leading-6 text-white/50">{p.description}</p>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
