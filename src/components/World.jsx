import { useEffect } from "react";
import Lenis from "lenis";

/* Fixed 3D "flight deck": horizon glow, ember grid floor and starfield.
   All motion is CSS scroll-driven (compositor thread). Lenis adds inertia
   to wheel scrolling on desktop; touch stays native. */
const World = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.16, anchors: { offset: -72 }, wheelMultiplier: 1 });
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="world" aria-hidden="true">
        <div className="world-stars" />
        <div className="world-horizon" />
        <div className="world-floor">
          <div className="world-grid" />
        </div>
      </div>
      <div className="hud-rail" aria-hidden="true">
        <span className="hud-rail-fill" />
      </div>
    </>
  );
};

export default World;
