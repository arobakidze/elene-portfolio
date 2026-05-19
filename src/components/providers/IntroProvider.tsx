"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { EASE_IN_OUT, prefersReducedMotion, refreshScrollTriggers } from "@/lib/gsap/motion";

type IntroSetup = (tl: gsap.core.Timeline) => void;

interface IntroContextValue {
  registerIntro: (id: string, setup: IntroSetup) => () => void;
  introComplete: boolean;
}

const IntroContext = createContext<IntroContextValue | null>(null);

const INTRO_ORDER = ["hero", "navbar"] as const;

function runIntroSetups(setups: Map<string, IntroSetup>) {
  const reduced = prefersReducedMotion();
  const master = gsap.timeline();

  if (reduced) {
    INTRO_ORDER.forEach((id) => {
      const setup = setups.get(id);
      if (setup) setup(master);
    });
    master.progress(1, false);
    return master;
  }

  INTRO_ORDER.forEach((id) => {
    const setup = setups.get(id);
    if (setup) setup(master);
  });

  return master;
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const setupsRef = useRef<Map<string, IntroSetup>>(new Map());
  const playedRef = useRef(false);
  const [introComplete, setIntroComplete] = useState(false);

  const finishIntro = useCallback(() => {
    setIntroComplete(true);
    refreshScrollTriggers();
  }, []);

  const playIntro = useCallback(() => {
    if (playedRef.current) return;
    if (!setupsRef.current.has("hero") || !setupsRef.current.has("navbar")) return;

    playedRef.current = true;

    const tl = runIntroSetups(setupsRef.current);
    tl.eventCallback("onComplete", finishIntro);

    if (tl.duration() === 0) finishIntro();
  }, [finishIntro]);

  const tryPlay = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(playIntro);
    });
  }, [playIntro]);

  const registerIntro = useCallback(
    (id: string, setup: IntroSetup) => {
      setupsRef.current.set(id, setup);
      tryPlay();
      return () => {
        setupsRef.current.delete(id);
      };
    },
    [tryPlay]
  );

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      if (playedRef.current || !setupsRef.current.has("hero")) return;
      playedRef.current = true;
      const tl = runIntroSetups(setupsRef.current);
      tl.eventCallback("onComplete", finishIntro);
      if (tl.duration() === 0) finishIntro();
    }, 500);
    return () => clearTimeout(fallback);
  }, [finishIntro]);

  return (
    <IntroContext.Provider value={{ registerIntro, introComplete }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const ctx = useContext(IntroContext);
  if (!ctx) {
    throw new Error("useIntro must be used within IntroProvider");
  }
  return ctx;
}
