"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteInfo } from "@/data/content";
import styles from "./CVModal.module.css";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CVModal({ isOpen, onClose }: CVModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { duration: 0.35, ease: [0.0, 0.0, 0.2, 1] },
            }}
            exit={{
              scale: 0.95,
              opacity: 0,
              transition: { duration: 0.25 },
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.topBar}>
              <span className={styles.topBarTitle}>
                {siteInfo.name} — CV
              </span>
              <div className={styles.topBarActions}>
                <a
                  href={siteInfo.cvPath}
                  download
                  className={styles.topBarBtn}
                >
                  ↓ Download
                </a>
                <button
                  className={styles.topBarBtn}
                  onClick={onClose}
                >
                  ✕ Close
                </button>
              </div>
            </div>
            <div className={styles.iframeWrapper}>
              <iframe
                src={siteInfo.cvPath}
                className={styles.iframe}
                title="Elene Luashvili CV"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
