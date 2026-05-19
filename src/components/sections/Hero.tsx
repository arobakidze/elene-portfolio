"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { siteInfo, experience, projectCoverFallback } from "@/data/content";
import { useCursor } from "@/components/providers/CursorContext";
import { useIntro } from "@/components/providers/IntroProvider";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/gsap/motion";
import styles from "./Hero.module.css";

gsap.registerPlugin(useGSAP);

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

interface HeroProps {
  onOpenCV: () => void;
}

export function Hero({ onOpenCV }: HeroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoColRef = useRef<HTMLDivElement>(null);
  const expColRef = useRef<HTMLDivElement>(null);
  const drawerLineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<HTMLDivElement[]>([]);
  const cvButtonRef = useRef<HTMLButtonElement>(null);
  const heroScopeRef = useRef<HTMLElement>(null);

  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const { setCursorState, resetCursor } = useCursor();
  const { registerIntro } = useIntro();

  useMagneticEffect(cvButtonRef, 0.2);

  useGSAP(
    () => {
      if (videoColRef.current) gsap.set(videoColRef.current, { opacity: 0, x: -40 });
      if (expColRef.current) gsap.set(expColRef.current, { opacity: 0, x: 40 });
    },
    { scope: heroScopeRef }
  );

  useEffect(() => {
    return registerIntro("hero", (tl) => {
      if (overlayRef.current) {
        tl.fromTo(
          overlayRef.current,
          { yPercent: 0 },
          { yPercent: -100, duration: 1.1, ease: EASE_IN_OUT }
        );
      }
      if (videoColRef.current) {
        tl.fromTo(
          videoColRef.current,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: EASE_OUT },
          "-=0.4"
        );
      }
      if (expColRef.current) {
        tl.fromTo(
          expColRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: EASE_OUT },
          "<"
        );
      }
      if (rowRefs.current.length) {
        tl.fromTo(
          rowRefs.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: EASE_OUT },
          "-=0.3"
        );
      }
    });
  }, [registerIntro]);

  // Drawer hover interaction
  const handleDrawerEnter = useCallback(() => {
    if (!expColRef.current || !drawerLineRef.current) return;
    gsap.to(expColRef.current, {
      y: -4,
      scaleX: 1.01,
      duration: 0.4,
      ease: EASE_OUT,
    });
    gsap.to(drawerLineRef.current, { opacity: 1, duration: 0.3 });
    gsap.to(expColRef.current, {
      boxShadow: "-8px 0 24px rgba(0,0,0,0.3)",
      duration: 0.4,
    });
  }, []);

  const handleDrawerLeave = useCallback(() => {
    if (!expColRef.current || !drawerLineRef.current) return;
    gsap.to(expColRef.current, {
      y: 0,
      scaleX: 1,
      duration: 0.5,
      ease: EASE_OUT,
    });
    gsap.to(drawerLineRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(expColRef.current, {
      boxShadow: "none",
      duration: 0.4,
    });
  }, []);

  const togglePlay = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  }, []);

  const handleFullscreen = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.requestFullscreen) {
      vid.requestFullscreen();
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    setCurrentTime(vid.currentTime);
    setDuration(vid.duration || 0);
  }, []);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const vid = videoRef.current;
      const bar = progressRef.current;
      if (!vid || !bar) return;
      const rect = bar.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      vid.currentTime = pct * (vid.duration || 0);
    },
    []
  );

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="home" ref={heroScopeRef} className={styles.hero}>
      <div ref={overlayRef} className={styles.overlay} />

      <div className={styles.columns}>
        {/* Left: Video */}
        <div ref={videoColRef} className={styles.videoCol}>
          <div
            className={styles.videoWrapper}
            onMouseEnter={() => setCursorState("hover-video")}
            onMouseLeave={resetCursor}
          >
            {videoError ? (
              <div className={styles.reelPlaceholder}>
                <div className={styles.reelPlaceholderInner}>
                  <span className={styles.reelPlaceholderIcon}>▶</span>
                  <p className={styles.reelPlaceholderTitle}>Design Reel</p>
                  <p className={styles.reelPlaceholderSub}>Coming soon</p>
                  <button
                    className={styles.reelPlaceholderCta}
                    onClick={() => {
                      const el = document.getElementById("disciplines");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    View selected work instead →
                  </button>
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  className={styles.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={projectCoverFallback}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleTimeUpdate}
                  onError={() => setVideoError(true)}
                >
                  <source src="/videos/elene-reel.mp4" type="video/mp4" />
                </video>

                <button
                  className={styles.playBtn}
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <polygon points="6,3 20,12 6,21" />
                    </svg>
                  )}
                </button>
              </>
            )}
          </div>

          <div className={styles.controls}>
            <span className={styles.timeDisplay}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div
              ref={progressRef}
              className={styles.progressBar}
              onClick={handleProgressClick}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              className={styles.controlBtn}
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>

            <button
              className={styles.controlBtn}
              onClick={handleFullscreen}
              aria-label="Fullscreen"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15,3 21,3 21,9" />
                <polyline points="9,21 3,21 3,15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Experience Drawer */}
        <div
          ref={expColRef}
          className={styles.expCol}
          onMouseEnter={handleDrawerEnter}
          onMouseLeave={handleDrawerLeave}
        >
          <div ref={drawerLineRef} className={styles.drawerLine} />

          <div className={styles.expAccent} />
          <p className={styles.expLabel}>[Experience]</p>

          <p className={styles.expBio}>{siteInfo.bio}</p>

          <p className={styles.expLocation}>
            · {siteInfo.location}
          </p>

          <div className={styles.divider} />

          {experience.map((exp, i) => (
            <div
              key={exp.id}
              ref={(el) => {
                if (el) rowRefs.current[i] = el;
              }}
              className={styles.expRow}
            >
              <span className={styles.expYears}>{exp.years}</span>
              <div className={styles.expInfo}>
                <p className={styles.expRole}>{exp.role}</p>
                <p className={styles.expCompany}>{exp.company}</p>
              </div>
              <span className={styles.expArrow}>→</span>
            </div>
          ))}

          <div className={styles.divider} />

          <button
            ref={cvButtonRef}
            className={styles.cvButton}
            onClick={onOpenCV}
            onMouseEnter={() => setCursorState("hover-cta")}
            onMouseLeave={resetCursor}
          >
            View Full CV ↓
          </button>
        </div>
      </div>
    </section>
  );
}
