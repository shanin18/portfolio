import { motion } from "framer-motion";
import Reveal from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Understand",
    text: "Deep dive into the goal, users, and scope. No assumptions — just clarity.",
    color: "from-purple-500 to-fuchsia-500",
    glow: "rgba(168,85,247,0.25)",
  },
  {
    number: "02",
    title: "Structure",
    text: "Map out pages, information flows, and content architecture before writing a line.",
    color: "from-cyan-500 to-blue-500",
    glow: "rgba(6,182,212,0.25)",
  },
  {
    number: "03",
    title: "Build",
    text: "Clean UI. Clean code. Reusable components, responsive layouts, and attention to detail.",
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.25)",
  },
  {
    number: "04",
    title: "Launch",
    text: "Polish, test, optimise, and ship. Post-launch support included.",
    color: "from-green-500 to-emerald-500",
    glow: "rgba(34,197,94,0.25)",
  },
];

const Process = () => {
  return (
    <section id="process" className="relative overflow-hidden bg-[#080810] py-28">
      {/* Orb */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <p className="section-label mb-4">Process</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl font-bold leading-tight text-white lg:text-5xl">
                Simple process.{" "}
                <span className="gradient-text">Strong finish.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="font-body leading-8 text-white/45">
              Four repeatable steps that turn a brief into a live, polished product.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.1} direction="scale">
              <motion.div
                whileHover={{
                  y: -8,
                  boxShadow: `0 20px 40px ${step.glow}`,
                  transition: { duration: 0.25 },
                }}
                className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-300"
              >
                {/* Number */}
                <span
                  className={`font-display text-5xl font-extrabold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20 transition-opacity duration-300 group-hover:opacity-40`}
                >
                  {step.number}
                </span>

                {/* Gradient line top */}
                <div
                  className={`mt-4 h-0.5 w-10 bg-gradient-to-r ${step.color} rounded-full transition-all duration-300 group-hover:w-full`}
                />

                <h3 className="mt-5 font-display text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-7 text-white/50">
                  {step.text}
                </p>

                {/* Corner glow on hover */}
                <div
                  className={`pointer-events-none absolute bottom-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br ${step.color} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
