import { useEffect, useRef } from "react";

/*
 * "The stack, exploded": Interface / API / Data as floating glass layers.
 * Pure CSS 3D (compositor-only transforms), mouse tilt via CSS variables,
 * animations pause when the hero is off screen.
 */
const HeroStack = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([e]) => el.classList.toggle("is-paused", !e.isIntersecting));
    io.observe(el);

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => io.disconnect();

    let raf = 0;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty("--ry", `${x * 18}deg`);
        el.style.setProperty("--rx", `${-y * 14}deg`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="stack3d" aria-hidden="true">
      <div className="stack3d-tilt">
        <div className="stack3d-orbit">
          {/* Data */}
          <div className="stack3d-layer layer-data">
            <span className="stack3d-tag">03 · Data</span>
            <div className="grid h-full grid-cols-6 gap-2 p-6 pt-10">
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className={`rounded-md ${[3, 8, 13, 17, 22].includes(i) ? "bg-cyan-400/50" : "bg-white/[0.06]"}`}
                />
              ))}
            </div>
          </div>

          {/* API */}
          <div className="stack3d-layer layer-api">
            <span className="stack3d-tag">02 · API</span>
            <div className="space-y-3 p-6 pt-10 font-mono text-[11px] text-white/50">
              <p>
                <span className="text-purple-300">GET</span> /api/projects{" "}
                <span className="text-emerald-300">200</span>
              </p>
              {[78, 52, 66, 40, 70, 34].map((w, i) => (
                <div key={i} className="flex gap-2" style={{ paddingLeft: `${(i % 3) * 14}px` }}>
                  <span className="h-2 rounded-full bg-purple-400/60" style={{ width: `${w * 0.35}%` }} />
                  <span className="h-2 rounded-full bg-white/15" style={{ width: `${w * 0.45}%` }} />
                </div>
              ))}
            </div>
          </div>

          {/* Interface */}
          <div className="stack3d-layer layer-ui">
            <span className="stack3d-tag">01 · Interface</span>
            <div className="p-5 pt-10">
              <div className="mb-4 flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-purple-400" />
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span className="h-2 w-2 rounded-full bg-white/30" />
              </div>
              <div className="mb-3 h-3 w-2/3 rounded-full bg-white/70" />
              <div className="mb-5 h-2 w-1/2 rounded-full bg-white/25" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 rounded-lg bg-gradient-to-br from-purple-500/60 to-cyan-500/40" />
                <div className="h-16 rounded-lg border border-white/15 bg-white/[0.04]" />
              </div>
              <div className="mt-4 h-7 w-24 rounded-md bg-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroStack;
