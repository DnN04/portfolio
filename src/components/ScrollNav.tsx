// Right-side scroll navigation dots with section labels
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const SECTIONS = [
  { id: "hero",         label: "Home" },
  { id: "about",        label: "About" },
  { id: "work",         label: "Work" },
  { id: "contact",      label: "Contact" },
];

export const ScrollNav = () => {
  const { activeSection, scrollTo } = useScrollSpy(SECTIONS.map(s => s.id));
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[9000] hidden md:flex flex-col items-center gap-3"
      style={{ pointerEvents: "auto" }}
    >
      {SECTIONS.map((section) => (
        <div
          key={section.id}
          className="relative flex items-center justify-end gap-3"
          onMouseEnter={() => setHoveredId(section.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Label tooltip */}
          <AnimatePresence>
            {hoveredId === section.id && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-sans tracking-widest uppercase text-foreground/70 whitespace-nowrap select-none"
              >
                {section.label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Dot */}
          <button
            aria-label={`Scroll to ${section.label}`}
            onClick={() => scrollTo(section.id)}
            className={`scroll-dot ${activeSection === section.id ? "active" : ""}`}
            style={{ cursor: "pointer" }}
          />
        </div>
      ))}
    </motion.div>
  );
};
