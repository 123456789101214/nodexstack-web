"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [btnPosition, setBtnPosition] = useState({ x: 0, y: 0 });

  // Premium scroll interactions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleTransform = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacityTransform = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const yTransform = useTransform(scrollYProgress, [0, 1], [50, 0]);

  // Magnetic Button Logic - Physics based
  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    const x = (clientX - (left + width / 2)) * 0.35; // 35% magnetic pull for premium feel
    const y = (clientY - (top + height / 2)) * 0.35;
    
    setBtnPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setBtnPosition({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[90vh] flex items-center justify-center bg-[var(--bg)] py-32 px-4 md:px-12 overflow-hidden transition-colors duration-700"
    >
      {/* Aurora Background Effects - Theme Compatible (Removed mix-blend-screen for light mode visibility) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div 
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] absolute bg-[var(--accent)]/15 rounded-full blur-[100px] md:blur-[140px] opacity-70"
        />
        <motion.div 
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-[80vw] h-[80vw] md:w-[55vw] md:h-[55vw] absolute bg-[var(--accent-deep,var(--accent))]/10 rounded-full blur-[120px] md:blur-[160px] translate-x-1/4 -translate-y-1/4 opacity-70"
        />
      </div>

      {/* Main Glass Container */}
      <motion.div 
        style={{ scale: scaleTransform, opacity: opacityTransform, y: yTransform }}
        className="relative z-10 w-full max-w-6xl bg-[var(--surface)]/50 backdrop-blur-2xl border border-[var(--border)] rounded-[2.5rem] p-10 md:p-24 overflow-hidden flex flex-col items-center text-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] md:shadow-[0_0_20px_var(--cursor-glow-1)] transition-colors duration-700"
      >
        {/* Subtle noise texture overlay for physical luxury feel */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Status Badge */}
          <div className="px-6 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-md mb-10 inline-flex items-center gap-3 shadow-sm transition-colors duration-700">
            <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
            <span className="text-[var(--text-secondary)] text-xs md:text-sm font-semibold tracking-widest uppercase transition-colors duration-700">
              Available for new enterprise projects
            </span>
          </div>
          
          {/* Typography - Fluid & Editorial */}
          <h2 className="text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[1.05] tracking-tight text-[var(--text-primary)] mb-8 transition-colors duration-700">
            Architecting the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep,var(--accent))]">
              Future of Software.
            </span>
          </h2>
          
          <p className="text-lg md:text-2xl text-[var(--text-secondary)] max-w-2xl mb-14 font-light leading-relaxed transition-colors duration-700">
            Partner with NodeXstack to engineer scalable, AI-driven solutions that define the next generation of the web.
          </p>

          {/* Magnetic CTA Button Area */}
          <div 
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="p-8 -m-8 relative z-20 cursor-pointer"
          >
            <motion.div
              animate={{ x: btnPosition.x, y: btnPosition.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            >
              {/* Button styling ensures high contrast across all 3 themes by inverting background and text colors */}
              <Link 
                href="/contact" 
                className="group relative inline-flex items-center justify-center px-10 py-5 md:px-12 md:py-6 rounded-full bg-[var(--text-primary)] text-[var(--bg)] font-medium text-lg md:text-xl tracking-wide overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_var(--accent)]/30"
              >
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep,var(--accent))] opacity-0 group-hover:opacity-15 transition-opacity duration-500 ease-out" />
                
                <span className="relative z-10 flex items-center gap-3">
                  Start Building
                  <motion.svg 
                    className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}