import { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import LazyLoad from "react-lazy-load";

const ProjectCard = ({ project, index = 0 }) => {
  const [fold, setFold] = useState(false);
  const {
    images,
    title,
    summery,
    liveLink,
    clientSide,
    serverSide,
    technology,
    impact,
    stack = [],
  } = project;

  const imageFirst = index % 2 === 0;
  const thumbnail = images?.[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="grid gap-8 border-b border-slate-200 py-10 last:border-0 dark:border-white/10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
    >
      <div className={`${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
        <motion.div
          whileHover={{ scale: 0.985 }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
          className="relative overflow-hidden rounded-md bg-slate-100 shadow-sm dark:bg-white/5"
        >
          <div className="relative aspect-[16/10]">
            {thumbnail ? (
              <LazyLoad className="h-full">
                <img
                  src={thumbnail}
                  alt={`${title} project preview`}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-full w-full object-cover duration-500 hover:scale-105"
                />
              </LazyLoad>
            ) : (
              <div className="skeleton h-auto w-full"></div>
            )}
          </div>
        </motion.div>
      </div>

      <div className={`${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#7562e0]">
              {technology}
            </p>
            <h3 className="text-3xl font-bold text-slate-950 dark:text-white lg:text-4xl">
              {title}
            </h3>
          </div>
          <span className="hidden text-5xl font-bold text-slate-100 dark:text-white/5 sm:block">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {impact && (
          <p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-slate-900 dark:text-white">
            {impact}
          </p>
        )}

        <div>
          {summery.length > 135 ? (
            <div>
              {!fold ? (
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-gray-300">
                  {summery.substring(0, 135)} ...
                  <button
                    className="ml-1 font-medium text-[#7562e0]"
                    onClick={() => setFold(!fold)}
                  >
                    see more
                  </button>
                </p>
              ) : (
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-gray-300">
                  {summery} ...
                  <button
                    className="ml-1 font-medium text-[#7562e0]"
                    onClick={() => setFold(!fold)}
                  >
                    see less
                  </button>
                </p>
              )}
            </div>
          ) : (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-gray-300">
              {summery}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:text-gray-300"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={liveLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 font-poppins text-sm font-medium text-white transition hover:bg-[#7562e0] dark:bg-white dark:text-slate-950 dark:hover:bg-[#7562e0] dark:hover:text-white"
          >
            <FiExternalLink />
            View live
          </a>
          {clientSide && (
            <a
              href={clientSide}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 font-poppins text-sm font-medium text-slate-700 transition hover:border-[#7562e0] hover:text-[#7562e0] dark:border-white/10 dark:text-gray-300"
            >
              <FiGithub />
              Client
            </a>
          )}

          {serverSide && (
            <a
              href={serverSide}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 font-poppins text-sm font-medium text-slate-700 transition hover:border-[#7562e0] hover:text-[#7562e0] dark:border-white/10 dark:text-gray-300"
            >
              <FiGithub />
              Server
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
