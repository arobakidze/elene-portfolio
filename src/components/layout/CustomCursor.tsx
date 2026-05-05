"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCursor } from "@/components/providers/CursorContext";

const CURSOR_LABELS: Record<string, string> = {
  "hover-video": "PLAY",
  "hover-project": "OPEN",
  "hover-disc": "EXPLORE",
  "hover-card": "↗",
};

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const { cursorState } = useCursor();

  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (dotRef.current) {
        gsap.set(dotRef.current, {
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.1;

      if (ringRef.current) {
        gsap.set(ringRef.current, {
          x: ringPos.current.x,
          y: ringPos.current.y,
        });
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!ringRef.current || !dotRef.current) return;

    const isHover = cursorState !== "default";
    const hasLabel = cursorState in CURSOR_LABELS;
    const isCta = cursorState === "hover-cta";

    gsap.to(ringRef.current, {
      width: isHover ? 56 : 36,
      height: isHover ? 56 : 36,
      opacity: isHover ? 1 : 0,
      background: isCta ? "var(--pink)" : "transparent",
      borderColor: isCta ? "var(--pink)" : "rgba(242, 181, 160, 0.5)",
      duration: 0.3,
      ease: "power2.out",
    });

    if (labelRef.current) {
      labelRef.current.textContent = hasLabel
        ? CURSOR_LABELS[cursorState]
        : "";
      gsap.to(labelRef.current, {
        opacity: hasLabel ? 1 : 0,
        duration: 0.2,
      });
    }
  }, [cursorState]);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "var(--pink)",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(242, 181, 160, 0.5)",
          background: "transparent",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translate(-50%, -50%)",
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: "var(--font-dm-mono-var), monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.08em",
            color: "var(--text-white)",
            opacity: 0,
            textTransform: "uppercase",
          }}
        />
      </div>
    </>
  );
}
