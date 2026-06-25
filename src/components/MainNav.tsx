import { motion } from "framer-motion";
import { Home, Briefcase, User, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const MainNav = () => {
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
      className="absolute left-[12%] top-[20%] flex flex-col items-center z-70"
    >
      {/* Logo */}
      <div className="mb-8">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
        />
      </div>

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
    </motion.aside>
  );
};