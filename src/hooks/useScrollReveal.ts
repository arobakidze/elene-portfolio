"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE_OUT, prefersReducedMotion } from "@/lib/gsap/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ScrollRevealStep {
  targets: (HTMLElement | null | undefined)[];
  y?: number;
  opacity?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
}

interface ScrollRevealOptions {
  getSteps: () => ScrollRevealStep[];
  start?: string;
  once?: boolean;
}

export function useScrollReveal(
  triggerRef: RefObject<HTMLElement | null>,
  options: ScrollRevealOptions
) {
  const { getSteps, start = "top 80%", once = true } = options;
  const getStepsRef = useRef(getSteps);
  getStepsRef.current = getSteps;

  useGSAP(
    () => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const steps = getStepsRef.current();
      if (!steps.length) return;

      if (prefersReducedMotion()) {
        steps.forEach((step) => {
          const els = step.targets.filter((el): el is HTMLElement => !!el);
          if (els.length) gsap.set(els, { opacity: 1, y: 0, clearProps: "transform" });
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          once,
        },
      });

      steps.forEach((step) => {
        const els = step.targets.filter((el): el is HTMLElement => !!el);
        if (!els.length) return;

        const y = step.y ?? 28;
        const opacity = step.opacity ?? 0;
        const duration = step.duration ?? 0.65;
        const stagger = step.stagger ?? 0;

        gsap.set(els, { y, opacity });

        tl.to(
          els,
          {
            y: 0,
            opacity: 1,
            duration,
            stagger: stagger > 0 ? stagger : undefined,
            ease: EASE_OUT,
          },
          step.delay !== undefined ? `+=${step.delay}` : undefined
        );
      });
    },
    { scope: triggerRef, dependencies: [start, once] }
  );
}
