"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiFigma,
  SiAutodesk,
  SiBlender,
} from "@icons-pack/react-simple-icons";
import { skills } from "@/data/content";
import styles from "./Skills.module.css";

const ICON_SIZE = 40;
const ICON_COLOR = "var(--text-off)";

function PsIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill={ICON_COLOR}>
      <path d="M9.85 8.42c-.37-.15-.77-.21-1.18-.2-.26 0-.49.02-.63.04v3.1c.15.02.31.03.49.03.94 0 1.52-.47 1.52-1.54 0-.81-.43-1.29-1.2-1.43zM0 0v24h24V0H0zm10.74 12.48c-.41.47-1.07.71-1.89.71-.2 0-.37-.01-.49-.04v3.45H6.84V7.3c.41-.07.96-.13 1.75-.13 1.22 0 2.09.27 2.67.81.5.46.81 1.17.81 2.04 0 .87-.27 1.59-.69 2.06l.36.4zm5.63 1.7c-.38.38-.94.58-1.63.58-.57 0-1.06-.13-1.34-.25l.22-1.02c.31.14.72.26 1.17.26.49 0 .73-.2.73-.49 0-.29-.22-.44-.78-.63-.77-.25-1.27-.66-1.27-1.3 0-.76.63-1.33 1.69-1.33.5 0 .87.11 1.14.23l-.22 1c-.18-.09-.52-.22-.94-.22-.44 0-.66.2-.66.44 0 .29.26.42.85.64.81.29 1.2.71 1.2 1.33 0 .74-.58 1.36-1.76 1.36l.6-.6z"/>
    </svg>
  );
}

function AiIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill={ICON_COLOR}>
      <path d="M0 0v24h24V0H0zm14.55 15.6h-1.56l-.62-2.03H9.92l-.59 2.03H7.84L10.18 8h1.97l2.4 7.6zm-3.04-3.2l-.97-3.21c-.1-.35-.17-.68-.17-.68h-.02s-.08.34-.18.68l-.96 3.21h2.3zm5.47 3.2h-1.4V10.2h1.4v5.4zm-.71-6.14c-.48 0-.79-.33-.79-.73 0-.42.33-.74.8-.74.49 0 .79.32.79.74 0 .4-.31.73-.8.73z"/>
    </svg>
  );
}

function AeIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill={ICON_COLOR}>
      <path d="M0 0v24h24V0H0zm13.35 15.6h-1.56l-.62-2.03H8.72l-.59 2.03H6.64L8.98 8h1.97l2.4 7.6zm-3.04-3.2l-.97-3.21c-.1-.35-.17-.68-.17-.68h-.02s-.08.34-.18.68l-.96 3.21h2.3zm7.56 1.58c.01.08.01.2.01.33 0 .48-.09.93-.28 1.31-.18.38-.46.68-.83.89-.37.2-.82.3-1.34.3-.45 0-.91-.05-1.22-.16v-1.14c.33.13.73.21 1.1.21.4 0 .7-.1.9-.31.2-.21.3-.5.3-.89h-.02c-.21.34-.56.5-1.03.5-.52 0-.93-.19-1.23-.56-.3-.37-.45-.88-.45-1.53 0-.72.17-1.3.51-1.7.34-.41.82-.61 1.42-.61.56 0 .98.2 1.18.52h.01l.06-.44h1.28c-.02.26-.04.62-.04 1.07v2.2l-.33.01z"/>
    </svg>
  );
}

function PrIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill={ICON_COLOR}>
      <path d="M0 0v24h24V0H0zm10.2 12.48c-.33.38-.84.58-1.48.58-.16 0-.29-.01-.39-.04v2.58H7.06V9.2c.33-.06.78-.11 1.42-.11.66 0 1.14.13 1.45.38.3.24.51.62.51 1.08 0 .46-.15.84-.5 1.12l.26.81zm5.77-.18c-.02-.03-.05-.08-.05-.08h-.02s.02.08.02.23v3.16h-1.22V12c0-.14-.04-.25-.12-.33-.08-.08-.2-.12-.35-.12-.22 0-.43.09-.57.23v3.83h-1.22V10.2h1.03l.1.44h.03c.28-.35.71-.54 1.19-.54.43 0 .77.14 1.02.42.13.14.22.32.27.53l.12-.1-.23-.6z"/>
    </svg>
  );
}

function ProcreateIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill={ICON_COLOR}>
      <circle cx="12" cy="12" r="10" fill="none" stroke={ICON_COLOR} strokeWidth="1.5"/>
      <path d="M8 16l2.5-8h3L16 16" fill="none" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="9" y1="13" x2="15" y2="13" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

const iconComponents = [
  { Comp: () => <SiFigma size={ICON_SIZE} color={ICON_COLOR} title="Figma" />, label: "Figma" },
  { Comp: PsIcon, label: "Photoshop" },
  { Comp: AiIcon, label: "Illustrator" },
  { Comp: AeIcon, label: "After Effects" },
  { Comp: PrIcon, label: "Premiere Pro" },
  { Comp: ProcreateIcon, label: "Procreate" },
  { Comp: () => <SiAutodesk size={ICON_SIZE} color={ICON_COLOR} title="Autodesk" />, label: "Autodesk" },
  { Comp: () => <SiBlender size={ICON_SIZE} color={ICON_COLOR} title="Blender" />, label: "Blender" },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let tweens: gsap.core.Tween | null = null;

    if (pillsRef.current) {
      tweens = gsap.from(pillsRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }

    return () => {
      if (tweens) {
        if (tweens.scrollTrigger) tweens.scrollTrigger.kill();
        tweens.kill();
      }
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>[Tools I Use]</p>

        <div ref={pillsRef} className={styles.pills}>
          {skills.categories.map((cat) => (
            <span key={cat.name} className={styles.categoryPill}>
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.iconStrip}>
        {iconComponents.map(({ Comp, label }, i) => (
          <span key={label} className={styles.iconItem}>
            {i > 0 && <span className={styles.iconDivider} />}
            <span className={styles.iconCell}>
              <Comp />
              <span className={styles.iconLabel}>{label}</span>
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
