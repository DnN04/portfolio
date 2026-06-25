import { motion } from "framer-motion";
import { useRef } from "react";
import { JourneyTimeline } from "./JourneyTimeline";

export const AboutSection = () => {
  const aboutTexts = [
    "I'm a 2nd-year CSE undergrad specializing in AIML, focused on building practical, real-world AI-powered applications.",
    "I've built projects like a Fake News Detector using transformer models, DNCheckIt weather app, AmritKrishi, and a productivity-driven Todo app.",
    "My interests lie at the intersection of frontend engineering and artificial intelligence, where performance and usability meet intelligence.",
    "Outside coding, I focus on continuous learning, fitness, and disciplined self-improvement.",
  ];

  const skills = [
    "Java", "Python", "C",
    "Machine Learning", "Deep Learning", "NLP",
    "React", "TypeScript", "mySQL",
    "NumPy", "Pandas", "Scikit-Learn", "TensorFlow",
  ];

  return (
    <section id="about" style={{ position: "relative" }}>
      <div className="flex flex-col md:flex-row" style={{ alignItems: "flex-start" }}>

        {/* ═══════════════════════════════════════════════
            LEFT — sticky panel, stays pinned in viewport
            while the right (timeline) scrolls
            ═══════════════════════════════════════════════ */}
        <div
          className="hidden md:block flex-shrink-0"
          style={{
            position: "sticky",
            top: 0,
            width: "44%",
            height: "100vh",
            /* Left nav is ~70px wide, logo above. Give breathing room */
            paddingLeft: "clamp(4.5rem, 9vw, 8rem)",
            paddingRight: "2.5rem",
            paddingTop: "clamp(5rem, 10vh, 8rem)",
            paddingBottom: "clamp(2rem, 5vh, 4rem)",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {/* ── Heading ── */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.1, 0.1, 1] }}
            viewport={{ once: true }}
            className="font-serif mb-10"
            style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", lineHeight: 1.05 }}
          >
            About
          </motion.h2>

          {/* ── Bio paragraphs ── */}
          <div className="space-y-5 mb-12">
            {aboutTexts.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="font-sans leading-relaxed"
                style={{
                  fontSize: "clamp(0.875rem, 1.3vw, 1rem)",
                  color: "hsla(53, 53%, 84%, 0.65)",
                  maxWidth: "420px",
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* ── Tech stack — original pill chip design ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3
              className="font-sans text-xs tracking-widest uppercase mb-4"
              style={{ color: "hsla(53, 53%, 84%, 0.35)", letterSpacing: "0.22em" }}
            >
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.28, delay: i * 0.04 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08 }}
                  className="px-3 py-1.5 rounded-full text-xs font-sans cursor-default
                             transition-all duration-200 border"
                  style={{
                    borderColor: "hsla(53, 53%, 84%, 0.2)",
                    background: "hsla(53, 53%, 84%, 0.04)",
                    color: "hsla(53, 53%, 84%, 0.75)",
                    pointerEvents: "auto",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "hsl(53, 53%, 84%)";
                    el.style.color = "hsl(60, 4%, 9.8%)";
                    el.style.borderColor = "hsl(53, 53%, 84%)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "hsla(53, 53%, 84%, 0.04)";
                    el.style.color = "hsla(53, 53%, 84%, 0.75)";
                    el.style.borderColor = "hsla(53, 53%, 84%, 0.2)";
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════
            RIGHT — Timeline scrolls freely.
            paddingTop aligns its start with the Skills
            label on the left (roughly after heading + bio).
            ═══════════════════════════════════════════════ */}
        <div
          className="flex-1"
          style={{
            paddingTop: "clamp(5rem, 10vh, 8rem)",   /* same as left panel top */
            paddingBottom: "120px",
            paddingRight: "clamp(1.5rem, 5vw, 5rem)",
            paddingLeft: "clamp(1rem, 3vw, 2rem)",
          }}
        >
          {/* Mobile-only heading + bio + skills (left panel is hidden on mobile) */}
          <div className="md:hidden mb-12">
            <h2
              className="font-serif mb-8"
              style={{ fontSize: "clamp(2.5rem, 10vw, 4rem)" }}
            >
              About
            </h2>
            <div className="space-y-4 mb-8">
              {aboutTexts.map((text, i) => (
                <p
                  key={i}
                  className="font-sans text-base leading-relaxed"
                  style={{ color: "hsla(53, 53%, 84%, 0.65)" }}
                >
                  {text}
                </p>
              ))}
            </div>
            <h3 className="font-sans text-xs tracking-widest uppercase mb-4"
              style={{ color: "hsla(53, 53%, 84%, 0.35)" }}>
              Skills
            </h3>
            <div className="flex flex-wrap gap-2 mb-10">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-xs font-sans border"
                  style={{
                    borderColor: "hsla(53, 53%, 84%, 0.2)",
                    background: "hsla(53, 53%, 84%, 0.04)",
                    color: "hsla(53, 53%, 84%, 0.75)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Journey Timeline — the only thing that scrolls on desktop */}
          <JourneyTimeline />
        </div>
      </div>
    </section>
  );
};
