import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={ref} className="py-32 px-8 md:px-20 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.1, 0.1, 1] }}
            className="font-serif text-7xl md:text-8xl lg:text-9xl xl:text-[5rem] mb-8 font-extrabold tracking-tight"
          >
            About
          </motion.h2>
          <div className="space-y-6 font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              I'm a 2nd year CSE undergrad and developer with a passion for creating meaningful
              digital experiences. With over a decade of experience, I've worked with
              startups and established companies to bring their visions to life.
            </p>
            <p>
              My approach combines strategic thinking with meticulous attention to detail.
              I believe in designing products that are not only beautiful but also
              functional and accessible to everyone.
            </p>
            <p>
              When I'm not designing, you can find me exploring new technologies,
              mentoring aspiring designers, or working on personal creative projects.
            </p>
          </div>
        </motion.div>

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="aspect-[3/4] rounded-sm overflow-hidden"
        >
          <img
            src=""
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};
