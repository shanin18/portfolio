import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import yachtImg from "../assets/thumbs/yacht-thumb.jpg";
import opsImg from "../assets/thumbs/my-ops-thumb.jpg";
import shopeaseImg from "../assets/thumbs/shopease-thumb.jpg";
import shashhImg from "../assets/thumbs/shashh-thumb.jpg";
import boxImg from "../assets/thumbs/box-thumb.jpg";
import freyeImg from "../assets/thumbs/freye-thumb.jpg";
import fluteImg from "../assets/thumbs/flute-thumb.jpg";
import gadgetGalleryImg from "../assets/thumbs/gadgetgallery-thumb.jpg";
import eyeSolutionsImg from "../assets/thumbs/eye-solutions-thumb.jpg";

const filterOptions = ["All", "Next.js", "React", "HTML/CSS"];

const projects = [
  {
    id: 15,
    title: "GadgetGallery",
    images: [gadgetGalleryImg],
    summery:
      "A published ecommerce platform for a Bangladesh-based gadget and audio accessories store with storefront, catalog, cart, wishlist, checkout, reviews, image uploads, order tracking and a full admin dashboard.",
    liveLink: "https://www.gadgetgallery.tech",
    technology: "Next.js",
    impact: "Full ecommerce operation with customer shopping flow, inventory control, coupons, notifications and admin management.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Cloudinary", "Zustand", "Vercel"],
  },
  {
    id: 16,
    title: "Eye Solutions",
    images: [eyeSolutionsImg],
    summery:
      "A clinic and optical management platform that connects appointment booking, doctor consultations, prescriptions, product sales, inventory tracking, billing and patient history in one workflow.",
    liveLink: "https://eye-solutions.vercel.app",
    technology: "Next.js",
    impact: "Connected care workflow for clinics and optical businesses, from patient booking to inventory and billing visibility.",
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Neon", "Tailwind CSS", "Cloudinary", "Nodemailer", "Vercel"],
  },
  {
    id: 1,
    title: "Yachtease",
    images: [yachtImg],
    summery:
      "A platform concept for yacht crews, suppliers and agencies to manage key workflows from one clear digital experience.",
    liveLink: "https://yachtease.vercel.app",
    technology: "React",
    impact: "Multi-sided platform experience for a complex service ecosystem.",
    stack: ["React", "Responsive UI", "Platform UX"],
  },
  {
    id: 2,
    title: "My Ops",
    images: [opsImg],
    summery:
      "A real estate operations interface designed to organize business activity, expenses and day-to-day management tasks.",
    liveLink: "https://my-ops-react.vercel.app",
    technology: "React",
    impact: "Operational dashboard for clearer tracking and expense visibility.",
    stack: ["React", "Dashboard", "Business tools"],
  },
  {
    id: 3,
    title: "ShopEase",
    images: [shopeaseImg],
    summery:
      "An eCommerce platform experience focused on product discovery, shopping flow and seller-friendly structure.",
    liveLink: "https://shopease-gamma.vercel.app",
    clientSide: "https://github.com/shanin18/shopease",
    serverSide: "https://github.com/shanin18/shopease-server",
    technology: "React",
    impact: "Shopping flow designed around both customer and seller needs.",
    stack: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 4,
    title: "Captured Visions",
    images: ["https://i.ibb.co/rkB8d99/img1.webp"],
    summery:
      "A full-stack photography school website with authentication, course browsing and a structured learning experience.",
    liveLink: "https://capturedvisions-61b6b.web.app/",
    clientSide: "https://github.com/shanin18/Captured-Visions-client",
    serverSide: "https://github.com/shanin18/Captured-Visions-server",
    technology: "React",
    impact: "Learning platform experience with auth and course workflows.",
    stack: ["React", "MERN", "Firebase"],
  },
  {
    id: 5,
    title: "Lodgify",
    images: ["https://i.ibb.co/MPHmQQV/1.webp"],
    summery:
      "A booking management interface for hotels and vacation rentals, built to make guest and reservation workflows easier to manage.",
    liveLink: "https://y-lyart-seven.vercel.app/",
    clientSide: "https://github.com/shanin18/lodgify-hotel-management",
    technology: "Next.js",
    impact: "Booking-focused product flow for rental and guest management.",
    stack: ["Next.js", "Booking UX", "Dashboard"],
  },
  {
    id: 6,
    title: "Shashh",
    images: [shashhImg],
    summery:
      "A marketing marketplace concept that connects billboard owners with advertisers looking to rent ad space and run campaigns.",
    liveLink: "https://shashh.netlify.app",
    technology: "HTML/CSS",
    impact: "Marketplace flow built around campaign visibility and lead generation.",
    stack: ["HTML", "CSS", "Landing page"],
  },
  {
    id: 7,
    title: "Box Hub",
    images: [boxImg],
    summery:
      "A service website for delivery handling, with scheduling and payment-oriented touchpoints for a smoother customer journey.",
    liveLink: "https://box-hub.vercel.app/",
    technology: "HTML/CSS",
    impact: "Service journey shaped around scheduling, payment and trust.",
    stack: ["HTML", "CSS", "Service UX"],
  },
  {
    id: 8,
    title: "Freye",
    images: [freyeImg],
    summery:
      "An eyewear product experience for browsing glasses, sunglasses and lens options with a more guided selection flow.",
    liveLink: "https://fahadrazooki.vercel.app/",
    technology: "HTML/CSS",
    impact: "Product-led experience for eyewear browsing and guided selection.",
    stack: ["HTML", "CSS", "Product UX"],
  },
  {
    id: 9,
    title: "Flute N Feather",
    images: [fluteImg],
    summery:
      "An education-focused website concept with a friendly interface for helping children stay engaged with learning content.",
    liveLink: "https://flute-n-feather.vercel.app",
    technology: "HTML/CSS",
    impact: "Child-friendly education interface with clear content structure.",
    stack: ["HTML", "CSS", "Education"],
  },
  {
    id: 10,
    title: "Quiz Game",
    images: ["https://i.ibb.co/88DHt5B/Screenshot-2024-08-04-200334.png"],
    summery:
      "A React quiz game with interactive question flow, state-driven feedback and simple scoring behavior.",
    liveLink: "https://mcq-game-nine.vercel.app",
    clientSide: "https://github.com/shanin18/mcq-game",
    technology: "React",
    impact: "Interactive quiz flow with clear feedback and scoring.",
    stack: ["React", "Game UI", "State"],
  },
  {
    id: 11,
    title: "Simple E-commerce",
    images: ["https://i.ibb.co/Snmp0vB/Screenshot-2024-08-15-012503.webp"],
    summery:
      "A product listing experience that fetches API data and supports searching, filtering and sorting for easier product discovery.",
    liveLink: "https://simple-ecommerce-gamma.vercel.app",
    clientSide: "https://github.com/shanin18/simple-ecommerce",
    technology: "React",
    impact: "Product discovery interface with search, sort and filtering.",
    stack: ["React", "Vite", "Axios"],
  },
  {
    id: 12,
    title: "Toy Paradise",
    images: ["https://i.ibb.co/Jc5bwZ4/img1.webp"],
    summery:
      "A full-stack toy catalog experience for browsing products and managing content around an action figure collection.",
    liveLink: "https://toy-paradise-2e411.web.app/",
    clientSide: "https://github.com/shanin18/toy-paradise-client",
    serverSide: "https://github.com/shanin18/toy-paradise-server",
    technology: "React",
    impact: "Catalog experience for product discovery and content management.",
    stack: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 13,
    title: "Savory Selection",
    images: ["https://i.ibb.co/bbSmvw2/img1.webp"],
    summery:
      "A cuisine-focused web experience for showcasing Bangladeshi dishes with rich browsing and content presentation patterns.",
    liveLink: "https://react-savory-selections.web.app/",
    clientSide: "https://github.com/shanin18/Savory-selection-client",
    serverSide: "https://github.com/shanin18/Savory-selection-server",
    technology: "React",
    impact: "Content platform with strong category-based browsing patterns.",
    stack: ["React", "MERN", "Firebase"],
  },
  {
    id: 14,
    title: "Ticket Booking",
    images: ["https://i.ibb.co/Pcyhf9p/5.webp"],
    summery:
      "A ticket booking dashboard experience for browsing events, managing reservations and supporting purchase workflows.",
    liveLink: "https://ticket-booking-dashboard-rho.vercel.app",
    clientSide: "https://github.com/shanin18/ticket-booking",
    serverSide: "https://github.com/shanin18/ticket-booking-server",
    technology: "React",
    impact: "Reservation workflow for events, activities and dashboard actions.",
    stack: ["React", "Node.js", "Booking"],
  },
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.technology === activeFilter);

  return (
    <section id="projects" className="relative overflow-hidden bg-[#0c0c1a] py-28">
      {/* Orb */}
      <div className="pointer-events-none absolute left-[-8%] top-1/4 h-[400px] w-[400px] rounded-full bg-cyan-700/8 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <p className="section-label mb-4">Work</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl font-bold leading-tight text-white lg:text-5xl">
                Selected projects.{" "}
                <span className="gradient-text">Real interfaces.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div>
              <p className="mb-6 font-body text-white/45">
                Websites, dashboards, eCommerce, booking systems, and content platforms built with modern tooling.
              </p>
              {/* Filters */}
              <div className="relative flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setActiveFilter(option)}
                    className={`relative rounded-xl border px-4 py-2 font-body text-sm font-medium transition-all duration-300 ${
                      activeFilter === option
                        ? "border-purple-500/50 bg-purple-500/15 text-purple-300"
                        : "border-white/[0.08] bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {activeFilter === option && (
                      <motion.span
                        layoutId="filter-active"
                        className="absolute inset-0 rounded-xl bg-purple-500/10"
                      />
                    )}
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.length > 0 ? (
              filtered.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))
            ) : (
              <p className="col-span-full py-16 text-center font-body text-white/40">
                No projects in this category yet.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
