"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { canUsePointerEffects, EASE_OUT, prefersReducedMotion } from "@/lib/gsap/motion";

export function useMagneticEffect(
  ref: RefObject<HTMLElement | null>,
  strength = 0.25
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !canUsePointerEffects() || prefersReducedMotion()) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.3,
          ease: EASE_OUT,
        });
      }
    };

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: EASE_OUT,
      });
    };

    window.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, strength]);
}
