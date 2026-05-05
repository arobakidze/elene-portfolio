"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { forFun } from "@/data/content";
import { useCursor } from "@/components/providers/CursorContext";
import styles from "./ForFun.module.css";

export function ForFun() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { setCursorState, resetCursor } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tweens = gsap.from(cardsRef.current, {
      y: 50,
      opacity: 0,
      stagger: 0.12,
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
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>[Beyond Design]</p>

        <h2 className={styles.heading}>
          What I do
          <br />
          for fun <span className={styles.heart}>♡</span>
        </h2>

        <div className={styles.cards}>
          {forFun.map((item, i) => (
            <div
              key={item.number}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
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
          ))}
        </div>
      </div>
    </section>
  );
}
