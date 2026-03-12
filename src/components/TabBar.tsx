"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const TABS = [
  {
    label: "Home",
    href: "/",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <polyline points="9 21 9 12 15 12 15 21" />
      </svg>
    ),
  },
  {
    label: "Work",
    href: "/work",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    label: "About",
    href: "/about",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/[0.06] pb-safe">
      {TABS.map(({ label, href, icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 px-6 py-3 transition-colors ${
              active ? "text-[#60a5fa]" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {icon(active)}
            <span className={`font-mono text-[10px] tracking-wide ${active ? "text-[#60a5fa]" : "text-zinc-500"}`}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
