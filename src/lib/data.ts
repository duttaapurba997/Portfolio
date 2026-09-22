export const profile = {
  name: "Apurba Dutta",
  alias: "Eden",
  title: "Senior Graphic Designer | UI/UX & Visual Design",
  company: "Swiggy",
  location: "Bengaluru, India",
  status: "Aiming for a Lead Designer role",
  memberSince: 2019,
  experience: "5.5 years",
  summary:
    "Innovative design leader with 5.5 years of experience in developing comprehensive visual systems for high-growth consumer platforms, including performance marketing, brand partnerships, and product design. Expertise in enhancing design workflows through Figma, mentoring design teams, and aligning visual strategies with business objectives. Aiming for a Lead Designer role to drive creative initiatives and foster team collaboration.",
  email: "duttaapurba997@gmail.com",
};

export const nav = [
  { label: "The Designer", href: "#designer" },
  { label: "The Craft", href: "#craft" },
  { label: "The Work", href: "#work" },
  { label: "The Road", href: "#road" },
];

export const socials = [
  {
    label: "Behance",
    href: "https://www.behance.net/apurbadutta3",
    handle: "behance.net/apurbadutta3",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/apurba-dutta-a50725184/",
    handle: "in/apurba-dutta",
  },
];

export const heroSticky = {
  kicker: "Prologue — Bengaluru, India",
  headlineLead: "Stories hit",
  headlineAccent: "harder.",
  sub:
    "Turning ideas into thoughtful experiences through strategy, storytelling, and intentional design.",
  personality:
    "Five and a half years making consumer platforms speak — across performance marketing, brand partnerships and product design.",
};

export type Project = {
  id: string;
  title: string;
  category:
    | "UI/UX"
    | "Branding"
    | "Campaign"
    | "Packaging"
    | "Social · Ads"
    | "Motion"
    | "Illustration";
  tag: string;
  cover: string;
  href: string;
  blurb: string;
  art?: string;
  board?: string;
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Swiggy x JioHotstar x Dhurandhar",
    category: "Campaign",
    tag: "Collaboration",
    cover: "/collab-dhurandhar-card.png",
    href: "#",
    blurb: "A three-way streaming-meets-food collaboration for a blockbuster release.",
    art: "/collab-dhurandhar-card.png",
    board: "/collab-dhurandhar-board.png",
  },
  {
    id: "02",
    title: "Swiggy x JioHotstar x IPL",
    category: "Campaign",
    tag: "Collaboration",
    cover: "/collab-ipl-card.png",
    href: "#",
    blurb: "Match-day food offers riding the IPL frenzy with JioHotstar.",
    art: "/collab-ipl-card.png",
    board: "/collab-ipl-board.png",
  },
  {
    id: "03",
    title: "CRM Tool UI Design",
    category: "UI/UX",
    tag: "UI/UX",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/404/c69803180565011.Y3JvcCw5NzAsNzU5LDIxMywzMQ.png",
    href: "https://www.behance.net/gallery/180565011/CRM-Tool-UI-Design",
    blurb: "A clean, data-dense CRM workspace with a calm hierarchy.",
    art: "/crm-card.png",
    board: "/crm-board.png",
  },
  {
    id: "04",
    title: "Rebranding — Electronic",
    category: "Branding",
    tag: "Branding",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/404/7ef179237528709.Y3JvcCwyMDk2LDE2NDAsMzUyLDA.png",
    href: "https://www.behance.net/gallery/237528709/Rebranding-electronic",
    blurb: "A full identity refresh for an electronics brand.",
    art: "/dell-card.png",
    board: "/dell-board.png",
  },
  {
    id: "05",
    title: "E-commerce Website UI",
    category: "UI/UX",
    tag: "E-commerce UI",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/404/7eeb80180598107.Y3JvcCwzMTQzLDI0NTksNTI5LDA.png",
    href: "https://www.behance.net/gallery/180598107/E-commerce-website-UI",
    blurb: "Product-first storefront design built to convert.",
    art: "/ecom-card.png",
    board: "/ecom-board.png",
  },
  {
    id: "06",
    title: "Merry Christmas — Festive Campaign",
    category: "Campaign",
    tag: "Holiday Campaign",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/404/e7d174223373985.Y3JvcCwzMTQzLDI0NTksNDI3LDA.png",
    href: "https://www.behance.net/gallery/223373985/Merry-Christmas-Festive-campaign",
    blurb: "A warm holiday campaign with custom illustration.",
    art: "/xmas-card.png",
    board: "/xmas-board.png",
  },
  {
    id: "07",
    title: "Festive Campaign — Mother's Day",
    category: "Campaign",
    tag: "Mother's Day",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/404/eded8e208651001.Y3JvcCwyMDk2LDE2NDAsMzUyLDA.png",
    href: "https://www.behance.net/gallery/208651001/Festive-campaign-(mothers-day)",
    blurb: "Emotional storytelling for the biggest gifting day.",
    art: "/mom-card.png",
    board: "/mom-board.png",
  },
  {
    id: "08",
    title: "Interactive Campaign — Father's Day",
    category: "Campaign",
    tag: "Interactive",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/404/7182d3208651645.Y3JvcCwyMDk2LDE2NDAsMzUyLDA.png",
    href: "https://www.behance.net/gallery/208651645/Interactive-campaign-(Fathers-day)",
    blurb: "A playful, interactive moment for Father's Day.",
    art: "/dad-card.png",
    board: "/dad-board.png",
  },
  {
    id: "09",
    title: "Indian Festive Campaign",
    category: "Campaign",
    tag: "Indian Festive",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/404/aad9e6212853771.Y3JvcCwzMTQzLDI0NTksMzk2LDA.png",
    href: "https://www.behance.net/gallery/212853771/Indian-Festive-Campaign",
    blurb: "Rooted in Indian festive richness and ritual color.",
    art: "/diwali-card.png",
    board: "/diwali-board.png",
  },
  {
    id: "10",
    title: "Advertisements Projects",
    category: "Social · Ads",
    tag: "Ad Creatives",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/404/daaef8185723577.Y3JvcCwyMDk2LDE2NDAsMzUyLDA.png",
    href: "https://www.behance.net/gallery/185723577/Advertisements-projects",
    blurb: "Ad creatives engineered for the thumb-scroll.",
    art: "/ads-card.png",
    board: "/ads-board.png",
  },
  {
    id: "11",
    title: "Carousel Projects",
    category: "Social · Ads",
    tag: "Carousels",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/404/dfb44f185713113.Y3JvcCwzMTQzLDI0NTksNTI5LDA.png",
    href: "https://www.behance.net/gallery/185713113/Carousel-projects",
    blurb: "Story-led carousels that people actually swipe.",
    art: "/carousel-card.png",
    board: "/carousel-board.png",
  },
  {
    id: "12",
    title: "Packaging Design",
    category: "Packaging",
    tag: "Packaging",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/404/187bb4148367831.Y3JvcCw5NDMsNzM3LDAsNDI.png",
    href: "https://www.behance.net/gallery/148367831/Packaging-design-2",
    blurb: "Shelf-first packaging that feels premium and honest.",
    art: "/pack-card.png",
    board: "/pack-board.png",
  },
  {
    id: "13",
    title: "Logo Design",
    category: "Branding",
    tag: "Logo Design",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/404/c8bf59147595087.Y3JvcCw3MzIsNTcyLDg1LDA.png",
    href: "https://www.behance.net/gallery/147595087/Logo-design-1",
    blurb: "Distinctive wordmarks and symbols with real character.",
    art: "/logo-card.png",
    board: "/logo-board.png",
  },
  {
    id: "14",
    title: "Logo challenge 1",
    category: "Branding",
    tag: "Logo Design",
    cover: "/logo-c1-card.png",
    href: "#",
    blurb: "A burger-cloud-kitchen mark where taste meets imagination.",
    art: "/logo-c1-card.png",
    board: "/logo-c1-board.png",
  },
  {
    id: "15",
    title: "Logo challenge 2",
    category: "Branding",
    tag: "Logo Design",
    cover: "/logo-c2-card.png",
    href: "#",
    blurb: "A pasta-cloud-kitchen identity with flavour and rhythm.",
    art: "/logo-c2-card.png",
    board: "/logo-c2-board.png",
  },
];

export type Role = {
  company: string;
  role: string;
  period: string;
  place: string;
  points: string[];
};

export const experience: Role[] = [
  {
    company: "Swiggy",
    role: "Senior Graphic Designer",
    period: "01/2024 — Present",
    place: "Bengaluru, India",
    points: [
      "Owned end-to-end design for credit card product promotions, translating financial features into conversion-driven campaigns.",
      "Crafted the visual identity for Swiggy ONE BLCK, partnering with restaurant and sponsor brands on offer-led creative.",
      "Led design collaboration with JioHotstar on entertainment and sports partnerships — from the food campaign for Dhurandhar to IPL promotional creative.",
      "Directed creative strategy for Central Growth initiatives, building scalable, multi-format creative systems.",
    ],
  },
  {
    company: "BuyMore",
    role: "Senior Graphic Designer",
    period: "08/2022 — 12/2023",
    place: "Bengaluru, India",
    points: [
      "Created 100% original artwork across print, web and video, alongside motion graphics for sites and apps.",
      "Designed mocks and workflows for approval, quality-checked agency files, and coordinated master files for outsourcing.",
      "Mentored junior designers and elevated overall team output standards.",
      "Worked with UX and product teams on wireframes, mockups and UI within frontend frameworks.",
    ],
  },
  {
    company: "AI Probably",
    role: "Graphic Designer",
    period: "09/2021 — 07/2022",
    place: "Delhi, India",
    points: [
      "Composed guideline-oriented designs for Amazon and Flipkart advertisements.",
      "Devised site maps and mockups based on proven methodologies and user feedback.",
      "Ran competitive analysis and trend research to design ahead of the market.",
      "Built theme-based reels and promotional video plans.",
    ],
  },
  {
    company: "Karmic Events India",
    role: "Graphic Design Intern",
    period: "04/2019 — 05/2019",
    place: "Delhi, India",
    points: [
      "Promoted events through posters, digital invites and brochures.",
      "Produced layouts in Photoshop, Illustrator and InDesign — the origin of the craft.",
    ],
  },
];

export const education = [
  {
    school: "Amity University, Noida",
    degree: "Bachelor in Fashion Designing",
    period: "2021",
  },
  {
    school: "G.D. Goenka Public School, Siliguri",
    degree: "Intermediate — Science",
    period: "2017",
  },
  {
    school: "St. Mary's High School, Cooch Behar",
    degree: "Matriculation",
    period: "2015",
  },
];

export const skillGroups = [
  {
    index: "01",
    title: "Design Craft",
    items: [
      "UI/UX Design",
      "Digital Illustration",
      "Brand Identity Design",
      "Print & Campaign Design",
      "Motion / Animation Workflows",
      "Social Media Graphics",
    ],
  },
  {
    index: "02",
    title: "Systems & Teams",
    items: [
      "Creative Direction",
      "Cross-Functional Collaboration",
      "Stakeholder Management",
      "Visual Storytelling",
      "Design Systems",
      "Mentoring Designers",
    ],
  },
  {
    index: "03",
    title: "Software",
    items: [
      "Figma",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe InDesign",
      "Framer",
    ],
  },
];

export const tools = [
  "Figma",
  "Photoshop",
  "Illustrator",
  "InDesign",
  "Framer",
];

export const skills = skillGroups.flatMap((g) => g.items);

export const languages = ["English", "Hindi", "Bengali", "Japanese"];

export const interests = [
  "Video gaming",
  "Sports & dance",
  "Miniature houses",
];