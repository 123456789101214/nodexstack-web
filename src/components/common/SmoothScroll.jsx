// components/common/SmoothScroll.jsx
"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.05, // Patta smooth feeling ekak enna
        duration: 1.5, 
        smoothTouch: false, // Touch devices wala native scroll eka thiyanna
        wheelMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}