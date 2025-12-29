// pages/Index.tsx
import { Hero } from "@/components/Hero";
import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import IntroCurtain from "@/components/IntroCurtain";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  
  return (
    <AppLayout navType="text">
      <main className={`${showIntro ? "filter blur-sm pointer-events-none" : "transition-all duration-500"}`}>
        {/* CRITICAL: Add hideNavText={true} to hide Hero's built-in nav */}
        <Hero hideNavText={true} introDelay={0} />
      </main>

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