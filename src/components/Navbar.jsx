import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import DarkMode from "./DarkMode";

const navItems = [
  { id: "home", label: "Intro", href: "#" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "process", label: "Process", href: "#process" },
  { id: "projects", label: "Work", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const BrandMark = () => (
  <motion.span
    whileHover={{ rotate: -8, scale: 1.08 }}
    transition={{ type: "spring", stiffness: 320, damping: 18 }}
    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7562e0] font-poppins text-sm font-bold tracking-wider text-white"
  >
    SH
  </motion.span>
);

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [fold, setFold] = useState(false);
  const { scrollYProgress } = useScroll();

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 font-poppins backdrop-blur-xl dark:border-white/10 dark:bg-[#0f1117]/90">
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] origin-left bg-[#7562e0]"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-3">
          <BrandMark />
          <h2 className="text-base font-bold text-slate-950 dark:text-white md:text-lg">
            Shamim
          </h2>
        </a>
        <div className="flex items-center gap-3">
          <ul className="hidden items-center gap-7 text-sm font-medium text-slate-600 dark:text-gray-300 lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={() => setActive(item.id)}
                  className={`transition ${
                    active === item.id
                      ? "text-[#7562e0]"
                      : "hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setActive("contact")}
            className="hidden rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7562e0] dark:bg-white dark:text-slate-950 dark:hover:bg-[#7562e0] dark:hover:text-white lg:inline-flex"
          >
            Let us talk
          </a>
          <DarkMode></DarkMode>
          <div className="lg:hidden">
            {!fold ? (
              <HiOutlineBars3
                onClick={() => setFold(!fold)}
                className="cursor-pointer text-2xl text-slate-950 dark:text-white"
              ></HiOutlineBars3>
            ) : (
              <HiOutlineXMark
                onClick={() => setFold(!fold)}
                className="cursor-pointer text-2xl text-slate-950 dark:text-white"
              ></HiOutlineXMark>
            )}
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 z-50 h-screen w-[300px] bg-white font-poppins text-base text-slate-800 shadow-2xl transition-all duration-300 ease-in-out dark:bg-[#11131a] dark:text-white lg:hidden ${
          !fold ? "-left-[300px]" : "left-0"
        }`}
      >
        <div className="mb-8 flex items-center gap-3 border-b border-slate-200 px-5 py-5 dark:border-white/10">
          <BrandMark />
          <h2 className="font-bold text-slate-950 dark:text-white">Shamim</h2>
        </div>
        <ul className="space-y-2 px-5">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={() => {
                  setFold(false);
                  setActive(item.id);
                }}
                className={`block rounded-md px-4 py-3 ${
                  active === item.id
                    ? "bg-[#7562e0] text-white"
                    : "hover:bg-slate-100 dark:hover:bg-white/10"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
