"use client";

import { Search, Cuboid, CodeXml, Rocket } from "lucide-react";
import { CircuitConnector } from "@/components/ui/CircuitConnector";
import { motion } from "framer-motion";

const processSteps = [
  {
    num: "01",
    title: "Discover",
    description: "We understand your goals, users, and challenges.",
    icon: Search,
    align: "start",
  },
  {
    num: "02",
    title: "Architect",
    description: "We design the right solution with clarity and precision.",
    icon: Cuboid,
    align: "end", // For desktop staggering effect
  },
  {
    num: "03",
    title: "Build",
    description: "We engineer with clean code and rigorous quality.",
    icon: CodeXml,
    align: "start",
  },
  {
    num: "04",
    title: "Deploy",
    description: "We launch, monitor, and scale with confidence.",
    icon: Rocket,
    align: "end",
  },
];

export default function OurProcess() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 mx-auto max-w-[1440px]">
      <div className="mb-16 md:mb-24">
        <span className="text-[var(--accent)] font-mono text-sm tracking-widest font-semibold uppercase">
          &lt;/&gt; OUR PROCESS
        </span>
      </div>

      <div className="relative min-h-[400px]">
        {/* Background Glowing Circuit Thread */}
        <CircuitConnector />

        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12 md:gap-4 lg:gap-8">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            // Desktop Y-offset for zigzag effect matching the design
            const desktopTransform = step.align === "end" ? "md:translate-y-24" : "";

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex flex-row md:flex-col items-center md:items-start text-left md:text-center flex-1 ${desktopTransform}`}
              >
                {/* Number & Icon Wrapper */}
                <div className="flex flex-col md:flex-row items-center gap-4 mb-0 md:mb-6 mr-6 md:mr-0 shrink-0">
                  <span className="text-3xl md:text-4xl font-bold text-[var(--accent)] font-sans">
                    {step.num}
                  </span>
                  
                  {/* Glowing Node / Icon */}
                  <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-[0_0_25px_rgba(6,179,254,0.1)] z-10">
                    {/* Inner glowing dot effect behind icon */}
                    <div className="absolute inset-0 rounded-full bg-[var(--accent)]/5 shadow-[inset_0_0_15px_rgba(6,179,254,0.15)]" />
                    <Icon className="text-[var(--text-primary)]" size={32} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] font-sans mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed max-w-[240px] md:mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}