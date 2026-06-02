import Reveal from "./Reveal";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const highlights = [
  "CMS websites",
  "React and Next.js apps",
  "Dashboards and eCommerce",
];

const metrics = [
  { value: "50+", label: "Sites built" },
  { value: "3+", label: "Years experience" },
  { value: "6+", label: "Core technologies" },
];

const Hero = () => {
  return (
    <section className="animated-grid bg-white py-20 dark:bg-[#0f1117]">
      <div className="container mx-auto grid items-end gap-14 px-4 font-poppins lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#7562e0]">
              50+ sites. 3+ years.
            </p>
          </Reveal>
          <Reveal>
            <h1 className="max-w-5xl text-5xl font-bold leading-[1.05] text-slate-950 dark:text-white lg:text-7xl">
              I build clean websites that work fast and look professional.
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 dark:text-gray-300 md:text-lg">
              WordPress, Grav CMS, React, Next.js, PostgreSQL and MongoDB for
              business websites, dashboards and web apps.
            </p>
          </Reveal>

          <Reveal>
            <motion.div
              className="mt-9 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45 }}
            >
              <a
                rel="noreferrer"
                target="_blank"
                href="https://drive.google.com/file/d/1jNmv4UrHoPes1v8w4-sY2btUzlvREyd4/view?usp=sharing"
                download={true}
              >
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-md border border-[#7562e0] bg-[#7562e0] px-5 py-3 font-poppins font-medium text-white transition-all duration-200 hover:shadow-neon"
                >
                  View Resume
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiArrowRight />
                  </motion.span>
                </motion.button>
              </a>

              <a href="#projects">
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-md border border-slate-300 bg-white px-5 py-3 font-poppins font-medium text-slate-900 transition-all duration-200 hover:border-[#7562e0] hover:text-[#7562e0] dark:border-white/10 dark:bg-white/5 dark:text-white"
                >
                  View Projects
                </motion.button>
              </a>
            </motion.div>
          </Reveal>

          <Reveal>
            <div className="mt-10 grid gap-4 border-y border-slate-200 py-6 text-sm text-slate-700 dark:border-white/10 dark:text-gray-300 md:grid-cols-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-start gap-2"
                >
                  <FiCheckCircle className="mt-1 shrink-0 text-[#7562e0]" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="border-l border-slate-200 pl-6 dark:border-white/10 lg:pl-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-gray-400">
              Delivery snapshot
            </p>
            <div className="mt-6 grid gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className="border-b border-slate-200 pb-6 last:border-0 dark:border-white/10"
                >
                  <p className="text-5xl font-bold text-slate-950 dark:text-white">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm font-medium uppercase text-[#7562e0]">
                    {metric.label}
                  </p>
                </motion.div>
              ))}
            </div>
            <p className="mt-8 text-xl font-semibold leading-8 text-slate-900 dark:text-white">
              Clear design. Clean code. Reliable delivery.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
