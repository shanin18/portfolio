import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { FiBookOpen, FiExternalLink, FiGithub } from "react-icons/fi";
import CaseStudy from "./CaseStudy";
import caseStudies from "../data/caseStudies";
import { trackClick } from "../lib/track";

const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const ProjectCard = ({ project, index = 0, featured = false }) => {
  const [expanded, setExpanded] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
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
    status,
  } = project;

  const study = caseStudies[title];
  const hasStudy = study?.results?.length > 0;
  const thumbnail = images?.[0];
  const limit = featured ? 320 : 135;
  const shouldTruncate = summery.length > limit;

  // 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!canHover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const techColors = {
    "Next.js": "bg-white/[0.06] text-white/70 border-white/[0.08]",
    "React": "bg-cyan-500/10 text-cyan-400/80 border-cyan-500/20",
    "HTML/CSS": "bg-orange-500/10 text-orange-400/80 border-orange-500/20",
    "3D / WebGL": "bg-emerald-500/10 text-emerald-300/90 border-emerald-500/25",
    "Mobile": "bg-amber-500/10 text-amber-300/90 border-amber-500/25",
  };

  return (
    <motion.div
      className={featured ? "sm:col-span-2 lg:col-span-3" : ""}
    >
      <motion.article
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`card-3d glass-card group relative h-full overflow-hidden rounded-2xl ${featured ? "lg:grid lg:grid-cols-[1.35fr_1fr]" : ""} transition-all duration-300`}
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <div className={featured ? "aspect-[16/9] lg:aspect-auto lg:h-full" : "aspect-[16/9]"}>
            {thumbnail ? (
                              <img
                  src={thumbnail}
                  alt={`${title} preview`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-purple-900/40 to-cyan-900/40" />
            )}
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-[#0b0a09]/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

          {/* Tech tag overlay */}
          <div className="absolute left-4 top-4">
            <span
              className={`rounded-full border px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider bg-[#0b0a09]/80 ${
                techColors[technology] || "bg-white/[0.06] text-white/60 border-white/[0.08]"
              }`}
            >
              {technology}
            </span>
          </div>

          {/* Index number */}
          <div className="absolute right-4 top-4">
            <span className="font-display text-4xl font-extrabold text-white/8">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={featured ? "flex flex-col justify-center p-6 lg:p-10" : "p-6"}>
          {featured && (
            <p className="mb-3 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-purple-300/80">Featured project</p>
          )}
          <h3 className={`font-display font-bold text-white ${featured ? "text-3xl" : "text-xl"}`}>{title}</h3>

          {impact && (
            <p className="mt-2 font-body text-sm font-medium leading-6 text-white/60">
              {impact}
            </p>
          )}

          <div className="mt-3">
            <p className="font-body text-sm leading-7 text-white/40">
              {shouldTruncate && !expanded
                ? `${summery.substring(0, limit)}... `
                : summery + " "}
              {shouldTruncate && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="font-semibold text-purple-400 hover:text-purple-300"
                >
                  {expanded ? "see less" : "see more"}
                </button>
              )}
            </p>
          </div>

          {/* Stack */}
          {stack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 font-body text-[10px] font-medium text-white/40"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="mt-6 flex flex-wrap gap-3">
            {hasStudy && (
              <button
                onClick={() => {
                  setStudyOpen(true);
                  trackClick(`Case study: ${title}`);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-[#ff5533]/40 bg-[#ff5533]/10 px-4 py-2 font-body text-sm font-semibold text-[#ffa58f] transition-all hover:border-[#ff5533]/70 hover:text-white"
              >
                <FiBookOpen className="h-3.5 w-3.5" />
                Case study
              </button>
            )}
            {!liveLink && status && (
              <span className="inline-flex items-center gap-2 rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-2 font-body text-sm font-medium text-amber-300/90">
                {status}
              </span>
            )}
            {liveLink && (
              <a
                href={liveLink}
                data-track={`Live demo: ${title}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 font-body text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(255,85,51,0.4)] hover:scale-[1.02]"
              >
                <FiExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
            {clientSide && (
              <a
                href={clientSide}
                data-track={`GitHub: ${title}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-2 font-body text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:text-white"
              >
                <FiGithub className="h-3.5 w-3.5" />
                Client
              </a>
            )}
            {serverSide && (
              <a
                href={serverSide}
                data-track={`GitHub (server): ${title}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-2 font-body text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:text-white"
              >
                <FiGithub className="h-3.5 w-3.5" />
                Server
              </a>
            )}
          </div>
        </div>
      </motion.article>
      {/* Portal: the card is 3D-transformed, which would otherwise trap a fixed overlay inside it. */}
      {hasStudy &&
        createPortal(
          <AnimatePresence>
            {studyOpen && <CaseStudy project={project} study={study} onClose={() => setStudyOpen(false)} />}
          </AnimatePresence>,
          document.body,
        )}
    </motion.div>
  );
};

export default ProjectCard;
