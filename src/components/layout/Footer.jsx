"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "AI Engineering", href: "/services/ai" },
      { name: "Enterprise Architecture", href: "/services/enterprise" },
      { name: "Cloud Infrastructure", href: "/services/cloud" },
      { name: "Data Analytics", href: "/services/data" },
      { name: "Security & Compliance", href: "/services/security" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
      { name: "Open Source", href: "/open-source" },
      { name: "System Status", href: "/status" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Footer() {
  return (
    <footer className="relative bg-[var(--bg)] text-[var(--text-primary)] overflow-hidden pt-24 pb-8 border-t border-[var(--border)] transition-colors duration-700 ease-in-out">
      {/* Background Glow/Noise Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--accent)_15%,transparent),transparent_70%)] opacity-60 pointer-events-none transition-colors duration-700" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] pointer-events-none mix-blend-overlay" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24"
        >
          {/* Brand & Newsletter Column */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-6 group">
                <span className="text-2xl font-bold tracking-tighter text-[var(--text-primary)] transition-colors duration-500">
                  NodeX<span className="text-[var(--accent)] group-hover:text-[var(--accent-deep)] transition-colors duration-300">stack</span>
                </span>
              </Link>
              <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-sm leading-relaxed mb-8 transition-colors duration-500">
                Architecting the future of enterprise software. We build premium, AI-driven digital ecosystems for visionary companies worldwide.
              </p>
            </div>

            <div className="mt-8 lg:mt-auto">
              <h4 className="text-sm font-semibold tracking-wider text-[var(--text-primary)] uppercase mb-4 transition-colors duration-500">
                Subscribe to our intelligence
              </h4>
              <div className="relative group flex items-center max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[var(--surface)]/50 border border-[var(--border)] hover:border-[var(--text-secondary)] transition-colors duration-300 rounded-full py-4 pl-6 pr-32 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/50 backdrop-blur-xl"
                />
                <button className="absolute right-2 px-6 py-2 bg-[var(--text-primary)] text-[var(--bg)] font-medium text-sm rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_var(--cursor-glow-1)] active:scale-95">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            {footerLinks.map((column, index) => (
              <motion.div key={index} variants={itemVariants} className="flex flex-col">
                <h4 className="text-sm font-semibold tracking-wider text-[var(--text-primary)] mb-6 transition-colors duration-500">
                  {column.title}
                </h4>
                <ul className="space-y-4">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-[var(--text-secondary)] hover:text-[var(--accent)] text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent origin-center mb-8"
        />

        {/* Bottom Bar: Copyright & Socials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10"
        >
          <motion.p variants={itemVariants} className="text-[var(--text-secondary)] text-xs md:text-sm transition-colors duration-500">
            &copy; {new Date().getFullYear()} NodeXstack Software Solutions. All rights reserved.
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center space-x-6 text-xs md:text-sm text-[var(--text-secondary)]">
            <Link href="/privacy" className="hover:text-[var(--text-primary)] transition-colors duration-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--text-primary)] transition-colors duration-300">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-[var(--text-primary)] transition-colors duration-300">Cookie Settings</Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center space-x-5">
            {/* Social Icons */}
            <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-300" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-300" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
            <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-300" aria-label="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Massive Background Logo Watermark (Theme-aware Crossfade Implementation) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center items-end translate-y-[35%] pointer-events-none select-none z-0">
        
        {/* Dark & Monochrome Theme Logo */}
        {/* By default (dark/monochrome), opacity is 0.03. When .light class is active on HTML, opacity goes to 0 */}
        <Image 
          src="/logo-dark.png" 
          alt="NodeXstack Logo Watermark" 
          width={1800} 
          height={600}
          priority
          className="w-[120vw] min-w-[1000px] max-w-[1800px] h-auto object-contain transition-opacity duration-1000 ease-in-out pointer-events-none select-none opacity-[0.03] [html.light_&]:opacity-0" 
        />

        {/* Light Theme Logo */}
        {/* Absolutely positioned directly over the dark logo. By default opacity is 0. When .light class is active, opacity goes to 0.03 */}
        <Image 
          src="/logo-light.png" 
          alt="NodeXstack Logo Watermark" 
          width={1800} 
          height={600}
          priority
          className="absolute bottom-0 w-[120vw] min-w-[1000px] max-w-[1800px] h-auto object-contain transition-opacity duration-1000 ease-in-out pointer-events-none select-none opacity-0 [html.light_&]:opacity-[0.04]" 
        />
        
      </div>
    </footer>
  );
}