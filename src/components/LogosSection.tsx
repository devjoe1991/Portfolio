"use client";

import Image from "next/image";
import { useRef } from "react";

const LOGOS = [
  { src: "/lyjotechltd.png", alt: "Lyjo Tech Ltd" },
  // Add more logos here as: { src: "/logo.png", alt: "Company Name" }
];

// Duplicate for seamless infinite scroll
const TRACK = [...LOGOS, ...LOGOS, ...LOGOS];

export default function LogosSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full bg-[#0a0a0a] py-12 border-t border-white/[0.06]">
      <p className="mb-8 text-center font-sans font-bold text-sm uppercase tracking-widest text-zinc-600">
        built &amp; shipped with
      </p>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center gap-12 animate-marquee"
          style={{ width: "max-content" }}
        >
          {TRACK.map(({ src, alt }, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-16 h-16 relative grayscale opacity-40 hover:opacity-70 hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
