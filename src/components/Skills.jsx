import React from "react";
import { motion } from "framer-motion";
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
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import AOS from "aos";
AOS.init();

const Skills = () => {
  const skills = [
    { name: "WordPress", icon: SiWordpress, category: "CMS" },
    { name: "Grav CMS", icon: SiGrav, category: "CMS" },
    { name: "React", icon: SiReact, category: "Frontend" },
    { name: "Next.js", icon: SiNextdotjs, category: "Frontend" },
    { name: "JavaScript", icon: SiJavascript, category: "Language" },
    { name: "Tailwind CSS", icon: SiTailwindcss, category: "Styling" },
    { name: "HTML5", icon: SiHtml5, category: "Frontend" },
    { name: "CSS3", icon: SiCss3, category: "Styling" },
    { name: "Bootstrap", icon: SiBootstrap, category: "Styling" },
    { name: "Redux", icon: SiRedux, category: "State" },
    { name: "Node.js", icon: SiNodedotjs, category: "Backend" },
    { name: "Express.js", icon: SiExpress, category: "Backend" },
    { name: "PostgreSQL", icon: SiPostgresql, category: "Database" },
    { name: "MongoDB", icon: SiMongodb, category: "Database" },
    { name: "Prisma", icon: SiPrisma, category: "ORM" },
    { name: "Mongoose", icon: FaDatabase, category: "ODM" },
    { name: "Firebase", icon: SiFirebase, category: "Auth" },
    { name: "SQLite", icon: SiSqlite, category: "Database" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section className="bg-white py-20 dark:bg-[#0f1117]" id="skills">
      <div className="container mx-auto px-4 font-poppins">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#7562e0]">
              Skills
            </p>
            <h2 className="text-4xl font-bold leading-tight text-slate-950 dark:text-white lg:text-5xl">
              Tools I use to ship solid websites.
            </h2>
          </div>
          <p className="max-w-2xl text-slate-700 dark:text-gray-300">
            CMS for content. React for interfaces. Databases for real products.
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          {skills.map((skill, index) => (
            <motion.div key={index} variants={itemVariants} data-aos="zoom-in-up">
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-3 transition dark:border-white/10 dark:bg-white/5"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center">
                  <div className="mr-3 text-2xl text-[#7562e0]">
                    {React.createElement(skill.icon)}
                  </div>
                  <div>
                    <p className="font-poppins text-sm font-semibold text-slate-950 dark:text-white">
                      {skill.name}
                    </p>
                    <p className="text-[10px] uppercase text-slate-500 dark:text-gray-400">
                      {skill.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
