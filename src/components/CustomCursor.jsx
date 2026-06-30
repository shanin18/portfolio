import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { damping: 30, stiffness: 800 });
  const dotY = useSpring(mouseY, { damping: 30, stiffness: 800 });

  const ringX = useSpring(mouseX, { damping: 22, stiffness: 180 });
  const ringY = useSpring(mouseY, { damping: 22, stiffness: 180 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400 md:block"
        style={{ left: dotX, top: dotY }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9998] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/40 md:block"
        style={{ left: ringX, top: ringY }}
      />
    </>
  );
};

export default CustomCursor;
