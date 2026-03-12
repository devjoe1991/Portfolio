"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const MODES = ["system", "light", "dark"] as const;

const icons = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

export default function Header() {
  const { theme, setTheme } = useTheme();

  function cycleTheme() {
    const next = MODES[(MODES.indexOf(theme) + 1) % MODES.length];
    setTheme(next);
  }

  const Icon = icons[theme];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 backdrop-blur-md border-b"
      style={{
        background: "var(--header-bg)",
        borderColor: "var(--header-border)",
      }}
    >
      <span className="font-mono text-sm font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
        joe<span className="text-[#60a5fa]">.</span>
      </span>

      <div className="flex items-center gap-3">
        <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
          @techpreneurjoe
        </span>
        <button
          onClick={cycleTheme}
          aria-label={`Switch theme (current: ${theme})`}
          className="flex items-center justify-center w-7 h-7 rounded-full border transition-colors hover:opacity-70"
          style={{
            borderColor: "var(--border)",
            color: "var(--muted)",
          }}
        >
          <Icon size={13} />
        </button>
      </div>
    </header>
  );
}
