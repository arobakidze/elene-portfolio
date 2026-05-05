"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { disciplines } from "@/data/content";
import { useCursor, type CursorState } from "@/components/providers/CursorContext";
import styles from "./Projects.module.css";

interface ProjectsProps {
  isOpen: boolean;
  activeIndex: number;
  onClose: () => void;
}

type Project = (typeof disciplines)[number]["projects"][number];

const drawerVariants = {
  hidden: {
    x: "100%",
    transition: { duration: 0.45, ease: [0.4, 0, 1, 1] as const },
  },
  visible: {
    x: 0,
    transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] as const },
  },
};

export function Projects({ isOpen, activeIndex, onClose }: ProjectsProps) {
  const [activeDiscipline, setActiveDiscipline] = useState(activeIndex);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { setCursorState, resetCursor } = useCursor();

  useEffect(() => {
    setActiveDiscipline((prev) => {
      if (prev !== activeIndex) {
        setSelectedProject(null);
      }
      return activeIndex;
    });
  }, [activeIndex]);

  useEffect(() => {
    if (isOpen) {
      setSelectedProject(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const currentDisc = disciplines[activeDiscipline];
  const projects = currentDisc?.projects ?? [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className={styles.clickOutside}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            className={styles.panel}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className={styles.pinkLine} />

            <div className={styles.header}>
              <span className={styles.headerTitle}>{currentDisc?.name}</span>
              <button
                className={styles.closeBtn}
                onClick={onClose}
                onMouseEnter={() => setCursorState("hover-link")}
                onMouseLeave={resetCursor}
                aria-label="Close panel"
              >
                ✕
              </button>
            </div>

            <div className={styles.content}>
              <AnimatePresence mode="wait">
                {selectedProject ? (
                  <ProjectDetail
                    key={selectedProject.id}
                    project={selectedProject}
                    onBack={() => setSelectedProject(null)}
                  />
                ) : (
                  <ProjectList
                    key={`list-${activeDiscipline}`}
                    projects={projects}
                    onSelect={setSelectedProject}
                    setCursorState={setCursorState}
                    resetCursor={resetCursor}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Project List ──────────────────────────── */

function ProjectList({
  projects,
  onSelect,
  setCursorState,
  resetCursor,
}: {
  projects: Project[];
  onSelect: (p: Project) => void;
  setCursorState: (s: CursorState) => void;
  resetCursor: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25 } }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      {projects.map((proj) => (
        <div
          key={proj.id}
          className={styles.projectRow}
          onClick={() => onSelect(proj)}
          onMouseEnter={() => setCursorState("hover-project")}
          onMouseLeave={resetCursor}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onSelect(proj);
          }}
        >
          <div className={styles.thumb}>
            {proj.image ? (
              <img
                src={proj.image}
                alt={proj.name}
                className={styles.thumbImg}
              />
            ) : (
              `[ ${proj.name.slice(0, 8)} ]`
            )}
          </div>
          <div className={styles.projectInfo}>
            <p className={styles.projectName}>{proj.name}</p>
            <p className={styles.projectTags}>{proj.tags}</p>
          </div>
          <span className={styles.projectYear}>{proj.year}</span>
          <span className={styles.projectArrow}>→</span>
        </div>
      ))}
    </motion.div>
  );
}

/* ── Project Detail ────────────────────────── */

function ProjectDetail({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
    >
      <button className={styles.backBtn} onClick={onBack}>
        ← Back
      </button>

      <h2 className={styles.detailTitle}>{project.name}</h2>
      <p className={styles.detailMeta}>
        {project.tags} · {project.year}
      </p>

      <div className={styles.detailImage}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className={styles.detailImageFull}
          />
        ) : (
          `[ ${project.name} — Image TODO ]`
        )}
      </div>

      <p className={styles.detailDesc}>{project.description}</p>

      <div className={styles.detailGrid}>
        <div>
          <p className={styles.detailGridLabel}>Role</p>
          <p className={styles.detailGridValue}>{project.role}</p>
        </div>
        <div>
          <p className={styles.detailGridLabel}>Year</p>
          <p className={styles.detailGridValue}>{project.year}</p>
        </div>
        <div>
          <p className={styles.detailGridLabel}>Tools</p>
          <p className={styles.detailGridValue}>{project.tools}</p>
        </div>
      </div>

      <a
        href={project.behanceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.behanceBtn}
      >
        View on Behance ↗
      </a>
    </motion.div>
  );
}
