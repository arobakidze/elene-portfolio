"use client";

import { useState, useCallback } from "react";
import { Hero } from "@/components/sections/Hero";
import { Disciplines } from "@/components/sections/Disciplines";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { ForFun } from "@/components/sections/ForFun";
import { Contact } from "@/components/sections/Contact";
import { CVModal } from "@/components/ui/CVModal";

export default function Home() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeDisc, setActiveDisc] = useState(0);
  const [cvOpen, setCvOpen] = useState(false);

  const openPanel = useCallback((index: number) => {
    setActiveDisc(index);
    setPanelOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
  }, []);

  return (
    <main>
      <Hero onOpenCV={() => setCvOpen(true)} />
      <Disciplines onOpenPanel={openPanel} />
      <Skills />
      <ForFun />
      <div
        style={{
          width: "100%",
          height: "2px",
          background:
            "linear-gradient(to right, transparent, var(--pink), transparent)",
        }}
      />
      <Contact />
      <Projects
        isOpen={panelOpen}
        activeIndex={activeDisc}
        onClose={closePanel}
      />
      <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </main>
  );
}
