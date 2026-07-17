// components/sections/hero/Hero.jsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Activity } from "lucide-react";
import NodeGlobe from "../../ui/NodeGlobe";
import ThreeParticles from "@/components/ui/ThreeParticles";

export default function Hero() {
  // Framer Motion variants for premium staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section className="relative min-h-screen w-full bg-[var(--bg)] flex items-center justify-center overflow-hidden pt-20 transition-colors duration-700 lg:pt-32">
      
      {/* 1. Ambient Background Effects (Theme Adaptive) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Grid - Uses CSS variable border for seamless theme switching */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
        
        {/* Aurora Glows - Tied to theme accents */}
        <div className="absolute top-0 left-1/4 w-[80vw] md:w-[50vw] h-[50vh] bg-[var(--accent)]/15 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[60vw] h-[60vh] bg-[var(--accent-deep)]/15 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* 2. 3D Particles (Mouse Interactive Layer) */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-luminosity">
        <ThreeParticles />
      </div>

      {/* Premium Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-0" />
      
      {/* 3. Main Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography, CTAs, Floating Widgets */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col relative z-20 pointer-events-auto"
          >
            {/* AI Badge - Glassmorphism adapting to surface variable */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)]/60 border border-[var(--border)] w-max mb-8 mt-12 lg:mt-0 backdrop-blur-xl shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_10px_var(--accent)]" />
              <span className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-widest">
                Next-Gen AI Engineering
              </span>
            </motion.div>

            {/* Main Headline - Fluid Typography with Theme Accents */}
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--text-primary)] mb-6 leading-[1.1]">
              Architecting the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)]">
                Future of Software.
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-lg leading-relaxed font-light">
              We build premium, high-performance AI SaaS platforms and enterprise applications designed for the next decade of technology.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
              {/* Primary CTA - High Contrast Dynamic Button */}
              <button className="group relative px-8 py-4 bg-[var(--text-primary)] text-[var(--bg)] rounded-full font-medium overflow-hidden transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Solutions
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>

              {/* Secondary CTA - Glassmorphic Outlined */}
              <button className="group px-8 py-4 rounded-full font-medium text-[var(--text-primary)] bg-[var(--surface)]/30 border border-[var(--border)] hover:bg-[var(--surface)]/80 transition-all duration-300 backdrop-blur-md flex items-center gap-2 shadow-sm">
                <Code2 className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300" />
                View Enterprise Stack
              </button>
            </motion.div>

            {/* Floating Glass Widget (Metrics) */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="mt-14 p-5 rounded-2xl bg-[var(--surface)]/50 border border-[var(--border)] backdrop-blur-xl max-w-sm flex items-center gap-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center border border-[var(--accent)]/20">
                <Activity className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--text-secondary)] mb-1">System Performance</div>
                <div className="text-[var(--text-primary)] font-semibold flex items-center gap-2 text-lg">
                  99.99% Global Uptime
                  <span className="flex h-2.5 w-2.5 relative ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: NodeGlobe Interactive 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="relative w-full h-full min-h-[500px] flex items-center justify-center z-20"
          >
            {/* Theme-adaptive soft glow behind the globe */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/10 to-transparent blur-3xl rounded-full pointer-events-none transition-colors duration-700" />
            
            <NodeGlobe hideHUD={false} />
          </motion.div>

        </div>
      </div>

      {/* Bottom Gradient Fade - Ensures smooth blend into the next section across all themes */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[var(--bg)] to-transparent z-10 pointer-events-none transition-colors duration-700" />
    </section>
  );
}