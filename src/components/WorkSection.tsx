// ARVIO-style hero sections — one per project, large image right, big text left
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, ExternalLink, Star, Zap } from "lucide-react";
import { HolographicShowcase } from "./HolographicShowcase";

interface WorkItemProps {
  title: string;
  tagline: string;
  description: string;
  images: string[];
  github?: string;
  live?: string;
  metrics?: string[];
  tech?: string[];
  index: number;
}

/* ── 3D image stack — shows all screenshots cascading at depth ── */
function getImageTransform(index: number, total: number, isHovered: boolean) {
  if (total === 1) {
    return { x: 0, y: 0, z: 0, rotate: 0, scale: 1 };
  }
  
  if (total === 2) {
    if (isHovered) {
      return {
        x: index === 0 ? -50 : 50,
        y: index === 0 ? 15 : -15,
        z: index === 0 ? 0 : -20,
        rotate: index === 0 ? -4 : 4,
        scale: 1.02
      };
    } else {
      return {
        x: index === 0 ? 0 : 25,
        y: index === 0 ? 0 : -15,
        z: index === 0 ? 0 : -20,
        rotate: index === 0 ? 0 : 2,
        scale: 1
      };
    }
  }
  
  // 3 or more images
  if (isHovered) {
    if (index === 0) {
      return { x: -80, y: 20, z: 0, rotate: -6, scale: 1.03 };
    } else if (index === 1) {
      return { x: 0, y: -15, z: -20, rotate: 0, scale: 1.03 };
    } else {
      return { x: 80, y: -45, z: -40, rotate: 6, scale: 1.03 };
    }
  } else {
    return {
      x: index * 25,
      y: index * -15,
      z: index * -20,
      rotate: index * 2,
      scale: 1
    };
  }
}

function ImageStack({
  images,
}: {
  images: string[];
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayImages = images.slice(0, 3); // show max 3 in the cascade

  useEffect(() => {
    if (displayImages.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayImages.length);
    }, 3000); // cycle every 3 seconds

    return () => clearInterval(interval);
  }, [displayImages.length, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 12,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -8,
    });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  const reversedIndices = Array.from({ length: displayImages.length }, (_, i) => displayImages.length - 1 - i);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ 
        perspective: "1200px", 
        perspectiveOrigin: "50% 50%",
        paddingTop: "30px", // extra space for cascade
        paddingBottom: "30px"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        handleMouseLeave();
        setIsHovered(false);
      }}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
          transition: isHovered
            ? "transform 0.1s ease"
            : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
          position: "relative"
        }}
      >
        {reversedIndices.map((originalIdx) => {
          const src = displayImages[originalIdx];
          
          // Calculate relative position based on activeIndex when not hovered
          const relIdx = (originalIdx - activeIndex + displayImages.length) % displayImages.length;
          
          // If hovered, use original index for stable fan-out. Otherwise, use relative index for stack cycling.
          const transformIdx = isHovered ? originalIdx : relIdx;
          const zIndexIdx = isHovered ? originalIdx : relIdx;

          const t = getImageTransform(transformIdx, displayImages.length, isHovered);
          const isFront = originalIdx === 0;

          return (
            <div
              key={src + originalIdx}
              className={`
                ${isFront ? "relative" : "absolute inset-0"}
                w-full rounded-xl overflow-hidden transition-all duration-500
              `}
              style={{
                transform: `
                  translate3d(${t.x}px, ${t.y}px, ${t.z}px)
                  rotate(${t.rotate}deg)
                  scale(${t.scale})
                `,
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                zIndex: displayImages.length - zIndexIdx,
                border: "1px solid hsla(53, 53%, 84%, 0.12)",
                boxShadow: isHovered
                  ? "0 25px 65px rgba(0,0,0,0.65), 0 0 25px hsla(53, 53%, 84%, 0.04)"
                  : "0 15px 45px rgba(0,0,0,0.55)",
                transformOrigin: "center center",
              }}
            >
              {/* Holographic glaze overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: `linear-gradient(
                    135deg,
                    hsla(53, 53%, 84%, 0.08) 0%,
                    transparent 50%,
                    hsla(0, 0%, 0%, 0.15) 100%
                  )`,
                }}
              />
              <img
                src={src}
                alt=""
                className="w-full h-auto block"
                loading="lazy"
                style={{
                  filter: isHovered 
                    ? "brightness(1)" 
                    : `brightness(${1 - zIndexIdx * 0.12})`, // slightly darken back images
                  transition: "filter 0.5s ease"
                }}
              />
              {/* Bottom shade fade */}
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                  height: "30%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Screenshot count badge */}
      {/* {images.length > 1 && (
        <div
          className="absolute top-10 right-3 z-20 font-sans text-xs px-2.5 py-1 rounded-full pointer-events-none"
          style={{
            background: "hsla(60, 4%, 9.8%, 0.85)",
            border: "1px solid hsla(53, 53%, 84%, 0.15)",
            color: "hsla(53, 53%, 84%, 0.6)",
            backdropFilter: "blur(8px)",
          }}
        >
          {images.length} screenshots
        </div>
      )} */}
    </div>
  );
}

/* ── Single project hero section ── */
const ProjectHero = ({ title, tagline, description, images, github, live, metrics = [], tech = [], index }: WorkItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      className="mb-8 md:mb-0"
    >
      {/* Full-bleed section */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-20 md:py-28`}
      >
        {/* ── TEXT SIDE ── */}
        <div className={`${isLeft ? "md:order-1" : "md:order-2"} flex flex-col justify-center`}>

          {/* Project number */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-sans text-xs tracking-widest uppercase mb-5"
            style={{ color: "hsla(53, 53%, 84%, 0.3)", letterSpacing: "0.25em" }}
          >
            {String(index + 1).padStart(2, "0")}  ·  Project
          </motion.p>

          {/* Big bold title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="font-serif leading-none mb-3"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            {title}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            viewport={{ once: true }}
            className="font-serif mb-6"
            style={{
              fontSize: "clamp(1.3rem, 3vw, 2rem)",
              color: "hsla(53, 53%, 84%, 0.5)",
              fontStyle: "italic",
              lineHeight: 1.3,
            }}
          >
            {tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-sans leading-relaxed mb-8"
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              color: "hsla(53, 53%, 84%, 0.6)",
              maxWidth: "480px",
            }}
          >
            {description}
          </motion.p>

          {/* Metrics */}
          {metrics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {metrics.map((m, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 font-sans text-xs px-3 py-1.5 rounded-full"
                  style={{
                    border: "1px solid hsla(53, 53%, 84%, 0.2)",
                    background: "hsla(53, 53%, 84%, 0.05)",
                    color: "hsla(53, 53%, 84%, 0.75)",
                  }}
                >
                  <Zap size={9} />
                  {m}
                </span>
              ))}
            </motion.div>
          )}

          {/* Tech pills */}
          {tech.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {tech.map((t, i) => (
                <span
                  key={i}
                  className="font-sans text-xs px-2.5 py-1 rounded"
                  style={{
                    color: "hsla(53, 53%, 84%, 0.4)",
                    background: "hsla(53, 53%, 84%, 0.04)",
                    border: "1px solid hsla(53, 53%, 84%, 0.08)",
                  }}
                >
                  {t}
                </span>
              ))}
            </motion.div>
          )}

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.48 }}
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-2 font-sans text-sm transition-all duration-300"
                style={{ color: "hsla(53, 53%, 84%, 0.6)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "hsl(53, 53%, 84%)")}
                onMouseLeave={e => (e.currentTarget.style.color = "hsla(53, 53%, 84%, 0.6)")}
              >
                <Github size={15} />
                GitHub
              </motion.a>
            )}
            {live && (
              <motion.a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-2 font-sans text-sm transition-all duration-300"
                style={{ color: "hsla(53, 53%, 84%, 0.6)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "hsl(53, 53%, 84%)")}
                onMouseLeave={e => (e.currentTarget.style.color = "hsla(53, 53%, 84%, 0.6)")}
              >
                <ExternalLink size={14} />
                Live Demo
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* ── IMAGE SIDE ── */}
        <motion.div
          style={{ y }}
          className={`${isLeft ? "md:order-2" : "md:order-1"}`}
        >
          <ImageStack images={images} />
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider" />
    </motion.div>
  );
};

/* ── Project data ── */
const works: Omit<WorkItemProps, "index">[] = [
  {
    title: "Derma AI",
    tagline: "AI-Powered Skin Lesion Detection & Classification",
    description:
      "A deep learning medical web application combining automated skin lesion segmentation (ResUNet) and classification (EfficientNet-B0) to assist in early melanoma detection with fast CPU inference.",
    images: ["/derma1.png", "/derma2.png", "/derma3.png"],
    github: "https://github.com/DnN04/DermaAI",
    live: "https://derma-ai-zeta.vercel.app/welcome",
    metrics: ["ResUNet & EfficientNet", "Dice Score ≥ 0.85", "Inference < 3s (CPU)"],
    tech: ["PyTorch", "FastAPI", "React", "ONNX Runtime", "Docker"],
  },
  {
    title: "Veritas AI",
    tagline: "Fake news, finally detected.",
    description:
      "An end-to-end fake news detection platform combining classical ML pipelines with transformer-based language models to accurately identify misinformation in real-world content.",
    images: ["/FAKENEWS.JPG"],
    github: "https://github.com/DnN04/FAKE-NEWS-DETECTOR",
    metrics: ["93%+ Accuracy", "Transformer NLP", "Real-time Detection"],
    tech: ["Python", "TensorFlow", "Scikit-Learn", "NLP", "Pandas"],
  },
  {
    title: "DNCHECKiT",
    tagline: "Weather, on your terms.",
    description:
      "A real-time weather forecasting application delivering accurate, location-based updates with a focus on performance and clean UX.",
    images: ["/dncheckit.png"],
    github: "https://github.com/DnN04/dncheckit",
    live: "https://dn-checkit.vercel.app/",
    metrics: ["Live on Vercel", "Real-time Data", "Responsive UI"],
    tech: ["React", "TypeScript", "Weather API", "Vite"],
  },
  {
    title: "AmritKrishi",
    tagline: "Tech for the farmer.",
    description:
      "A concept-driven platform aimed at empowering Indian farmers with crop insights and decision support through technology.",
    images: ["/amrit1.png", "/amrit3.png", "/amrit4.png"],
    github: "https://github.com/DnN04/amritkrishi2.0",
    metrics: ["AgriTech Innovation", "AI-Powered", "Full Stack"],
    tech: ["React", "Python", "ML Models", "Full Stack"],
  },
];

/* ── All project images mapped for hologram ── */
const hologramProjects = [
  { name: "Derma AI",    images: ["/derma1.png", "/derma2.png", "/derma3.png"] },
  { name: "Veritas AI",  images: ["/FAKENEWS.JPG"] },
  { name: "DNCHECKiT",  images: ["/dncheckit.png"] },
  { name: "AmritKrishi", images: ["/amrit1.png", "/amrit3.png", "/amrit4.png"] },
];

export const WorkSection = () => {
  return (
    <section
      id="work"
      className="px-4 sm:px-8 md:px-20 max-w-7xl mx-auto"
      style={{ paddingTop: "80px" }}
    >
      {/* ── TOP SPLIT: small text intro (left) + Holographic showcase (right) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-20 md:mb-28">

        {/* Left — label + heading + description + badges */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 flex-shrink-0"
            >
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" />
              </svg>
            </motion.div>
            <span className="font-sans text-xs tracking-widest text-muted-foreground uppercase">
              Featured Work
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-serif leading-tight mb-5"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Building with{" "}
            <span className="text-holographic">purpose.</span>
          </h2>

          {/* Description */}
          <p
            className="font-sans leading-relaxed mb-6"
            style={{
              fontSize: "clamp(0.875rem, 1.4vw, 1rem)",
              color: "hsla(53, 53%, 84%, 0.55)",
              maxWidth: "420px",
            }}
          >
            I build full-stack products where intelligent systems meet clean
            interfaces. From AI-powered detectors to real-time apps — each
            project solves a real problem with thoughtful engineering.
          </p>

          {/* Recruiter badges */}
          <div className="flex flex-wrap gap-2">
            {[
              // { icon: Star, text: "CGPA 9.5 / 10" },
              { icon: Zap,  text: "3+ Shipped Projects" },
              { icon: Star, text: "GSSoC Contributor" },
              { icon: Zap,  text: "AIML | Web Dev" },
            ].map(({ icon: Icon, text }, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.3 + i * 0.08 }}
                viewport={{ once: true }}
                className="recruiter-badge"
              >
                <Icon size={9} />
                {text}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Right — 3D holographic rotating screenshot cluster */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="flex items-center justify-center"
        >
          <HolographicShowcase projects={hologramProjects} />
        </motion.div>
      </div>

      {/* Divider */}
      <div className="section-divider mb-6" />

      {/* ── BELOW: individual ARVIO-style project hero sections ── */}
      {works.map((work, index) => (
        <ProjectHero key={index} {...work} index={index} />
      ))}
    </section>
  );
};
