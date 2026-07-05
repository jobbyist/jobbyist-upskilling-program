"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Full-screen loading overlay shown for a brief moment on first
 * mount, then fades out. Respects prefers-reduced-motion by
 * skipping straight to hidden.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduceMotion ? 0 : 900;
    const timer = setTimeout(() => setVisible(false), delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-charcoal"
          aria-hidden="true"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <span className="font-heading font-extrabold text-3xl tracking-tight text-ink">
              JOBBY<span className="text-electric-soft">IST</span>
            </span>
            <div className="h-[2px] w-32 overflow-hidden rounded-full bg-charcoal-line">
              <motion.div
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-electric to-electric-soft"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
