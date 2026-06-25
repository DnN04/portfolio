import { useRef, useCallback } from "react";

interface MagneticOptions {
  strength?: number; // 0–1, default 0.3
  maxDisplace?: number; // px, default 20
}

export function useMagneticHover({ strength = 0.3, maxDisplace = 20 }: MagneticOptions = {}) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      const clampedX = Math.max(-maxDisplace, Math.min(maxDisplace, dx));
      const clampedY = Math.max(-maxDisplace, Math.min(maxDisplace, dy));
      el.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
    },
    [strength, maxDisplace]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)";
    el.style.transform = "translate(0px, 0px)";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 400);
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
