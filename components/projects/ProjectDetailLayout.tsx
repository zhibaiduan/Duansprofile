import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProjectDetailLayoutProps {
  backHref: string;
  navItems: string[]; // e.g. ["HTW Berlin", "2026"] — rendered with · separators
  children: React.ReactNode;
}

export default function ProjectDetailLayout({
  backHref,
  navItems,
  children,
}: ProjectDetailLayoutProps) {
  return (
    <div className="min-h-screen bg-bg">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[20%] h-[600px] w-[600px] rounded-full blur-3xl bg-[color:var(--color-border)] opacity-30" />
        <div className="absolute top-[40%] right-[10%] h-[500px] w-[500px] rounded-full blur-3xl bg-accent opacity-[0.06]" />
        <div className="absolute bottom-[10%] left-[30%] h-[700px] w-[700px] rounded-full blur-3xl bg-[color:var(--color-border)] opacity-25" />
      </div>

      {/* Fixed nav */}
      <nav className="fixed top-0 left-0 right-0 z-nav isolate overflow-hidden">
        <div className="absolute inset-0 bg-bg" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-4xl items-center gap-4 px-6 py-5 sm:gap-5">
          <Link
            href={backHref}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-sans whitespace-nowrap">Back</span>
          </Link>
          <div className="hidden min-w-0 items-center gap-5 overflow-hidden sm:flex">
            {navItems.map((item) => (
              <div key={item} className="flex min-w-0 items-center gap-5">
                <span className="shrink-0 text-border">·</span>
                <span className="truncate font-mono text-xs uppercase tracking-wider text-text-secondary">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div className="min-w-0 truncate sm:hidden">
            {navItems[0] && (
              <span className="block truncate font-mono text-xs uppercase tracking-wider text-text-secondary">
                {navItems[0]}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="pt-24 pb-32 sm:pt-28">
        <div className="max-w-4xl mx-auto px-6">
          {children}
        </div>
      </main>
    </div>
  );
}
