"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { disciplines } from "@/data/content";
import { useCursor } from "@/components/providers/CursorContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { canUsePointerEffects, EASE_OUT, prefersReducedMotion } from "@/lib/gsap/motion";
import styles from "./Disciplines.module.css";

interface DisciplinesProps {
  onOpenPanel: (index: number) => void;
}

export function Disciplines({ onOpenPanel }: DisciplinesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const rowsRef = useRef<HTMLButtonElement[]>([]);
  const viewWorkRefs = useRef<HTMLSpanElement[]>([]);
  const { setCursorState, resetCursor } = useCursor();

  useScrollReveal(sectionRef, {
    getSteps: () => [
      {
        targets: [labelRef.current],
        y: 20,
        opacity: 0,
        duration: 0.55,
      },
      {
        targets: rowsRef.current,
        y: 36,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        delay: 0.05,
      },
    ],
  });

  const handleRowEnter = useCallback((index: number) => {
    if (!canUsePointerEffects() || prefersReducedMotion()) return;
    const cta = viewWorkRefs.current[index];
    if (!cta) return;
    gsap.to(cta, { x: 4, duration: 0.35, ease: EASE_OUT });
    const arrow = cta.querySelector(`.${styles.arrow}`);
    if (arrow) gsap.to(arrow, { rotation: -45, duration: 0.35, ease: EASE_OUT });
  }, []);

  const handleRowLeave = useCallback((index: number) => {
    if (!canUsePointerEffects() || prefersReducedMotion()) return;
    const cta = viewWorkRefs.current[index];
    if (!cta) return;
    gsap.to(cta, { x: 0, duration: 0.35, ease: EASE_OUT });
    const arrow = cta.querySelector(`.${styles.arrow}`);
    if (arrow) gsap.to(arrow, { rotation: 0, duration: 0.35, ease: EASE_OUT });
  }, []);

  return (
    <section id="disciplines" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <p ref={labelRef} className={styles.label}>
          [Disciplines]
        </p>

        {disciplines.map((disc, i) => (
          <button
            key={disc.id}
            ref={(el) => {
              if (el) rowsRef.current[i] = el;
            }}
            className={styles.row}
            onClick={() => onOpenPanel(i)}
            onMouseEnter={() => {
              setCursorState("hover-disc");
              handleRowEnter(i);
            }}
            onMouseLeave={() => {
              resetCursor();
              handleRowLeave(i);
            }}
            aria-label={`View ${disc.name} projects`}
          >
            <span className={styles.number}>{disc.number}</span>
            <span className={styles.name}>{disc.name}</span>
            <span className={styles.tags}>{disc.tags}</span>
            <span
              ref={(el) => {
                if (el) viewWorkRefs.current[i] = el;
              }}
              className={styles.viewWork}
            >
              View Work <span className={styles.arrow}>→</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
