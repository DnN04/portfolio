import { Hero } from "@/components/Hero";
import { Link } from "react-router-dom";
import { useState } from "react";
import IntroCurtain from "@/components/IntroCurtain";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const introDuration = 0.9; // matches IntroCurtain duration
  const unblurDuration = 0.5; // blur transition duration
  const totalAnimTime = 0; // text animations start immediately, no delay

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Top-left horizontal text nav for landing page only */}
      <div>
        {/* site logo (top-left) - moved down ~34px (top-[34px]) and shrink container height to 25px */}
        <a href="/" className="fixed top-[28.5px] left-4 z-50 w-auto h-[25px] opacity-90 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center" aria-label="Home">
          <img src="/logo.png" alt="Durgesh logo" className="h-full w-auto object-contain" />
        </a>

        {/* nav container: dim by default, light up on hover, aligned with hero text below */}
        <div className="fixed top-8 left-24 sm:left-28 md:left-32 z-50 group">
          <nav className="flex items-center gap-8 text-xs uppercase tracking-wider font-medium">
            <Link to="/work" className="text-foreground/60 transition-colors duration-200 group-hover:text-foreground hover:text-foreground">Work</Link>
            <Link to="/about" className="text-foreground/60 transition-colors duration-200 group-hover:text-foreground hover:text-foreground">About</Link>
            <Link to="/contact" className="text-foreground/60 transition-colors duration-200 group-hover:text-foreground hover:text-foreground">Contact</Link>
          </nav>
        </div>
      </div>

      {/* blur the content while the intro curtain is animating */}
      <main className={`${showIntro ? "filter blur-sm" : "transition-all duration-500"} px-6 md:px-12`}> 
        <Hero hideNavText introDelay={totalAnimTime} />
      </main>

      {showIntro && (
        <IntroCurtain
          duration={introDuration}
          onFinish={() => {
            // delay clearing a tiny bit so the blur transition looks smooth
            setTimeout(() => setShowIntro(false), 60);
          }}
        />
      )}
    </div>
  );
};

export default Index;
