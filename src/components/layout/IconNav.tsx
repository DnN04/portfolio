// components/layout/IconNav.tsx
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, User, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

interface IconNavProps {
  activePage?: string;
}

export const IconNav = ({ activePage }: IconNavProps) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { icon: Home, to: "/", label: "Home" },
    { icon: Briefcase, to: "/work", label: "Work" },
    { icon: User, to: "/about", label: "About" },
    { icon: Mail, to: "/contact", label: "Contact" },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    //   className="h-screen flex flex-col items-center py-8 bg-background/10 backdrop-blur-sm border-r border-border/20"
    className="h-screen flex flex-col items-center  py-8"
    >
      <nav className="flex flex-col gap-8 flex-grow justify-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          
          return (
            <div 
              key={item.label} 
              className="relative"
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                to={item.to}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-foreground/10 text-foreground' 
                    : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                }`}
              >
                <item.icon size={20} strokeWidth={1.5} />
                
                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-foreground"
                  />
                )}
              </Link>

              {/* Hover label */}
              <AnimatePresence>
                {hoveredItem === item.label && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-background border border-border rounded-md whitespace-nowrap z-50"
                  >
                    <span className="text-xs font-medium text-foreground">
                      {item.label}
                    </span>
                    {/* Arrow pointer */}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-l-0 border-r-[6px] border-y-transparent border-r-background"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Optional footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-auto text-foreground/40 text-xs -rotate-90 origin-center whitespace-nowrap"
      >
        © 2025
      </motion.div>
    </motion.aside>
  );
};