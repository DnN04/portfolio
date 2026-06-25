import { useEffect, useState, useCallback } from "react";

export function useScrollSpy(sectionIds: string[], offset = 0) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "");

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + offset + window.innerHeight * 0.3;
    let current = sectionIds[0];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.offsetTop <= scrollY) {
        current = id;
      }
    }

    if (current !== activeSection) {
      setActiveSection(current);
      // Silently update hash without scroll jump
      history.replaceState(null, "", `#${current}`);
    }
  }, [sectionIds, offset, activeSection]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return { activeSection, scrollTo };
}
