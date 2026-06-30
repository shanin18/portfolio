import { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import LazyLoad from "react-lazy-load";

const ProjectCard = ({ project, index = 0 }) => {
  const [expanded, setExpanded] = useState(false);
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

  const thumbnail = images?.[0];
  const shouldTruncate = summery.length > 135;

  // 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <motion.article
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card group relative overflow-hidden rounded-2xl transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <div className="aspect-[16/9]">
            {thumbnail ? (
              <LazyLoad className="h-full w-full">
                <img
                  src={thumbnail}
                  alt={`${title} preview`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </LazyLoad>
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-purple-900/40 to-cyan-900/40" />
            )}
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-[#080810]/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

          {/* Tech tag overlay */}
          <div className="absolute left-4 top-4">
            <span
              className={`rounded-full border px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${
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
        <div className="p-6">
          <h3 className="font-display text-xl font-bold text-white">{title}</h3>

          {impact && (
            <p className="mt-2 font-body text-sm font-medium leading-6 text-white/60">
              {impact}
            </p>
          )}

          <div className="mt-3">
            <p className="font-body text-sm leading-7 text-white/40">
              {shouldTruncate && !expanded
                ? `${summery.substring(0, 135)}... `
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
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 font-body text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-[1.02]"
              >
                <FiExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
            {clientSide && (
              <a
                href={clientSide}
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
    </motion.div>
  );
};

export default ProjectCard;
