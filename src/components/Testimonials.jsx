import { FiLinkedin } from "react-icons/fi";
import Reveal from "./Reveal";
import testimonials from "../data/testimonials";

// Renders nothing until src/data/testimonials.js has at least one quote.
const Testimonials = () => {
  if (!testimonials.length) return null;
  return (
    <section id="testimonials" className="relative py-24">
      <div className="container relative z-10 mx-auto px-4">
        <Reveal>
          <p className="section-label mb-4">Testimonials</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mb-12 font-display text-4xl font-bold leading-tight text-white lg:text-5xl">
            What people <span className="gradient-text">say.</span>
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name + i} delay={i * 0.08}>
              <figure className="glass-card flex h-full flex-col rounded-2xl p-7">
                <span aria-hidden="true" className="font-display text-5xl leading-none text-[#ff5533]/60">
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1 font-body text-[15px] leading-7 text-white/75">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
                  <div>
                    <p className="font-display font-semibold text-white">{t.name}</p>
                    <p className="font-body text-xs text-white/45">
                      {t.role}
                      {t.project && ` · ${t.project}`}
                    </p>
                  </div>
                  {t.link && (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${t.name} on LinkedIn`}
                      data-track={`Testimonial: ${t.name}`}
                      className="text-white/40 hover:text-white"
                    >
                      <FiLinkedin />
                    </a>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
