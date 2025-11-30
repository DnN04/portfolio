import { useEffect, useState } from "react";

export const Cursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      className="pointer-events-none fixed w-3 h-3 rounded-full bg-foreground/90 -translate-x-1/2 -translate-y-1/2 z-[9999]"
    />
  );
};

export default Cursor;
