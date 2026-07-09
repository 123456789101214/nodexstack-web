'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function SmoothScrollWrapper({ children }) {
  // Main content eka track karanna ref eka
  const contentRef = useRef(null);
  
  // Page eke actual height eka store karanna state eka
  const [pageHeight, setPageHeight] = useState(0);

  // Content eke height eka wenas weddi (resize/load), pageHeight state eka update karanawa
  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      setPageHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    // ResizeObserver eken child components load weddi height eka track karanawa
    const resizeObserver = new ResizeObserver(() => updateHeight());
    if (contentRef.current) resizeObserver.observe(contentRef.current);

    return () => {
      window.removeEventListener('resize', updateHeight);
      resizeObserver.disconnect();
    };
  }, [updateHeight]);

  // Framer Motion hooks valin native scroll eka gannawa
  const { scrollY } = useScroll();

  // Apple feel eka (momentum) ganna spring physics apply karanawa
  // Me values wenas karala oya 'slow motion' gathiya adu wadi karanna puluwan
  const smoothScrollY = useSpring(scrollY, {
    mass: 0.1,
    stiffness: 80,   // Stiffness adu karama thawa slow/smooth wenawa
    damping: 20,     // Damping eken bounce wena eka nawaththanawa
    restDelta: 0.001
  });

  // Spring value eka negative transform value ekak karanawa (-y)
  const y = useTransform(smoothScrollY, (value) => `-${value}px`);

  return (
    <>
      {/* Meka thamai trick eka. 
        Browser ekata scroll karanna fake space ekak hadanawa 
      */}
      <div style={{ height: pageHeight }} className="w-full pointer-events-none" />

      {/* Original content eka fixed karala, spring ekata anuwa translate karanawa
      */}
      <motion.div
        ref={contentRef}
        style={{ y }}
        className="fixed top-0 left-0 flex w-full flex-col overflow-hidden"
      >
        {children}
      </motion.div>
    </>
  );
}
