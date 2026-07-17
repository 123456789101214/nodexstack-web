"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quote: "NodeXstack didn't just build our platform; they architected the future of our AI infrastructure. The precision is terrifyingly good.",
    name: "Elena Rodriguez",
    role: "CTO, Quantum Compute",
    avatar: "https://i.pravatar.cc/150?u=elena",
  },
  {
    id: 2,
    quote: "We transitioned our entire global microservices to NodeXstack's architecture. Performance increased by 300%. A masterclass in engineering.",
    name: "Marcus Thorne",
    role: "VP of Engineering, ScaleDynamics",
    avatar: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    id: 3,
    quote: "Their grasp of Next.js and AI integration is unparalleled. It feels less like hiring an agency and more like partnering with future pioneers.",
    name: "Sarah Chen",
    role: "Founder, NeuroSync",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: 4,
    quote: "Absolute perfection. The attention to micro-interactions and performance optimization is exactly what a billion-dollar product needs.",
    name: "David Altman",
    role: "Product Lead, OpenAI Ecosystem",
    avatar: "https://i.pravatar.cc/150?u=david",
  },
];

export default function Testimonials() {
  const [isHovered, setIsHovered] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  
  const innerRef = useRef(null);
  const x = useMotionValue(0);

  // Measure the exact width of one set of testimonials to calculate the perfect loop point
  useEffect(() => {
    if (innerRef.current) {
      // offsetWidth plus the gap (24px = gap-6 in tailwind)
      setContentWidth(innerRef.current.offsetWidth + 24);
    }
    
    // Optional: Handle resize events to recalculate width
    const handleResize = () => {
      if (innerRef.current) {
        setContentWidth(innerRef.current.offsetWidth + 24);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Framer motion animation frame for buttery smooth 60fps infinite scroll
  useAnimationFrame((time, delta) => {
    if (isHovered || contentWidth === 0) return;
    
    // Adjust speed here (px per second)
    const moveBy = (delta / 1000) * 45; 
    let currentX = x.get();
    
    currentX -= moveBy;

    // Reset position seamlessly when one full width is scrolled
    if (currentX <= -contentWidth) {
      currentX += contentWidth;
    }
    
    x.set(currentX);
  });

  return (
    <section 
      id="testimonials" 
      className="relative w-full py-32 overflow-hidden bg-[var(--bg)] transition-colors duration-700"
    >
      {/* Dynamic Background glow effects matching the theme accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[var(--accent)]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.1] tracking-tight text-[var(--text-primary)] mb-6 transition-colors duration-700">
              Trusted by the world’s <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)]">
                most innovative teams.
              </span>
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] text-lg max-w-sm mb-2 transition-colors duration-700">
            Swipe to explore how we are reshaping enterprise AI software standards globally.
          </p>
        </motion.div>
      </div>

      {/* Infinite Carousel Container with Edge Fading Mask */}
      <div 
        className="relative z-10 w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <motion.div 
          style={{ x }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={() => setIsHovered(true)}
          onPointerUp={() => setIsHovered(false)}
          className="flex w-max cursor-grab active:cursor-grabbing py-4"
        >
          {/* We render two identical blocks to create the seamless loop effect */}
          {[1, 2].map((blockId) => (
            <div 
              key={blockId} 
              ref={blockId === 1 ? innerRef : null}
              className="flex gap-6 pr-6"
            >
              {testimonials.map((testimonial, idx) => (
                <div
                  key={`${blockId}-${testimonial.id}`}
                  className="relative group w-[340px] md:w-[480px] p-8 md:p-10 rounded-3xl bg-[var(--surface)]/40 backdrop-blur-xl border border-[var(--border)] hover:border-[var(--accent)]/30 transition-colors duration-500 flex flex-col justify-between h-[360px] overflow-hidden"
                >
                  {/* Hover Gradient Overlay mapped to Theme Accent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <svg className="w-8 h-8 text-[var(--accent)]/40 mb-6 transition-colors duration-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-xl md:text-2xl font-light leading-relaxed text-[var(--text-primary)] transition-colors duration-700">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 relative z-10 mt-8">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--border)] group-hover:border-[var(--accent)]/50 transition-colors duration-500">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        sizes="(max-width: 48px) 100vw, 48px"
                      />
                    </div>
                    <div>
                      <h4 className="text-[var(--text-primary)] font-medium text-sm transition-colors duration-700">
                        {testimonial.name}
                      </h4>
                      <p className="text-[var(--text-secondary)] text-sm transition-colors duration-700">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}