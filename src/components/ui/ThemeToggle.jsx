"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Aperture } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const THEMES = ["dark", "light", "monochrome"];

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setMounted(true);
    // Initial theme check
    const savedTheme = localStorage.getItem("nodexstack-theme");
    const htmlClass = document.documentElement.classList;
    
    if (savedTheme && THEMES.includes(savedTheme)) {
      setTheme(savedTheme);
    } else if (htmlClass.contains("theme-monochrome")) {
      setTheme("monochrome");
    } else if (htmlClass.contains("light")) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    // Array eke next theme ekata cycle wenawa
    const currentIndex = THEMES.indexOf(theme);
    const nextTheme = THEMES[(currentIndex + 1) % THEMES.length];
    
    const html = document.documentElement;
    
    // Remove all previous theme classes
    html.classList.remove("light", "dark", "theme-monochrome");
    
    // Add new theme class & attributes
    if (nextTheme === "monochrome") {
      html.classList.add("theme-monochrome");
    } else {
      html.classList.add(nextTheme);
    }
    
    html.setAttribute("data-theme", nextTheme); // For Globe component support
    localStorage.setItem("nodexstack-theme", nextTheme);
    
    setTheme(nextTheme);

    // Globe eka wage wena components walata real-time update wenna event eka yawamu
    window.dispatchEvent(new CustomEvent("themeChange", { detail: nextTheme }));
  };

  // Hydration flicker eka nawaththanna placeholder state
  if (!mounted) {
    return (
      <button className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-md opacity-50 cursor-default"></button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-md hover:border-[var(--accent)] transition-colors duration-500 overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" && (
          <motion.div
            key="light"
            initial={{ y: 30, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -30, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="absolute text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300"
          >
            <Sun className="w-5 h-5" />
          </motion.div>
        )}
        
        {theme === "dark" && (
          <motion.div
            key="dark"
            initial={{ y: 30, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -30, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="absolute text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300"
          >
            <Moon className="w-5 h-5" />
          </motion.div>
        )}

        {theme === "monochrome" && (
          <motion.div
            key="monochrome"
            initial={{ y: 30, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -30, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="absolute text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300"
          >
            {/* Monochrome represent karanna best icon eka Aperture */}
            <Aperture className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Glow effect on hover */}
      <div className="absolute inset-0 bg-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-xl pointer-events-none" />
    </button>
  );
}