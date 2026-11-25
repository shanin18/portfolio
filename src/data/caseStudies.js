// Case studies, keyed by project title (must match the title in components/Projects.jsx).
// A project gets a "Read case study" button once its `results` list has at least one entry,
// so these drafts stay hidden until you add real outcomes.
//
// The problem / built lines below are drafted from what the site already says about each project.
// Edit them freely, and fill in:
//   role    – what you personally did (solo build? lead dev? frontend only?) and how long it took
//   results – real outcomes, ideally with numbers: "Enquiries up 40% in 3 months",
//             "Lighthouse 98 on mobile", "120 paying subscribers in the first month", "Shipped in 6 weeks"
const caseStudies = {
  "Global Admission Platform": {
    problem:
      "A study-abroad consultancy needed a website that turns visitors into student enquiries, content the team can update without a developer, and one place for staff to follow each lead through to an application.",
    role: "",
    built: [
      "Country and service pages, with appointment booking",
      "Payload CMS so editors manage all content in-house",
      "A CRM for staff to track every student lead from first enquiry to application",
      "Next.js + TypeScript on PostgreSQL, deployed on Vercel",
    ],
    results: [],
  },
  GadgetGallery: {
    problem:
      "A Bangladesh-based gadget and audio accessories store needed to sell online: a storefront customers trust, and tools for the owners to run stock, orders and promotions.",
    role: "",
    built: [
      "Storefront with catalog, cart, wishlist, checkout, reviews and order tracking",
      "A full admin dashboard for inventory, orders, coupons and notifications",
      "Image uploads through Cloudinary",
      "Next.js + TypeScript, Prisma and PostgreSQL, NextAuth for accounts",
    ],
    results: [],
  },
  BankLopedia: {
    problem:
      "Candidates for Bangladesh banking diplomas (JAIBB, AIBB, DIB) had no single place to study 70 subjects in both English and Bangla, search past questions in plain language and test themselves.",
    role: "",
    built: [
      "70 subjects in English and Bangla, with plain-language search over a question bank (Algolia)",
      "AI-generated answers (Gemini) with an admin review queue before they go live",
      "MCQ tests, OTP sign-up and paid subscriptions through aamarPay",
      "Next.js, Prisma and PostgreSQL, NextAuth",
    ],
    results: [],
  },
};

export default caseStudies;
