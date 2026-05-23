import { useEffect, useState } from "react";
import { BsSun } from "react-icons/bs";
import { BiMoon } from "react-icons/bi";
const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(true);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  // Check the initial state from localStorage
  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode) {
      setDarkMode(storedMode === "true");
    }
  }, []);

  // Update class on body element based on dark mode state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-[#7562e0] transition hover:border-[#7562e0] dark:border-white/10 dark:bg-white/5"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <BiMoon className="text-xl"></BiMoon>
      ) : (
        <BsSun className="text-xl"></BsSun>
      )}
    </button>
  );
};

export default DarkMode;
