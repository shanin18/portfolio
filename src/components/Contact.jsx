import emailjs from "@emailjs/browser";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaDiscord, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRef } from "react";
import Swal from "sweetalert2";

AOS.init();
const Contact = () => {
  const form = useRef();

  const handleGetEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_y0f21wk",
        "template_1jd5xag",
        form.current,
        "9NO7DMhDpjZct4IrZ"
      )
      .then(
        () => {
          e.target.reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Mail send successfully!!",
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const notes = ["Freelance ready", "Frontend focused", "Launch support"];

  return (
    <section className="bg-white py-20 dark:bg-[#0f1117]" id="contact">
      <div
        className="container mx-auto grid gap-12 px-4 font-poppins lg:grid-cols-[0.9fr_1.1fr]"
        data-aos="zoom-in-up"
      >
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#7562e0]">
            Contact
          </p>
          <h2 className="max-w-xl font-poppins text-4xl font-bold leading-tight text-slate-950 dark:text-white lg:text-5xl">
            Need a clean, fast website?
          </h2>
          <p className="mt-5 max-w-xl leading-8 text-slate-700 dark:text-gray-300">
            Send the goal. I will help plan, build and launch it.
          </p>
          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200 text-sm dark:divide-white/10 dark:border-white/10">
            <div className="flex justify-between py-4">
              <span className="text-slate-500 dark:text-gray-400">Best for</span>
              <span className="font-semibold text-slate-950 dark:text-white">
                CMS sites, React apps, dashboards
              </span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-slate-500 dark:text-gray-400">Focus</span>
              <span className="font-semibold text-slate-950 dark:text-white">
                UX, performance, maintainability
              </span>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {notes.map((note, index) => (
              <motion.span
                key={note}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-gray-300"
              >
                {note}
              </motion.span>
            ))}
          </div>
          <div className="mt-8 flex gap-4">
            <a
              href="https://www.linkedin.com/in/shamim-hosan/"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-slate-200 p-3 text-slate-600 transition hover:border-[#7562e0] hover:text-[#7562e0] dark:border-white/10 dark:text-gray-300"
            >
              <FaLinkedin className="text-xl"></FaLinkedin>
            </a>
            <a
              href="https://github.com/shanin18"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-slate-200 p-3 text-slate-600 transition hover:border-[#7562e0] hover:text-[#7562e0] dark:border-white/10 dark:text-gray-300"
            >
              <FaGithub className="text-xl"></FaGithub>
            </a>
            <a
              href="https://facebook.com/hosanshamim52"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-slate-200 p-3 text-slate-600 transition hover:border-[#7562e0] hover:text-[#7562e0] dark:border-white/10 dark:text-gray-300"
            >
              <FaFacebook className="text-xl"></FaFacebook>
            </a>
            <a
              href="https://discord.com/users/shamim6393"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-slate-200 p-3 text-slate-600 transition hover:border-[#7562e0] hover:text-[#7562e0] dark:border-white/10 dark:text-gray-300"
            >
              <FaDiscord className="text-xl"></FaDiscord>
            </a>
          </div>
        </div>
        <form
          ref={form}
          onSubmit={handleGetEmail}
          className="w-full space-y-4 border-l border-slate-200 pl-0 dark:border-white/10 lg:pl-10"
        >
          <input
            type="text"
            id="name"
            name="user_name"
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-4 font-poppins text-sm outline-none transition placeholder:text-slate-400 focus:border-[#7562e0] dark:border-white/10 dark:bg-white/5 dark:text-white"
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            id="email"
            name="user_email"
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-4 font-poppins text-sm outline-none transition placeholder:text-slate-400 focus:border-[#7562e0] dark:border-white/10 dark:bg-white/5 dark:text-white"
            placeholder="Your Email"
            required
          />
          <textarea
            id="message"
            name="message"
            className="h-[220px] w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-4 font-poppins text-sm outline-none transition placeholder:text-slate-400 focus:border-[#7562e0] dark:border-white/10 dark:bg-white/5 dark:text-white"
            placeholder="Your Message"
            required
          ></textarea>
          <button
            type="submit"
            className="rounded-md border border-[#7562e0] bg-[#7562e0] px-6 py-3 font-poppins font-semibold text-white transition-all duration-200 hover:bg-[#5f4fd3]"
          >
            Send Project Brief
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
