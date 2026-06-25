// Scroll-driven interactive vertical timeline of Durgesh's journey
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GraduationCap, Code2, FolderGit2, Trophy, ChevronRight } from "lucide-react";

type TimelineCategory = "academics" | "technical" | "projects" | "achievements";

interface TimelineEntry {
  year: string;
  title: string;
  detail: string;
  category: TimelineCategory;
  highlight?: boolean;
}

const entries: TimelineEntry[] = [
  // Academics
  {
    year: "2021",
    title: "Class X — 93%",
    detail: "K.V No.1 Angul · Science & Mathematics top performer",
    category: "academics",
  },
  {
    year: "2023",
    title: "Class XII — 91.4%",
    detail: "K.V AMC, Lucknow · Physics, Chemistry, Mathematics",
    category: "academics",
  },
  {
    year: "2024",
    title: "B.Tech CSE (AIML) @ SRM IST",
    detail: "CGPA 9.5/10 till 2nd semester · Chennai campus",
    category: "academics",
    highlight: true,
  },

  // Technical Growth
  {
    year: "2020",
    title: "First Lines of Code",
    detail: "Fell in love with programming through C and basic algorithms",
    category: "technical",
  },
  {
    year: "2021",
    title: "Java & OOP",
    detail: "Mastered object-oriented programming and data structures",
    category: "technical",
  },
  {
    year: "2022",
    title: "Python & Data Science",
    detail: "NumPy, Pandas, Matplotlib — the data stack clicked",
    category: "technical",
  },
  {
    year: "2024",
    title: "AIML Specialization",
    detail: "Machine Learning, Deep Learning, NLP, TensorFlow, Scikit-Learn",
    category: "technical",
    highlight: true,
  },
  {
    year: "2024",
    title: "Full Stack Development",
    detail: "React, TypeScript, Vite — building premium web experiences",
    category: "technical",
  },

  // Projects
  {
    year: "2024",
    title: "Veritas AI - Fake News Detector",
    detail: "Transformer-based NLP pipeline · 93%+ accuracy",
    category: "projects",
    highlight: true,
  },
  {
    year: "2024",
    title: "DNCHECKiT Weather App",
    detail: "Real-time forecasting · Live at dn-checkit.vercel.app",
    category: "projects",
  },
  {
    year: "2024",
    title: "AmritKrishi - AgriTech Platform",
    detail: "AI-powered crop insight system for Indian farmers",
    category: "projects",
    highlight: true,
  },
  {
    year: "2025",
    title: "Derma AI - Medical Skin Imaging Platform",
    detail: "Two-stage AI pipeline (ResUNet + EfficientNet-B0) · FastAPI & React web application",
    category: "projects",
    highlight: true,
  },
  {
    year: "2025",
    title: "This Portfolio v2",
    detail: "Premium interactive portfolio ",
    category: "projects",
  },

  // Achievements
  {
    year: "2025, 2026",
    title: "GSSoC '26 Contributor",
    detail: "Girl Script Summer of Code · Open source contributions merged · Under Top 1000 contributors",
    category: "achievements",
    highlight: true,
  },
  {
    year: "2026",
    title: "CGPA 9.31 / 10",
    detail: "Academic report upto 4th semester ",
    category: "academics",
    highlight: true,
  },
  {
    year: "2025",
    title: "Placement Season Approaching",
    detail: "Targeting AI/ML & Full Stack roles · Open to internships",
    category: "achievements",
  },
];

const CATEGORIES: { id: TimelineCategory; label: string; icon: typeof GraduationCap }[] = [
  { id: "academics",    label: "Academics",   icon: GraduationCap },
  { id: "technical",   label: "Technical",   icon: Code2 },
  { id: "projects",    label: "Projects",    icon: FolderGit2 },
  { id: "achievements",label: "Achievements",icon: Trophy },
];

const categoryColor: Record<TimelineCategory, string> = {
  academics:    "hsla(200, 60%, 70%, 0.8)",
  technical:    "hsla(280, 60%, 70%, 0.8)",
  projects:     "hsla(53,  53%, 84%, 0.9)",
  achievements: "hsla(40,  80%, 70%, 0.9)",
};

function TimelineNode({ entry, idx }: { entry: TimelineEntry; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const color = categoryColor[entry.category];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-6 group"
    >
      {/* Timeline spine + node */}
      <div className="flex flex-col items-center" style={{ minWidth: "24px" }}>
        {/* Connector line above (not for first) */}
        {idx !== 0 && (
          <div
            className="w-px flex-shrink-0"
            style={{
              height: "32px",
              background: `linear-gradient(to bottom, ${color}40, ${color}20)`,
            }}
          />
        )}

        {/* Node dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: idx * 0.04 + 0.2, type: "spring" }}
          className="flex-shrink-0 rounded-full"
          style={{
            width: entry.highlight ? "14px" : "10px",
            height: entry.highlight ? "14px" : "10px",
            background: entry.highlight ? color : "transparent",
            border: `2px solid ${color}`,
            boxShadow: entry.highlight ? `0 0 12px ${color}` : "none",
            marginTop: idx === 0 ? "0" : "0",
          }}
        />

        {/* Connector line below */}
        <div
          className="w-px flex-grow"
          style={{
            minHeight: "32px",
            background: `linear-gradient(to bottom, ${color}20, transparent)`,
          }}
        />
      </div>

      {/* Content card */}
      <div
        className={`
          mb-6 pb-6 flex-1 glass-card rounded-lg px-5 py-4
          transition-all duration-300
          ${entry.highlight ? "glow-border" : "border border-transparent hover:border-foreground/10"}
        `}
        style={
          entry.highlight
            ? { borderColor: `${color}30` }
            : {}
        }
      >
        <div className="flex items-start justify-between gap-2 mb-1">
          <p
            className="font-sans font-semibold text-sm leading-tight"
            style={{ color: entry.highlight ? color : "hsl(53, 53%, 84%)" }}
          >
            {entry.title}
          </p>
          <span
            className="font-sans text-xs shrink-0 mt-0.5"
            style={{ color: "hsla(53, 53%, 84%, 0.4)" }}
          >
            {entry.year}
          </span>
        </div>
        <p className="font-sans text-xs leading-relaxed" style={{ color: "hsla(53, 53%, 84%, 0.55)" }}>
          {entry.detail}
        </p>
      </div>
    </motion.div>
  );
}

export const JourneyTimeline = () => {
  const [activeFilter, setActiveFilter] = useState<TimelineCategory | "all">("all");

  const filtered = activeFilter === "all"
    ? entries
    : entries.filter(e => e.category === activeFilter);

  return (
    <div className="mt-20">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="font-sans text-xs tracking-widest text-muted-foreground uppercase mb-3">
          My Journey
        </p>
        <h3 className="font-serif text-4xl md:text-5xl">
          The Story So Far
        </h3>
      </motion.div>

      {/* Category filter pills */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap gap-3 mb-12"
      >
        <button
          onClick={() => setActiveFilter("all")}
          className={`
            font-sans text-xs tracking-widest uppercase px-4 py-2 rounded-full
            border transition-all duration-300
            ${activeFilter === "all"
              ? "bg-foreground text-background border-foreground"
              : "border-foreground/20 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }
          `}
        >
          All
        </button>
        {CATEGORIES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveFilter(id)}
            className={`
              flex items-center gap-2 font-sans text-xs tracking-widest uppercase px-4 py-2 rounded-full
              border transition-all duration-300
              ${activeFilter === id
                ? "bg-foreground text-background border-foreground"
                : "border-foreground/20 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }
            `}
          >
            <Icon size={11} />
            {label}
          </button>
        ))}
      </motion.div>

      {/* Timeline entries */}
      <div className="max-w-xl">
        {filtered.map((entry, idx) => (
          <TimelineNode key={`${entry.category}-${entry.year}-${entry.title}`} entry={entry} idx={idx} />
        ))}
      </div>
    </div>
  );
};
