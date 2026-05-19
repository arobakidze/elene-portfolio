"use client";

import { useLayoutEffect, useRef } from "react";
import { forFun } from "@/data/content";
import { useCursor } from "@/components/providers/CursorContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSubtleHover } from "@/hooks/useSubtleHover";
import styles from "./ForFun.module.css";

function ForFunCard({
  item,
  index,
  cardsRef,
  setCursorState,
  resetCursor,
}: {
  item: (typeof forFun)[number];
  index: number;
  cardsRef: React.MutableRefObject<HTMLDivElement[]>;
  setCursorState: (s: "hover-card") => void;
  resetCursor: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  useSubtleHover(cardRef);

  useLayoutEffect(() => {
    if (cardRef.current) cardsRef.current[index] = cardRef.current;
  }, [index, cardsRef]);

  return (
    <div
      ref={cardRef}
      className={styles.card}
      role="button"
      tabIndex={0}
      onMouseEnter={() => setCursorState("hover-card")}
      onMouseLeave={resetCursor}
    >
      <div
        className={styles.circle}
        style={{ background: item.color }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.label}
            className={styles.circleImg}
          />
        ) : (
          item.number
        )}
      </div>

      <span className={styles.cardLabel}>{item.label}</span>

      <span className={styles.cardDesc}>{item.description}</span>

      <span className={styles.cardArrow}>→</span>
    </div>
  );
}

export function ForFun() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
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
        targets: [headingRef.current],
        y: 28,
        opacity: 0,
        duration: 0.65,
        delay: 0.05,
      },
      {
        targets: cardsRef.current,
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        delay: 0.1,
      },
    ],
  });

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <p ref={labelRef} className={styles.label}>
          [Beyond Design]
        </p>

        <h2 ref={headingRef} className={styles.heading}>
          What I do
          <br />
          for fun <span className={styles.heart}>♡</span>
        </h2>

        <div className={styles.cards}>
          {forFun.map((item, i) => (
            <ForFunCard
              key={item.number}
              item={item}
              index={i}
              cardsRef={cardsRef}
              setCursorState={setCursorState}
              resetCursor={resetCursor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
