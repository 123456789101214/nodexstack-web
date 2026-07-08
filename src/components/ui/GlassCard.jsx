export default function GlassCard({ children, className = "" }) {
  return (
    <div className={`bg-surface border border-border rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none hover:border-accent/30 dark:hover:border-accent/40 ${className}`}>
      {children}
    </div>
  );
}