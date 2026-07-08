import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GlowButton({ href, children, variant = "primary", className = "" }) {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300";
  
  const variants = {
    primary: "bg-accent text-white hover:brightness-110 shadow-[0_0_20px_rgba(29,172,253,0.3)] dark:shadow-[0_0_20px_rgba(6,179,254,0.25)] hover:shadow-[0_0_25px_rgba(29,172,253,0.5)]",
    outline: "border border-border bg-transparent text-text-primary hover:border-accent hover:text-accent"
  };

  return (
    <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
      {variant === "primary" && <ArrowRight size={18} />}
    </Link>
  );
}