import { motion } from "framer-motion";
import { Mail, Linkedin, Instagram, Github } from "lucide-react";

export const ContactSection = () => {
  const socialLinks = [
    { icon: Mail, href: "mailto:dnofficial200@gmail.com", label: "Email" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/durgesh-narayan-nayak-82098a353/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/dn.o4_/", label: "Instagram" },
    { icon: Github, href: "https://github.com/DnN04", label: "GitHub" },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-32 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-serif text-6xl md:text-7xl lg:text-9xl mb-12"
        >
          Let's Connect.
                  
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-sans text-sm md:text-base text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed"
        >
          I'm always interested in working with like minded people and work on new ideas.
          Whether you have a question or just want to say hi, feel free to reach out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex gap-8 justify-center items-center"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-foreground hover:text-foreground/70 transition-colors duration-300"
              aria-label={link.label}
            >
              <link.icon size={24} strokeWidth={1.5} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
