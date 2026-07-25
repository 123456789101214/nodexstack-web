"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ContactPage() {
  const [formState, setFormState] = useState("idle"); // 'idle' | 'submitting' | 'redirecting'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
  });
  const [errors, setErrors] = useState({});
  const [countdown, setCountdown] = useState(3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.details.trim()) newErrors.details = "Project Vision is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState("submitting");

    const message = `*🚀 New Enterprise Inquiry - NodeXstack*\n\n*Client Name:* ${formData.name}\n*Email Address:* ${formData.email}\n\n*Project Vision:*\n${formData.details}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "94700000000"; // Replace with actual number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      setFormState("redirecting");
      setCountdown(3);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setTimeout(() => {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        setTimeout(() => {
          setFormData({ name: "", email: "", details: "" });
          setFormState("idle");
        }, 1500);
      }, 3000);
    }, 1200);
  };

  // Premium Spring Physics
  const springTransition = {
    type: "spring",
    stiffness: 80,
    damping: 20,
    mass: 0.8,
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: springTransition },
  };

  if (!mounted) return null; // Prevent hydration mismatch for interactive states

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)] selection:bg-[var(--accent)]/30 overflow-hidden pt-32 pb-24 flex items-center transition-colors duration-700">
      
      {/* Background Ambient Glow & Noise */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent)]/10 blur-[120px] rounded-full pointer-events-none transition-colors duration-700" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] pointer-events-none mix-blend-overlay" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left Column: Typography & Info */}
          <div className="flex flex-col justify-center h-full">
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface)]/50 border border-[var(--border)] text-xs font-semibold tracking-wide text-[var(--accent)] uppercase backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
                Available for New Projects
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.05]"
            >
              Let's engineer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-primary)]/80 to-[var(--text-primary)]/30">
                the future.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-[var(--text-secondary)] mb-12 max-w-md font-light leading-relaxed"
            >
              Whether you're looking to build a billion-dollar AI SaaS or scale
              your enterprise architecture, NodeXstack is ready to execute.
            </motion.p>

            <motion.div variants={fadeUp} className="space-y-8">
              <div className="group">
                <p className="text-sm text-[var(--text-secondary)] mb-2 uppercase tracking-widest font-semibold transition-colors group-hover:text-[var(--accent)]">
                  Global HQ
                </p>
                <p className="text-lg text-[var(--text-primary)]">Gampaha, Sri Lanka</p>
              </div>
              <div className="group">
                <p className="text-sm text-[var(--text-secondary)] mb-2 uppercase tracking-widest font-semibold transition-colors group-hover:text-[var(--accent)]">
                  Direct Line
                </p>
                <a
                  href="mailto:nodexstack@gmail.com"
                  className="text-lg text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-300 relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-[var(--accent)] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  nodexstack@gmail.com
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: The Glassmorphic Form Container */}
          <motion.div variants={fadeUp} className="relative w-full">
            {/* Soft background blur for the form */}
            <div className="absolute inset-0 bg-[var(--surface)]/20 rounded-[2.5rem] blur-2xl opacity-60" />
            
            <div className="relative w-full bg-[var(--surface)]/40 backdrop-blur-xl border border-[var(--border)] p-8 pt-20 md:p-12 md:pt-24 rounded-[2.5rem] shadow-[0_0_40px_rgba(0,0,0,0.05)] overflow-hidden transition-colors duration-500">
              
              {/* 🚀 Integrated Form-Level Back Button */}
              <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
                <Link
                  href="/"
                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] backdrop-blur-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]/20 transition-all duration-300 hover:shadow-[0_0_15px_var(--cursor-glow-1)]"
                >
                  <svg 
                    className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">
                    Back
                  </span>
                </Link>
              </div>

              <AnimatePresence mode="wait">
                {formState === "redirecting" ? (
                  <motion.div
                    key="redirecting"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={springTransition}
                    className="flex flex-col items-center justify-center text-center h-[380px]"
                  >
                    <div className="relative w-24 h-24 mb-8">
                      <div className="absolute inset-0 bg-[var(--accent)]/20 rounded-full animate-ping" />
                      <div className="relative w-full h-full bg-[var(--surface)]/80 backdrop-blur-md rounded-full flex items-center justify-center border border-[var(--accent)]/30 shadow-[0_0_30px_var(--cursor-glow-1)]">
                        <svg className="w-10 h-10 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 tracking-tight text-[var(--text-primary)]">
                      Establishing Connection...
                    </h3>
                    
                    <p className="text-[var(--text-secondary)] mb-8 max-w-sm">
                      Redirecting to secure chat in <span className="text-[var(--text-primary)] font-semibold">{countdown}</span> seconds.
                    </p>

                    <div className="w-full max-w-xs h-1.5 bg-[var(--surface)] rounded-full overflow-hidden border border-[var(--border)]">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, ease: "linear" }}
                        className="h-full bg-gradient-to-r from-[var(--accent-deep)] to-[var(--accent)] rounded-full"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={springTransition}
                    noValidate
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Name Input */}
                      <div className="group flex flex-col gap-2">
                        <label className={`text-xs uppercase tracking-widest transition-colors duration-300 ${errors.name ? 'text-red-500' : 'text-[var(--text-secondary)] group-focus-within:text-[var(--accent)]'}`}>
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={errors.name ? errors.name : "John Doe"}
                          className={`w-full bg-[var(--surface)]/50 rounded-xl px-5 py-4 transition-all duration-300 outline-none text-[var(--text-primary)] backdrop-blur-sm ${
                            errors.name 
                              ? 'border border-red-500/50 bg-red-500/5 placeholder-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30' 
                              : 'border border-[var(--border)] placeholder-[var(--text-secondary)]/50 focus:border-[var(--accent)] focus:bg-[var(--surface)] focus:ring-1 focus:ring-[var(--accent)]/30'
                          }`}
                        />
                      </div>

                      {/* Email Input */}
                      <div className="group flex flex-col gap-2">
                        <label className={`text-xs uppercase tracking-widest transition-colors duration-300 ${errors.email ? 'text-red-500' : 'text-[var(--text-secondary)] group-focus-within:text-[var(--accent)]'}`}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={errors.email ? errors.email : "hello@startup.com"}
                          className={`w-full bg-[var(--surface)]/50 rounded-xl px-5 py-4 transition-all duration-300 outline-none text-[var(--text-primary)] backdrop-blur-sm ${
                            errors.email 
                              ? 'border border-red-500/50 bg-red-500/5 placeholder-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30' 
                              : 'border border-[var(--border)] placeholder-[var(--text-secondary)]/50 focus:border-[var(--accent)] focus:bg-[var(--surface)] focus:ring-1 focus:ring-[var(--accent)]/30'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Details Textarea */}
                    <div className="group flex flex-col gap-2">
                      <label className={`text-xs uppercase tracking-widest transition-colors duration-300 ${errors.details ? 'text-red-500' : 'text-[var(--text-secondary)] group-focus-within:text-[var(--accent)]'}`}>
                        Project Details
                      </label>
                      <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        rows={5}
                        placeholder={errors.details ? errors.details : "Tell us about your vision..."}
                        className={`w-full bg-[var(--surface)]/50 rounded-xl px-5 py-4 transition-all duration-300 outline-none resize-none text-[var(--text-primary)] backdrop-blur-sm ${
                          errors.details 
                            ? 'border border-red-500/50 bg-red-500/5 placeholder-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30' 
                            : 'border border-[var(--border)] placeholder-[var(--text-secondary)]/50 focus:border-[var(--accent)] focus:bg-[var(--surface)] focus:ring-1 focus:ring-[var(--accent)]/30'
                        }`}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="group relative w-full flex justify-center items-center gap-3 bg-[var(--text-primary)] text-[var(--bg)] font-semibold rounded-xl px-8 py-5 overflow-hidden transition-transform duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 mt-2 shadow-[0_10px_40px_-10px_var(--cursor-glow-1)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <span className="relative z-10 flex items-center gap-2">
                        {formState === "submitting" ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-[var(--bg)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            Chat on WhatsApp
                            <svg
                              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}