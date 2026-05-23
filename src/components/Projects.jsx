import { useState } from "react";
import ProjectCard from "./ProjectCard";
import yachtImg from "../assets/yacht.png";
import opsImg from "../assets/my-ops.png";
import shopeaseImg from "../assets/shopease.png";
import shashhImg from "../assets/shashh.png";
import boxImg from "../assets/box.png";
import freyeImg from "../assets/freye.png";
import fluteImg from "../assets/flute.png";

const filterOptions = ["All", "HTML/CSS", "React", "Next.js"];

const projects = [
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
    title: "Captured visions",
    images: [
      "https://i.ibb.co/rkB8d99/img1.webp",
      "https://i.ibb.co/vzSLKP1/img2.webp",
      "https://i.ibb.co/T2p9RBw/img3.webp",
      "https://i.ibb.co/1Ky0KmL/img4.webp",
      "https://i.ibb.co/M7hThv0/img5.webp",
      "https://i.ibb.co/pKZrmHJ/img6.webp",
      "https://i.ibb.co/0cCyZC9/img7.webp",
    ],
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
    images: [
      "https://i.ibb.co/MPHmQQV/1.webp",
      "https://i.ibb.co/Cnfw5gM/3.webp",
      "https://i.ibb.co/wMv8t0m/2.webp",
      "https://i.ibb.co/cwcvr9m/4.webp",
      "https://i.ibb.co/fD7MCWX/5.webp",
    ],
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
    images: [
      "https://i.ibb.co/Snmp0vB/Screenshot-2024-08-15-012503.webp",
      "https://i.ibb.co/SR67GDz/Screenshot-2024-08-15-012529.webp",
    ],
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
    images: [
      "https://i.ibb.co/Jc5bwZ4/img1.webp",
      "https://i.ibb.co/VqP9q7m/img2.webp",
      "https://i.ibb.co/9hnsk6B/img3.webp",
      "https://i.ibb.co/mTv3VN9/img4.webp",
      "https://i.ibb.co/1952bs1/img5.webp",
      "https://i.ibb.co/K59kbqQ/img6.webp",
    ],
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
    images: [
      "https://i.ibb.co/bbSmvw2/img1.webp",
      "https://i.ibb.co/L9bXpf9/img2.webp",
      "https://i.ibb.co/V9VQgHM/img3.webp",
      "https://i.ibb.co/1ZVFww3/img4.webp",
      "https://i.ibb.co/3yd0TLj/img5.webp",
      "https://i.ibb.co/BPRyBdF/img6.webp",
      "https://i.ibb.co/ZXWDkyr/img7.webp",
    ],
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
    title: "Ticket Booking App",
    images: [
      "https://i.ibb.co/Pcyhf9p/5.webp",
      "https://i.ibb.co/51xSgpF/3.webp",
      "https://i.ibb.co/Qvcvpwy/2.webp",
      "https://i.ibb.co/yW5KwVd/1.webp",
      "https://i.ibb.co/BGJzvsJ/4.webp",
    ],
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
  // const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeFilter, setActiveFilter] = useState("All");

  // useEffect(() => {
  //   fetch("/data.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProjects(data);
  //       setFilteredProjects(data);
  //     });
  // }, []);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (filter === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.technology === filter
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <section className="bg-slate-50 py-20 dark:bg-[#151822]" id="projects">
      <div className="container mx-auto px-4 font-poppins">
        <div className="grid gap-8 border-b border-slate-200 pb-10 dark:border-white/10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#7562e0]">
              Work
            </p>
            <h2 className="text-4xl font-bold leading-tight text-slate-950 dark:text-white lg:text-5xl">
              Selected projects. Real interfaces.
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-slate-700 dark:text-gray-300">
              Websites, dashboards, eCommerce, booking systems and content
              platforms.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleFilter(option)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium ${
                    activeFilter === option
                      ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
                      : "border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                  } transition duration-300 hover:border-[#7562e0] hover:text-[#7562e0]`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <ProjectCard key={idx} project={project} index={idx} />
            ))
          ) : (
            <p className="py-10 text-center text-gray-500 dark:text-gray-400">
              No projects found for {activeFilter}.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
