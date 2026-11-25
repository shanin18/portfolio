import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiX } from "react-icons/fi";

const Block = ({ label, children }) => (
  <div className="mt-7">
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffab1a]">{label}</p>
    <div className="mt-2 font-body text-[15px] leading-7 text-white/70">{children}</div>
  </div>
);

const List = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5533]" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

// Full-screen case study for one project: problem → role → what was built → results.
const CaseStudy = ({ project, study, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] overflow-y-auto bg-black/75 px-4 py-10 backdrop-blur-sm"
      onClick={onClose}
      data-lenis-prevent
    >
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141210]"
      >
        <button
          onClick={onClose}
          autoFocus
          aria-label="Close case study"
          className="absolute right-4 top-4 z-10 rounded-lg border border-white/10 bg-[#0b0a09]/80 p-2 text-white/70 hover:text-white"
        >
          <FiX className="h-5 w-5" />
        </button>
        {project.images?.[0] && (
          <img src={project.images[0]} alt={`${project.title} preview`} className="aspect-[16/8] w-full object-cover" />
        )}
        <div className="p-6 sm:p-10">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff7a59]">Case study</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">{project.title}</h2>
          {project.impact && <p className="mt-3 font-body text-base text-white/55">{project.impact}</p>}

          {study.problem && <Block label="The problem">{study.problem}</Block>}
          {study.role && <Block label="My role">{study.role}</Block>}
          {study.built?.length > 0 && (
            <Block label="What I built">
              <List items={study.built} />
            </Block>
          )}
          {study.results?.length > 0 && (
            <Block label="Results">
              <List items={study.results} />
            </Block>
          )}

          {project.stack?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 font-body text-[11px] text-white/45">
                  {s}
                </span>
              ))}
            </div>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              data-track={`Live demo (case study): ${project.title}`}
              className="btn-gradient mt-8 font-body"
            >
              <FiExternalLink /> Visit live site
            </a>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
};

export default CaseStudy;
