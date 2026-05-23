import Reveal from "./Reveal";
import { motion } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";

const experiences = [
  {
    company: "Spritztech",
    role: "Frontend Developer",
    employment: "Full-time",
    duration: "Feb 2025 - Present · 1 yr 4 mos",
    location: "On-site",
    points: [
      "Helped the team ship stable frontend updates with clean, reusable UI work.",
      "Worked closely with teammates to turn product needs into clear user flows.",
      "Improved consistency across pages so users experienced a smoother product.",
      "Supported business goals by making features easier to use, maintain and launch.",
    ],
  },
  {
    company: "Softvence Agency",
    role: "Frontend Developer",
    employment: "Full-time",
    duration: "Aug 2024 - Jul 2025 · 1 yr",
    location: "Dhaka, Bangladesh · On-site",
    points: [
      "Collaborated with designers, developers and clients to deliver polished websites.",
      "Helped agency projects move faster by converting requirements into reliable UI.",
      "Improved client-facing pages with cleaner structure, responsive behavior and trust-focused design.",
      "Contributed to business value by supporting faster launches and better presentation for client brands.",
    ],
  },
  {
    company: "AAK TELE-SCIENCE, INC.",
    role: "MERN Stack Developer",
    employment: "Remote",
    duration: "Aug 2023 - Nov 2023 · 4 mos",
    location: "United States · Remote",
    points: [
      "Built full-stack features across frontend, backend and database layers.",
      "Collaborated remotely with the team to understand requirements and deliver updates.",
      "Supported product development with React, Node.js and MongoDB-based implementation.",
      "Helped improve delivery speed by handling both interface and API-related tasks.",
    ],
  },
];

const Experience = () => {
  return (
    <section className="bg-white py-20 dark:bg-[#0f1117]" id="experience">
      <div className="container mx-auto px-4 font-poppins">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#7562e0]">
              Experience
            </p>
            <h2 className="max-w-xl text-4xl font-bold leading-tight text-slate-950 dark:text-white lg:text-5xl">
              Team impact, client delivery and business-focused frontend work.
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
            {experiences.map((item) => (
              <Reveal key={item.company}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="grid gap-5 py-7 sm:grid-cols-[56px_1fr]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-50 text-[#7562e0] shadow-sm dark:bg-white/10">
                    <FiBriefcase className="text-xl" />
                  </div>
                  <div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
                          {item.company}
                        </h3>
                        <p className="mt-1 font-medium text-slate-600 dark:text-gray-300">
                          {item.role} · {item.employment}
                        </p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                          {item.location}
                        </p>
                      </div>
                      <span className="w-fit rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-[#7562e0] dark:border-white/10">
                        {item.duration}
                      </span>
                    </div>
                    <ol className="mt-5 space-y-3">
                      {item.points.map((point, pointIndex) => (
                        <motion.li
                          key={point}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: pointIndex * 0.06 }}
                          className="grid grid-cols-[32px_1fr] gap-3 text-sm leading-7 text-slate-600 dark:text-gray-300"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-[#7562e0] dark:bg-white/10">
                            {pointIndex + 1}
                          </span>
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
