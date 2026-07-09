"use client";

import { motion } from "framer-motion";

const techStack = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "var(--text-primary)" }, // Adapts to theme
  { name: "TypeScript", color: "#3178C6" },
  { name: "Node.js", color: "#339933" },
  { name: "Python", color: "#3776AB" },
  { name: "AWS", color: "#FF9900" },
  { name: "Docker", color: "#2496ED" },
  { name: "MongoDB", color: "#47A248" },
];

export default function Technologies() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-24 z-10">
      <div className="flex items-center gap-4 mb-12 border-b border-[var(--border)] pb-4">
         <span className="text-[var(--accent)] font-semibold tracking-wider text-sm uppercase flex items-center gap-2">
          <span className="font-mono">{"</>"}</span> TECHNOLOGIES WE WORK WITH
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 py-8 bg-[var(--surface)] border border-[var(--border)] rounded-2xl px-10 shadow-sm">
        {techStack.map((tech, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2 cursor-pointer grayscale opacity-50 transition-all duration-300"
            whileHover={{ 
              grayscale: 0, 
              opacity: 1, 
              scale: 1.05,
              textShadow: `0px 0px 8px ${tech.color}40` // Hex color with alpha for subtle glow
            }}
          >
            {/* Using a generic Box icon as placeholder for brand logos */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={tech.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
            <span className="font-semibold text-lg font-heading" style={{ color: tech.color }}>
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}