"use client";

import { useRef } from "react";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { useCursor } from "@/components/providers/CursorContext";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const { setCursorState, resetCursor } = useCursor();

  useMagneticEffect(ref);

  const sharedProps = {
    ref,
    className,
    onMouseEnter: () => setCursorState("hover-cta"),
    onMouseLeave: resetCursor,
  };

  if (href) {
    return (
      <a
        {...sharedProps}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button {...sharedProps} onClick={onClick} type="button">
      {children}
    </button>
  );
}
