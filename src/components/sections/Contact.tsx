"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteInfo } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SocialHoverGrid } from "@/components/sections/SocialHoverGrid";
import { useCursor } from "@/components/providers/CursorContext";
import styles from "./Contact.module.css";

const DISPLAY_LINES = [
  { words: ["Let's", " ", "create"] },
  { words: ["something", " ", "beautiful."] },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const { setCursorState, resetCursor } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tweens = gsap.from(wordsRef.current, {
      yPercent: 110,
      duration: 0.8,
      stagger: 0.05,
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

  let wordIndex = 0;

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>[Let&apos;s Connect]</p>

        <div className={styles.mainContent}>
          <div className={styles.displayText}>
            {DISPLAY_LINES.map((line, lineIdx) => (
              <div key={lineIdx}>
                {line.words.map((w) => {
                  if (w === " ") {
                    return <span key={`sp-${lineIdx}-${wordIndex}`}>&nbsp;</span>;
                  }
                  const idx = wordIndex++;
                  const isLastWord =
                    lineIdx === DISPLAY_LINES.length - 1 &&
                    w === line.words[line.words.length - 1];

                  return (
                    <span key={idx} className={styles.wordWrap}>
                      <span
                        ref={(el) => {
                          if (el) wordsRef.current[idx] = el;
                        }}
                        className={styles.word}
                      >
                        {isLastWord ? (
                          <>
                            {w.slice(0, -1)}
                            <span className={styles.pinkPeriod}>.</span>
                          </>
                        ) : (
                          w
                        )}
                      </span>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>

          <div className={styles.rightCol}>
            <p className={styles.availText}>
              I&apos;m currently available for new projects and collaborations.
            </p>

            <MagneticButton
              href={`mailto:${siteInfo.email}`}
              className={styles.ctaBtn}
            >
              Start a Project →
            </MagneticButton>
          </div>
        </div>

        <SocialHoverGrid />

        <footer className={styles.footer}>
          <div className={styles.footerTop}>
            <a
              href={`mailto:${siteInfo.email}`}
              className={styles.footerLink}
              onMouseEnter={() => setCursorState("hover-link")}
              onMouseLeave={resetCursor}
            >
              {siteInfo.email}
            </a>
            <span className={styles.footerSep}>|</span>
            <a
              href={siteInfo.behance}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
              onMouseEnter={() => setCursorState("hover-link")}
              onMouseLeave={resetCursor}
            >
              Behance ↗
            </a>
            <span className={styles.footerSep}>|</span>
            <a
              href={siteInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
              onMouseEnter={() => setCursorState("hover-link")}
              onMouseLeave={resetCursor}
            >
              LinkedIn ↗
            </a>
            <span className={styles.footerSep}>|</span>
            <span className={styles.footerLink}>{siteInfo.location}</span>

            <div className={styles.logoMark}>
              <span className={styles.logoBold}>E</span>
              <span className={styles.logoLight}>L</span>
            </div>
          </div>

          <p className={styles.footerCopy}>
            © {new Date().getFullYear()} {siteInfo.name.toUpperCase()}
          </p>
        </footer>
      </div>
    </section>
  );
}
