"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Terminal } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const NodeGlobe = dynamic(() => import("@/components/globe/NodeGlobe"), {
  ssr: false,
});

export default function ComingSoon() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg">

      {/* Glassmorphism Navbar with Official Logo */}
      <div className="absolute top-0 left-0 w-full px-6 py-4 md:px-12 flex justify-between items-center z-50 bg-surface/30 backdrop-blur-md border-b border-border shadow-sm">
        <div className="flex items-center gap-3">
          {/* Light Theme Logo */}
          <img
            src="/logo-light.png"
            alt="NodeXstack Light Logo"
            className="theme-logo-light h-10 md:h-12 lg:h-14 w-auto object-contain transition-opacity duration-300"
          />

          {/* Dark Theme Logo */}
          <img
            src="/logo-dark.png"
            alt="NodeXstack Dark Logo"
            className="theme-logo-dark h-10 md:h-12 lg:h-14 w-auto object-contain transition-opacity duration-300"
          />
        </div>
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </div>

      {/* 3D Globe Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 dark:opacity-50 mt-15 md:mt-0">
        <div className="w-[1200px] max-w-full scale-125 md:scale-110">
          {/* Methana hideHUD={true} dammama text okkoma hide wenawa */}
          <NodeGlobe hideHUD={true} />
        </div>
      </div>

      {/* Animated Glassmorphism Content Card */}
      <div className="relative z-10 w-full max-w-2xl px-6 pointer-events-none mt-16 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-surface/70 dark:bg-surface/40 backdrop-blur-2xl border border-border/50 rounded-3xl p-8 md:p-14 shadow-2xl text-center pointer-events-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-8 backdrop-blur-md"
          >
            <Terminal size={14} className="text-accent animate-pulse" />
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-accent uppercase">
              System Initializing
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-6 tracking-tight leading-[1.1]"
          >
            Engineering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-deep">
              Next Generation.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-base md:text-lg text-text-secondary mb-10 max-w-md mx-auto leading-relaxed"
          >
            Our premium digital experience is currently under construction. Join the waitlist to get notified when we launch.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex-grow">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-bg/50 border border-border focus:border-accent rounded-xl py-3 pl-12 pr-4 text-text-primary outline-none transition-all duration-300 placeholder:text-text-secondary/50 font-body"
              />
            </div>
            <button
              type="submit"
              className="bg-accent hover:brightness-110 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(29,172,253,0.3)] hover:shadow-[0_0_25px_rgba(29,172,253,0.5)] whitespace-nowrap"
            >
              Notify Me <ArrowRight size={18} />
            </button>
          </motion.form>
        </motion.div>
      </div>

    </main>
  );
}