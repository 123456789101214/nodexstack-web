"use client";

import { motion } from "framer-motion";
import { Layers, Brain, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

const works = [
  {
    id: 1,
    title: "FinSight Analytics",
    description: "Real-time financial analytics platform for smarter investment decisions.",
    icon: Layers,
    mockupBg: "bg-gradient-to-br from-blue-900/40 to-slate-800/40", // Image placeholder gradient
  },
  {
    id: 2,
    title: "Nexa AI Assistant",
    description: "Enterprise AI assistant that enhances productivity across teams.",
    icon: Brain,
    mockupBg: "bg-gradient-to-br from-indigo-900/40 to-purple-900/40",
  },
  {
    id: 3,
    title: "Vista Travel Platform",
    description: "Modern booking experience with seamless user journeys.",
    icon: Rocket,
    mockupBg: "bg-gradient-to-br from-emerald-900/40 to-teal-900/40",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SelectedWork() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-24 z-10" id="work">
      <div className="mb-12">
        <span className="text-[var(--accent)] font-semibold tracking-wider text-sm mb-4 block uppercase flex items-center gap-2">
          <span className="font-mono">{"</>"}</span> SELECTED WORK
        </span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {works.map((work) => {
          const Icon = work.icon;
          return (
            <motion.div key={work.id} variants={itemVariants} className="group relative flex flex-col h-full rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_0_30px_rgba(6,179,254,0.1)]">
              
              {/* Mockup Image Area */}
              <div className={`w-full h-48 ${work.mockupBg} relative overflow-hidden flex items-center justify-center border-b border-[var(--border)]`}>
                <span className="text-[var(--text-secondary)] text-sm font-mono opacity-50">Mockup Image Placement</span>
              </div>

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-grow relative">
                {/* Floating Badge */}
                <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] border border-[color-mix(in_srgb,var(--accent)_30%,transparent)] flex items-center justify-center text-[var(--accent)] backdrop-blur-md">
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                <h3 className="text-2xl font-bold text-[var(--text-primary)] mt-4 mb-3 font-heading">
                  {work.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                  {work.description}
                </p>

                {/* Footer CTA: Unifying Text & Icon */}
                <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-between">
                  <Link href={`/case-studies/${work.id}`} className="text-[var(--accent)] font-medium flex items-center gap-2 hover:opacity-80 transition-opacity">
                    View Case Study
                  </Link>
                  <button className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors" aria-label="View Project">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}