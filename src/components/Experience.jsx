import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Spritztech",
    role: "Frontend Developer",
    type: "Full-time · On-site",
    duration: "Feb 2025 – Present",
    tag: "Current",
    color: "from-purple-500 to-fuchsia-500",
    glow: "rgba(168,85,247,0.25)",
    points: [
      "Shipped stable frontend updates with clean, reusable UI components across multiple product surfaces.",
      "Collaborated with cross-functional teams to translate product requirements into polished user flows.",
      "Improved page consistency and UX coherence, reducing user friction across key workflows.",
      "Supported faster feature launches by maintaining a well-structured, maintainable codebase.",
    ],
  },
  {
    company: "Softvence Agency",
    role: "Frontend Developer",
    type: "Full-time · On-site",
    duration: "Aug 2024 – Jul 2025 · 1 yr",
    tag: "Agency",
    color: "from-cyan-500 to-blue-500",
    glow: "rgba(6,182,212,0.25)",
    points: [
      "Collaborated with designers, developers and clients to deliver polished client websites on schedule.",
      "Accelerated project velocity by converting requirements into reliable, responsive UI components.",
      "Improved client-facing pages with cleaner structure, responsive layouts, and trust-focused design.",
      "Enabled faster brand launches and better client presentation through improved delivery standards.",
    ],
  },
  {
    company: "AAK Tele-Science, Inc.",
    role: "MERN Stack Developer",
    type: "Remote · Contract",
    duration: "Aug 2023 – Nov 2023 · 4 mos",
    tag: "Remote",
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.25)",
    points: [
      "Built full-stack features spanning React frontend, Node.js backend, and MongoDB database layers.",
      "Collaborated asynchronously with a US-based team to understand requirements and ship updates.",
      "Handled both interface and API-related tasks, improving delivery speed across the stack.",
      "Contributed to product development with React, Node.js, Express and MongoDB implementations.",
    ],
  },
];

const ExperienceCard = ({ company, role, type, duration, tag, color, glow, points, index }) => (
  <Reveal delay={index * 0.1}>
    <motion.div
      whileHover={{ x: 6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="relative pl-10"
    >
      {/* Timeline dot */}
      <div
        className={`absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full bg-gradient-to-br ${color} ring-4 ring-[#080810]`}
        style={{ boxShadow: `0 0 12px ${glow}` }}
      />

      {/* Card */}
      <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:border-white/[0.12]" style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.05)` }}>
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-display text-xl font-bold text-white">{company}</h3>
              <span
                className={`rounded-full bg-gradient-to-r ${color} px-2.5 py-0.5 font-body text-[10px] font-bold uppercase tracking-wider text-white`}
              >
                {tag}
              </span>
            </div>
            <p className="mt-1 font-body text-sm font-medium text-white/60">{role}</p>
            <p className="mt-0.5 font-body text-xs text-white/35">{type}</p>
          </div>
          <span className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-body text-xs text-white/50">
            {duration}
          </span>
        </div>

        {/* Points */}
        <ul className="mt-5 space-y-3">
          {points.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 font-body text-sm leading-7 text-white/50"
            >
              <span
                className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${color}`}
              />
              {point}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  </Reveal>
);

const Experience = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative overflow-hidden bg-[#0c0c1a] py-28">
      {/* Orb */}
      <div className="pointer-events-none absolute right-[-10%] top-1/3 h-[350px] w-[350px] rounded-full bg-fuchsia-700/8 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mb-16 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <p className="section-label mb-4">Experience</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl font-bold leading-tight text-white lg:text-5xl">
                Real teams.{" "}
                <span className="gradient-text">Real products.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="font-body leading-8 text-white/45">
              Three years of professional frontend work — from agency projects to product companies to remote contracts.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="relative ml-2">
          {/* Vertical rail */}
          <div className="absolute left-0 top-0 h-full w-px bg-white/[0.06]">
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top bg-gradient-to-b from-purple-500 via-cyan-500 to-amber-500"
            />
          </div>

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.company} {...exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
