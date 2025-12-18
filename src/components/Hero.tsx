import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Github, Linkedin, Mail } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export const Hero = ({ hideNavText, introDelay = 0 }: { hideNavText?: boolean; introDelay?: number } = {}) => {
  const [scrollY, setScrollY] = useState(0);
  // no delay for text animations—they start immediately as curtain exits
  const baseDelay = 0;

  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const socialLinks = [
    { icon: Instagram, url: "https://instagram.com/yourusername", name: "Instagram" },
    { icon: Github, url: "https://github.com/yourusername", name: "GitHub" },
    { icon: Linkedin, url: "https://linkedin.com/in/yourusername", name: "LinkedIn" },
    { icon: Mail, url: "mailto:your@email.com", name: "Mail" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % socialLinks.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [socialLinks.length]);

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
        className="absolute left-4 md:left-6 bottom-4 md:bottom-6 max-w-xs"
      >
        <h1 className="font-sans text-xs md:text-sm font-medium tracking-wider mb-1">
          DURGESH NARAYAN NAYAK
        </h1>

        <p className="font-sans text-xs md:text-sm text-muted-foreground leading-tight">
          FRONTEND DEVELOPER - AI DEVELOPER 
          <br />
        </p>

        <p className="font-sans text-xs md:text-sm text-muted-foreground leading-tight mt-1">
          B.TECH CSE with AIML - 2nd Year
        </p>
      </motion.div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="absolute bottom-8 right-4 opacity-50 hover:opacity-100 transition-opacity duration-300 p-2 bg-background/50 rounded-full">
            <motion.div
              key={currentIconIndex}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {React.createElement(socialLinks[currentIconIndex].icon, { size: 24 })}
            </motion.div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background border border-border rounded-md p-2">
          {socialLinks.map((social, index) => (
            <DropdownMenuItem key={index} onClick={() => window.open(social.url, '_blank')} className="flex items-center gap-2 p-2 hover:bg-accent cursor-pointer">
              {React.createElement(social.icon, { size: 16 })}
              <span>{social.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};
 
