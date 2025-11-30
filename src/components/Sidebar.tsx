import { motion } from "framer-motion";
import { Home, Briefcase, User, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();
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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 top-0 h-screen w-16 md:w-20 flex flex-col items-center py-8 z-50"
    >
      <nav className="flex flex-col gap-8">
        {navItems.map((item, index) => (
          <div key={item.label}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-foreground hover:text-foreground/70 transition-colors duration-300 cursor-pointer"
              aria-label={item.label}
              role="link"
              tabIndex={0}
              onClick={() => {
                if (item.to && item.to.startsWith("#")) {
                  window.location.hash = item.to;
                } else if (item.to) {
                  navigate(item.to);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  if (item.to && item.to.startsWith("#")) {
                    window.location.hash = item.to;
                  } else if (item.to) {
                    navigate(item.to);
                  }
                }
              }}
            >
              <item.icon size={20} strokeWidth={1.5} />
            </motion.div>
          </div>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-auto text-foreground text-xs"
        style={{ writingMode: "vertical-rl" }}
      >
        © 2025
      </motion.div>
    </motion.aside>
  );
};
