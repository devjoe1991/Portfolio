"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: string | Element | null;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
}

export function useScrollAnimation<T extends Element>(
  options: ScrollAnimationOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null);

  const {
    from = { opacity: 0, y: 60 },
    to = { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    start = "top 85%",
    end = "bottom 15%",
    scrub = false,
    markers = false,
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
          markers,
          once,
        },
      });
    });

    return () => ctx.revert();
  }, [from, to, start, end, scrub, markers, once]);

  return ref;
}

export function useStaggerAnimation<T extends Element>(
  childSelector: string,
  options: ScrollAnimationOptions & { stagger?: number } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null);

  const {
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    start = "top 85%",
    scrub = false,
    markers = false,
    once = true,
    stagger = 0.15,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll(childSelector);
    if (!children.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(children, from, {
        ...to,
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          scrub,
          markers,
          once,
        },
      });
    });

    return () => ctx.revert();
  }, [childSelector, from, to, start, scrub, markers, once, stagger]);

  return ref;
}
