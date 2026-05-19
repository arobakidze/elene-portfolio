"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { canUsePointerEffects, EASE_OUT, prefersReducedMotion } from "@/lib/gsap/motion";

interface SubtleHoverOptions {
  y?: number;
  scale?: number;
  duration?: number;
}

export function useSubtleHover(
  ref: RefObject<HTMLElement | null>,
  options: SubtleHoverOptions = {}
) {
  const { y = -3, scale = 1.01, duration = 0.35 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || !canUsePointerEffects() || prefersReducedMotion()) return;

    const onEnter = () => {
      gsap.to(el, { y, scale, duration, ease: EASE_OUT });
    };

    const onLeave = () => {
      gsap.to(el, { y: 0, scale: 1, duration, ease: EASE_OUT });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { y: 0, scale: 1 });
    };
  }, [ref, y, scale, duration]);
}
