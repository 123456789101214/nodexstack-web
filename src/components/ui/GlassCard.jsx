"use client";

import { motion } from "framer-motion";

export function GlassCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-[var(--radius,16px)] bg-[var(--surface)] border border-[var(--border)] p-8 transition-colors duration-300 hover:border-[var(--card-border,rgba(6,179,254,0.3))] ${className}`}
    >
      {/* Subtle hover glow effect behind the card */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-[0.03]" />
      
      <div className="relative z-10 flex h-full flex-col">
        {children}
      </div>
    </motion.div>
  );
}