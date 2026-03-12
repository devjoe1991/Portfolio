"use client";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.06]">
      <span className="font-mono text-sm font-semibold text-white tracking-tight">
        joe<span className="text-[#60a5fa]">.</span>
      </span>
      <span className="font-mono text-xs text-zinc-500">
        @techpreneurjoe
      </span>
    </header>
  );
}
