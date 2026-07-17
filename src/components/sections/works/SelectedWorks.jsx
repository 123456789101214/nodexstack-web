"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Billion-dollar SaaS Portfolio Data
const projects = [
  {
    id: 1,
    title: "Aura AI Matrix",
    category: "Enterprise AI Dashboard",
    description: "Next-generation predictive analytics engine processing petabytes of data in real-time for Fortune 500 financial institutions.",
    metrics: ["$2.4B Processed", "10x Faster", "Zero Downtime"],
    tags: ["Next.js 15", "Python", "TensorFlow", "WebGL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    link: "#",
    colSpan: "col-span-1 md:col-span-2", 
  },
  {
    id: 2,
    title: "Nexus Quantum",
    category: "FinTech Infrastructure",
    description: "Decentralized payment gateway with military-grade encryption and sub-millisecond latency.",
    metrics: ["0.2ms Latency", "99.999% SLA"],
    tags: ["Rust", "React", "Node.js"],
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=3024&auto=format&fit=crop",
    link: "#",
    colSpan: "col-span-1",
  },
  {
    id: 3,
    title: "Omni Vision",
    category: "Computer Vision API",
    description: "Real-time spatial mapping and object recognition system for autonomous logistics networks.",
    metrics: ["99.8% Accuracy", "Global Scale"],
    tags: ["OpenCV", "C++", "AWS"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2865&auto=format&fit=crop",
    link: "#",
    colSpan: "col-span-1",
  },
  {
    id: 4,
    title: "Zenith Cloud",
    category: "Cloud Architecture",
    description: "Serverless edge computing platform delivering unparalleled performance across 150+ global nodes.",
    metrics: ["150+ Nodes", "Edge Computed", "Auto-scaling"],
    tags: ["Turbopack", "Go", "Docker"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop",
    link: "#",
    colSpan: "col-span-1 md:col-span-2",
  }
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  
  // Parallax effect based on scroll position
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "1.2 1"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className={`relative group rounded-3xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] ${project.colSpan} shadow-[0_10px_40px_transparent] hover:shadow-[0_10px_40px_var(--accent)]/10 transition-all duration-700`}
    >
      <Link href={project.link} className="block w-full h-full cursor-none">
        {/* Image Container with Hover Parallax */}
        <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden bg-[var(--bg)]">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center opacity-40 group-hover:opacity-70 transition-opacity duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index < 2}
            />
            {/* Theme-Adaptive Gradient Overlay for perfect text readability across all 3 themes */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/70 to-transparent transition-colors duration-700" />
          </motion.div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end pointer-events-none">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
            
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="h-[1px] w-8 bg-[var(--accent)]/50 block transition-colors duration-700"></span>
                <p className="text-[var(--accent)] font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-700">
                  {project.category}
                </p>
              </motion.div>
              
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-5xl lg:text-6xl font-medium text-[var(--text-primary)] mb-4 tracking-tight transition-colors duration-700"
              >
                {project.title}
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-xl transition-colors duration-700"
              >
                {project.description}
              </motion.p>
            </div>

            {/* Metrics & Tags - Glassmorphism style that adapts to theme */}
            <div className="flex flex-col items-start xl:items-end gap-5">
              <div className="flex flex-wrap gap-2">
                {project.metrics.map((metric, i) => (
                  <span 
                    key={i} 
                    className="px-4 py-1.5 text-xs font-medium text-[var(--text-primary)] bg-[var(--bg)]/40 backdrop-blur-xl rounded-full border border-[var(--border)] shadow-[0_4px_20px_transparent] transition-colors duration-700"
                  >
                    {metric}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-mono text-[var(--text-secondary)]/70 uppercase tracking-wider transition-colors duration-700">
                    {tag} {i !== project.tags.length - 1 && <span className="mx-2 text-[var(--border)]">•</span>}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function SelectedWorks() {
  return (
    <section id="works" className="relative w-full bg-[var(--bg)] py-32 md:py-48 z-20 overflow-hidden transition-colors duration-700">
      
      {/* Subtle Background Glow - Theme Adaptive */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--accent)]/15 blur-[120px] rounded-full pointer-events-none transition-colors duration-700" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 md:mb-32">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-[var(--accent)] font-mono text-sm tracking-widest transition-colors duration-700">03</span>
              <span className="h-[1px] w-12 bg-[var(--accent)]/30 transition-colors duration-700"></span>
              <span className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase transition-colors duration-700">Portfolio</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(3rem,8vw,6.5rem)] leading-[1.05] font-medium text-[var(--text-primary)] tracking-tighter transition-colors duration-700"
            >
              Selected <br />
              <span className="text-[var(--text-secondary)]">Masterpieces.</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg lg:pb-4"
          >
            <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed font-light transition-colors duration-700">
              We don't just write code. We architect scalable, future-proof digital 
              experiences that define industry standards for the next generation of AI.
            </p>
            <Link 
              href="/portfolio"
              className="inline-flex items-center gap-3 mt-8 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-500 group text-sm font-mono tracking-widest uppercase cursor-none"
            >
              <span>Explore Archive</span>
              <motion.span
                className="inline-block"
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}