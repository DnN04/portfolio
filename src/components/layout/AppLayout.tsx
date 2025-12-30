// components/layout/AppLayout.tsx - NAV BELOW LOGO
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Briefcase, User, Mail } from "lucide-react";
import { useState } from "react";

interface AppLayoutProps {
  children: ReactNode;
  navType?: "text" | "icons";
  showLogo?: boolean;
}

export const AppLayout = ({ 
  children, 
  navType = "text",
  showLogo = true
}: AppLayoutProps) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Text navigation for homepage (BELOW LOGO)
  const TextNavigation = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
        className="fixed left-5 top-[150px] pointer-events-auto"
      style={{ zIndex: 2147483647, pointerEvents: "auto" }} // Changed: top-[80px] = below logo
    >
      <div className="flex flex-col items-center gap-6">
        {/* Vertical line from logo to first item */}
        <div className="h-8 w-px bg-foreground/20 mb-2"></div>
        
        <Link 
          to="/work" 
          className="text-xs uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors duration-300 px-2 py-2"
          style={{ 
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          WORK
        </Link>
        
        <div className="h-px w-6 bg-foreground/20"></div>
        
        <Link 
          to="/about" 
          className="text-xs uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors duration-300 px-2 py-2"
          style={{ 
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          ABOUT
        </Link>
        
        <div className="h-px w-6 bg-foreground/20"></div>
        
        <Link 
          to="/contact" 
          className="text-xs uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors duration-300 px-2 py-2"
          style={{ 
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          CONTACT
        </Link>

                <div className="h-8 w-px bg-foreground/20 mb-2"></div>

      </div>
    </motion.div>
  );

  // Icon navigation for other pages (BELOW LOGO)
  const IconNavigation = () => {
    const navItems = [
      { icon: Home, to: "/", label: "Home" },
      { icon: Briefcase, to: "/work", label: "Work" },
      { icon: User, to: "/about", label: "About" },
      { icon: Mail, to: "/contact", label: "Contact" },
    ];

    return (
      <div 
          // className="fixed left-4 top-[80px] pointer-events-auto"
          className="fixed left-4 top-1/2 -translate-y-1/2 pointer-events-auto"

        style={{ zIndex: 2147483647, pointerEvents: "auto" }} // Same: below logo
      >
        <div className="flex flex-col items-center gap-6">
          {/* Vertical line from logo to first item */}
          <div className="h-8 w-px bg-foreground/20 mb-2"></div>
          
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
                      ? 'text-foreground' 
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                  style={{ pointerEvents: 'auto' }}
                >
                  <item.icon size={18} strokeWidth={1.5} />
                  
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
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-background border border-border rounded text-xs font-medium text-foreground whitespace-nowrap z-50 shadow-lg"
                  >
                    {item.label}
                  </motion.div>
                )}


              </div>
            );
          })}
          <div>
            <motion.a
  href="/Durgesh_CV.pdf"
  download

  className="text-[13px] tracking-widest text-foreground/60 hover:text-foreground transition-colors duration-300 mt-2"
  style={{
    writingMode: "horizontal-tb",
    textOrientation: "mixed",
  }}
>
  CV
</motion.a>

          </div>
                    {/* Vertical line from logo to first item */}
          <div className="h-8 w-px bg-foreground/20 mb-2"></div>
        </div>
      </div>
    );
  };

  return (
    // <div className="min-h-screen bg-background text-foreground relative">
    <div className="min-h-screen bg-background text-foreground relative isolate">

      {/* Logo */}
      {showLogo && (
        <a 
          href="/" 
          className="fixed top-[28.5px] left-4 h-[25px] opacity-90 hover:opacity-100 transition-opacity duration-200"
          style={{ zIndex: 2147483647, pointerEvents: 'auto' }}
        >
          <img src="/logo.png" alt="Logo" className="h-full w-auto" />
        </a>
      )}

      {/* Navigation - NOW BELOW LOGO */}
      {navType === 'text' ? <TextNavigation /> : <IconNavigation />}

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>
    </div>
  );
};