export function AnimatedText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`text-mask ${className}`}><span className="text-mask__inner">{children}</span></span>;
}
