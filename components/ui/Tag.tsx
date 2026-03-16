interface TagProps {
  children: React.ReactNode;
  variant?: "accent" | "muted";
}

export default function Tag({ children, variant = "muted" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs tracking-wide ${
        variant === "accent"
          ? "bg-accent/10 text-accent"
          : "bg-border text-text-secondary"
      }`}
    >
      {children}
    </span>
  );
}
