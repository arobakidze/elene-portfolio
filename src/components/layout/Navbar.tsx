"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navLinks, siteInfo } from "@/data/content";
import { useCursor } from "@/components/providers/CursorContext";
import styles from "./Navbar.module.css";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const { setCursorState, resetCursor } = useCursor();

  const handleCursorEnter = useCallback(() => {
    setCursorState("hover-link");
  }, [setCursorState]);

  const handleCursorLeave = useCallback(() => {
    resetCursor();
  }, [resetCursor]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      start: "60px top",
      onUpdate: (self) => {
        setScrolled(self.progress > 0);
      },
      onToggle: (self) => {
        setScrolled(self.isActive);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback(
    (href: string) => {
      setMobileOpen(false);
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      >
        <button
          className={styles.logo}
          onClick={scrollToTop}
          onMouseEnter={handleCursorEnter}
          onMouseLeave={handleCursorLeave}
          aria-label={`Go to top - ${siteInfo.name}`}
        >
          <span>E</span>
          <span className={styles.logoItalic}>L</span>
        </button>

        <div className={styles.navCenter}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              className={`${styles.pill} ${
                activeSection === link.href ? styles.active : ""
              }`}
              onClick={() => scrollTo(link.href)}
              onMouseEnter={handleCursorEnter}
              onMouseLeave={handleCursorLeave}
            >
              {link.label}
            </button>
          ))}

          <button
            className={styles.reelPill}
            onClick={() => scrollTo("#home")}
            onMouseEnter={handleCursorEnter}
            onMouseLeave={handleCursorLeave}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
            Reel
          </button>
        </div>

        <div
          className={styles.logoMark}
          onClick={scrollToTop}
          onMouseEnter={handleCursorEnter}
          onMouseLeave={handleCursorLeave}
          role="button"
          tabIndex={0}
          aria-label="Go to top"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") scrollToTop();
          }}
        >
          <span className={styles.logoSquare} />
          <span className={styles.logoSquare} />
          <span className={styles.logoSquare} />
          <span className={styles.logoSquare} />
        </div>

        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.open : ""}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          onMouseEnter={handleCursorEnter}
          onMouseLeave={handleCursorLeave}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </nav>

      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.open : ""}`}
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            className={styles.mobileLink}
            onClick={() => scrollTo(link.href)}
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
}
