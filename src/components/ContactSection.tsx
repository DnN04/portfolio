import { motion } from "framer-motion";
import { Mail, Linkedin, Instagram, Github, ArrowUpRight } from "lucide-react";
import { useMagneticHover } from "@/hooks/useMagneticHover";

const MagneticIcon = ({
  href,
  label,
  icon: Icon,
  delay,
}: {
  href: string;
  label: string;
  icon: typeof Mail;
  delay: number;
}) => {
  const { ref, onMouseMove, onMouseLeave } = useMagneticHover({ strength: 0.5, maxDisplace: 16 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative"
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove as unknown as React.MouseEventHandler<HTMLDivElement>}
      onMouseLeave={onMouseLeave}
    >
      <motion.a
        href={href}
        target={href.startsWith("mailto") ? undefined : "_blank"}
        rel="noopener noreferrer"
        aria-label={label}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.93 }}
        className="flex flex-col items-center gap-2 group"
      >
        {/* Icon circle */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            border: "1px solid hsla(53, 53%, 84%, 0.15)",
            background: "hsla(53, 53%, 84%, 0.04)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "hsl(53, 53%, 84%)";
            el.style.boxShadow = "0 0 30px hsla(53, 53%, 84%, 0.25)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "hsla(53, 53%, 84%, 0.04)";
            el.style.boxShadow = "none";
          }}
        >
          <Icon
            size={18}
            strokeWidth={1.5}
            className="transition-colors duration-300 group-hover:[filter:invert(1)]"
          />
        </div>
        <span className="font-sans text-xs tracking-widest text-muted-foreground/60 group-hover:text-muted-foreground transition-colors uppercase">
          {label}
        </span>
      </motion.a>
    </motion.div>
  );
};

export const ContactSection = () => {
  const socialLinks = [
    { icon: Mail,      href: "mailto:dnofficial200@gmail.com",                                 label: "Email" },
    { icon: Linkedin,  href: "https://www.linkedin.com/in/durgesh-narayan-nayak-82098a353/",   label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/dn.o4_/",                             label: "Instagram" },
    { icon: Github,    href: "https://github.com/DnN04",                                       label: "GitHub" },
  ];

  return (
    <section
      id="contact"
      className="flex items-center justify-center pt-32 pb-16 px-4 sm:px-8 relative"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, hsla(53, 53%, 84%, 0.04), transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="font-sans text-xs tracking-widest text-muted-foreground uppercase mb-6"
        >
          Get In Touch
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-serif mb-8 leading-tight"
          style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
        >
          Let's{" "}
          <span className="text-holographic">Connect.</span>
        </motion.h2>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-sans text-sm md:text-base text-muted-foreground mb-14 max-w-2xl mx-auto leading-relaxed"
        >
          I'm always interested in working with like-minded people and exploring new ideas.
          Whether you have a question or just want to say hi, feel free to reach out.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.a
            href="mailto:dnofficial200@gmail.com"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 font-sans text-sm tracking-widest uppercase transition-all duration-300"
            style={{
              border: "1px solid hsla(53, 53%, 84%, 0.3)",
              background: "hsla(53, 53%, 84%, 0.06)",
              borderRadius: "9999px",
              boxShadow: "0 0 20px hsla(53, 53%, 84%, 0.1)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "hsl(53, 53%, 84%)";
              el.style.color = "hsl(60, 4%, 9.8%)";
              el.style.boxShadow = "0 0 40px hsla(53, 53%, 84%, 0.3)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "hsla(53, 53%, 84%, 0.06)";
              el.style.color = "";
              el.style.boxShadow = "0 0 20px hsla(53, 53%, 84%, 0.1)";
            }}
          >
            Say Hello
            <ArrowUpRight size={16} />
          </motion.a>
        </motion.div>

        {/* Social icons with magnetic hover */}
        <div className="flex gap-6 md:gap-8 justify-center items-center flex-wrap">
          {socialLinks.map((link, index) => (
            <MagneticIcon
              key={link.label}
              href={link.href}
              label={link.label}
              icon={link.icon}
              delay={0.5 + index * 0.08}
            />
          ))}
        </div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="font-sans text-xs text-muted-foreground/40 mt-20 tracking-widest uppercase"
        >
          Durgesh Narayan Nayak · AIML @ SRM IST · 2024–2028
        </motion.p>
      </div>
    </section>
  );
};
