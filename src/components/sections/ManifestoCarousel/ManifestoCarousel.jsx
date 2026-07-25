"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

const engineeringStandards = [
  {
    id: 1,
    metric: "01",
    title: "Edge-First Architecture",
    description: "We deploy globally on the edge. Sub-50ms latency isn't a goal; it's our baseline. Your application responds faster than human perception.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 2,
    metric: "02",
    title: "Pixel-Perfect Precision",
    description: "Built on Tailwind v4 and Framer Motion. We don't just write CSS; we engineer fluid, 60fps cinematic interfaces that command attention.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    id: 3,
    metric: "03",
    title: "Native AI Integration",
    description: "We don't bolt on AI as an afterthought. We architect systems where machine learning and AI agents are woven into the core infrastructure.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    id: 4,
    metric: "04",
    title: "Zero-Downtime Reliability",
    description: "Enterprise-grade microservices designed for absolute fault tolerance. When the world is watching, your product never goes offline.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
];

export default function ManifestoCarousel() {
  const [isHovered, setIsHovered] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  
  const innerRef = useRef(null);
  const x = useMotionValue(0);

  // Measure the width for seamless looping
  useEffect(() => {
    const calculateWidth = () => {
      if (innerRef.current) {
        setContentWidth(innerRef.current.offsetWidth + 24); // 24px is the gap
      }
    };

    calculateWidth();
    
    // Robust resize handling (Tailwind v4 optimization)
    const resizeObserver = new ResizeObserver(calculateWidth);
    if (innerRef.current) resizeObserver.observe(innerRef.current);
    
    return () => resizeObserver.disconnect();
  }, []);

  // Buttery smooth 60fps infinite scroll
  useAnimationFrame((time, delta) => {
    if (isHovered || contentWidth === 0) return;
    
    const moveBy = (delta / 1000) * 40; // Adjusted for a more elegant, slower premium speed
    let currentX = x.get();
    
    currentX -= moveBy;

    if (currentX <= -contentWidth) {
      currentX += contentWidth;
    }
    
    x.set(currentX);
  });

  return (
    <section className="relative w-full py-32 overflow-hidden bg-[var(--bg)] transition-colors duration-700">
      
      {/* Subtle background noise and dynamic glow adapted for current theme */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-10 bg-[url('/noise.svg')]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent)]/10 blur-[150px] rounded-full pointer-events-none transition-colors duration-700" />

      <div className="container mx-auto px-6 relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", damping: 20, stiffness: 80 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-[var(--text-primary)] mb-6 transition-colors duration-700">
              Engineering without <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)]/50">
                compromise.
              </span>
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] text-lg max-w-sm mb-2 font-light transition-colors duration-700">
            We don't do average. Swipe to explore the architectural standards that power our digital masterpieces.
          </p>
        </motion.div>
      </div>

      {/* Infinite Carousel Container */}
      <div 
        className="relative z-10 w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <motion.div 
          style={{ x }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={() => setIsHovered(true)}
          onPointerUp={() => setIsHovered(false)}
          className="flex w-max cursor-grab active:cursor-grabbing py-8"
        >
          {/* Duplicated blocks for seamless looping */}
          {[1, 2].map((blockId) => (
            <div 
              key={blockId} 
              ref={blockId === 1 ? innerRef : null}
              className="flex gap-6 pr-6"
            >
              {engineeringStandards.map((standard) => (
                <motion.div
                  key={`${blockId}-${standard.id}`}
                  whileHover={{ y: -8, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="relative group w-[340px] md:w-[420px] p-8 rounded-3xl bg-[var(--surface)]/40 backdrop-blur-xl border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all duration-500 flex flex-col justify-between h-[340px] overflow-hidden cursor-pointer hover:shadow-[0_8px_30px_var(--accent)]/10"
                >
                  {/* Subtle Hover Gradient Inside Card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/40 group-hover:bg-[var(--accent)]/5 transition-all duration-500 group-hover:scale-110">
                        {standard.icon}
                      </div>
                      <span className="text-xs font-mono text-[var(--text-secondary)]/70 tracking-widest transition-colors duration-500">
                        {standard.metric}
                      </span>
                    </div>
                    
                    <div className="mt-auto">
                      <h4 className="text-2xl font-medium text-[var(--text-primary)] mb-3 tracking-tight transition-colors duration-700">
                        {standard.title}
                      </h4>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-light group-hover:text-[var(--text-primary)] transition-colors duration-500">
                        {standard.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}