// components/sections/hero/FloatingWidgets.jsx
"use client";

import { motion } from "framer-motion";
import { Activity, Cpu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FloatingWidgets() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block z-20">
      {/* Widget 1: Server Status */}
      <motion.div 
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="absolute top-[25%] left-[10%] animate-float"
      >
        <div className="w-64 p-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-transparent opacity-50" />
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
              <Activity className="w-4 h-4 text-accent-cyan" />
            </div>
            <div>
              <p className="text-xs text-white/50 font-medium">Node.js Edge</p>
              <p className="text-sm text-white font-semibold">99.99% Uptime</p>
            </div>
          </div>
          {/* Mock Graph */}
          <div className="w-full h-10 flex items-end gap-1 relative z-10">
            {[40, 70, 45, 90, 60, 85, 100, 75, 50, 80].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: 1 + (i * 0.1) }}
                className="flex-1 bg-gradient-to-t from-accent-cyan/20 to-accent-cyan/60 rounded-t-sm"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Widget 2: AI Processing */}
      <motion.div 
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        className="absolute top-[40%] right-[10%] animate-float-delayed"
      >
        <div className="w-72 p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-[0_0_50px_rgba(0,128,255,0.1)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-blue" />
              <span className="text-xs font-semibold text-white/70">AI Inference</span>
            </div>
            <span className="text-xs font-mono text-accent-cyan">12ms</span>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.5, delay: 1.2, ease: "circOut" }}
                className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full"
              />
            </div>
            <p className="text-[10px] text-white/40 text-right font-mono">Processing payload_v4.json...</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}