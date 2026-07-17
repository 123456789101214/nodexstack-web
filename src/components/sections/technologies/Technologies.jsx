'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const technologies = [
  { name: 'Next.js 15', tier: 1, color: 'from-zinc-100 to-zinc-400' },
  { name: 'React 19', tier: 1, color: 'from-cyan-400 to-blue-500' },
  { name: 'Node.js', tier: 2, color: 'from-green-400 to-emerald-600' },
  { name: 'Python', tier: 1, color: 'from-yellow-400 to-blue-500' },
  { name: 'TensorFlow', tier: 2, color: 'from-orange-500 to-red-500' },
  { name: 'AWS', tier: 1, color: 'from-orange-400 to-yellow-500' },
  { name: 'Rust', tier: 3, color: 'from-orange-700 to-red-900' },
  { name: 'Tailwind v4', tier: 2, color: 'from-cyan-300 to-blue-500' },
  { name: 'Framer Motion', tier: 2, color: 'from-purple-500 to-pink-500' },
  { name: 'MongoDB', tier: 3, color: 'from-green-500 to-emerald-700' },
  { name: 'PostgreSQL', tier: 2, color: 'from-blue-400 to-indigo-600' },
  { name: 'Turbopack', tier: 3, color: 'from-red-400 to-pink-600' },
  { name: 'Vercel', tier: 1, color: 'from-zinc-100 to-zinc-500' },
  { name: 'Docker', tier: 3, color: 'from-blue-400 to-cyan-600' },
  { name: 'GraphQL', tier: 3, color: 'from-pink-400 to-purple-600' },
];

export default function Technologies() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Awwwards-level subtle parallax for the background glows
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 40; // 40px max movement
      const y = (e.clientY / innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[100vh] py-32 bg-[var(--bg)] overflow-hidden flex flex-col items-center justify-center transition-colors duration-700 ease-in-out"
    >
      {/* Deep Space Background Glow - Theme Adaptive */}
      <motion.div 
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 40, damping: 30 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[var(--accent)]/10 blur-[120px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ x: -mousePos.x, y: -mousePos.y }} // Moves opposite direction for depth
        transition={{ type: "spring", stiffness: 35, damping: 25 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-[var(--accent-deep)]/10 blur-[100px] rounded-full pointer-events-none" 
      />

      {/* Grid Noise Texture (Subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("/noise.png")' }} 
      />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block py-1 px-3 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium tracking-wide mb-4 transition-colors duration-500">
              Engineering Ecosystem
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-[var(--text-primary)] transition-colors duration-500"
          >
            Powered by the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)]">
              Future of Code.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-light transition-colors duration-500"
          >
            We leverage an enterprise-grade stack to build AI-driven, highly scalable, and meticulously crafted software solutions.
          </motion.p>
        </div>

        {/* Floating Ecosystem Flow */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8">
          {technologies.map((tech, index) => {
            // Determine size and floating dynamics based on tier
            const isLarge = tech.tier === 1;
            const isMedium = tech.tier === 2;
            
            // Randomize floating delays and durations for an organic feel
            const floatDuration = 4 + Math.random() * 4;
            const floatDelay = Math.random() * 2;
            const yOffset = 10 + Math.random() * 15;

            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.05, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="relative group cursor-pointer"
              >
                <motion.div
                  animate={{
                    y: [0, -yOffset, 0],
                  }}
                  transition={{
                    duration: floatDuration,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: floatDelay,
                  }}
                  className={`
                    relative flex items-center justify-center rounded-full 
                    border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-xl
                    transition-all duration-500 ease-out 
                    hover:bg-[var(--surface)] hover:border-[var(--accent)]/50
                    hover:scale-105
                    ${isLarge ? 'px-8 py-4 text-xl md:text-2xl font-semibold' : 
                      isMedium ? 'px-6 py-3 text-lg md:text-xl font-medium' : 
                      'px-5 py-2.5 text-base font-normal opacity-80 hover:opacity-100'}
                  `}
                >
                  {/* Subtle inner gradient text (Colors adapt beautifully with the background theme) */}
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${tech.color} drop-shadow-sm`}>
                    {tech.name}
                  </span>

                  {/* Soft Ambient Glow on Hover (No harsh shadows) */}
                  <div className="absolute inset-0 rounded-full bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/10 blur-md transition-colors duration-500 -z-10" />

                  {/* Sharp Hover Border Ring */}
                  <div className="absolute inset-0 rounded-full border border-[var(--accent)]/0 group-hover:border-[var(--accent)]/40 transition-colors duration-500" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom fade out to next section - dynamically uses var(--bg) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none transition-colors duration-700" />
    </section>
  );
}