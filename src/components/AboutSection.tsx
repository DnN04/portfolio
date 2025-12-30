// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// export const AboutSection = () => {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

//   return (
//     <section id="about" ref={ref} className="py-32 px-8 md:px-20 max-w-7xl mx-auto">
//       <div className="grid md:grid-cols-2 gap-20 items-center">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <motion.h2
//             initial={{ opacity: 0, y: 60 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, ease: [0.22, 0.1, 0.1, 1] }}
//             className="font-serif text-7xl md:text-8xl lg:text-9xl xl:text-[5rem] mb-8 font-extrabold tracking-tight"
//           >
//             About
//           </motion.h2>
//           <div className="space-y-6 font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
//             <p>
//               I'm a 2nd year CSE undergrad and developer with a passion for creating meaningful
//               digital experiences. With over a decade of experience, I've worked with
//               startups and established companies to bring their visions to life.
//             </p>
//             <p>
//               My approach combines strategic thinking with meticulous attention to detail.
//               I believe in designing products that are not only beautiful but also
//               functional and accessible to everyone.
//             </p>
//             <p>
//               When I'm not designing, you can find me exploring new technologies,
//               mentoring aspiring designers, or working on personal creative projects.
//             </p>
//           </div>
//         </motion.div>

//         <motion.div
//           style={{ y }}
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="aspect-[3/4] rounded-sm overflow-hidden"
//         >
//           <img
//             src=""
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// export const AboutSection = () => {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

//   const aboutTexts = [
//     "I'm a 2nd-year CSE undergrad specializing in AIML, passionate about building practical and innovative AI-powered applications.",
//     "Over the past couple of years, I have built real-world projects like a Fake News Detector, DNCheckIt weather app, AmritKrishi, and a personal Todo app, honing my full-stack and ML skills.",
//     "I enjoy exploring the intersection of frontend development and artificial intelligence, solving real problems while improving user experiences.",
//     "When I'm not coding, I focus on learning new technologies, working on creative projects, and staying active with fitness and nutrition.",
//   ];

//   return (
//     <section id="about" ref={ref} className="py-10 px-8 md:px-20 max-w-7xl mx-auto">
//       <div className="grid md:grid-cols-2 gap-20 items-center">
//         {/* TEXT */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <motion.h2
//             initial={{ opacity: 0, y: 10 }}  // shifted slightly up
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, ease: [0.22, 0.1, 0.1, 1] }}
//             className="  font-serif text-7xl md:text-8xl lg:text-9xl xl:text-[5rem] mb-8 font-extrabold tracking-tight"
//           >
//             About
//           </motion.h2>

//           {/* Paragraphs with stagger */}
//           <div className="space-y-6 font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
//             {aboutTexts.map((text, i) => (
//               <motion.p
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: i * 0.15 }}
//                 viewport={{ once: true }}
//               >
//                 {text}
//               </motion.p>
//             ))}
//           </div>
//         </motion.div>

//         {/* IMAGE */}
//         <motion.div
//           style={{ y }}
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="-mt-5 relative w-full aspect-[3/4] rounded-sm overflow-hidden"
//         >
//           {/* Blurred background */}
//           <img
//             src="/profile-home.jpg" // same prop as homepage, different image
//             alt=""
//             aria-hidden
//             className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30"
//           />

//           {/* Foreground image */}
//           <motion.img
//             src="public/photo.png" // actual about section image
//             alt="Profile"
//             className="relative w-full h-full object-contain"
//             whileHover={{ scale: 1.0 }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//           />

//           {/* Soft overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent z-20 pointer-events-none" />
//         </motion.div>
//       </div>
//     </section>
//   );
// };


// import { motion, useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { useRef } from "react";

export const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
;

  // const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const HEADER_OFFSET = 120;


  const aboutTexts = [
    "I'm a 2nd-year CSE undergrad specializing in AIML, focused on building practical, real-world AI-powered applications.",
    "I’ve built projects like a Fake News Detector using transformer models, DNCheckIt weather app, AmritKrishi, and a productivity-driven Todo app.",
    "My interests lie at the intersection of frontend engineering and artificial intelligence, where performance and usability meet intelligence.",
    "Outside coding, I focus on continuous learning, fitness, and disciplined self-improvement.",
  ];

  const skills = [
    "Java",
    "Python",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Streamlit",
    "Git & GitHub",
    "APIs",
  ];

  const education = [
    {
      year: "2021",
      title: "Secondary School (Class X), 93%",
      school: "K.V No.1 Angul",
    },
    {
      year: "2023",
      title: "Higher Secondary (Class XII), 91.4%",
      school: "K.V AMC, Lucknow",
    },
    {
      year: "2024 – 2028",
      title: "B.Tech in Computer Science (AIML),CGPA: 9.5/10 (till 2nd sem)",
      school: "SRM IST, Chennai",
    },
  ];

  return (
    // <section
    //   id="about"
    //   ref={ref}
    //   className="pt-24 pb-32 px-8 md:px-20 max-w-7xl mx-auto"
    // >

//   <section
//   id="about"
//   className="h-screen px-8 md:px-20 max-w-7xl mx-auto flex flex-col"
// >
  <section
  id="about"
  ref={ref}
  className="
  pt-[120px]
  pb-24
  px-8 md:px-20
  max-w-7xl
  mx-auto
"

  
>



      {/* ABOUT HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 0.1, 0.1, 1] }}
        viewport={{ once: true }}
        className="font-serif text-7xl md:text-8xl lg:text-9xl xl:text-[5rem]
                   mb-12 text-[4.5rem] leading-tight"
      >
        About
      </motion.h2>

      {/* MAIN CONTENT */}
      {/* <div className="grid md:grid-cols-2 gap-20 items-start"> */}
        <div className="grid md:grid-cols-2 gap-12 flex-1 items-start">

        {/* LEFT — ABOUT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mt-5 space-y-8 font-sans text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
            {aboutTexts.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                viewport={{ once: true }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — SKILLS + EDUCATION */}
        {/* <motion.div
          // style={{ y }}
          initial={{ opacity: 0 , y: -40 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-10, -mt-12"
        > */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true }}
  className="space-y-10 pt-2"
>


          {/* SKILLS */}
          <div>
            <h3 className="-mt-10 font-sans text-sm tracking-wider mb-3 text-muted-foreground">
              SKILLS
            </h3>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 rounded-full text-sm font-sans
                             border border-foreground/20
                             bg-background hover:bg-foreground hover:text-background
                             transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* EDUCATION — TRADITIONAL TIMELINE */}
          <div className="mt-8">
            <h3 className="font-sans text-sm tracking-wider mb-3 text-muted-foreground">
              EDUCATION
            </h3>

            <div className="space-y-5">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-[90px_1fr] gap-6 items-start"
                >
                  {/* YEAR */}
                  <p className="font-sans text-sm text-muted-foreground text-right pt-1">
                    {edu.year}
                  </p>

                  {/* CONTENT */}
                  <div className="border-l border-foreground/20 pl-6">
                    <p className="font-sans text-base leading-snug">
                      {edu.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
        {edu.school}
      </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
