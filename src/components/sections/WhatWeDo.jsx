"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { CodeXml, Brain, PenTool, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Custom Software Development",
    description: "Scalable, secure, and high-performance software built for your business.",
    icon: CodeXml,
  },
  {
    title: "AI Integrations",
    description: "Intelligent solutions that automate, optimize, and drive real impact.",
    icon: Brain,
  },
  {
    title: "Premium UI/UX Design",
    description: "Beautiful, intuitive experiences that users love.",
    icon: PenTool,
  },
];

export default function WhatWeDo() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 mx-auto max-w-[1440px] z-10">
      <div className="mb-12">
        <span className="text-[var(--accent)] font-mono text-sm tracking-widest font-semibold uppercase">
          &lt;/&gt; WHAT WE DO
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <GlassCard key={index} delay={index * 0.15}>
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] ring-1 ring-[var(--accent)]/20 shadow-[0_0_20px_rgba(6,179,254,0.15)]">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-bold text-[var(--text-primary)] font-sans mb-4 tracking-tight">
                {service.title}
              </h3>
              
              <p className="text-[var(--text-secondary)] leading-relaxed mb-12 flex-grow">
                {service.description}
              </p>

              <div className="mt-auto flex justify-end">
                <Link 
                  href="/services" 
                  className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 bg-[var(--bg)]"
                  aria-label={`Learn more about ${service.title}`}
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}