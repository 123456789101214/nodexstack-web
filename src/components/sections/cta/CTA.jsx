"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// 🚀 Premium Magnetic Wrapper Component for Reusability
const MagneticWrapper = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // 35% magnetic pull for a subtle, high-end physics feel
    const x = (clientX - (left + width / 2)) * 0.35; 
    const y = (clientY - (top + height / 2)) * 0.35;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer p-6 -m-6 ${className}`} // Padding increases the magnetic hit area
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function CTA() {
  const containerRef = useRef(null);

  // Premium scroll interactions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleTransform = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacityTransform = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const yTransform = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section id="contact"
      ref={containerRef}
      className="relative w-full min-h-[90vh] flex items-center justify-center bg-[var(--bg)] py-32 px-4 md:px-12 overflow-hidden transition-colors duration-700"
    >
      {/* Aurora Background Effects */}
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
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto flex flex-col items-center relative z-20"
        >
          {/* Status Badge */}
          <div className="px-6 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-md mb-10 inline-flex items-center gap-3 shadow-sm transition-colors duration-700">
            <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
            <span className="text-[var(--text-secondary)] text-xs md:text-sm font-semibold tracking-widest uppercase transition-colors duration-700">
              Available for new enterprise projects
            </span>
          </div>
          
          {/* Typography */}
          <h2 className="text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[1.05] tracking-tight text-[var(--text-primary)] mb-8 transition-colors duration-700">
            Architecting the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep,var(--accent))]">
              Future of Software.
            </span>
          </h2>
          
          <p className="text-lg md:text-2xl text-[var(--text-secondary)] max-w-2xl mb-14 font-light leading-relaxed transition-colors duration-700">
            Partner with NodeXstack to engineer scalable, AI-driven solutions that define the next generation of the web.
          </p>

          {/* Button Group (Flex Row on Desktop, Col on Mobile) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-4">
            
            {/* Primary CTA - Start Building */}
            <MagneticWrapper>
              <Link 
                href="/contact" 
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 md:px-12 md:py-6 rounded-full bg-[var(--text-primary)] text-[var(--bg)] font-medium text-lg md:text-xl tracking-wide overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_var(--accent)]/30"
              target="_blank">
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
            </MagneticWrapper>

            {/* Secondary CTA - WhatsApp */}
            <MagneticWrapper>
              <a 
                href="https://wa.me/94773205206" // Replace with actual WhatsApp number
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-5 md:px-10 md:py-6 rounded-full bg-[var(--surface)]/30 backdrop-blur-md border border-[var(--border)] text-[var(--text-primary)] font-medium text-lg md:text-xl tracking-wide overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-[#25D366]/50 hover:bg-[#25D366]/5 shadow-sm hover:shadow-[0_0_30px_rgba(37,211,102,0.15)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {/* Premium WhatsApp SVG Icon */}
                  <svg 
                    className="w-5 h-5 md:w-6 md:h-6 text-[var(--text-secondary)] group-hover:text-[#25D366] transition-colors duration-300" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  Chat on WhatsApp
                </span>
              </a>
            </MagneticWrapper>

          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}