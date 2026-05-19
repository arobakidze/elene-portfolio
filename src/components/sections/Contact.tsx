"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteInfo } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SocialHoverGrid } from "@/components/sections/SocialHoverGrid";
import { useCursor } from "@/components/providers/CursorContext";
import { EASE_OUT, prefersReducedMotion } from "@/lib/gsap/motion";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DISPLAY_LINES = [
  { words: ["Let's", " ", "create"] },
  { words: ["something", " ", "beautiful."] },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1WordsRef = useRef<HTMLSpanElement[]>([]);
  const line2WordsRef = useRef<HTMLSpanElement[]>([]);
  const availRef = useRef<HTMLParagraphElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const { setCursorState, resetCursor } = useCursor();

  useGSAP(
    () => {
      const trigger = sectionRef.current;
      if (!trigger) return;

      const line1Words = line1WordsRef.current.filter(Boolean);
      const line2Words = line2WordsRef.current.filter(Boolean);
      const rightEls = [availRef.current, ctaWrapRef.current].filter(
        Boolean
      ) as HTMLElement[];
      const supportEls = [socialRef.current, footerRef.current].filter(
        Boolean
      ) as HTMLElement[];

      if (prefersReducedMotion()) {
        gsap.set(
          [...line1Words, ...line2Words, ...rightEls, ...supportEls],
          { opacity: 1, y: 0, yPercent: 0, clearProps: "transform" }
        );
        return;
      }

      gsap.set(line1Words, { yPercent: 100 });
      gsap.set(line2Words, { yPercent: 100 });
      gsap.set(rightEls, { opacity: 0, y: 16 });
      gsap.set(supportEls, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top 80%",
          once: true,
        },
      });

      tl.to(line1Words, {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: EASE_OUT,
      })
        .to(
          line2Words,
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: EASE_OUT,
          },
          "-=0.5"
        )
        .to(
          rightEls,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: EASE_OUT,
          },
          "-=0.3"
        )
        .to(
          supportEls,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASE_OUT,
          },
          "-=0.2"
        );
    },
    { scope: sectionRef }
  );

  let line1WordIndex = 0;
  let line2WordIndex = 0;

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>[Let&apos;s Connect]</p>

        <div className={styles.mainContent}>
          <div className={styles.displayText}>
            <div>
              {DISPLAY_LINES[0].words.map((w) => {
                if (w === " ") {
                  return (
                    <span key={`sp-0-${line1WordIndex}`}>&nbsp;</span>
                  );
                }
                const idx = line1WordIndex++;
                return (
                  <span key={idx} className={styles.wordWrap}>
                    <span
                      ref={(el) => {
                        if (el) line1WordsRef.current[idx] = el;
                      }}
                      className={styles.word}
                    >
                      {w}
                    </span>
                  </span>
                );
              })}
            </div>
            <div>
              {DISPLAY_LINES[1].words.map((w) => {
                if (w === " ") {
                  return (
                    <span key={`sp-1-${line2WordIndex}`}>&nbsp;</span>
                  );
                }
                const idx = line2WordIndex++;
                const isLastWord = w === "beautiful.";

                return (
                  <span key={idx} className={styles.wordWrap}>
                    <span
                      ref={(el) => {
                        if (el) line2WordsRef.current[idx] = el;
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
          </div>

          <div className={styles.rightCol}>
            <p ref={availRef} className={styles.availText}>
              I&apos;m currently available for new projects and collaborations.
            </p>

            <div ref={ctaWrapRef}>
              <MagneticButton
                href={`mailto:${siteInfo.email}`}
                className={styles.ctaBtn}
              >
                Start a Project →
              </MagneticButton>
            </div>
          </div>
        </div>

        <div ref={socialRef}>
          <SocialHoverGrid />
        </div>

        <footer ref={footerRef} className={styles.footer}>
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
