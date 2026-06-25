// components/layout/AppLayout.tsx
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Briefcase, User, Mail } from "lucide-react";
import { useState } from "react";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import Cursor from "@/components/Cursor";

interface AppLayoutProps {
  children: ReactNode;
  navType?: "text" | "icons";
  showLogo?: boolean;
}

export const AppLayout = ({
  children,
  navType = "text",
  showLogo = true,
}: AppLayoutProps) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Check if we're on the home page (single-page scroll layout)
  const isHomePage = location.pathname === "/";

  const SECTIONS = [
    { id: "hero",    label: "HOME" },
    { id: "about",   label: "ABOUT" },
    { id: "work",    label: "WORK" },
    { id: "contact", label: "CONTACT" },
  ];
  
  const { activeSection } = useScrollSpy(SECTIONS.map(s => s.id));

  // Smooth scroll helper for home page sections
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  };

  // Text navigation for homepage — scroll to sections with active scroll-spy highlights
  const TextNavigation = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed left-5 top-[150px] pointer-events-auto"
      style={{ zIndex: 2147483647 }}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="h-8 w-px bg-foreground/15 mb-2" />

        {SECTIONS.map(({ label, id }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-[10px] uppercase tracking-widest transition-all duration-300 px-2 py-1.5 magnetic-btn flex flex-col items-center gap-1.5"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontFamily: "Inter, sans-serif",
                pointerEvents: "auto",
                cursor: "pointer",
                background: "none",
                border: "none",
                letterSpacing: "0.2em",
                color: isActive ? "hsl(53, 53%, 84%)" : "hsla(53, 53%, 84%, 0.4)",
                transform: isActive ? "scale(1.05)" : "scale(1)",
                fontWeight: isActive ? "600" : "normal",
              }}
            >
              {label}
              {isActive && (
                <motion.span
                  layoutId="activeDot"
                  className="w-1 h-1 rounded-full bg-foreground mt-1 animate-pulse"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ pointerEvents: "none" }}
                />
              )}
            </button>
          );
        })}

        {/* CV Download — integrated inside the vertical stack before the ending vertical dash */}
        <a
          href="/RESUME.pdf"
          download
          className="text-[10px] uppercase tracking-widest text-foreground/40 hover:text-foreground transition-all duration-300 px-2 py-1.5 mt-1 magnetic-btn"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.2em",
            pointerEvents: "auto",
            cursor: "pointer",
          }}
        >
          CV
        </a>

        <div className="h-8 w-px bg-foreground/15 mt-2" />
      </div>
    </motion.div>
  );

  // Icon navigation for inner pages (fallback)
  const IconNavigation = () => {
    const navItems = [
      { icon: Home,      to: "/",        label: "Home" },
      { icon: Briefcase, to: "/work",    label: "Work" },
      { icon: User,      to: "/about",   label: "About" },
      { icon: Mail,      to: "/contact", label: "Contact" },
    ];

    return (
      <div
        className="fixed left-4 top-1/2 -translate-y-1/2 pointer-events-auto"
        style={{ zIndex: 2147483647 }}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="h-8 w-px bg-foreground/15 mb-2" />

          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={item.to}
                  className={`flex items-center justify-center w-8 h-8 transition-all duration-300 ${
                    isActive
                      ? "text-foreground"
                      : "text-foreground/50 hover:text-foreground"
                  }`}
                  style={{ pointerEvents: "auto" }}
                >
                  <item.icon size={17} strokeWidth={1.5} />
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-foreground"
                    />
                  )}
                </Link>

                {hoveredItem === item.label && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded text-xs font-medium text-foreground whitespace-nowrap z-50 shadow-lg"
                    style={{
                      background: "hsla(60, 4%, 12%, 0.95)",
                      border: "1px solid hsla(53, 53%, 84%, 0.12)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </div>
            );
          })}

          {/* CV link */}
          <motion.a
            href="/RESUME.pdf"
            download
            whileHover={{ scale: 1.1 }}
            className="font-sans text-[11px] tracking-widest text-foreground/50 hover:text-foreground transition-colors mt-2"
            style={{ writingMode: "horizontal-tb" }}
          >
            CV
          </motion.a>

          <div className="h-8 w-px bg-foreground/15 mt-2" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative isolate pb-16 md:pb-0">
      {/* ── Global ambient effects ── */}
      <BackgroundEffects />

      {/* ── Custom cursor (desktop only) ── */}
      <Cursor />

      {/* ── Logo ── */}
      {showLogo && (
        <a
          href="/"
          className="fixed top-7 left-4 h-[24px] opacity-80 hover:opacity-100 transition-opacity duration-300 hidden md:block"
          style={{ zIndex: 2147483647, pointerEvents: "auto" }}
        >
          <img src="/logo.png" alt="Logo" className="h-full w-auto" />
        </a>
      )}

      {/* ── Left navigation ── */}
      <div className="hidden md:block">
        {navType === "text" ? <TextNavigation /> : <IconNavigation />}
      </div>

      {/* Right scroll indicator dots removed to create a clean, non-redundant left-focused design */}

      {/* ── Main content ── */}
      <main className="relative" style={{ zIndex: 10 }}>
        {children}
      </main>

      {/* ── Mobile bottom nav with sliding scroll-spy active indicator ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex justify-around py-3.5"
        style={{
          background: "hsla(60, 4%, 9.8%, 0.92)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid hsla(53, 53%, 84%, 0.08)",
        }}
      >
        {isHomePage ? (
          <>
            {[
              { label: "Home",    id: "hero" },
              { label: "About",   id: "about" },
              { label: "Work",    id: "work" },
              { label: "Contact", id: "contact" },
            ].map(({ label, id }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="font-sans text-xs transition-all duration-300 px-3 py-1 flex flex-col items-center gap-1"
                  style={{
                    color: isActive ? "hsl(53, 53%, 84%)" : "hsla(53, 53%, 84%, 0.4)",
                    fontWeight: isActive ? "600" : "normal",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveDot"
                      className="w-1 h-1 rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </>
        ) : (
          <>
            <Link to="/"         className="font-sans text-xs text-foreground/60 hover:text-foreground transition-colors">Home</Link>
            <Link to="/work"     className="font-sans text-xs text-foreground/60 hover:text-foreground transition-colors">Work</Link>
            <Link to="/about"    className="font-sans text-xs text-foreground/60 hover:text-foreground transition-colors">About</Link>
            <Link to="/contact"  className="font-sans text-xs text-foreground/60 hover:text-foreground transition-colors">Contact</Link>
          </>
        )}
      </div>
    </div>
  );
};