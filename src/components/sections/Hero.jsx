"use client";

import dynamic from "next/dynamic";
import { Code2 } from "lucide-react";
import GlowButton from "../ui/GlowButton";

// Dynamically import the Globe component with SSR disabled
const NodeGlobe = dynamic(() => import("../globe/NodeGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square min-h-[420px] max-h-[640px] rounded-2xl border border-border bg-surface/50 animate-pulse flex items-center justify-center">
      <span className="text-text-secondary text-sm tracking-widest">INITIALIZING NODE...</span>
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Content Column */}
          <div className="max-w-2xl">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-surface/50 mb-8 backdrop-blur-sm">
              <Code2 size={14} className="text-accent" />
              <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                Engineering · AI · UI/UX
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold font-display leading-[1.1] tracking-tight text-text-primary mb-6">
              Engineering <br />
              Scalable Digital <br />
              <span className="text-accent">Solutions</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-text-secondary mb-10 max-w-xl leading-relaxed">
              We build intelligent, high-performance digital products that help businesses scale with confidence.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <GlowButton href="#contact" variant="primary">
                Start a Project
              </GlowButton>
              <GlowButton href="#work" variant="outline">
                View Our Work
              </GlowButton>
            </div>
          </div>

          {/* Visual/Globe Column */}
          <div className="relative w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[600px] relative z-10">
              {/* Optional: Add background glow blob behind globe based on theme */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent/20 dark:bg-accent/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
              <NodeGlobe />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}