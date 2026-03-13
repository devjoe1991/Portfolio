"use client";

import { Globe, Bot, Layers, Zap, BarChart3 } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  accent: string;
  Icon: React.ElementType;
  status?: "live" | "in progress" | "archived";
  url?: string;
  cardBg?: string;
  darkText?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: "Boroughly",
    description: "Built this out of pure frustration. Small and medium local businesses were getting bled dry by platforms like Checkatrade, Yell, and Yellow Pages — locked into expensive monthly contracts with nothing to show for it. So I built Boroughly. Proper SEO, real exposure, £1 a year. The businesses I helped back then are still clients today. Got to a point where it started getting competitive and it just didn't feel right to keep running it — so I shut it down in 2019.",
    tags: ["WordPress", "Custom PHP", "SEO", "MySQL"],
    accent: "#ffffff",
    Icon: Globe,
    status: "archived",
    cardBg: "#e91e8c",
  },
  {
    title: "Neighbourhood Wash",
    description: "Being a developer, a dad, and somehow superman — I noticed how hard it was keeping on top of normal household tasks. Most platforms I came across only seemed to care about one thing: lining their own pockets. I just knew I had to do something, and then Neighbourhood Wash was born. My second online business, built entirely by me. Pretty much the Uber of laundry — connecting people to nearby washers who'll handle their neighbours' laundry and get paid for it. The UK's first and only P2P laundry platform. Currently in its growing stages.",
    tags: ["React Native", "Next.js", "Node.js", "Stripe", "Maps API"],
    accent: "#ffffff",
    Icon: Layers,
    status: "live",
    url: "https://www.neighbourhoodwash.com",
    cardBg: "#0ea5e9",
  },
  {
    title: "Training For People",
    description: "Back in 2017 I built a training agency from scratch — connecting consumers to professional training providers across the UK. Close protection, SIA security, construction, bricklaying, locksmiths, electricians, plumbing, alcohol personal licences, driving centres, health and safety, first aid, and a whole lot more. Then COVID-19 hit. Most of our partners had to shut up shop, the whole industry practically paused, and that pretty much killed its momentum.",
    tags: ["WordPress", "Custom PHP", "SEO", "MySQL"],
    accent: "#ffffff",
    Icon: Globe,
    status: "archived",
    cardBg: "#1d4ed8",
  },
  {
    title: "PingMee — Don't Miss Me!",
    description: "A social networking app giving users the chance to connect in real-time — defeating the comments section and the doomscrolling patterns other apps monetise from. With PingMee, if you want to meet people just get up, go out, and match with users within a 25km radius. Broadcast a live status and AI suggests nearby matches based on proximity — with privacy at the core. PingMee never reveals exactly where or how far away another user is, and everything is consensual: accept, decline, or block anyone that doesn't tickle your fancy. This project sets the standard — it shows clear separation of my skills where other devs fall short.",
    tags: ["React Native", "iOS", "Android", "AI", "Real-time", "Node.js"],
    accent: "#ffffff",
    Icon: Bot,
    status: "live",
    cardBg: "#7c3aed",
  },
  {
    title: "Mahi",
    description: "The app that takes fitness accountability seriously — in real-time. Don't show up, lose your streak. Getting lazy? Mahi won't have it. Built for both iOS and Android, Mahi is a showcase of my frontend UI skills and backend API integrations. No excuses, just results.",
    tags: ["React Native", "iOS", "Android", "REST API", "TypeScript"],
    accent: "#111111",
    Icon: BarChart3,
    cardBg: "#f5f5f5",
    darkText: true,
    status: "in progress",
  },
  {
    title: "OpenClaw",
    description: "End-to-end business automation platform — connect your tools, eliminate manual tasks, and let your business run itself.",
    tags: ["Next.js", "Node.js", "Automation", "SaaS"],
    accent: "#ffffff",
    Icon: Zap,
    status: "live",
    cardBg: "#4f46e5",
  },
];

const STATUS_STYLES: Record<string, string> = {
  live: "bg-emerald-500/15 text-emerald-400",
  "in progress": "bg-amber-500/15 text-amber-400",
  archived: "bg-zinc-500/15 text-zinc-400",
};

export default function WorkSection() {
  return (
    <section
      className="w-full pt-2 pb-16 border-t"
      style={{ background: "var(--background)", borderColor: "var(--border)" }}
    >
      {/* Section header */}
      <div className="px-6 mb-6">
        <p
          className="mb-6 text-center font-mono text-xs uppercase tracking-widest"
          style={{ color: "var(--muted)" }}
        >
          My Projects
        </p>
      </div>

      {/* Stacked cards */}
      <div className="flex flex-col gap-3 px-6">
        {PROJECTS.map((project) => (
          <div
            key={project.title}
            className="w-full rounded-3xl p-6 flex items-center gap-5 relative overflow-hidden group transition-all duration-200 border hover:-translate-y-0.5"
            style={{
              background: project.cardBg ?? "var(--surface)",
              borderColor: project.cardBg ? "transparent" : "var(--border)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = `0 8px 24px ${project.accent}33`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)")
            }
          >
            {/* Accent glow */}
            <div
              className="pointer-events-none absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-15 blur-2xl transition-opacity group-hover:opacity-30"
              style={{ background: project.accent }}
            />

            {/* Icon */}
            <div
              className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: `${project.accent}1a` }}
            >
              <project.Icon size={20} style={{ color: project.accent }} />
            </div>

            {/* Text */}
            <div className="relative z-10 flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3
                  className="font-semibold text-base"
                  style={{ color: project.cardBg ? project.accent : "var(--foreground)" }}
                >
                  {project.title}
                </h3>
                {project.status && (
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide ${STATUS_STYLES[project.status]}`}
                  >
                    {project.status}
                  </span>
                )}
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: project.cardBg ? (project.darkText ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.75)") : "var(--muted)" }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-full border"
                    style={{
                      color: project.cardBg ? project.accent : "var(--muted)",
                      borderColor: project.cardBg ? `${project.accent}55` : "var(--border)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
