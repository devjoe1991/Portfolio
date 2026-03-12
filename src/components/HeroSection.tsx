"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Instrument_Serif, Figtree } from "next/font/google";
import gsap from "gsap";

const instrumentSerif = Instrument_Serif({ weight: "400", subsets: ["latin"] });
const figtree = Figtree({ subsets: ["latin"] });


function CamberCoLogo({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center leading-none ${className}`}>
      <span className={`${instrumentSerif.className} text-white text-2xl tracking-wide`}>Camber</span>
      <span className={`${figtree.className} text-zinc-400 text-xs tracking-[0.25em] uppercase`}>Co</span>
    </div>
  );
}

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The pool of characters that each title letter morphs into — individual chars from TS code
const CODE_CHARS =
  "const interface type export default function return void string number boolean Promise async await => { } ( ) [ ] < > ; : . = ! & | // import from class extends implements null undefined true false new this".split(
    ""
  );

const NEON_COLORS = [
  "#60a5fa", // blue    — keywords
  "#f472b6", // pink    — strings
  "#34d399", // green   — types
  "#a78bfa", // purple  — decorators
  "#fbbf24", // amber   — values
  "#f87171", // red     — errors/operators
  "#38bdf8", // sky     — variables
  "#4ade80", // lime    — comments
];


function getRandomCodeChar() {
  return CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
}

function getRandomColor() {
  return NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const subtitle = subtitleRef.current;
    if (!section || !subtitle) return;

    const chars = charRefs.current.filter(Boolean) as HTMLSpanElement[];

    // Pre-assign each char its scatter destination, code char, and color
    const targets = chars.map((el) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      return {
        el,
        codeChar: getRandomCodeChar(),
        color: getRandomColor(),
        tx: gsap.utils.random(-vw * 0.55, vw * 0.55),
        ty: gsap.utils.random(-vh * 0.55, vh * 0.55),
        rotation: gsap.utils.random(-270, 270),
        scale: gsap.utils.random(0.6, 2.2),
      };
    });

    // Store original text + styles so we can restore on reverse
    const originals = chars.map((el) => ({
      text: el.textContent ?? "",
      color: el.style.color,
      fontFamily: el.style.fontFamily,
      fontWeight: el.style.fontWeight,
    }));

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Phase 0→0.15 — subtitle fades out
      tl.to(
        subtitle,
        { opacity: 0, y: -20, duration: 0.15, ease: "power2.in" },
        0
      );

      // Phase 0→0.5 — each char morphs + flies off
      targets.forEach(({ el, codeChar, color, tx, ty, rotation, scale }, i) => {
        const offset = (i / targets.length) * 0.25;
        const orig = originals[i];

        tl.to(
          el,
          {
            x: tx,
            y: ty,
            rotation,
            scale,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            // Morph to code char on the way forward
            onStart() {
              el.textContent = codeChar;
              el.style.color = color;
              el.style.fontFamily = "var(--font-geist-mono), monospace";
              el.style.fontWeight = "600";
            },
            // Restore original letter on reverse
            onReverseComplete() {
              el.textContent = orig.text;
              el.style.color = orig.color;
              el.style.fontFamily = orig.fontFamily;
              el.style.fontWeight = orig.fontWeight;
            },
          },
          offset
        );
      });

      // Phase 0.72→1 — particles drift further and fade out
      tl.to(
        chars,
        {
          opacity: 0,
          scale: 0,
          x: (i) => (targets[i]?.tx ?? 0) * 1.6,
          y: (i) => (targets[i]?.ty ?? 0) * 1.6,
          duration: 0.3,
          ease: "power2.in",
          stagger: { amount: 0.2, from: "random" },
        },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Build the three display lines with per-char refs
  let globalIndex = 0;

  function renderLine(
    text: string,
    className: string,
    wrapperClass: string
  ) {
    return (
      <div className={wrapperClass}>
        {Array.from(text).map((char) => {
          const idx = globalIndex++;
          return (
            <span
              key={idx}
              ref={(el) => {
                charRefs.current[idx] = el;
              }}
              className={`inline-block ${className} ${char === " " ? "w-[0.3em]" : ""}`}
              style={{ willChange: "transform, opacity, color" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col items-center bg-[#0a0a0a] overflow-hidden"
    >
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Cover photo with bottom fade — takes up top portion */}
      <div className="relative w-full h-[52vw] max-h-[420px] sm:h-[380px] sm:max-h-[520px] flex-shrink-0 z-0">
        <Image
          src="/techpreneurjoe.jpg"
          alt="Joe"
          fill
          priority
          className="object-cover object-center pointer-events-none select-none"
        />
        {/* Fade to bg at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
      </div>

      {/* Title + subtitle stacked below photo */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center -mt-16 sm:-mt-20">
        {/* <Welcome to> */}
        {renderLine(
          "<Welcome to>",
          "font-mono text-[#60a5fa] text-base sm:text-xl md:text-2xl font-medium",
          "flex flex-wrap justify-center"
        )}

        {/* TechpreneurJoe */}
        {renderLine(
          "TechpreneurJoe",
          "font-sans text-white font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight",
          "flex flex-wrap justify-center"
        )}

        {/* Portfolio */}
        {renderLine(
          "Portfolio",
          "font-mono text-[#a78bfa] text-xl sm:text-3xl md:text-4xl font-semibold",
          "flex flex-wrap justify-center"
        )}
      </div>

      {/* Subtitle + scroll cue */}
      <div
        ref={subtitleRef}
        className="relative z-10 mt-6 flex flex-col items-center gap-3 px-6 text-center"
      >
        <p className="max-w-sm text-base font-medium text-zinc-400 sm:max-w-md sm:text-lg md:text-xl">
          Real developer.&nbsp;&nbsp;Real builder.&nbsp;&nbsp;Real interaction.
        </p>
        <p className="font-mono text-xs text-zinc-600 sm:text-sm">
          // scroll to explore
        </p>
        <div className="mt-4 h-12 w-px animate-pulse bg-gradient-to-b from-transparent via-zinc-500 to-transparent sm:h-16" />
      </div>

      {/* Logos carousel */}
      <div className="relative z-10 w-full pt-8 pb-10 border-t border-white/[0.06] bg-[#0a0a0a]">
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-zinc-600">
          In Partnership With:
        </p>
        <div
          className="flex items-center justify-center gap-0 overflow-x-auto snap-x snap-mandatory scrollbar-none px-8"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Lyjo Tech Ltd */}
          <div className="flex-shrink-0 snap-center flex items-center gap-0">
            <div className="w-36 h-36 relative grayscale opacity-75">
              <Image src="/lyjotechltd.png" alt="Lyjo Tech Ltd" fill className="object-contain" />
            </div>
            <div className="flex-shrink-0 w-px h-10 bg-white/10 mx-8" />
          </div>

          {/* Camber Co */}
          <div className="flex-shrink-0 snap-center flex items-center gap-0">
            <CamberCoLogo className="opacity-75" />
          </div>

          {/* Camber Co — last item, no trailing divider */}

        </div>
      </div>
    </section>
  );
}
