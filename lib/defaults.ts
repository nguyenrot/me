export interface HeroContent {
  badge: string;
  subtitle: string;
  description: string;
  ctaText: string;
}

export interface AboutContent {
  paragraphs: string[];
  quote: string;
  infoCards: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  description: string;
  level: number;
}

export interface JourneyItem {
  period: string;
  title: string;
  org: string;
  description: string;
}

export interface LinkItem {
  name: string;
  subtitle: string;
  link: string;
}

export interface SocialItem {
  name: string;
  handle: string;
  link: string;
  iconType: string;
}

export const HERO_DEFAULTS: HeroContent = {
  badge: "Software Engineer · Đà Nẵng",
  subtitle: "Software Engineer @ Workday",
  description:
    "I build backend systems and developer tools. Previously 4 years at Paradox, including a stint in Scottsdale, Arizona. Currently based in Đà Nẵng, Việt Nam.",
  ctaText: "See projects",
};

export const ABOUT_DEFAULTS: AboutContent = {
  paragraphs: [
    "Born and raised in Đà Nẵng, Việt Nam. Started my career as an Engineer Intern at Paradox in late 2021, learning Python and Django from the ground up.",
    "After nearly four years at Paradox — including a two-month assignment in Scottsdale, Arizona — I joined Workday as a Software Development Engineer in 2026.",
  ],
  quote:
    "Make it correct. Then make it fast. Then leave it better than you found it.",
  infoCards: [
    { label: "Name", value: "Phạm Kỷ Nguyên" },
    { label: "Location", value: "Đà Nẵng, Việt Nam" },
    { label: "Role", value: "Software Development Engineer" },
    { label: "Employer", value: "Workday" },
  ],
};

export const SKILLS_DEFAULTS: Skill[] = [
  {
    name: "Python",
    description:
      "Backbone of my work — used daily for backend services, scripts, and tooling.",
    level: 92,
  },
  {
    name: "Django",
    description:
      "Production web framework. Ship APIs, admin interfaces, and dashboards with it.",
    level: 88,
  },
  {
    name: "API Development",
    description:
      "Designing REST and GraphQL APIs. Versioning, authentication, pagination, observability.",
    level: 90,
  },
  {
    name: "Integration",
    description:
      "Connecting third-party systems — payment, identity, analytics. Webhooks, retries, idempotency.",
    level: 85,
  },
  {
    name: "Algorithmic Thinking",
    description:
      "Profiling, optimizing, and reasoning about correctness under load.",
    level: 83,
  },
  {
    name: "AI Agents",
    description:
      "Building agentic systems with LLMs. Tool use, structured outputs, evaluation harnesses.",
    level: 78,
  },
  {
    name: "Database Software",
    description:
      "PostgreSQL, MySQL, Redis. Schema design, indexing, query tuning.",
    level: 87,
  },
];

export const JOURNEY_DEFAULTS: JourneyItem[] = [
  {
    period: "2026 — Present",
    title: "Software Development Engineer",
    org: "Workday",
    description:
      "Joined Workday in 2026. Working full-time on enterprise software at one of the largest HCM platforms.",
  },
  {
    period: "2022 — 2026",
    title: "Software Engineer",
    org: "Paradox",
    description:
      "Nearly 4 years building HR automation tooling in the Đà Nẵng office. Grew from junior to senior — owning Django services, SQL pipelines, and integration work.",
  },
  {
    period: "2022",
    title: "Software Engineer (Onsite)",
    org: "Paradox — Scottsdale, AZ",
    description:
      "Two-month on-site assignment in Scottsdale, Arizona. Worked closely with the US team and broadened my engineering toolbox.",
  },
  {
    period: "2021 — 2022",
    title: "Engineer Intern",
    org: "Paradox",
    description:
      "First role. Five months on-site in Đà Nẵng. Worked on the Vue.js front-end and learned the codebase.",
  },
  {
    period: "2018 — 2022",
    title: "B.Sc., Computer Software Engineering",
    org: "Duy Tan University",
    description:
      "Four years studying Computer Software Engineering. Graduated with 'Good' classification.",
  },
];

export const LINKS_DEFAULTS: LinkItem[] = [
  {
    name: "Vibe Hub",
    subtitle: "Personal site hub and landing page.",
    link: "https://kynguyen.cc",
  },
  {
    name: "Daily Vibe Journal",
    subtitle: "Daily mood tracker — Server Actions + JWT cookies.",
    link: "https://journal.kynguyen.cc",
  },
  {
    name: "Generative Art",
    subtitle: "p5.js canvas sketches, persisted to localStorage.",
    link: "https://art.kynguyen.cc",
  },
  {
    name: "Neon Quotes",
    subtitle: "Quote collection with a clean reader UI.",
    link: "https://quotes.kynguyen.cc",
  },
  {
    name: "Habit Tracker",
    subtitle: "Personal habits dashboard.",
    link: "https://habits.kynguyen.cc",
  },
  {
    name: "Cà Phê Diary",
    subtitle: "Coffee log from cafés around Đà Nẵng.",
    link: "https://cafe.kynguyen.cc",
  },
];

export const SOCIAL_DEFAULTS: SocialItem[] = [
  { name: "GitHub", handle: "@nguyenrot", link: "https://github.com/nguyenrot", iconType: "github" },
  { name: "LinkedIn", handle: "Nguyen Pham Ky", link: "https://www.linkedin.com/in/nguyen-pham-ky", iconType: "linkedin" },
  { name: "Facebook", handle: "@phkynguyen", link: "https://www.facebook.com/phkynguyen", iconType: "facebook" },
  { name: "Instagram", handle: "@phkynguyen", link: "https://www.instagram.com/phkynguyen", iconType: "instagram" },
  { name: "Threads", handle: "@phkynguyen", link: "https://www.threads.com/@phkynguyen", iconType: "threads" },
  { name: "TikTok", handle: "@phamkynguyen", link: "https://www.tiktok.com/@phamkynguyen", iconType: "tiktok" },
];
