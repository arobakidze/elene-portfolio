"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type CursorState =
  | "default"
  | "hover-link"
  | "hover-video"
  | "hover-project"
  | "hover-disc"
  | "hover-card"
  | "hover-cta";

interface CursorContextValue {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
  resetCursor: () => void;
}

const CursorCtx = createContext<CursorContextValue>({
  cursorState: "default",
  setCursorState: () => {},
  resetCursor: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>("default");

  const resetCursor = useCallback(() => {
    setCursorState("default");
  }, []);

  return (
    <CursorCtx.Provider value={{ cursorState, setCursorState, resetCursor }}>
      {children}
    </CursorCtx.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorCtx);
  if (!ctx) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return ctx;
}
