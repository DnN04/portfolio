import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Hero = ({ hideNavText, introDelay = 0 }: { hideNavText?: boolean; introDelay?: number } = {}) => {
  const [scrollY, setScrollY] = useState(0);
  // no delay for text animations—they start immediately as curtain exits
  const baseDelay = 0;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { text: "WORK", to: "/work" },
    { text: "ABOUT", to: "/about" },
    { text: "CONTACT", to: "/contact" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: baseDelay }}
        className="text-center"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {!hideNavText && (
          <div className="space-y-4 md:space-y-8">
            {navItems.map((item, index) => {
              const isHash = item.to && item.to.startsWith("#");

              if (isHash) {
                return (
                  <motion.a
                    key={item.text}
                    href={item.to}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: baseDelay + index * 0.15, ease: "easeOut" }}
                    className="block font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tight hover:opacity-70 transition-opacity duration-500"
                  >
                    {item.text}
                  </motion.a>
                );
              }

              return (
                <Link key={item.text} to={item.to} className="block">
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: baseDelay + index * 0.12, ease: "easeOut" }}
                    className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tight hover:opacity-70 transition-opacity duration-500"
                  >
                    {item.text}
                  </motion.span>
                </Link>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Hello element positioned separately so you can adjust placement easily ..*/}
      <motion.div
        id="hello"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 + baseDelay }}
        className="absolute z-50"
        style={{ left: '29%', top: '45%', transform: 'translateY(-50%)', fontFamily: "'Playlist Script Custom', cursive", fontSize: '84px', lineHeight: 1 }}
      >
        Hello
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 + baseDelay }}
        className="absolute left-20 md:left-32 bottom-32 md:bottom-40 max-w-xs"
      >
        <h1 className="font-sans text-xs md:text-sm font-medium tracking-wider mb-3">
          DURGESH NARAYAN NAYAK
        </h1>

        <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
          FRONTEND DEVELOPER - AI DEVELOPER 
          <br />
        </p>

        <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed mt-4">
          B.TECH CSE with AIML - 2nd Year
        </p>
      </motion.div>
    </section>
  );
};
 
