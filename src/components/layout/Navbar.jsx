// components/layout/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLenis } from "lenis/react";
import ThemeToggle from "@/components/ui/ThemeToggle";

// Premium stroke icons for the new nav items
const getNavIcon = (name) => {
  switch (name) {
    case 'Services':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/>
        </svg>
      );
    case 'Process':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/>
        </svg>
      );
    case 'Works':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
        </svg>
      );
    case 'Company':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
        </svg>
      );
    default:
      return null;
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [activeSection, setActiveSection] = useState(""); 
  const lenis = useLenis();

  const navItems = [
    { name: "Services", target: "#services" },
    { name: "Process", target: "#process" },
    { name: "Works", target: "#works" },
    { name: "Company", target: "#company" },
  ];

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.target.substring(1));
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            current = section;
          }
        }
      }
      
      if (window.scrollY < 200) current = "";
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    
    if (targetId !== 'top' && targetId !== '#contact') {
      setActiveSection(targetId.substring(1));
    } else {
      setActiveSection("");
    }

    if (isOpen) setIsOpen(false);

    if (lenis) {
      setTimeout(() => {
        lenis.scrollTo(targetId === 'top' ? 0 : targetId, {
          offset: -100,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        });
      }, isOpen ? 400 : 0);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [isOpen, lenis]);

  const menuVariants = {
    closed: { opacity: 0, y: "-100%", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    open: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };
  const linkContainerVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };
  const linkVariants = {
    closed: { opacity: 0, y: 20, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    open: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
      >
        <nav className="flex items-center justify-between w-full max-w-5xl px-4 md:px-6 py-3 rounded-full border border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] pointer-events-auto transition-colors duration-500">
          
          <Link href="/" className="flex items-center gap-2 group relative z-50" onClick={(e) => handleNavClick(e, 'top')}>
            <img
              src="/logo-light.png"
              alt="NodeXstack Light Logo"
              className="theme-logo-light h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <img
              src="/logo-dark.png"
              alt="NodeXstack Dark Logo"
              className="theme-logo-dark h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="hidden md:flex items-center relative z-10 md:gap-2 lg:gap-4 px-2">
            {navItems.map((item) => {
              const isHovered = hoveredNav === item.name;
              const isActive = activeSection === item.target.substring(1);

              return (
                <div key={item.name} className="relative">
                  <a
                    href={item.target}
                    onClick={(e) => handleNavClick(e, item.target)}
                    onMouseEnter={() => {
                      const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
                      if (!isTouch) setHoveredNav(item.name);
                    }}
                    onMouseLeave={() => setHoveredNav(null)}
                    className={`relative flex items-center justify-center text-sm transition-colors cursor-none group
                      md:w-10 md:h-10 lg:w-auto lg:h-auto lg:px-4 lg:py-2 rounded-full z-10
                      ${isActive ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium'}
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-[var(--text-primary)]/[0.04] border border-[var(--text-primary)]/[0.08] rounded-full shadow-[0_0_15px_var(--accent)]/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    <span className="inline-flex lg:hidden items-center justify-center relative z-10">
                      {getNavIcon(item.name)}
                    </span>

                    <span className="hidden lg:inline relative z-10">
                      {item.name}
                      {!isActive && (
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--text-primary)] transition-all duration-300 group-hover:w-full"></span>
                      )}
                    </span>
                  </a>

                  {/* PREMIUM INFINITE FLOATING TOOLTIP (Adapts to themes) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          y: [0, 4, 0],
                          scale: 1 
                        }}
                        exit={{ opacity: 0, y: -10, scale: 0.8, transition: { duration: 0.2 } }}
                        transition={{
                          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                          opacity: { duration: 0.3, ease: "easeOut" },
                          scale: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                        className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 pointer-events-none z-50 flex items-center justify-center hidden lg:flex"
                      >
                        <div className="relative flex items-center gap-2 px-3 py-1.5 bg-[var(--surface)]/95 backdrop-blur-xl border border-[var(--border)] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]">
                          {/* Pointing UP arrow */}
                          <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[var(--surface)] rotate-45 border-l border-t border-[var(--border)] -z-10" />
                          
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"></span>
                          </span>
                          
                          <span className="text-[10px] font-bold tracking-widest text-[var(--text-primary)] uppercase whitespace-nowrap opacity-90">
                            {item.name}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tablet Hover Tooltip */}
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 450, damping: 25 }}
                        className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 pointer-events-none hidden md:flex lg:hidden z-50"
                      >
                        <div className="relative px-2.5 py-1 bg-[var(--text-primary)] text-[var(--bg)] text-[11px] font-semibold tracking-wide rounded-[6px] shadow-xl whitespace-nowrap">
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--text-primary)] rotate-45 rounded-[2px]" />
                          {item.name}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0 relative z-50">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
            <button
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden sm:block px-5 py-2 text-sm font-medium rounded-full bg-[var(--text-primary)] text-[var(--bg)] hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 cursor-none"
            >
              Start Project
            </button>

            <button
              className="flex flex-col justify-center items-center w-10 h-10 md:hidden rounded-full border border-[var(--border)] bg-[var(--text-primary)]/5 hover:bg-[var(--text-primary)]/10 transition-colors cursor-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-4 h-3 flex flex-col justify-between overflow-hidden">
                <motion.span animate={isOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="w-full h-[1.5px] bg-[var(--text-primary)] rounded-full transform origin-center" />
                <motion.span animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="w-full h-[1.5px] bg-[var(--text-primary)] rounded-full" />
                <motion.span animate={isOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="w-full h-[1.5px] bg-[var(--text-primary)] rounded-full transform origin-center" />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[var(--bg)]/95 backdrop-blur-2xl px-6 md:hidden pointer-events-auto"
          >
            <motion.div variants={linkContainerVariants} initial="closed" animate="open" exit="closed" className="flex flex-col gap-6">
              {navItems.map((item) => (
                <motion.div key={item.name} variants={linkVariants} className="overflow-hidden">
                  <a
                    href={item.target}
                    onClick={(e) => handleNavClick(e, item.target)}
                    className={`block text-5xl font-light tracking-tight hover:translate-x-2 transition-all duration-300
                      ${activeSection === item.target.substring(1) ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
                    `}
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}

              <motion.div variants={linkVariants} className="mt-8 overflow-hidden">
                 <button onClick={(e) => handleNavClick(e, '#contact')} className="w-full py-4 text-lg font-medium rounded-full bg-[var(--text-primary)] text-[var(--bg)] active:scale-95 transition-all duration-300">
                  Start Project
                </button>
              </motion.div>

              <motion.div variants={linkVariants} className="absolute bottom-10 left-6 right-6 flex justify-between items-center border-t border-[var(--border)] pt-6">
                <div className="flex gap-4 text-sm text-[var(--text-secondary)]">
                  <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Twitter</a>
                  <a href="#" className="hover:text-[var(--text-primary)] transition-colors">LinkedIn</a>
                </div>
                <ThemeToggle />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}