import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FiMail, FiSend } from "react-icons/fi";
import Swal from "sweetalert2";
import Reveal from "./Reveal";

const socials = [
  { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/shamim-hosan/", color: "hover:text-blue-400 hover:border-blue-400/40" },
  { icon: FaGithub, label: "GitHub", href: "https://github.com/shanin18", color: "hover:text-white hover:border-white/30" },
  { icon: FaDiscord, label: "Discord", href: "https://discord.com/users/shamim6393", color: "hover:text-indigo-400 hover:border-indigo-400/40" },
  { icon: FiMail, label: "Email", href: "mailto:shamimhosan02@gmail.com", color: "hover:text-purple-400 hover:border-purple-400/40" },
];

const Contact = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_y0f21wk", "template_1jd5xag", form.current, "9NO7DMhDpjZct4IrZ")
      .then(() => {
        e.target.reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Message sent!",
          text: "I'll get back to you shortly.",
          showConfirmButton: false,
          timer: 2000,
          background: "#111128",
          color: "#f1f5f9",
          iconColor: "#a855f7",
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Please try again or email me directly.",
          background: "#111128",
          color: "#f1f5f9",
        });
      });
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#080810] py-28">
      {/* Animated gradient bg */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
        <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] animate-float rounded-full bg-purple-700/12 blur-[120px]" />
        <div className="absolute right-1/4 top-2/3 h-[300px] w-[300px] animate-float-slow rounded-full bg-cyan-700/10 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Reveal>
            <p className="section-label mb-4 text-center">Contact</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl font-bold leading-tight text-white lg:text-6xl">
              Let&apos;s build something{" "}
              <span className="gradient-text">remarkable</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 font-body leading-8 text-white/45">
              Have a project in mind? I&apos;d love to hear about it. Send me the goal and I&apos;ll help plan, build and launch it.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.4fr]">
          {/* Left info */}
          <div className="space-y-8">
            {/* Info blocks */}
            {[
              { label: "Best for", value: "CMS sites, React/Next.js apps, dashboards" },
              { label: "Focus", value: "UX, performance, maintainability" },
              { label: "Availability", value: "Freelance & full-time — open now" },
              { label: "Response time", value: "Usually within 24 hours" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <div className="glass-card rounded-xl p-4">
                  <p className="font-body text-xs font-medium uppercase tracking-widest text-white/35">{item.label}</p>
                  <p className="mt-1 font-body text-sm font-semibold text-white/80">{item.value}</p>
                </div>
              </Reveal>
            ))}

            {/* Socials */}
            <Reveal delay={0.35}>
              <div>
                <p className="mb-4 font-body text-xs font-medium uppercase tracking-widest text-white/35">Find me on</p>
                <div className="flex flex-wrap gap-3">
                  {socials.map(({ icon: Icon, label, href, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ y: -3, scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/50 transition-all duration-300 ${color}`}
                      aria-label={label}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.2} direction="left">
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="glass-card space-y-4 rounded-2xl p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="font-body text-xs font-medium text-white/40">Name</label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 font-body text-sm text-white placeholder-white/25 outline-none ring-0 transition-all focus:border-purple-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(168,85,247,0.12)]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-body text-xs font-medium text-white/40">Email</label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 font-body text-sm text-white placeholder-white/25 outline-none ring-0 transition-all focus:border-purple-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(168,85,247,0.12)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-body text-xs font-medium text-white/40">Project brief</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your project, timeline, and budget..."
                  className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 font-body text-sm text-white placeholder-white/25 outline-none ring-0 transition-all focus:border-purple-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(168,85,247,0.12)]"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(168,85,247,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="btn-gradient w-full justify-center font-body"
              >
                Send Message
                <FiSend className="h-4 w-4" />
              </motion.button>

              <p className="text-center font-body text-xs text-white/25">
                No spam. I only use this to reply to you.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
