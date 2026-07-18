"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // 1. Raw Mouse Coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 2. Arrow Physics (Fast, Snappy & Precise)
  const arrowSpringConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorX = useSpring(mouseX, arrowSpringConfig);
  const cursorY = useSpring(mouseY, arrowSpringConfig);

  // 3. Glass Lens Physics (Smooth trailing, Parallax depth)
  const lensSpringConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const lensX = useSpring(mouseX, lensSpringConfig);
  const lensY = useSpring(mouseY, lensSpringConfig);

  // 4. Rotation Physics for the Arrow
  const rotation = useMotionValue(-135); // Default top-left angle
  const smoothRotation = useSpring(rotation, {
    damping: 20,
    stiffness: 300,
    mass: 0.1,
  });

  const prevPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Disable on touch devices
    if (!("ontouchstart" in window) && navigator.maxTouchPoints === 0) {
      setIsTouchDevice(false);
    }

    const moveCursor = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
      // Check if hovering over an interactive element
      const target = e.target;
      const isInteractive = target.closest(
        "h1, h2, h3, h4, h5, h6, p, span, a, button, label, li, input, textarea"
      );
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    // --- STEERING ENGINE (60fps Velocity Based Rotation) ---
    let animationFrameId;
    const updateRotation = () => {
      const currentX = cursorX.get();
      const currentY = cursorY.get();

      const dx = currentX - prevPos.current.x;
      const dy = currentY - prevPos.current.y;

      // Only change rotation if moving fast enough (prevents jitter)
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const currentRotation = rotation.get();
        let delta = angle - (currentRotation % 360);

        // Shortest path math (no 360 glitching)
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        rotation.set(currentRotation + delta);
      }

      prevPos.current = { x: currentX, y: currentY };
      animationFrameId = requestAnimationFrame(updateRotation);
    };

    updateRotation();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY, cursorX, cursorY, rotation, isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* --- LAYER 1: PREMIUM GLASS LENS (Background Trailing) --- */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none rounded-full flex items-center justify-center will-change-transform"
        style={{
          x: lensX,
          y: lensY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          // --- CHANGE HERE: REMOVED backdrop-blur, added clean magnification on text ---
          // Using backdropFilter with only clean magnification properties
          backdropFilter: isHovering ? "saturate(150%) contrast(120%) brightness(105%)" : "none",
          WebkitBackdropFilter: isHovering ? "saturate(150%) contrast(120%) brightness(105%)" : "none",
        }}
        animate={{
          width: isHovering ? 64 : 32, // Magnification of the *area*, not just elements
          height: isHovering ? 64 : 32,
          backgroundColor: isHovering
            ? "rgba(0, 240, 255, 0.05)" // Subtle Cyan tint
            : "rgba(255, 255, 255, 0.02)", // Almost invisible normally
          borderColor: isHovering
            ? "rgba(0, 240, 255, 0.3)"
            : "rgba(255, 255, 255, 0.15)",
          borderWidth: "1px",
          boxShadow: isHovering
            ? "0 0 20px rgba(0, 240, 255, 0.1)"
            : "0 0 10px rgba(255, 255, 255, 0)",
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1], // Apple-like easing
        }}
      />

      {/* --- LAYER 2: DIRECTIONAL ARROW (Foreground Snappy) --- */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none drop-shadow-[0_0_8px_rgba(0,240,255,0.6)] will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          rotate: smoothRotation,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 0.3 : 1, // Shrink arrow when on text for focus
          opacity: isHovering ? 0.5 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="-24 -14 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#00F0FF]" // NodeXstack Electric Cyan
        >
          <path
            d="M 0 0 L -20 -10 L -16 0 L -20 10 Z"
            fill="currentColor"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </>
  );
}