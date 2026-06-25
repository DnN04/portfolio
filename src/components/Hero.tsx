// import { motion } from "framer-motion";
// import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
// import { Link } from "react-router-dom";
// import { Instagram, Github, Linkedin, Mail } from "lucide-react";
// // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

// // Static PhotoDisplay: renders photo exactly from public/profilePhotoPos.json (no editing UI)


// function PhotoDisplay() {
//   const [pos, setPos] = useState<{ left: number; top: number; width: number; height: number; locked?: boolean } | null>(null);

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         const resp = await fetch('/profilePhotoPos.json', { cache: 'no-store' });
//         if (!mounted) return;
//         if (resp.ok) {
//           const parsed = await resp.json();
//           setPos({ left: parsed.left ?? 0, top: parsed.top ?? 0, width: parsed.width ?? 224, height: parsed.height ?? 190, locked: false });
//           return;
//         }
//       } catch {}
//       try {
//         const raw = localStorage.getItem('profilePhotoPos');
//         if (raw) {
//           const parsed = JSON.parse(raw);
//           setPos({ left: parsed.left ?? 0, top: parsed.top ?? 0, width: parsed.width ?? 224, height: parsed.height ?? 190, locked: false });
//         }
//       } catch {}
//     })();
//     return () => { mounted = false; };
//   }, []);

//   if (!pos) return null;

//   return (
//     <div
//       style={{ position: 'absolute', left: pos.left , top: pos.top, width: pos.width, height: pos.height, zIndex: 60 }}
//       className="rounded-full overflow-hidden shadow-2xl border border-background pointer-events-none flex items-center justify-center"
//     >
//       <img src="/photo.png" alt="My photo" style={{ width: 'auto', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
//     </div>
//   );
// }

// export const Hero = ({ hideNavText, introDelay = 0 }: { hideNavText?: boolean; introDelay?: number } = {}) => {
//   // const [currentIconIndex, setCurrentIconIndex] = useState(0);
//   // const [isHovered, setIsHovered] = useState(false);

//   const [scrollY, setScrollY] = useState(0);
//   // no delay for text animations—they start immediately as curtain exits
//   const baseDelay = 0;


//   // Typing effect (SAFE)
// const roles = ["Student", "Full Stack Developer", "AIML Practitioner"];
// const [roleIndex, setRoleIndex] = useState(0);
// const [typedText, setTypedText] = useState("");
// const [isDeleting, setIsDeleting] = useState(false);
// const [showOverlay, setShowOverlay] = useState(false);


// useEffect(() => {
//   const current = roles[roleIndex];
//   const speed = isDeleting ? 40 : 70;

//   const timer = setTimeout(() => {
//     if (!isDeleting) {
//       setTypedText(current.substring(0, typedText.length + 1));
//       if (typedText === current) {
//         setTimeout(() => setIsDeleting(true), 1000);
//       }
//     } else {
//       setTypedText(current.substring(0, typedText.length - 1));
//       if (typedText === "") {
//         setIsDeleting(false);
//         setRoleIndex((prev) => (prev + 1) % roles.length);
//       }
//     }
//   }, speed);

//   return () => clearTimeout(timer);
// }, [typedText, isDeleting, roleIndex]);


// //   // const [currentIconIndex, setCurrentIconIndex] = useState(0);
// //   const socialLinks = [
// //     { icon: Instagram, url: "https://instagram.com/yourusername", name: "Instagram" },
// //     { icon: Github, url: "https://github.com/yourusername", name: "GitHub" },
// //     { icon: Linkedin, url: "https://linkedin.com/in/yourusername", name: "LinkedIn" },
// //     { icon: Mail, url: "mailto:your@email.com", name: "Mail" },
// //   ];

// // useEffect(() => {
// //   if (isHovered) return;

// //   const interval = setInterval(() => {
// //     setCurrentIconIndex((prev) => (prev + 1) % socialLinks.length);
// //   }, 1800);

// //   return () => clearInterval(interval);
// // }, [isHovered]);

// const [currentIconIndex, setCurrentIconIndex] = useState(0);
// const [isHovered, setIsHovered] = useState(false);

// const socialLinks = [
//     { icon: Mail, href: "mailto:dnofficial200@gmail.com", name: "Email" },
//     { icon: Linkedin, href: "https://www.linkedin.com/in/durgesh-narayan-nayak-82098a353/", name: "LinkedIn" },
//     { icon: Instagram, href: "https://www.instagram.com/dn.o4_/", name: "Instagram" },
//     { icon: Github, href: "https://github.com/DnN04", name: "GitHub" },
// ];

// useEffect(() => {
//   if (isHovered) return;

//   const interval = setInterval(() => {
//     setCurrentIconIndex((prev) => (prev + 1) % socialLinks.length);
//   }, 1600);

//   return () => clearInterval(interval);
// }, [isHovered, socialLinks.length]);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     setCurrentIconIndex((prev) => (prev + 1) % socialLinks.length);
//   //   }, 2000);
//   //   return () => clearInterval(interval);
//   // }, [socialLinks.length]);

//   const navItems = [
//     { text: "WORK", to: "/work" },
//     { text: "ABOUT", to: "/about" },
//     { text: "CONTACT", to: "/contact" },
//   ];

//   const sectionRef = useRef<HTMLElement | null>(null);
//   const helloRef = useRef<HTMLDivElement | null>(null);
//   const [photoTopPx, setPhotoTopPx] = useState<number | null>(null);

//   useLayoutEffect(() => {
//     function updatePhotoPos() {
//       if (!helloRef.current || !sectionRef.current) return;
//       const helloRect = helloRef.current.getBoundingClientRect();
//       const sectionRect = sectionRef.current.getBoundingClientRect();
//       const center = helloRect.top - sectionRect.top + helloRect.height / 2;
//       setPhotoTopPx(Math.round(center));
//     }

//     updatePhotoPos();
//     window.addEventListener("resize", updatePhotoPos);
//     window.addEventListener("scroll", updatePhotoPos, { passive: true });
//     return () => {
//       window.removeEventListener("resize", updatePhotoPos);
//       window.removeEventListener("scroll", updatePhotoPos);
//     };
//   }, []);

//   return (
//     <section 
      
//     // ref={sectionRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
//     // <section
//   ref={sectionRef}
//   className="min-h-screen flex items-center justify-center relative overflow-hidden pointer-events-none z-0"
// >
//      {/* Reference Overlay (DEV ONLY) */}
// {showOverlay && (
//   <div className="absolute inset-0 z-[999] pointer-events-none">
//     <img
//       src="/reference.png"
//       alt="Reference overlay"
//       className="w-full h-full object-cover opacity-30"
//     />
//   </div>
// )}

     
     
//       {/* Subtle background gradient for visual grounding */}
// <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none" />

// <div
//   className="absolute bottom-0 left-0 right-0 h-[45%] pointer-events-none"
//   style={{
//     background:
//       "radial-gradient(ellipse at bottom, rgba(255,255,255,0.06), transparent 60%)"
//   }}
// />


// {/* Subtle grain texture */}
// <div
//   className="absolute inset-0 pointer-events-none z-10 opacity-[0.06]"
//   style={{
//     backgroundImage: `
//       repeating-radial-gradient(circle at 50% 50%,
//         rgba(0,0,0,0.25) 0px,
//         rgba(0,0,0,0.25) 1px,
//         transparent 1px,
//         transparent 3px
//       )
//     `
//   }}
// />



//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.2, ease: "easeOut", delay: baseDelay }}
//         className="absolute left-[5%] top-[20%]"
//         style={{
//           transform: `translateY(${scrollY * 0.3}px)`,
//         }}
//       >
//         {!hideNavText && (
//           // <div className="space-y-4 md:space-y-8">
//           <div className="space-y-6 md:space-y-12 lg:space-y-16">

//             {navItems.map((item, index) => {
//               const isHash = item.to && item.to.startsWith("#");

//               if (isHash) {
//                 return (
//                   <motion.a
//                     key={item.text}
//                     href={item.to}
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: baseDelay + index * 0.15, ease: "easeOut" }}
//                     className="block font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tight hover:opacity-70 transition-opacity duration-500"
//                   >
//                     {item.text}
//                   </motion.a>
//                 );
//               }

//               return (
//                 <Link key={item.text} to={item.to} className="block">
//                   <motion.span
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: baseDelay + index * 0.12, ease: "easeOut" }}
//                     className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tight hover:opacity-70 transition-opacity duration-500"
//                   >
//                     {item.text}
//                   </motion.span>
//                 </Link>
//               );
//             })}
//           </div>
//         )}

//       </motion.div>

//       {/* Hello element positioned separately so you can adjust placement easily ..*/}
//       <motion.div
//         id="hello"
//         ref={helloRef}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6, delay: 0.4 + baseDelay }}
//         className="absolute z-50"
//         // style={{ left: '19%', top: '32%', transform: 'translateY(-50%)', fontFamily: "'Playlist Script Custom', cursive", fontSize: '84px', lineHeight: 1 }}
//         style={{
//   left: '15%',
//   top: '28%',
//   transform: 'translateY(-50%)',
//   fontFamily: "'Playlist Script Custom', cursive",
//   fontSize: '140px',
//   letterSpacing: '0.5px',
//   lineHeight: 1,
// }}

//       >
//         Hello...
//       </motion.div>

//       <div
//   className="absolute left-[15%] top-[25%] w-24 h-px bg-border opacity-40"
//   style={{ marginTop: '60px' }}
// />


//       {/* About text below Hello (SAFE, no overlap) */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.55 + baseDelay }}
//         className="absolute z-40 text-left pointer-events-none"
//         style={{
//           left: '15%',
//           top: '24%',
//           marginTop: '120px', // pushes below Hello safely
//         }}
//       >
//         {/* <h1 className="font-sans text-xl md:text-2xl font-medium">
//           I am <span className="font-semibold">Durgesh</span>
//         </h1>

//         <p className="mt-1 font-sans text-sm md:text-base text-muted-foreground">
//           <span className="text-foreground">{typedText}</span>
//           <span className="ml-1 animate-pulse">|</span>
//         </p> */}

//           {/* <h1 className="font-sans text-xl md:text-2xl font-medium">
//             I am <span className="font-semibold">Durgesh</span>
//           </h1>

//           <p className="mt-1 font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
//           <span className="text-foreground">{typedText}</span>
//           <span className="ml-1 animate-pulse">|</span>
//   </p>

//   <p className="mt-3 max-w-xs font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
//     I build clean, interactive web experiences and explore the intersection of
//     frontend engineering and artificial intelligence.
//   </p> */}

//   {/* <h1 className="font-sans text-2xl md:text-3xl font-semibold tracking-tight"> */}
//   {/* <h1 className="font-sans text-3xl md:text-4xl font-semibold tracking-tight leading-tight"> */}
//   <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">

//   {/* I am <span className="text-foreground">Durgesh</span> */}
//   I’m <span className="text-foreground">Durgesh</span>

// </h1>

// {/* <p className="mt-2 font-sans text-base md:text-lg leading-snug"> */}
// <p className="mt-3 font-sans text-xl md:text-xl leading-snug">

//   <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
//     {typedText}
//   </span>
//   <span className="ml-1 animate-pulse text-muted-foreground">|</span>
// </p>

// {/* <p className="mt-4 max-w-sm font-sans text-sm md:text-base text-muted-foreground leading-relaxed"> */}
// <p className="mt-4 max-w-xl font-sans text-lg md:text-xl text-muted-foreground leading-relaxed">

//   I design and build clean, interactive web experiences while exploring the
//   intersection of frontend engineering and artificial intelligence.
// </p>
// <p className="mt-3 font-sans text-l text-muted-foreground italic">
//   Turning coffee into code.
// </p>

// {/* Resume CTA */}
// <motion.div
//   initial={{ opacity: 0, y: 8 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.4, delay: 0.9 }}
//   className="mt-3 flex items-center gap-2 pointer-events-auto"
// >
//   <a
//     href="/RESUME.pdf"
//     // target="_blank"
//     // rel="noopener noreferrer"
//     download
//     className="px-4 py-2 rounded-full
//                border border-foreground/30
//                font-sans text-sm
//                hover:bg-foreground hover:text-background
//                transition-colors"
//   >
//     Download Resume
//   </a>

//   {/* <a
//     href="/resume.pdf"
//     download
//     className="text-sm font-sans text-muted-foreground
//                hover:text-foreground transition-colors"
//   >
    
//   </a> */}
// </motion.div>




//       </motion.div>


//       {/* Interactive PhotoEditor: draggable & resizable */}
//       <motion.div
//         initial={{ opacity: 0, x: 10 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6, delay: 0.6 + baseDelay }}
//         className="absolute z-50 pointer-events-none"
//         style={{ left: 60, top: 0 }}
//       >
//         <div className="pointer-events-auto">
//           <PhotoDisplay />
//         </div>
//       </motion.div>

      
//       {/* <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8, delay: 0.4 + baseDelay }}
//         className="absolute left-4 md:left-6 bottom-4 md:bottom-6 max-w-xs"
//       >
//         <h1 className="font-sans text-xs md:text-sm font-medium tracking-wider mb-1">
//           DURGESH NARAYAN NAYAK
//         </h1>

//         <p className="font-sans text-xs md:text-sm text-muted-foreground leading-tight">
//           FRONTEND DEVELOPER - AI DEVELOPER 
//           <br />
//         </p>

//         <p className="font-sans text-xs md:text-sm text-muted-foreground leading-tight mt-1">
//           B.TECH CSE with AIML - 2nd Year
//         </p>
//       </motion.div> */}

  

// <div
//   onMouseEnter={() => setIsHovered(true)}
//   onMouseLeave={() => setIsHovered(false)}
//   className="absolute z-40 pointer-events-auto flex items-center overflow-hidden
//              bg-background/60 backdrop-blur border border-border
//              rounded-full px-3 py-2
//              transition-all duration-300"
//   style={{
//     left: "26%",
//     top: "25%",
//     marginTop: "350px",
//     width: isHovered ? "170px" : "40px",
//   }}
// >
//   {/* Left: rotating icon OR @ */}
//   <div className="flex items-center justify-center shrink-0 w-4">
//     {!isHovered ? (
//       <motion.div
//         key={currentIconIndex}
//         initial={{ opacity: 0, y: 6 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.25 }}
//       >
//         {React.createElement(
//           socialLinks[currentIconIndex].icon,
//           { size: 16 }
//         )}
//       </motion.div>
//     ) : (
//       <motion.span
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="text-sm font-medium"
//       >
//         @
//       </motion.span>
//     )}
//   </div>
//   {/* Right: icons appear ONLY on hover */}
//   <div
//     className="flex items-center gap-4 ml-4 transition-opacity duration-300"
//     style={{
//       opacity: isHovered ? 1 : 0,
//       pointerEvents: isHovered ? "auto" : "none",
//     }}
//   >
//     {socialLinks.map((social, i) => (
//       <a
//         key={i}
//         href={social.href}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-muted-foreground hover:text-foreground transition-colors"
//         aria-label={social.name}
//       >
//         <social.icon size={16} />
//       </a>
//     ))}
//   </div>
// </div>

// {/* <button
//   onClick={() => setShowOverlay((p) => !p)}
//   className="fixed bottom-4 right-4 z-[1000]
//              bg-background border border-border
//              px-3 py-1 rounded text-xs"
// >
//   Overlay {showOverlay ? "ON" : "OFF"}
// </button> */}

// {/* <div
//   className="absolute inset-0 z-[998] pointer-events-none opacity-20"
//   style={{
//     backgroundImage:
//       "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
//     backgroundSize: "40px 40px"
//   }}
// /> */}


//     </section>
//   );
// };
 


import { motion } from "framer-motion";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, Github, Linkedin, Mail, Menu, X } from "lucide-react";

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
          setPos({ left: parsed.left ?? 0, top: parsed.top ?? 0, width: parsed.width ?? 224, height: parsed.height ?? 190, locked: false });
          return;
        }
      } catch {}
      try {
        const raw = localStorage.getItem('profilePhotoPos');
        if (raw) {
          const parsed = JSON.parse(raw);
          setPos({ left: parsed.left ?? 0, top: parsed.top ?? 0, width: parsed.width ?? 224, height: parsed.height ?? 190, locked: false });
        }
      } catch {}
    })();
    return () => { mounted = false; };
  }, []);

  if (!pos) return null;

  return (
    <div
      style={{ 
        position: 'absolute', 
        left: pos.left, 
        top: pos.top, 
        width: pos.width, 
        height: pos.height, 
        zIndex: 60 
      }}
      className="rounded-full overflow-hidden shadow-2xl border border-background pointer-events-none flex items-center justify-center md:scale-100 scale-[0.7] md:translate-x-0 md:translate-y-0 -translate-x-4 translate-y-4"
    >
      <img 
        src="/photo.png" 
        alt="My photo" 
        className="w-auto h-full object-cover object-center" 
      />
    </div>
  );
}

export const Hero = ({ hideNavText, introDelay = 0 }: { hideNavText?: boolean; introDelay?: number } = {}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const baseDelay = 0;

  const roles = ["Student", "Full Stack Developer", "AIML Practitioner"];
  const socialLinks = [
    { icon: Mail, href: "mailto:dnofficial200@gmail.com", name: "Email" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/durgesh-narayan-nayak-82098a353/", name: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/dn.o4_/", name: "Instagram" },
    { icon: Github, href: "https://github.com/DnN04", name: "GitHub" },
  ];

  const navItems = [
    { text: "WORK", to: "/work" },
    { text: "ABOUT", to: "/about" },
    { text: "CONTACT", to: "/contact" },
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Typing effect
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

  // Social icon rotation
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % socialLinks.length);
    }, 1600);

    return () => clearInterval(interval);
  }, [isHovered, socialLinks.length]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pointer-events-none z-0 px-4 sm:px-6 md:px-0"
    >
      {/* Mobile Menu Button */}
      {!hideNavText && isMobile && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-6 right-6 z-50 pointer-events-auto bg-background/80 backdrop-blur-sm border border-border rounded-full p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Reference Overlay (DEV ONLY) */}
      {showOverlay && (
        <div className="absolute inset-0 z-[999] pointer-events-none">
          <img
            src="/reference.png"
            alt="Reference overlay"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      )}

      {/* Subtle background gradient */}
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

      {/* Navigation Items - Desktop (UNCHANGED) */}
      {!hideNavText && !isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: baseDelay }}
          className="absolute left-[5%] top-[20%]"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="space-y-6 md:space-y-12 lg:space-y-16">
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
        </motion.div>
      )}

      {/* Navigation Items - Mobile Menu */}
      {!hideNavText && isMobile && isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pointer-events-auto flex flex-col items-center justify-center"
        >
          <div className="space-y-8 text-center">
            {navItems.map((item) => (
              <Link
                key={item.text}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
              >
                <span className="font-serif text-4xl font-light tracking-tight hover:opacity-70 transition-opacity duration-300">
                  {item.text}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Hello element - Responsive adjustments only for mobile */}
      <motion.div
        id="hello"
        ref={helloRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 + baseDelay }}
        className="absolute z-50"
        style={{
          left: isMobile ? '8%' : '15%',
          top: isMobile ? '15%' : '28%',
          transform: 'translateY(-50%)',
          fontFamily: "'Playlist Script Custom', cursive",
          fontSize: isMobile ? '80px' : '140px',
          letterSpacing: '0.5px',
          lineHeight: 1,
        }}
      >
        Hello...
      </motion.div>

      {/* Horizontal line - Responsive adjustments only for mobile */}
      <div
        className="absolute left-[15%] top-[25%] w-24 h-px bg-border opacity-40"
        style={{ 
          marginTop: isMobile ? '50px' : '60px',
          left: isMobile ? '8%' : '15%',
          width: isMobile ? '60px' : '96px'
        }}
      />

      {/* About text below Hello - Responsive adjustments only for mobile */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 + baseDelay }}
        className="absolute z-40 text-left pointer-events-none"
        style={{
          left: isMobile ? '8%' : '15%',
          top: isMobile ? '28%' : '24%',
          marginTop: isMobile ? '100px' : '120px',
        }}
      >
        <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
          I'm <span className="text-foreground">Durgesh</span>
        </h1>

        <p className="mt-3 font-sans text-xl md:text-xl leading-snug">
          <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {typedText}
          </span>
          <span className="ml-1 animate-pulse text-muted-foreground">|</span>
        </p>

        <p className="mt-4 max-w-xl font-sans text-lg md:text-xl text-muted-foreground leading-relaxed">
          I design and build clean, interactive web experiences while exploring the
          intersection of frontend engineering and artificial intelligence.
        </p>
        <p className="mt-3 font-sans text-l text-muted-foreground italic">
          Turning coffee into code.
        </p>

        {/* Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="mt-3 flex items-center gap-2 pointer-events-auto"
        >
          <a
            href="/RESUME.pdf"
            download
            className="px-4 py-2 rounded-full border border-foreground/30 font-sans text-sm hover:bg-foreground hover:text-background transition-colors"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>

      {/* Photo Display - Desktop position UNCHANGED, mobile adjustments */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 + baseDelay }}
        className="absolute z-50 pointer-events-none"
        style={{ 
          left: 60, 
          top: 0,
          // Desktop position unchanged, mobile will use CSS transforms
        }}
      >
        <div className="pointer-events-auto">
          <PhotoDisplay />
        </div>
      </motion.div>

      {/* Social Links - Desktop position UNCHANGED, mobile adjustments */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute z-40 pointer-events-auto flex items-center overflow-hidden
                   bg-background/60 backdrop-blur border border-border
                   rounded-full px-3 py-2
                   transition-all duration-300"
        style={{
          left: isMobile ? '8%' : "26%",
          top: isMobile ? 'auto' : "25%",
          bottom: isMobile ? '10%' : "auto",
          marginTop: isMobile ? 0 : "350px",
          width: isHovered ? (isMobile ? "140px" : "170px") : "40px",
        }}
      >
        {/* Left: rotating icon OR @ */}
        <div className="flex items-center justify-center shrink-0 w-4">
          {!isHovered ? (
            <motion.div
              key={currentIconIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {React.createElement(
                socialLinks[currentIconIndex].icon,
                { size: 16 }
              )}
            </motion.div>
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-medium"
            >
              @
            </motion.span>
          )}
        </div>
        {/* Right: icons appear ONLY on hover */}
        <div
          className="flex items-center gap-4 ml-4 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            pointerEvents: isHovered ? "auto" : "none",
          }}
        >
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={social.name}
            >
              <social.icon size={16} />
            </a>
          ))}
        </div>
      </div>

      {/* Overlay toggle button for dev */}
    </section>
  );
};