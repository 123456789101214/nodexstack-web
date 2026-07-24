"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formState, setFormState] = useState("idle"); // 'idle' | 'submitting' | 'success'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // WhatsApp Integration Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("submitting");

    // Format the message for WhatsApp (Using * for bold text in WA)
    const message = `*🚀 New Enterprise Inquiry - NodeXstack*\n\n*Client Name:* ${formData.name}\n*Email Address:* ${formData.email}\n\n*Project Vision:*\n${formData.details}`;
    
    // Encode the string for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Replace with your actual WhatsApp number (include country code, no + or spaces)
    const whatsappNumber = "94773205206"; 
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Premium UI feel: Simulate a slight processing delay before opening the new tab
    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setFormState("success");
      
      // Optional: Reset form after 5 seconds if they come back to the tab
      setTimeout(() => {
        setFormData({ name: "", email: "", details: "" });
        setFormState("idle");
      }, 5000);
    }, 800);
  };

  // Premium Spring Physics Configuration
  const springTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 1,
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: springTransition },
  };

  return (
    <div className="relative min-h-screen bg-[#05070D] text-white selection:bg-blue-500/30 overflow-hidden pt-32 pb-24">
      {/* Background Ambient Glow & Noise */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* Left Column: Typography & Info */}
          <div className="flex flex-col justify-center h-full">
            <motion.div variants={fadeUp} className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-wide text-blue-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Available for New Projects
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]"
            >
              Let's engineer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
                the future.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-white/50 mb-12 max-w-md font-light leading-relaxed"
            >
              Whether you're looking to build a billion-dollar AI SaaS or scale
              your enterprise architecture, NodeXstack is ready to execute.
            </motion.p>

            <motion.div variants={fadeUp} className="space-y-8 mt-auto">
              <div>
                <p className="text-sm text-white/40 mb-2 uppercase tracking-widest font-semibold">
                  Global HQ
                </p>
                <p className="text-lg text-white/80">Gampaha, Sri Lanka</p>
              </div>
              <div>
                <p className="text-sm text-white/40 mb-2 uppercase tracking-widest font-semibold">
                  Direct Line
                </p>
                <a
                  href="mailto:hello@nodexstack.com"
                  className="text-lg text-white/80 hover:text-blue-400 transition-colors duration-300"
                >
                  nodexstack@gmail.com
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: The Glassmorphic Form */}
          <motion.div variants={fadeUp} className="relative w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[2rem] blur-xl" />
            <div className="relative w-full bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="flex flex-col items-center justify-center text-center h-[400px]"
                  >
                    <div className="w-20 h-20 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-6 border border-[#25D366]/30">
                      <svg
                        className="w-10 h-10 text-[#25D366]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 tracking-tight">
                      Redirecting...
                    </h3>
                    <p className="text-white/50">
                      Opening WhatsApp to continue the conversation. Our architects are ready.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-white/40 group-focus-within:text-blue-400 transition-colors">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                        />
                      </div>
                      <div className="group flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-white/40 group-focus-within:text-blue-400 transition-colors">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@startup.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="group flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-white/40 group-focus-within:text-blue-400 transition-colors">
                        Project Details
                      </label>
                      <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your vision..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="group relative w-full flex justify-center items-center gap-3 bg-white text-black font-semibold rounded-xl px-8 py-5 overflow-hidden transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 mt-4"
                    >
                      {/* Button Hover Glow - WhatsApp Green specific for this action */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/20 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <span className="relative z-10 flex items-center gap-2">
                        {formState === "submitting" ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Connecting...
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
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
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