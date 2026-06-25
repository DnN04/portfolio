// pages/Index.tsx — Single-page scroll assembly
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { WorkSection } from "@/components/WorkSection";
import { ContactSection } from "@/components/ContactSection";
import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import IntroCurtain from "@/components/IntroCurtain";
import { motion } from "framer-motion";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <AppLayout navType="text">
      <main
        className={`${
          showIntro ? "filter blur-sm pointer-events-none" : "transition-all duration-700"
        }`}
      >
        {/* ── 1. Hero ── */}
        <div id="hero">
          <Hero hideNavText={true} introDelay={0} />
        </div>

        {/* Section divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="section-divider"
          style={{ transformOrigin: "left" }}
        />

        {/* ── 2. About ── */}
        <AboutSection />

        {/* Section divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="section-divider"
          style={{ transformOrigin: "left" }}
        />

        {/* ── 3. Work ── */}
        <WorkSection />

        {/* Section divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="section-divider"
          style={{ transformOrigin: "left" }}
        />

        {/* ── 4. Contact ── */}
        <ContactSection />
      </main>

      {/* Intro curtain */}
      {showIntro && (
        <IntroCurtain
          duration={0.9}
          onFinish={() => setTimeout(() => setShowIntro(false), 60)}
        />
      )}
    </AppLayout>
  );
};

export default Index;