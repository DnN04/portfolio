import { motion } from "framer-motion";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, Github, Linkedin, Mail } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

// Static PhotoDisplay: renders photo exactly from public/profilePhotoPos.json (no editing UI)
function PhotoDisplay() {
  const [pos, setPos] = useState<{ left: number; top: number; width: number; height: number; locked?: boolean } | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await fetch('/profilePhotoPos.json', { cache: 'no-store' });
        if (!mounted) return;
        if (resp.ok) {
          const parsed = await resp.json();
          setPos({ left: parsed.left ?? 0, top: parsed.top ?? 0, width: parsed.width ?? 224, height: parsed.height ?? 190, locked: parsed.locked ?? true });
          return;
        }
      } catch {}
      try {
        const raw = localStorage.getItem('profilePhotoPos');
        if (raw) {
          const parsed = JSON.parse(raw);
          setPos({ left: parsed.left ?? 0, top: parsed.top ?? 0, width: parsed.width ?? 224, height: parsed.height ?? 190, locked: parsed.locked ?? true });
        }
      } catch {}
    })();
    return () => { mounted = false; };
  }, []);

  if (!pos) return null;

  return (
    <div
      style={{ position: 'absolute', left: pos.left, top: pos.top, width: pos.width, height: pos.height, zIndex: 60 }}
      className="rounded-full overflow-hidden shadow-2xl border border-background pointer-events-none flex items-center justify-center"
    >
      <img src="/photo.png" alt="My photo" style={{ width: 'auto', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
    </div>
  );
}

export const Hero = ({ hideNavText, introDelay = 0 }: { hideNavText?: boolean; introDelay?: number } = {}) => {
  const [scrollY, setScrollY] = useState(0);
  // no delay for text animations—they start immediately as curtain exits
  const baseDelay = 0;


  // Typing effect (SAFE)
const roles = ["Student", "Full Stack Developer", "AIML Practitioner"];
const [roleIndex, setRoleIndex] = useState(0);
const [typedText, setTypedText] = useState("");
const [isDeleting, setIsDeleting] = useState(false);

useEffect(() => {
  const current = roles[roleIndex];
  const speed = isDeleting ? 40 : 70;

  const timer = setTimeout(() => {
    if (!isDeleting) {
      setTypedText(current.substring(0, typedText.length + 1));
      if (typedText === current) {
        setTimeout(() => setIsDeleting(true), 1000);
      }
    } else {
      setTypedText(current.substring(0, typedText.length - 1));
      if (typedText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
  }, speed);

  return () => clearTimeout(timer);
}, [typedText, isDeleting, roleIndex]);


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

  const sectionRef = useRef<HTMLElement | null>(null);
  const helloRef = useRef<HTMLDivElement | null>(null);
  const [photoTopPx, setPhotoTopPx] = useState<number | null>(null);

  useLayoutEffect(() => {
    function updatePhotoPos() {
      if (!helloRef.current || !sectionRef.current) return;
      const helloRect = helloRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const center = helloRect.top - sectionRect.top + helloRect.height / 2;
      setPhotoTopPx(Math.round(center));
    }

    updatePhotoPos();
    window.addEventListener("resize", updatePhotoPos);
    window.addEventListener("scroll", updatePhotoPos, { passive: true });
    return () => {
      window.removeEventListener("resize", updatePhotoPos);
      window.removeEventListener("scroll", updatePhotoPos);
    };
  }, []);

  return (
    <section 
      
    ref={sectionRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle background gradient for visual grounding */}
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none" />

<div
  className="absolute bottom-0 left-0 right-0 h-[45%] pointer-events-none"
  style={{
    background:
      "radial-gradient(ellipse at bottom, rgba(255,255,255,0.06), transparent 60%)"
  }}
/>


{/* Subtle grain texture */}
<div
  className="absolute inset-0 pointer-events-none z-10 opacity-[0.06]"
  style={{
    backgroundImage: `
      repeating-radial-gradient(circle at 50% 50%,
        rgba(0,0,0,0.25) 0px,
        rgba(0,0,0,0.25) 1px,
        transparent 1px,
        transparent 3px
      )
    `
  }}
/>



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
        ref={helloRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 + baseDelay }}
        className="absolute z-50"
        style={{ left: '19%', top: '32%', transform: 'translateY(-50%)', fontFamily: "'Playlist Script Custom', cursive", fontSize: '84px', lineHeight: 1 }}
      >
        Hello...
      </motion.div>

      <div
  className="absolute left-[19%] top-[25%] w-24 h-px bg-border opacity-40"
  style={{ marginTop: '60px' }}
/>


      {/* About text below Hello (SAFE, no overlap) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 + baseDelay }}
        className="absolute z-40 text-left pointer-events-none"
        style={{
          left: '19%',
          top: '25%',
          marginTop: '120px', // pushes below Hello safely
        }}
      >
        {/* <h1 className="font-sans text-xl md:text-2xl font-medium">
          I am <span className="font-semibold">Durgesh</span>
        </h1>

        <p className="mt-1 font-sans text-sm md:text-base text-muted-foreground">
          <span className="text-foreground">{typedText}</span>
          <span className="ml-1 animate-pulse">|</span>
        </p> */}

          {/* <h1 className="font-sans text-xl md:text-2xl font-medium">
            I am <span className="font-semibold">Durgesh</span>
          </h1>

          <p className="mt-1 font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
          <span className="text-foreground">{typedText}</span>
          <span className="ml-1 animate-pulse">|</span>
  </p>

  <p className="mt-3 max-w-xs font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
    I build clean, interactive web experiences and explore the intersection of
    frontend engineering and artificial intelligence.
  </p> */}

  <h1 className="font-sans text-2xl md:text-3xl font-semibold tracking-tight">
  I am <span className="text-foreground">Durgesh</span>
</h1>

<p className="mt-2 font-sans text-base md:text-lg leading-snug">
  <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
    {typedText}
  </span>
  <span className="ml-1 animate-pulse text-muted-foreground">|</span>
</p>

<p className="mt-4 max-w-sm font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
  I design and build clean, interactive web experiences while exploring the
  intersection of frontend engineering and artificial intelligence.
</p>


      </motion.div>


      {/* Interactive PhotoEditor: draggable & resizable */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 + baseDelay }}
        className="absolute z-50 pointer-events-none"
        style={{ left: 0, top: 0 }}
      >
        <div className="pointer-events-auto">
          <PhotoDisplay />
        </div>
      </motion.div>

      {/* <motion.div
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
      </motion.div> */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* <button className="absolute bottom-8 right-4 opacity-50 hover:opacity-100 transition-opacity duration-300 p-2 bg-background/50 rounded-full"> */}
          {/* <button
              className="absolute z-40 opacity-60 hover:opacity-100 transition-opacity duration-300 p-2 bg-background/50 rounded-full"
              style={{
                left: '19%',
                top: '25%',
                marginTop: '150px', // sits below typing text
              }
          }
>

            <motion.div
              key={currentIconIndex}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {React.createElement(socialLinks[currentIconIndex].icon, { size: 24 })}
            </motion.div>
          </button> */}
          <button
            className="group absolute z-40 flex items-center gap-3 overflow-hidden
                      bg-background/60 backdrop-blur border border-border
                      rounded-full px-3 py-2 transition-all duration-300
                      w-10 hover:w-40"
            style={{
              left: '19%',
              top: '25%',
              marginTop: '295px',
            }}
          >
            <motion.div
              key={currentIconIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-center"
            >
              {React.createElement(socialLinks[currentIconIndex].icon, { size: 18 })}
            </motion.div>

            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {socialLinks.map((social, i) => (
                <social.icon key={i} size={16} />
              ))}
            </div>
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
 
