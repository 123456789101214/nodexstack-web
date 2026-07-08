"use client";

import { motion } from "framer-motion";

export default function CircuitConnector({ height = "100%" }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 w-[2px] z-[-1] flex flex-col items-center" style={{ height }}>
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-full bg-gradient-to-b from-accent-deep via-accent to-transparent opacity-30 dark:opacity-50"
      />
      {/* Decorative Nodes/Junctions will be placed relatively inside the sections themselves */}
    </div>
  );
}