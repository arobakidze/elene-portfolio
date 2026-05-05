"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollRevealOptions {
  y?: number;
  opacity?: number;
  stagger?: number;
  duration?: number;
  start?: string;
}

export function useScrollReveal(
  triggerRef: RefObject<HTMLElement | null>,
  targetSelector: string,
  options: ScrollRevealOptions = {}
) {
  const {
    y = 30,
    opacity = 0,
    stagger = 0.08,
    duration = 0.6,
    start = "top 80%",
  } = options;

  useEffect(() => {
    if (!triggerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const tweens = gsap.from(targetSelector, {
      y,
      opacity,
      stagger,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: triggerRef.current,
        start,
      },
    });

    return () => {
      if (tweens.scrollTrigger) tweens.scrollTrigger.kill();
      tweens.kill();
    };
  }, [triggerRef, targetSelector, y, opacity, stagger, duration, start]);
}
