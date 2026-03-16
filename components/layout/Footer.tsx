export default function Footer() {
  return (
    <footer className="relative z-content border-t border-border py-8">
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-between">
        <span className="font-mono text-xs tracking-widest uppercase text-text-secondary">
          Duan &middot; {new Date().getFullYear()}
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-widest uppercase text-text-secondary hover:text-accent transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="mailto:hello@example.com"
            className="font-mono text-xs tracking-widest uppercase text-text-secondary hover:text-accent transition-colors duration-200"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
