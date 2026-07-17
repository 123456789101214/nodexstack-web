// components/sections/services/Services.jsx
"use client";

import { motion } from "framer-motion";
import { Cpu, Network, Shield, Zap, Globe, Database, ArrowUpRight } from "lucide-react";

const servicesData = [
  {
    title: "AI Infrastructure & LLMs",
    description: "Custom-trained machine learning models and neural networks deployed on high-performance edge infrastructure for real-time inference.",
    icon: <Cpu className="w-6 h-6" />,
    gradient: "from-[var(--accent)]/20 to-transparent",
  },
  {
    title: "Enterprise Architecture",
    description: "Scalable, microservices-based backend systems designed to handle millions of concurrent operations with 99.99% guaranteed uptime.",
    icon: <Network className="w-6 h-6" />,
    gradient: "from-[var(--accent-deep)]/20 to-transparent",
  },
  {
    title: "Cybersecurity & Auth",
    description: "Military-grade encryption, zero-trust architectures, and seamless biometric authentication flows for enterprise applications.",
    icon: <Shield className="w-6 h-6" />,
    gradient: "from-[var(--text-primary)]/10 to-transparent",
  },
  {
    title: "Real-time Autonomous Systems",
    description: "Low-latency WebSocket architectures and event-driven data pipelines for autonomous decision-making platforms.",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-[var(--accent)]/20 to-transparent",
  },
  {
    title: "Global Edge Delivery",
    description: "Next.js App Router architectures globally distributed via Vercel Edge networks for sub-50ms TTFB worldwide.",
    icon: <Globe className="w-6 h-6" />,
    gradient: "from-[var(--accent-deep)]/20 to-transparent",
  },
  {
    title: "High-Volume Data Lakes",
    description: "Advanced PostgreSQL and vector database integrations optimized for complex AI queries and big data analytics.",
    icon: <Database className="w-6 h-6" />,
    gradient: "from-[var(--text-primary)]/10 to-transparent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Services() {
  return (
    <section id="services" className="relative w-full bg-[var(--bg)] py-32 z-20 transition-colors duration-700">
      
      {/* Top Divider with Glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent blur-sm" />

      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-xs font-medium tracking-wide text-[var(--text-secondary)] uppercase">Capabilities</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)]">Impossible.</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-[var(--text-secondary)] max-w-sm text-sm leading-relaxed">
              We don't just write code; we architect scalable, future-proof ecosystems. From neural networks to edge computing, our stack is built for the innovators of tomorrow.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {servicesData.map((service, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="group relative p-[1px] rounded-2xl bg-[var(--border)]/50 hover:bg-transparent overflow-hidden transition-all duration-500"
            >
              {/* Border Gradient Reveal on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--text-primary)]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-full bg-[var(--surface)] p-8 rounded-2xl overflow-hidden flex flex-col justify-between z-10 transition-colors duration-700">
                {/* Background Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${service.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                
                <div>
                  <div className="w-12 h-12 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex items-center justify-center text-[var(--text-secondary)] mb-6 group-hover:text-[var(--accent)] group-hover:scale-110 group-hover:bg-[var(--border)]/50 transition-all duration-500">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--text-primary)] group-hover:to-[var(--text-secondary)] transition-all">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light group-hover:text-[var(--text-primary)]/90 transition-colors">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)]/50 group-hover:text-[var(--accent)] transition-colors">
                  <span>Explore Stack</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}