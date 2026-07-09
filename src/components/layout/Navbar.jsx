"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "../ui/ThemeToggle";
import GlowButton from "../ui/GlowButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-4 bg-bg/80 backdrop-blur-lg border-b border-border shadow-sm"
            : "py-6 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
          {/* Light Theme Logo */}
          <img
            src="/logo-light.png"
            alt="NodeXstack Light Logo"
            className="theme-logo-light h-10 md:h-12 lg:h-14 w-auto object-contain transition-opacity duration-300"
          />

          {/* Dark Theme Logo */}
          <img
            src="/logo-dark.png"
            alt="NodeXstack Dark Logo"
            className="theme-logo-dark h-10 md:h-12 lg:h-14 w-auto object-contain transition-opacity duration-300"
          />
        </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {["Services", "Work", "Process", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <GlowButton href="#contact" variant="primary">
              Get in Touch
            </GlowButton>
          </div>

          {/* Mobile Menu Trigger (Hamburger Morph) */}
          <button
            className="md:hidden relative z-50 p-2 text-text-primary hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between relative overflow-hidden">
              <span className={`w-full h-[2px] bg-current rounded transition-all duration-300 origin-left ${isMobileMenuOpen ? "rotate-45 translate-x-[2px]" : ""}`} />
              <span className={`w-full h-[2px] bg-current rounded transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 translate-x-4" : "opacity-100"}`} />
              <span className={`w-full h-[2px] bg-current rounded transition-all duration-300 origin-left ${isMobileMenuOpen ? "-rotate-45 translate-x-[2px]" : ""}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Slide-in Mobile Menu Panel */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}