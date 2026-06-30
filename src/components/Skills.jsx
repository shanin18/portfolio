import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import {
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiMongodb,
  SiFirebase,
  SiNodedotjs,
  SiExpress,
  SiSqlite,
  SiRedux,
  SiNextdotjs,
  SiWordpress,
  SiPostgresql,
  SiPrisma,
  SiGrav,
  SiTypescript,
  SiVite,
  SiGit,
  SiFigma,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";

const categories = [
  {
    label: "Frontend",
    color: "from-purple-500 to-fuchsia-500",
    glow: "rgba(168,85,247,0.3)",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss3 },
    ],
  },
  {
    label: "Styling & UI",
    color: "from-cyan-500 to-blue-500",
    glow: "rgba(6,182,212,0.3)",
    skills: [
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
    ],
  },
  {
    label: "State & Tools",
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.3)",
    skills: [
      { name: "Redux", icon: SiRedux },
      { name: "Vite", icon: SiVite },
      { name: "Git", icon: SiGit },
      { name: "Figma", icon: SiFigma },
    ],
  },
  {
    label: "Backend & DB",
    color: "from-green-500 to-emerald-500",
    glow: "rgba(34,197,94,0.3)",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Prisma", icon: SiPrisma },
      { name: "Mongoose", icon: FaDatabase },
      { name: "Firebase", icon: SiFirebase },
      { name: "SQLite", icon: SiSqlite },
    ],
  },
  {
    label: "CMS",
    color: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.3)",
    skills: [
      { name: "WordPress", icon: SiWordpress },
      { name: "Grav CMS", icon: SiGrav },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const tagVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const SkillTag = ({ name, icon: Icon, glowColor }) => (
  <motion.div
    variants={tagVariants}
    whileHover={{
      y: -6,
      scale: 1.05,
      boxShadow: `0 0 24px ${glowColor}`,
      transition: { duration: 0.2 },
    }}
    whileTap={{ scale: 0.95 }}
    className="skill-tag cursor-default select-none"
  >
    <span className="text-xl">
      {React.createElement(Icon)}
    </span>
    <span className="font-body text-sm font-medium text-white/75">{name}</span>
  </motion.div>
);

const Skills = () => {
  return (
    <section id="skills" className="relative overflow-hidden bg-[#080810] py-28">
      {/* Orb */}
      <div className="pointer-events-none absolute left-[-10%] top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-cyan-700/10 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <p className="section-label mb-4">Skills</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl font-bold leading-tight text-white lg:text-5xl">
                Tools I use to{" "}
                <span className="gradient-text">ship solid</span> products.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="font-body leading-8 text-white/45">
              From CMS content platforms to full-stack React apps — covering the entire frontend stack and beyond.
            </p>
          </Reveal>
        </div>

        <div className="space-y-10">
          {categories.map((cat) => (
            <div key={cat.label}>
              <Reveal>
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className={`h-px w-8 bg-gradient-to-r ${cat.color}`}
                  />
                  <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                    {cat.label}
                  </span>
                </div>
              </Reveal>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="flex flex-wrap gap-3"
              >
                {cat.skills.map((skill) => (
                  <SkillTag
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                    glowColor={cat.glow}
                  />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
