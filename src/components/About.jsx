import Reveal from "./Reveal";
import { FiCode, FiDatabase, FiLayers, FiTrendingUp } from "react-icons/fi";

const valuePoints = [
  {
    icon: FiLayers,
    title: "CMS builds",
    description:
      "WordPress and Grav websites that are easy to manage.",
  },
  {
    icon: FiCode,
    title: "Clean interfaces",
    description:
      "Responsive layouts, polished states and reusable components.",
  },
  {
    icon: FiDatabase,
    title: "Data-backed apps",
    description:
      "MongoDB, PostgreSQL, Mongoose and Prisma integrations.",
  },
  {
    icon: FiTrendingUp,
    title: "Business focus",
    description:
      "Clear offers, better trust and smoother user action.",
  },
];

const About = () => {
  return (
    <section className="bg-slate-50 py-20 dark:bg-[#151822]" id="about">
      <div className="container mx-auto px-4 font-poppins">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#7562e0]">
              About
            </p>
            <h2 className="max-w-xl text-4xl font-bold leading-tight text-slate-950 dark:text-white lg:text-5xl">
              Practical developer. Sharp interface. Reliable delivery.
            </h2>
            <Reveal>
              <p className="mt-5 leading-8 text-slate-700 dark:text-gray-300">
                I build service websites, content platforms, dashboards,
                eCommerce flows and booking experiences.
              </p>
            </Reveal>
            <Reveal>
              <p className="mt-4 leading-8 text-slate-700 dark:text-gray-300">
                My focus is simple: make it clear, fast and easy to use.
              </p>
            </Reveal>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
            {valuePoints.map((point) => {
              const Icon = point.icon;

              return (
                <Reveal key={point.title}>
                  <div className="grid gap-4 py-6 sm:grid-cols-[56px_1fr]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white text-[#7562e0] shadow-sm dark:bg-white/10">
                      <Icon className="text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                        {point.title}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-600 dark:text-gray-300">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
