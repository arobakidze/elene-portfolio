"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { disciplines } from "@/data/content";
import { useCursor } from "@/components/providers/CursorContext";
import styles from "./Disciplines.module.css";

interface DisciplinesProps {
  onOpenPanel: (index: number) => void;
}

export function Disciplines({ onOpenPanel }: DisciplinesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLButtonElement[]>([]);
  const { setCursorState, resetCursor } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tweens = gsap.from(rowsRef.current, {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    return () => {
      if (tweens.scrollTrigger) tweens.scrollTrigger.kill();
      tweens.kill();
    };
  }, []);

  return (
    <section id="disciplines" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>[Disciplines]</p>

        {disciplines.map((disc, i) => (
          <button
            key={disc.id}
            ref={(el) => {
              if (el) rowsRef.current[i] = el;
            }}
            className={styles.row}
            onClick={() => onOpenPanel(i)}
            onMouseEnter={() => setCursorState("hover-disc")}
            onMouseLeave={resetCursor}
            aria-label={`View ${disc.name} projects`}
          >
            <span className={styles.number}>{disc.number}</span>
            <span className={styles.name}>{disc.name}</span>
            <span className={styles.tags}>{disc.tags}</span>
            <span className={styles.viewWork}>
              View Work <span className={styles.arrow}>→</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
