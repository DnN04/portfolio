import { motion } from "framer-motion";
import React, { useRef } from "react";

type Props = {
  onFinish?: () => void;
  duration?: number; // total duration in seconds
};

export const IntroCurtain: React.FC<Props> = ({ onFinish, duration = 0.9 }) => {
  const finishedRef = useRef(false);

  return (
    <motion.div
      className="fixed left-0 right-0 z-[50] pointer-events-none"
      style={{
        background: "hsl(var(--foreground))",
        height: "100vh",
        top: "-100vh",
        originY: 0.5,
      }}
      initial={{
        top: "-100vh",
        scaleY: 1,
      }}
      animate={{
        top: ["-100vh", "50vh", "75vh"],
        scaleY: [1, 1.5, 0.2],
      }}
      transition={{
        duration,
        times: [0, 0.5, 1],
        ease: [0.22, 0.1, 0.1, 1],
      }}
      onAnimationComplete={() => {
        if (!finishedRef.current) {
          finishedRef.current = true;
          onFinish?.();
        }
      }}
    />
  );
};

export default IntroCurtain;
