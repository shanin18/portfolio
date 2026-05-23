import { motion } from "framer-motion";

const steps = [
  {
    title: "Understand",
    text: "Goal, users, scope.",
  },
  {
    title: "Structure",
    text: "Pages, flows, content.",
  },
  {
    title: "Build",
    text: "Clean UI, clean code.",
  },
  {
    title: "Launch",
    text: "Polish, test, ship.",
  },
];

const Process = () => {
  return (
    <section className="bg-slate-50 py-20 dark:bg-[#151822]" id="process">
      <div className="container mx-auto px-4 font-poppins">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#7562e0]">
              Process
            </p>
            <h2 className="max-w-xl text-4xl font-bold leading-tight text-slate-950 dark:text-white lg:text-5xl">
              Simple process. Strong finish.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -5 }}
                transition={{ delay: index * 0.06 }}
                className="border-t border-slate-200 pt-5 dark:border-white/10"
              >
                <span className="text-sm font-bold text-[#7562e0]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-slate-600 dark:text-gray-300">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
