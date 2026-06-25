// components/layout/TextNav.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface TextNavProps {
  activePage?: string;
}

export const TextNav = ({ activePage }: TextNavProps) => {
  const navItems = [
    { text: "WORK", to: "/work" },
    { text: "ABOUT", to: "/about" },
    { text: "CONTACT", to: "/contact" },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-8 text-xs uppercase tracking-wider font-medium"
    >
      {navItems.map((item) => (
        <Link
          key={item.text}
          to={item.to}
          className={`text-foreground/60 transition-colors duration-200 hover:text-foreground ${
            activePage === item.text.toLowerCase() ? 'text-foreground' : ''
          }`}
        >
          {item.text}
        </Link>
      ))}
    </motion.nav>
  );
};