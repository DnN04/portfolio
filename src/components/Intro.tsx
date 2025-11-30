import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const Intro = ({ onFinish }: { onFinish?: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // total duration should cover the staggered reveals + a short hold, then fade
    const total = 2200;
    const t = setTimeout(() => {
      setShow(false);
      onFinish?.();
    }, total);
    return () => clearTimeout(t);
  }, [onFinish]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background" style={{ WebkitBackfaceVisibility: "hidden" }}>
      <div className="text-center px-6">
        <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground">
          <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}>
            YOUR NAME
          </motion.span>
        </h1>

        <p className="mt-4 text-sm text-muted-foreground">
          <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}>
            Product Designer / Developer / Creative and Partner.
          </motion.span>
        </p>

        <div className="mt-8 space-y-4">
          {["WORK", "ABOUT", "CONTACT"].map((t, i) => (
            <div key={t} className="text-2xl md:text-3xl text-foreground/90">
              <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 + i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}>
                {t}
              </motion.span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Intro;
