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
    <div className="min-h-screen bg-[#faf8f4]">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] rounded-full blur-3xl bg-[#f5e6d3] opacity-30" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] rounded-full blur-3xl bg-[#5b7a52] opacity-[0.06]" />
        <div className="absolute bottom-[10%] left-[30%] w-[700px] h-[700px] rounded-full blur-3xl bg-[#e8d5c4] opacity-25" />
      </div>

      {/* Fixed nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f4]/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-0 py-5 flex items-center gap-5">
          <Link
            href={backHref}
            className="flex items-center gap-2 text-[#78716c] hover:text-[#1c1917] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-sans">Back</span>
          </Link>
          {navItems.map((item) => (
            <>
              <span key={`sep-${item}`} className="text-[#e8e0d5]">·</span>
              <span key={item} className="font-mono text-xs text-[#78716c] uppercase tracking-wider">
                {item}
              </span>
            </>
          ))}
        </div>
      </nav>

      {/* Main */}
      <main className="pt-16 pb-32">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
