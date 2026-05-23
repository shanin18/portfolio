import { FaLinkedin, FaGithub } from "react-icons/fa";

const BrandMark = () => (
  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7562e0] font-poppins text-sm font-bold tracking-wider text-white">
    SH
  </span>
);

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-10 dark:border-white/10 dark:bg-[#151822]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <a href="#">
            <div className="flex items-center gap-3">
              <BrandMark />
              <div>
                <h2 className="font-poppins text-lg font-bold text-slate-950 dark:text-white">
                  Shamim
                </h2>
              </div>
            </div>
          </a>
          <div className="max-w-xl text-sm text-gray-500 md:text-center">
            <p className="mb-2 font-poppins">
              &copy; {new Date().getFullYear()} Syed Shamim Hosan. All rights
              reserved.
            </p>
            <p className="mb-2 font-poppins">
              Clean websites. Fast builds. Reliable delivery.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/syed-shamim-hosan/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-200 p-3 text-gray-500 transition duration-300 hover:border-[#7562e0] hover:text-[#7562e0] dark:border-white/10 dark:hover:text-white"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/shanin18"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-200 p-3 text-gray-500 transition duration-300 hover:border-[#7562e0] hover:text-[#7562e0] dark:border-white/10 dark:hover:text-white"
            >
              <FaGithub className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
