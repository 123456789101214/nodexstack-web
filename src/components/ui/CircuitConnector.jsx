"use client";

import { motion } from "framer-motion";

export function CircuitConnector() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
      {/* Desktop Horizontal Line */}
      <svg 
        className="hidden md:block w-full h-[200px] absolute top-1/2 -translate-y-1/2" 
        viewBox="0 0 1200 200" 
        fill="none" 
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M 100,100 L 250,100 L 300,50 L 550,50 L 600,150 L 850,150 L 900,100 L 1100,100"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeOpacity="0.3"
          strokeDasharray="6 6"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {/* Glow behind the path */}
        <motion.path
          d="M 100,100 L 250,100 L 300,50 L 550,50 L 600,150 L 850,150 L 900,100 L 1100,100"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeOpacity="0.1"
          style={{ filter: "blur(4px)" }}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Mobile Vertical Line */}
      <svg 
        className="block md:hidden w-[100px] h-full absolute left-8 top-0" 
        viewBox="0 0 100 800" 
        fill="none" 
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M 20,0 L 20,800"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeOpacity="0.3"
          strokeDasharray="6 6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
      </svg>
    </div>
  );
}