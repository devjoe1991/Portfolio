"use client";

import { useRef, useEffect } from "react";

const PROJECTS = [
  {
    title: "Project One",
    description: "A short description of what this project does and the problem it solves.",
    tags: ["TypeScript", "Next.js", "Tailwind"],
    accent: "#60a5fa",
  },
  {
    title: "Project Two",
    description: "A short description of what this project does and the problem it solves.",
    tags: ["React", "Node.js", "PostgreSQL"],
    accent: "#a78bfa",
  },
  {
    title: "Project Three",
    description: "A short description of what this project does and the problem it solves.",
    tags: ["Python", "FastAPI", "Redis"],
    accent: "#34d399",
  },
  {
    title: "Project Four",
    description: "A short description of what this project does and the problem it solves.",
    tags: ["Go", "gRPC", "Docker"],
    accent: "#f472b6",
  },
  {
    title: "Project Five",
    description: "A short description of what this project does and the problem it solves.",
    tags: ["Rust", "WASM", "WebGL"],
    accent: "#fbbf24",
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
    <section className="w-full bg-[#0a0a0a] py-16 overflow-hidden">
      {/* Section header */}
      <div className="px-8 mb-6">
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-zinc-600">
          Projects
        </p>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scrollbar-none px-8 pb-4 snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {PROJECTS.map((project) => (
          <div
            key={project.title}
            className="flex-shrink-0 snap-start w-72 h-48 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 flex flex-col justify-between relative overflow-hidden group transition-colors hover:border-white/[0.16] hover:bg-white/[0.05] select-none"
          >
            {/* Accent glow in corner */}
            <div
              className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-35"
              style={{ background: project.accent }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 relative z-10">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-zinc-500"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title + description */}
            <div className="relative z-10">
              <h3
                className="text-white font-semibold text-base mb-1"
                style={{ color: project.accent }}
              >
                {project.title}
              </h3>
              <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
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
