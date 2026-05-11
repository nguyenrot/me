export interface HeroContent {
  badge:       string
  subtitle:    string
  description: string
  ctaText:     string
}

export interface AboutContent {
  paragraphs: string[]
  quote:      string
  infoCards:  { label: string; value: string }[]
}

export interface Skill {
  name:        string
  description: string
  level:       number
  color:       string
  icon:        string
}

export interface JourneyItem {
  period:      string
  title:       string
  org:         string
  description: string
  accent:      string
  badge:       string
}

export interface LinkItem {
  icon:     string
  name:     string
  subtitle: string
  link:     string
  accent:   string
}

export interface SocialItem {
  name:     string
  handle:   string
  link:     string
  accent:   string
  iconType: string
}

export const HERO_DEFAULTS: HeroContent = {
  badge:       "Cultivator Profile · Foundation Establishment",
  subtitle:    "元 // Digital Immortal Cultivator",
  description: "Code & Qi Dual Cultivator | Đà Nẵng Realm",
  ctaText:     "Enter My Realm",
}

export const ABOUT_DEFAULTS: AboutContent = {
  paragraphs: [
    "Born and raised in Đà Nẵng, Việt Nam — a coastal city where sky meets ocean, generating abundant spiritual energy. Started the cultivation path as an Engineer Intern at Paradox in late 2021, awakening the code spirit within and beginning the journey of Dual Cultivation: mastering both technology and craftsmanship.",
    "After nearly 4 years cultivating at Paradox — including an overseas expedition to Scottsdale, Arizona — the foundation was established. Now advancing to a new realm as a Software Development Engineer at Workday, pushing boundaries and forging a core of pure code energy.",
  ],
  quote: "The Dao gives birth to One, One gives birth to Two, Two gives birth to Three, Three gives birth to all things. — From an idea, code is born. From code, products emerge. From products, entire digital worlds arise.",
  infoCards: [
    { label: "◈ NAME",     value: "Phạm Kỷ Nguyên" },
    { label: "⌖ LOCATION", value: "Đà Nẵng, Việt Nam" },
    { label: "⚙ ROLE",     value: "Software Development Engineer" },
    { label: "⟐ SECT",     value: "Workday" },
  ],
}

export const SKILLS_DEFAULTS: Skill[] = [
  { name: "Python",               description: "The universal elixir — a versatile spirit language, the foundation for all arts from backend sorcery to AI cultivation.", level: 92, color: "#ffd700", icon: "🐍" },
  { name: "Django",               description: "An impenetrable heavenly fortress — a battle-tested framework for building web realms at divine speed.", level: 88, color: "#00f5ff", icon: "🏯" },
  { name: "API Development",      description: "The art of divine bridges — designing REST & GraphQL APIs, connecting all things across the Digital Realm.", level: 90, color: "#aa00ff", icon: "🌉" },
  { name: "Integration",          description: "The fusion formation — connecting systems, third-party services, and orchestrating data flow between realms.", level: 85, color: "#ff00aa", icon: "🔗" },
  { name: "Algorithmic Thinking", description: "The art of the heavenly mind — algorithmic reasoning, optimization, and problem-solving at the spiritual intellect level.", level: 83, color: "#ffd700", icon: "🧠" },
  { name: "AI Agents",            description: "The spirit puppet technique — building autonomous AI agents, LLM orchestration, and prompt cultivation.", level: 78, color: "#00f5ff", icon: "🤖" },
  { name: "Database Software",    description: "The ancient archive hall — PostgreSQL, MongoDB, Redis — storing and querying knowledge across ten thousand ages.", level: 87, color: "#aa00ff", icon: "📚" },
]

export const JOURNEY_DEFAULTS: JourneyItem[] = [
  { period: "2026 — Present", title: "Software Development Engineer", org: "Workday",                   description: "Breakthrough to a new realm — joined one of the world's leading sects. Full-time cultivation, on-site. Elevating code mastery to an entirely new level of power.",                                                                                     accent: "#ffd700", badge: "CORE FORMATION" },
  { period: "2022 — 2026",    title: "Software Engineer",             org: "Paradox",                   description: "3 years 10 months of secluded cultivation in the Đà Nẵng Realm. Built a rock-solid foundation, mastering Django, SQL, and many other arts. Rose from disciple to pillar of the sect.",                                                             accent: "#00f5ff", badge: "FOUNDATION BUILDING" },
  { period: "2022",           title: "Software Engineer",             org: "Paradox — Scottsdale, AZ",  description: "Dispatched to Scottsdale, Arizona, USA — 2 months on-site. Experienced international cultivation, broadened cross-realm perspectives, and refined Django & Python skills in a global environment.",                                                   accent: "#aa00ff", badge: "OVERSEAS EXPEDITION" },
  { period: "2021 — 2022",    title: "Engineer Intern",               org: "Paradox",                   description: "The spirit root awakened — first steps into the Paradox sect in Đà Nẵng. 5 months of on-site apprenticeship, comprehending the fundamentals of Vue.js and JavaScript. The cultivation path begins.",                                                accent: "#ff00aa", badge: "QI CONDENSATION" },
  { period: "2018 — 2022",    title: "Bachelor's Degree",             org: "Duy Tan University",         description: "4 years of foundational cultivation at Duy Tan University, Đà Nẵng. Studied Computer Software Engineering, graduated with 'Good' classification. The sacred scriptures of code were first revealed here.", accent: "#ffd700", badge: "MORTAL REALM" },
]

export const LINKS_DEFAULTS: LinkItem[] = [
  { icon: "🌐", name: "Vibe Hub",          subtitle: "Main portal — personal digital realm hub",  link: "https://kynguyen.cc",          accent: "#ffd700" },
  { icon: "🌙", name: "Daily Vibe Journal", subtitle: "Neural mood logging system",                link: "https://journal.kynguyen.cc",  accent: "#00f5ff" },
  { icon: "🎨", name: "Generative Art",     subtitle: "Procedural canvas engine",                  link: "https://art.kynguyen.cc",      accent: "#aa00ff" },
  { icon: "💡", name: "Neon Quotes",        subtitle: "Holographic quote collector",               link: "https://quotes.kynguyen.cc",   accent: "#ff00aa" },
  { icon: "🔮", name: "Habit Tracker",      subtitle: "Behavioral cultivation matrix",             link: "https://habits.kynguyen.cc",   accent: "#00ff88" },
  { icon: "☕", name: "Cà Phê Diary",       subtitle: "Coffee journey logs — Đà Nẵng",            link: "https://cafe.kynguyen.cc",     accent: "#ffaa00" },
]

export const SOCIAL_DEFAULTS: SocialItem[] = [
  { name: "Facebook",  handle: "@phkynguyen",   link: "https://www.facebook.com/phkynguyen",           accent: "#1877f2", iconType: "facebook" },
  { name: "Instagram", handle: "@phkynguyen",   link: "https://www.instagram.com/phkynguyen",          accent: "#e1306c", iconType: "instagram" },
  { name: "GitHub",    handle: "@nguyenrot",    link: "https://github.com/nguyenrot",                  accent: "#c8d8ff", iconType: "github" },
  { name: "TikTok",    handle: "@phamkynguyen", link: "https://www.tiktok.com/@phamkynguyen",          accent: "#ff0050", iconType: "tiktok" },
  { name: "LinkedIn",  handle: "Nguyen Pham Ky", link: "https://www.linkedin.com/in/nguyen-pham-ky",  accent: "#0a66c2", iconType: "linkedin" },
  { name: "Threads",   handle: "@phkynguyen",   link: "https://www.threads.com/@phkynguyen",           accent: "#f0f0f0", iconType: "threads" },
]
