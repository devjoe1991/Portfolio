"use client";

type Project = {
  title: string;
  description: string;
  tags: string[];
  accent: string;
  status?: "live" | "in progress" | "archived";
  url?: string;
  cardBg?: string;
  cardGradient?: string;
  darkText?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: "Boroughly",
    description: "Built this out of pure frustration. Small and medium local businesses were getting bled dry by platforms like Checkatrade, Yell, and Yellow Pages — locked into expensive monthly contracts with nothing to show for it. So I built Boroughly. Proper SEO, real exposure, £1 a year. The businesses I helped back then are still clients today. Got to a point where it started getting competitive and it just didn't feel right to keep running it — so I shut it down in 2019.",
    tags: ["WordPress", "Custom PHP", "SEO", "MySQL"],
    accent: "#ffffff",
    status: "archived",
    cardBg: "#e91e8c",
  },
  {
    title: "Neighbourhood Wash",
    description: "Being a developer, a dad, and somehow superman — I noticed how hard it was keeping on top of normal household tasks. Most platforms I came across only seemed to care about one thing: lining their own pockets. I just knew I had to do something, and then Neighbourhood Wash was born. My second online business, built entirely by me. Pretty much the Uber of laundry — connecting people to nearby washers who'll handle their neighbours' laundry and get paid for it. The UK's first and only P2P laundry platform. Currently in its growing stages.",
    tags: ["React Native", "Next.js", "Node.js", "Stripe", "Maps API"],
    accent: "#ffffff",
    status: "live",
    url: "https://www.neighbourhoodwash.com",
    cardBg: "#0ea5e9",
  },
  {
    title: "Training For People",
    description: "Back in 2017 I built a training agency from scratch — connecting consumers to professional training providers across the UK. Close protection, SIA security, construction, bricklaying, locksmiths, electricians, plumbing, alcohol personal licences, driving centres, health and safety, first aid, and a whole lot more. Then COVID-19 hit. Most of our partners had to shut up shop, the whole industry practically paused, and that pretty much killed its momentum.",
    tags: ["WordPress", "Custom PHP", "SEO", "MySQL"],
    accent: "#ffffff",
    status: "archived",
    cardBg: "#1d4ed8",
  },
  {
    title: "PingMee — Don't Miss Me!",
    description: "A social networking app giving users the chance to connect in real-time — defeating the comments section and the doomscrolling patterns other apps monetise from. With PingMee, if you want to meet people just get up, go out, and match with users within a 25km radius. Broadcast a live status and AI suggests nearby matches based on proximity — with privacy at the core. PingMee never reveals exactly where or how far away another user is, and everything is consensual: accept, decline, or block anyone that doesn't tickle your fancy. This project sets the standard — it shows clear separation of my skills where other devs fall short.",
    tags: ["React Native", "iOS", "Android", "AI", "Real-time", "Node.js"],
    accent: "#ffffff",
    status: "live",
    cardBg: "#7c3aed",
  },
  {
    title: "Mahi",
    description: "The app that takes fitness accountability seriously — in real-time. Don't show up, lose your streak. Getting lazy? Mahi won't have it. Built for both iOS and Android, Mahi is a showcase of my frontend UI skills and backend API integrations. No excuses, just results.",
    tags: ["React Native", "iOS", "Android", "REST API", "TypeScript"],
    accent: "#111111",
    cardBg: "#f5f5f5",
    darkText: true,
    status: "in progress",
  },
  {
    title: "WordPress for Local Business",
    description: "Long before the fancy frameworks, I was building and maintaining WordPress sites for local businesses and SMEs — locksmiths, plumbers, accountants, electricians, and everyone in between. Fast, SEO-ready, easy to manage. Trades that needed an online presence without the agency price tag. Still do it, still love it.",
    tags: ["WordPress", "Custom PHP", "SEO", "WooCommerce", "Local Business", "SME"],
    accent: "#ffffff",
    cardBg: "#21759b",
  },
  {
    title: "Enterprise Frameworks & Shared APIs",
    description: "Architecting complex, multi-project systems under a single organisation — shared API layers that serve multiple products, centralised auth, unified data models, and clean service boundaries between apps. Built for teams that need things to scale without falling apart. The kind of work where the architecture decisions made on day one still hold up two years later.",
    tags: ["REST API", "Monorepo", "Microservices", "TypeScript", "Node.js", "Auth", "Multi-tenant"],
    accent: "#ffffff",
    cardGradient: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1e4d8c 100%)",
  },
  {
    title: "Business Automation Systems",
    description: "I've automated entire businesses end-to-end — connecting their tools, eliminating manual processes, and letting their operations run on autopilot. From CRM workflows and invoice chasing to multi-platform notifications and scheduled reporting, I've built it all.",
    tags: ["Next.js", "Node.js", "Automation", "SaaS", "WhatsApp", "Discord", "Telegram"],
    accent: "#ffffff",
    cardGradient: "linear-gradient(135deg, #1c1c2e 0%, #3d1515 60%, #6b2020 100%)",
  },
];

const STATUS_BG: Record<string, string> = {
  live: "rgba(16,185,129,0.25)",
  "in progress": "rgba(245,158,11,0.25)",
  archived: "rgba(113,113,122,0.25)",
};

const STATUS_COLOR: Record<string, string> = {
  live: "#34d399",
  "in progress": "#fbbf24",
  archived: "#a1a1aa",
};

const CARD_HEIGHT = 300; // fixed height — description scrolls inside
const STICKY_TOP = 57 + 41; // header + section title bar

export default function WorkSection() {
  return (
    <section
      className="w-full border-t relative"
      style={{
        background: "var(--bg-frosted)",
        backdropFilter: "blur(20px) saturate(150%)",
        WebkitBackdropFilter: "blur(20px) saturate(150%)",
        borderColor: "var(--border)",
        zIndex: 10,
      }}
    >
      {/* Sticky section title */}
      <div
        className="sticky top-[57px] z-20 px-6 py-2 border-b"
        style={{
          background: "var(--bg-frosted)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderColor: "var(--border)",
        }}
      >
        <p className="text-center font-sans font-bold text-sm uppercase tracking-widest" style={{ color: "var(--muted)" }}>
          My Projects
        </p>
      </div>

      {/* Stacking cards */}
      <div className="px-4 pt-4" style={{ paddingBottom: `${PROJECTS.length * 120}px` }}>
        {PROJECTS.map((project, i) => {
          const stickyTop = STICKY_TOP + i * 8;

          return (
            <div
              key={project.title}
              className="sticky"
              style={{
                top: stickyTop,
                zIndex: i + 1,
                height: CARD_HEIGHT,
                marginBottom: i < PROJECTS.length - 1 ? 16 : 0,
              }}
            >
              <div
                className="w-full h-full rounded-3xl p-6 flex flex-col gap-3 relative overflow-hidden group transition-all duration-200 border"
                style={{
                  background: project.cardGradient ?? project.cardBg ?? "var(--surface)",
                  borderColor: (project.cardBg || project.cardGradient) ? "transparent" : "var(--border)",
                  boxShadow: `0 2px 8px rgba(0,0,0,0.08), 0 ${4 + i * 2}px ${16 + i * 4}px rgba(0,0,0,0.05)`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = `0 8px 32px ${project.accent}44`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = `0 2px 8px rgba(0,0,0,0.08), 0 ${4 + i * 2}px ${16 + i * 4}px rgba(0,0,0,0.05)`)
                }
              >
                {/* Accent glow */}
                <div
                  className="pointer-events-none absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-15 blur-2xl transition-opacity group-hover:opacity-30"
                  style={{ background: project.accent }}
                />

                {/* Top: title + status */}
                {/* Title + status */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3
                      className="font-bold text-xl"
                      style={{ color: (project.cardBg || project.cardGradient) ? project.accent : "var(--foreground)" }}
                    >
                      {project.title}
                    </h3>
                    {project.status && (
                      <span
                        className="font-sans text-xs px-2 py-0.5 rounded-full uppercase tracking-wide"
                        style={{
                          background: STATUS_BG[project.status],
                          color: STATUS_COLOR[project.status],
                        }}
                      >
                        {project.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Scrollable description */}
                <div
                  className="relative z-10 flex-1 overflow-y-auto scrollbar-none"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: (project.cardBg || project.cardGradient)
                        ? (project.darkText ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.75)")
                        : "var(--muted)",
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Tags — pinned to bottom */}
                <div className="relative z-10 flex-shrink-0 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-xs px-2 py-0.5 rounded-full border"
                      style={{
                        color: (project.cardBg || project.cardGradient) ? project.accent : "var(--muted)",
                        borderColor: (project.cardBg || project.cardGradient) ? `${project.accent}55` : "var(--border)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
