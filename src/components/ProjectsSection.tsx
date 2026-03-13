"use client";

import { useRef, useEffect } from "react";
import {
  Bot,
  Sparkles,
  SearchCode,
  Lightbulb,
  Code2,
  Layers,
  ClipboardList,
} from "lucide-react";

type Service = {
  title: string;
  description: string;
  accent: string;
  emoji?: string;
  Icon?: React.ElementType;
};

const WHAT_I_DO: Service[] = [
  {
    title: "Business Automation",
    description: "End-to-end workflow automation using OpenClaw — connect your tools, eliminate manual tasks, and let your business run itself.",
    accent: "#60a5fa",
    emoji: "🦞",
  },
  {
    title: "Bot Automation",
    description: "Custom bots that handle repetitive tasks across platforms — from data scraping to scheduled jobs and beyond.",
    accent: "#a78bfa",
    Icon: Bot,
  },
  {
    title: "AI Consultations",
    description: "Improve efficiency and reduce costs by identifying the right AI setups for your business — no fluff, just practical implementation.",
    accent: "#34d399",
    Icon: Sparkles,
  },
  {
    title: "Audits",
    description: "Deep-dive reviews of your tech stack, processes, or codebase — uncovering gaps, risks, and opportunities for improvement.",
    accent: "#f87171",
    Icon: SearchCode,
  },
  {
    title: "Tech Consultancy",
    description: "Strategic technical guidance for founders and teams navigating product decisions, architecture, and scaling challenges.",
    accent: "#fbbf24",
    Icon: Lightbulb,
  },
  {
    title: "Dev Consultations",
    description: "1-on-1 coding and developer guidance — unblock yourself, level up your skills, or get expert eyes on your implementation.",
    accent: "#38bdf8",
    Icon: Code2,
  },
  {
    title: "Full Stack Projects",
    description: "End-to-end product builds from design to deployment — web apps, APIs, dashboards, and everything in between.",
    accent: "#f472b6",
    Icon: Layers,
  },
  {
    title: "Project Management",
    description: "Technical project management for dev teams — roadmaps, sprint planning, stakeholder comms, and delivery oversight.",
    accent: "#4ade80",
    Icon: ClipboardList,
  },
];

export default function ProjectsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      el.style.cursor = "grabbing";
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      el.style.cursor = "grab";
    };
    const onMouseUp = () => {
      isDown = false;
      el.style.cursor = "grab";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.style.cursor = "grab";
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mousemove", onMouseMove);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section className="w-full pt-2 pb-16 overflow-hidden border-t" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
      {/* Section header */}
      <div className="px-8 mb-6">
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>
          What I Do
        </p>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scrollbar-none px-8 pb-4 snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {WHAT_I_DO.map((project) => (
          <div
            key={project.title}
            className="flex-shrink-0 snap-start w-[76vw] max-w-72 min-h-48 rounded-3xl p-6 flex flex-col justify-center items-start text-left relative overflow-hidden group transition-all duration-200 select-none border hover:-translate-y-1"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              boxShadow: `0 1px 3px rgba(0,0,0,0.06)`,
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 24px ${project.accent}33`)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 1px 3px rgba(0,0,0,0.06)`)}
          >
            {/* Accent glow in corner */}
            <div
              className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-35"
              style={{ background: project.accent }}
            />

            {/* Large icon — right side, vertically centered */}
            {project.emoji && (
              <span className="pointer-events-none absolute right-[-10px] top-1/2 -translate-y-1/2 text-[8rem] opacity-20 group-hover:opacity-30 transition-opacity select-none">
                {project.emoji}
              </span>
            )}
            {project.Icon && (
              <project.Icon
                className="pointer-events-none absolute right-[-16px] top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ color: project.accent, width: 128, height: 128 }}
              />
            )}

            {/* Title + description */}
            <div className="relative z-10">
              <h3
                className="font-semibold text-base mb-1"
                style={{ color: project.accent }}
              >
                {project.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                {project.description}
              </p>
            </div>
          </div>
        ))}

        {/* Trailing padding tile */}
        <div className="flex-shrink-0 w-4" />
      </div>
    </section>
  );
}
