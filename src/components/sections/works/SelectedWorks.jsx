"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useAnimationFrame, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// 1. MAGNETIC EFFECT COMPONENT
const Magnet = ({ children, strength = 15 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX / strength, y: middleY / strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

// 2. PROJECT DATA 
const projects = [
  {
    id: "01",
    title: "NexiaCore POS SaaS",
    category: "Product by NodeXstack",
    images: [
      "/nexiacore-pos-001.jpg",
      "/nexiacore-pos-002.jpg",
      "/nexiacore-pos-003.jpg",
    ],
    link: "https://app.nexiacore.shop/",
    credentials: { email: "nexiacorepos@gmail.com", password: "user@123" },
  },
  {
    id: "02",
    title: "NexiaCore Marketing Landing Page",
    category: "Product by NodeXstack",
    images: [
      "/nexiacore-landing-001.jpg",
      "/nexiacore-landing-002.jpg",
      "/nexiacore-landing-003.jpg",
    ],
    link: "https://nexiacore.shop/",
  },
  {
    id: "03",
    title: "NovaCat Cloud POS",
    category: "Product by NodeXstack",
    images: [
      "/novacart-pos-001.jpg",
      "/novacart-pos-002.jpg",
      "/novacart-pos-003.jpg",
    ],
    link: "#",
    credentials: { email: "admin@store.com", password: "Admin@123" },
  },
];

// Reusable Hover Overlay (UPDATED: Click only triggers here now)
const ExpandOverlay = ({ onExpand }) => (
  <div className="absolute inset-0 bg-[var(--bg)]/0 group-hover:bg-[var(--bg)]/40 transition-all duration-500 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
    <button 
      onClick={(e) => {
        e.stopPropagation(); // Prevents drag events from conflicting
        onExpand();
      }}
      className="w-12 h-12 rounded-full bg-[var(--surface)]/90 backdrop-blur-md flex items-center justify-center text-[var(--text-primary)] shadow-[0_0_20px_rgba(0,0,0,0.4)] transform scale-50 group-hover:scale-100 transition-transform duration-500 ease-[0.16,1,0.3,1] pointer-events-auto hover:bg-[var(--accent)] hover:text-[var(--bg)] border border-[var(--border)]"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
      </svg>
    </button>
  </div>
);

// Copy to Clipboard Micro-interaction Component for the Modal
const CredentialBlock = ({ label, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={handleCopy}
      className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)]/50 hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-secondary)] group-hover:text-[var(--bg)]/70 transition-colors duration-300">{label}</span>
        <span className="text-sm font-mono text-[var(--text-primary)] group-hover:text-[var(--bg)] transition-colors duration-300">{value}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span 
              key="copied"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs font-mono text-emerald-500 group-hover:text-[var(--bg)]"
            >
              Copied!
            </motion.span>
          ) : (
            <motion.span 
              key="copy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs font-mono text-[var(--text-secondary)] group-hover:text-[var(--bg)]/70 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Copy
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// 3. STACKING CARD COMPONENT
const StackedCard = ({ project, index, progress, totalCards, onImageClick, onDemoClick }) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(progress, [index * 0.25, 1], [1, targetScale]);
  
  const stickyTop = `calc(10vh + ${index * 30}px)`;

  // Infinite Drag & Scroll Logic
  const [isHovered, setIsHovered] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const innerRef = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const calculateWidth = () => {
      if (innerRef.current) {
        setContentWidth(innerRef.current.offsetWidth + 24); // 24px is gap-6
      }
    };
    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  // Premium Custom Arrow Scroll Math
  const handleManualScroll = (direction) => {
    const shiftAmount = window.innerWidth < 768 ? 320 : 650; // Roughly one image width + gap
    const currentX = x.get();
    const targetX = currentX + (direction === 'left' ? shiftAmount : -shiftAmount);

    // Spring physics for smooth arrow navigation
    animate(x, targetX, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      mass: 1,
    });
  };

  // Bind Keyboard Left/Right Arrows when this specific card is hovered
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isHovered) return;
      if (e.key === "ArrowLeft") handleManualScroll('left');
      if (e.key === "ArrowRight") handleManualScroll('right');
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHovered, x]);

  useAnimationFrame((time, delta) => {
    if (isHovered || contentWidth === 0) return;
    
    const moveBy = (delta / 1000) * 30; 
    let currentX = x.get();
    currentX -= moveBy;

    if (currentX <= -contentWidth) {
      currentX = currentX + contentWidth;
    } else if (currentX > 0) {
      currentX = currentX - contentWidth;
    }
    
    x.set(currentX);
  });

  return (
    <div className="h-screen flex items-start justify-center sticky top-0 px-2 md:px-8" style={{ top: stickyTop }}>
      <motion.div 
        style={{ scale }}
        // group/card added for targeting child arrows
        className="group/card w-full max-w-[1440px] mx-auto h-[75vh] md:h-[80vh] max-h-[850px] rounded-[30px] sm:rounded-[40px] md:rounded-[60px] border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5 shadow-[0_10px_40px_transparent] hover:shadow-[0_10px_40px_var(--accent)]/10 transition-shadow duration-700 origin-top overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        
        {/* Top Row: Info & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 px-1 md:px-2 shrink-0 z-10">
          <div className="flex flex-col gap-1 sm:gap-2">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-2xl md:text-4xl font-bold text-[var(--accent)] transition-colors duration-700">{project.id}</span>
              <span className="text-[var(--text-secondary)] font-mono text-[9px] sm:text-xs tracking-widest uppercase border border-[var(--border)] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full transition-colors duration-700">
                {project.category}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[var(--text-primary)] tracking-tight transition-colors duration-700">
                {project.title}
              </h3>
              
              {project.credentials && (
                <button
                  onClick={() => onDemoClick(project)}
                  className="group flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-[var(--bg)]/40 hover:bg-[var(--bg)] backdrop-blur-md border border-[var(--border)] rounded-full transition-all duration-300 w-fit"
                >
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-[9px] sm:text-xs font-mono text-[var(--text-primary)] group-hover:text-[var(--accent)] uppercase tracking-widest transition-colors">
                    Demo Access
                  </span>
                </button>
              )}
            </div>
          </div>

          <Magnet>
            <Link 
              href={project.link} 
              target="_blank"
              className="inline-flex items-center justify-center px-5 py-2 sm:px-8 sm:py-3.5 rounded-full border border-[var(--border)] text-[var(--text-primary)] text-[10px] sm:text-sm font-medium uppercase tracking-widest hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-all duration-500 cursor-none shrink-0 w-fit"
            >
              Live Project
            </Link>
          </Magnet>
        </div>

        {/* Floating Premium Navigation Arrows (Visible on Desktop Hover) */}
        <div className="absolute right-6 top-[60%] -translate-y-1/2 flex items-center gap-3 z-30 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 hidden sm:flex pointer-events-none">
          <button 
            onClick={() => handleManualScroll('left')}
            className="pointer-events-auto w-12 h-12 rounded-full backdrop-blur-lg bg-[var(--surface)]/80 border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg)] hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={() => handleManualScroll('right')}
            className="pointer-events-auto w-12 h-12 rounded-full backdrop-blur-lg bg-[var(--surface)]/80 border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg)] hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        {/* Bottom Row: Carousel */}
        <div 
          className="relative w-full flex-grow overflow-hidden rounded-[20px] sm:rounded-[30px] mt-2 sm:mt-0"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
          }}
        >
          <motion.div
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -contentWidth, right: 0 }} 
            dragElastic={0.15} 
            className="flex w-max h-full items-center py-2 cursor-grab active:cursor-grabbing" 
          >
            {[1, 2].map((blockId) => (
              <div key={blockId} ref={blockId === 1 ? innerRef : null} className="flex gap-6 pr-6 h-full">
                {project.images.map((img, i) => (
                  <div 
                    key={`${blockId}-${i}`}
                    className="relative h-full min-h-[250px] md:min-h-[350px] lg:min-h-[400px] w-[85vw] md:w-[600px] lg:w-[700px] shrink-0 rounded-[20px] sm:rounded-[30px] overflow-hidden group bg-[var(--bg)] border border-[var(--border)]/40 pointer-events-auto"
                    // Removed onMouseUp. Click is now safely handled by ExpandOverlay alone!
                  >
                    <Image 
                      src={img} 
                      alt={`${project.title} Preview ${i + 1}`} 
                      fill 
                      className="object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]" 
                      sizes="(max-width: 768px) 85vw, 600px" 
                      priority={i < 2 && index === 0 && blockId === 1}
                      draggable="false" 
                    />
                    <div className="absolute inset-0 border border-[var(--text-primary)]/10 rounded-[20px] sm:rounded-[30px] pointer-events-none z-10 mix-blend-overlay"></div>
                    
                    {/* Expand Click triggers specific image index */}
                    <ExpandOverlay onExpand={() => onImageClick({ images: project.images, index: i })} />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// 4. MAIN SECTION
export default function SelectedWorks() {
  const containerRef = useRef(null);
  
  // Update Lightbox state to hold array and current index for swiping
  const [lightboxData, setLightboxData] = useState(null); // { images: [], index: 0 }
  const [demoProject, setDemoProject] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    if (lightboxData || demoProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [lightboxData, demoProject]);

  // Lightbox Pagination Logic
  const paginateLightbox = (newDirection) => {
    setLightboxData((prev) => {
      if (!prev) return prev;
      let nextIndex = prev.index + newDirection;
      if (nextIndex < 0) nextIndex = prev.images.length - 1;
      if (nextIndex >= prev.images.length) nextIndex = 0;
      return { ...prev, index: nextIndex };
    });
  };

  // Bind Keyboard Left/Right Arrows for Lightbox Navigation
  useEffect(() => {
    const handleLightboxKeyDown = (e) => {
      if (!lightboxData) return;
      if (e.key === "ArrowLeft") paginateLightbox(-1);
      if (e.key === "ArrowRight") paginateLightbox(1);
      if (e.key === "Escape") setLightboxData(null);
    };
    window.addEventListener("keydown", handleLightboxKeyDown);
    return () => window.removeEventListener("keydown", handleLightboxKeyDown);
  }, [lightboxData]);

  return (
    <>
      <section 
        id="works" 
        className="relative w-full overflow-x-clip bg-[var(--bg)] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 pb-28 md:pt-32 md:pb-48 z-10 transition-colors duration-700"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--accent)]/10 blur-[150px] rounded-full pointer-events-none transition-colors duration-700" />

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-20">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
              >
                <span className="text-[var(--accent)] font-mono text-xs sm:text-sm tracking-widest transition-colors duration-700">03</span>
                <span className="h-[1px] w-8 sm:w-12 bg-[var(--accent)]/30 transition-colors duration-700"></span>
                <span className="text-[var(--accent)] font-mono text-xs sm:text-sm tracking-widest uppercase transition-colors duration-700">Selected Works</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(3rem,8vw,7rem)] leading-[1] font-medium text-[var(--text-primary)] tracking-tighter transition-colors duration-700"
              >
                Project
              </motion.h2>
            </div>
          </div>
        </div>

        <div ref={containerRef} className="relative w-full px-2 md:px-8 xl:px-12 z-[99998]" style={{ paddingBottom: "10vh" }}>
          {projects.map((project, index) => (
            <StackedCard 
              key={project.id} 
              project={project} 
              index={index} 
              progress={scrollYProgress}
              totalCards={projects.length}
              onImageClick={setLightboxData} // Passes { images, index }
              onDemoClick={setDemoProject}
            />
          ))}
        </div>
      </section>

      {/* 5. CINEMATIC SWIPEABLE IMAGE LIGHTBOX */}
      <AnimatePresence>
        {lightboxData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-8 bg-[var(--bg)]/95 backdrop-blur-2xl overflow-hidden"
          >
            {/* Global Lightbox Close */}
            <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-[10000]">
              <button
                onClick={() => setLightboxData(null)}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Lightbox Side Navigation Arrows (Desktop) */}
            <button onClick={() => paginateLightbox(-1)} className="hidden sm:flex absolute left-8 z-[10000] w-14 h-14 items-center justify-center rounded-full bg-[var(--surface)]/50 backdrop-blur border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-all duration-300 hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={() => paginateLightbox(1)} className="hidden sm:flex absolute right-8 z-[10000] w-14 h-14 items-center justify-center rounded-full bg-[var(--surface)]/50 backdrop-blur border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-all duration-300 hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>

            {/* Draggable Swipe Area */}
            <div className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxData.index}
                  initial={{ opacity: 0, x: 100, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  // Framer Motion Drag constraints for swipe functionality
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset }) => {
                    // Swipe thresholds
                    if (offset.x < -75) paginateLightbox(1);
                    else if (offset.x > 75) paginateLightbox(-1);
                  }}
                  className="relative w-full max-w-[95vw] sm:max-w-[85vw] h-[75vh] sm:h-[85vh]"
                >
                  <Image 
                    src={lightboxData.images[lightboxData.index]} 
                    alt="Fullscreen View" 
                    fill 
                    className="object-contain rounded-[20px] sm:rounded-[30px]" 
                    sizes="100vw" 
                    priority 
                    draggable="false"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. PREMIUM DEMO CREDENTIALS MODAL */}
      <AnimatePresence>
        {demoProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[var(--bg)]/80 backdrop-blur-xl"
            onClick={() => setDemoProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-[24px] sm:rounded-[30px] p-5 sm:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative flex flex-col gap-5 sm:gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[var(--text-secondary)]">
                    Secure Access
                  </span>
                </div>
                <button
                  onClick={() => setDemoProject(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-colors duration-300"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              <div>
                <h3 className="text-xl sm:text-3xl font-medium text-[var(--text-primary)] tracking-tight">
                  {demoProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 sm:mt-2 leading-relaxed">
                  Use the following credentials to access the live demo environment.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:gap-3">
                <CredentialBlock label="Demo Email" value={demoProject.credentials.email} />
                <CredentialBlock label="Password" value={demoProject.credentials.password} />
              </div>
              
              <Link 
                href={demoProject.link}
                target="_blank"
                className="w-full py-3.5 sm:py-4 rounded-xl bg-[var(--text-primary)] text-[var(--bg)] flex items-center justify-center gap-2 font-medium uppercase tracking-widest text-[10px] sm:text-xs hover:opacity-90 transition-opacity mt-2 cursor-none"
              >
                Launch Demo Portal
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}