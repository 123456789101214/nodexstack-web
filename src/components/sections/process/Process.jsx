// components/sections/process/Process.jsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GitMerge, Code2, Rocket, BrainCircuit, ShieldCheck } from "lucide-react";

const processSteps = [
  {
    id: "01",
    title: "Discovery & AI Architecture",
    description: "We don't just take requirements; we architect solutions. Analyzing your infrastructure to design high-performance, AI-driven ecosystems tailored for massive scale.",
    icon: <BrainCircuit className="w-5 h-5 text-[var(--accent)]" />,
    tech: ["System Design", "Feasibility", "AI Modeling"],
  },
  {
    id: "02",
    title: "UI/UX & Interaction Design",
    description: "Crafting Awwwards-winning digital experiences. We blend Japanese minimalism with luxury editorial design to create interfaces that feel alive, intuitive, and premium.",
    icon: <Code2 className="w-5 h-5 text-[var(--accent-deep,var(--accent))]" />,
    tech: ["Figma", "Framer", "Design Systems"],
  },
  {
    id: "03",
    title: "Agile Engineering & ML Integration",
    description: "Writing enterprise-grade code. Leveraging React 19, Next.js 15, and custom LLM integrations to build microservices that guarantee sub-50ms response times.",
    icon: <GitMerge className="w-5 h-5 text-[var(--text-primary)]" />,
    tech: ["Next.js", "Python", "Vector DBs"],
  },
  {
    id: "04",
    title: "Quality Assurance & Security",
    description: "Military-grade testing protocols. Zero-trust architectures, penetration testing, and automated CI/CD pipelines ensure your product is unbreachable and bug-free.",
    icon: <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />,
    tech: ["Jest", "Cypress", "Zero-Trust"],
  },
  {
    id: "05",
    title: "Global Edge Deployment",
    description: "Deploying to the edge. We utilize Vercel's global network and advanced Kubernetes clusters to ensure 99.99% uptime for users anywhere in the world.",
    icon: <Rocket className="w-5 h-5 text-[var(--accent-deep,var(--accent))]" />,
    tech: ["Vercel Edge", "Docker", "K8s"],
  },
];

export default function Process() {
  const containerRef = useRef(null);

  // Scroll setup for the animated vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative w-full bg-[var(--bg)] py-32 z-20 overflow-hidden transition-colors duration-700">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[50vw] h-[50vw] bg-[var(--accent)]/10 blur-[120px] rounded-full mix-blend-normal" />
        <div className="absolute bottom-1/4 -left-1/4 w-[40vw] h-[40vw] bg-[var(--accent-deep,var(--accent))]/10 blur-[120px] rounded-full mix-blend-normal" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
              <span className="text-xs font-medium tracking-wide text-[var(--text-secondary)] uppercase">Methodology</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              The Engine Behind <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-primary)]/80 to-[var(--text-primary)]/40">
                World-Class Software.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative w-full">
          
          {/* Default Faded Line */}
          <div className="absolute left-[27px] md:left-[39px] top-0 bottom-0 w-[2px] bg-[var(--border)]" />
          
          {/* Animated Glowing Progress Line */}
          <motion.div 
            className="absolute left-[27px] md:left-[39px] top-0 w-[2px] bg-gradient-to-b from-[var(--accent)] via-[var(--accent-deep,var(--accent))]/80 to-transparent shadow-[0_0_15px_var(--accent)]"
            style={{ height: lineHeight }}
          />

          {/* Steps */}
          <div className="flex flex-col gap-16 md:gap-24">
            {processSteps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-start gap-8 md:gap-16 group"
              >
                {/* Timeline Node */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)]/50 group-hover:shadow-[0_0_20px_var(--accent)] transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="font-mono text-lg md:text-2xl font-bold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors relative z-10">
                      {step.id}
                    </span>
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1 pt-2 md:pt-4">
                  <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-xl group-hover:bg-[var(--surface)]/70 transition-colors duration-500 relative overflow-hidden">
                    
                    {/* Hover Glow Effect inside card */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="flex items-center gap-4 mb-4 relative z-10">
                      <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                        {step.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-light mb-6 max-w-2xl relative z-10">
                      {step.description}
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap items-center gap-2 relative z-10">
                      {step.tech.map((techItem, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 text-[10px] md:text-xs font-mono font-medium rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] group-hover:border-[var(--accent)]/40 group-hover:text-[var(--text-primary)] transition-colors duration-300"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}