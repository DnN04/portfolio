import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Github } from "lucide-react";

// interface WorkItemProps {
//   title: string;
//   services: string;
//   description: string;
//   image: string;
//   index: number;
// }
interface WorkItemProps {
  title: string;
  services: string;
  description: string;
  image: string;
  github?: string;
  live?: string;
  index: number;
}


// const WorkCard = ({ title, services, description, image, index }: WorkItemProps) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
//   const isLeft = index % 2 === 0;

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 60 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, delay: index * 0.1 }}
//       viewport={{ once: true }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className={`group cursor-pointer mb-32 ${
//         isLeft ? "ml-0 md:ml-0 mr-auto md:mr-auto" : "ml-auto mr-0 md:ml-auto md:mr-0"
//       } max-w-2xl`}
//       style={{ 
//         paddingLeft: isLeft ? "0" : "0",
//         paddingRight: isLeft ? "0" : "0",
//       }}
//     >
//       <motion.div style={{ y }} className="relative">
//         <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-6 rounded-sm">
//           <motion.img
//             src={image}
//             alt={title}
//             className="w-full h-full object-cover"
//             animate={{ scale: isHovered ? 1.05 : 1 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           />
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: isHovered ? 1 : 0 }}
//             transition={{ duration: 0.3 }}
//             className="absolute inset-0 bg-foreground/10 flex items-center justify-center"
//           >
//             <span className="font-sans text-sm text-background">View Project</span>
//           </motion.div>
//         </div>

//         <motion.h3
//           className="font-serif text-4xl md:text-5xl mb-3 group-hover:opacity-70 transition-opacity duration-300"
//         >
//           {title}
//         </motion.h3>
//         <p className="font-sans text-sm text-muted-foreground mb-4">{services}</p>
//         <p className="font-sans text-sm md:text-base text-foreground/80 leading-relaxed max-w-xl">
//           {description}
//         </p>
//       </motion.div>
//     </motion.div>
//   );
// };
const WorkCard = ({
  title,
  services,
  description,
  image,
  github,
  live,
  index,
}: WorkItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`mb-32 max-w-6xl ${
        isLeft ? "mr-auto" : "ml-auto"
      }`}
    >
      <motion.div
        style={{ y }}
        className={`grid grid-cols-1 md:grid-cols-12 gap-12 items-center`}
      >
        {/* IMAGE */}
        {/* <div className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden bg-muted rounded-sm"> */}
<div className={`relative col-span-12 md:col-span-7 aspect-[16/10] overflow-hidden rounded-sm isolate ${
    isLeft ? "md:order-1" : "md:order-2"
  }`}>
  {/* Blurred background */}
<img
  src={image}
  alt=""
  aria-hidden
  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 z-0 transition-transform duration-500"
  style={{ transform: isHovered ? "scale(1.15)" : "scale(1.05)" }}
/>


  {/* Main screenshot */}
  <motion.img
    src={image}
    alt={title}
    className="relative z-10 w-full h-full object-contain will-change-transform"
    // animate={{ scale: isHovered ? 1.02 : 1 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  />

  {/* Gradient polish */}
  {/* <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent z-20 pointer-events-none" />

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: isHovered ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    className="absolute inset-0 z-30 bg-background/70 flex flex-col items-center justify-center gap-4"
  >
 
  </motion.div>
</div> */}
</div>


        {/* TEXT CONTENT */}
        {/* <div className="w-full md:w-1/2"> */}
        <div
  className={`col-span-12 md:col-span-5 ${
    isLeft ? "md:order-2" : "md:order-1"
  }`}
>

          <motion.h3 className="font-serif text-4xl md:text-5xl mb-4">
            {title}
          </motion.h3>

          <p className="font-sans text-sm text-muted-foreground mb-6">
            {services}
          </p>

          <p className="font-sans text-sm md:text-base text-foreground/80 leading-relaxed max-w-md">
            {description}
          </p>

          <div className="mt-6 flex items-center gap-6">
  {github && (
    <a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition"
    >
      <Github size={18} />
      <span>GitHub</span>
    </a>
  )}

  {live && (
    <a
      href={live}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-foreground/80 hover:text-foreground transition underline underline-offset-4"
    >
      Live →
    </a>
  )}
</div>

        </div>
      </motion.div>
    </motion.div>
  );
};


export const WorkSection = () => {
  // const works = [
  //   {
  //     title: "Barbara Scerbo",
  //     services: "UX/UI Design, Development",
  //     description: "A bespoke website to spotlight her branding & art direction prowess.",
  //     image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=900&fit=crop",
  //   },
  //   {
  //     title: "Beatrice Cortese",
  //     services: "UX/UI Design, Development",
  //     description: "A new website with a tailored design and development for an Italian winemaking excellence.",
  //     image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=900&fit=crop",
  //   },
  //   {
  //     title: "Viceversa",
  //     services: "UX/UI Design",
  //     description: "Tailored user-friendly and visually appealing UX/UI for Viceversa's revenue-based financing platform.",
  //     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=900&fit=crop",
  //   },
  //   {
  //     title: "Codeway CH",
  //     services: "UX/UI Design, Development",
  //     description: "A dynamic tailored website blending tech prowess with engaging brand identity.",
  //     image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=900&fit=crop",
  //   },
  //   {
  //     title: "Miranda",
  //     services: "UX/UI Design",
  //     description: "A catchy portfolio that spotlighting her creative prowess in graphic identity and visual.",
  //     image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1200&h=900&fit=crop",
  //   },
  // ];
const works = [
  {
    title: "Veritas AI",
    services: "AI Engineering · NLP · Full Stack",
    description:
      "An end-to-end fake news detection platform combining classical ML pipelines with transformer-based language models to accurately identify misinformation in real-world content.",
    image: "/FAKENEWS.JPG",
    github: "https://github.com/DnN04/FAKE-NEWS-DETECTOR",
      },
  {
    title: "DNCHECKiT Web App",
    services: "Web Development · APIs",
    description:
          "A real-time weather forecasting application delivering accurate, location-based updates with a focus on performance and clean UX.",
    image: "/dncheckit.png",
    github: "https://github.com/DnN04/dncheckit",
    live: "https://dn-checkit.vercel.app/",
  },
  // {
  //   title: "DNCHECKiT Web App",
  //   services: "Frontend Development · API Integration",
  //   description:
  //     "A real-time weather forecasting application delivering accurate, location-based updates with a focus on performance and clean UX.",
  //   image: "/projects/weather.png",
  //   github: "https://github.com/yourusername/weather-app",

  // },
  {
    title: "AmritKrishi",
    services: "Product Design · AgriTech Concept · Full Stack Development",
    description:
      "A concept-driven platform aimed at empowering Indian farmers with crop insights and decision support through technology.",
    image: "/amrit1.png",
    github: "https://github.com/DnN04/amritkrishi2.0",

  },
];

  return (
    <section id="work" className="py-32 px-8 md:px-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20 flex items-center gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 flex items-center justify-center mb-4 -mt-6"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
        <h2 className="font-sans text-sm md:text-base tracking-wider mb-4 -mt-6">
          Featured Work
        </h2>
      </motion.div>

      <div className="relative">
        {works.map((work, index) => (
          <WorkCard key={index} {...work} index={index} />
        ))}
      </div>

      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <a
          href="https://github.com/DnN04"
          className="inline-block font-sans text-sm tracking-wider border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          SEE OTHER WORKS
        </a>
      </motion.div> */}
    </section>
  );
};
