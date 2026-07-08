"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme state
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const newTheme = isDark ? "light" : "dark";
    
    if (newTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    
    localStorage.setItem("nodexstack-theme", newTheme);
    setIsDark(!isDark);

    // Dispatch a custom event so the Globe component can listen and update instantly
    window.dispatchEvent(new CustomEvent("themeChange", { detail: newTheme }));
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative flex items-center justify-center w-10 h-10 rounded-full border border-border bg-transparent hover:border-accent text-text-secondary hover:text-accent transition-colors duration-300 overflow-hidden"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`absolute w-full h-full transition-all duration-500 ease-in-out ${
            isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`absolute w-full h-full transition-all duration-500 ease-in-out ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
          }`}
        />
      </div>
    </button>
  );
}