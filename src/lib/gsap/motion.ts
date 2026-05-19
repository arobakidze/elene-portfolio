import gsap from "gsap";

export const EASE_OUT = "power2.out";
export const EASE_IN_OUT = "power3.inOut";
export const DURATION_SHORT = 0.4;
export const DURATION_MED = 0.6;
export const DURATION_LONG = 0.9;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function canUsePointerEffects(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function refreshScrollTriggers() {
  if (typeof window === "undefined") return;
  import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
    ScrollTrigger.refresh();
  });
}
