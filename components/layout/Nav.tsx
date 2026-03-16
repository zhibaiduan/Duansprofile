"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-nav transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-bg/80 border-b border-border"
          : ""
      }`}
    >
      <nav className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-lg text-text-primary hover:text-accent transition-colors duration-200"
        >
          Duan
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/written"
            className="font-mono text-xs tracking-widest uppercase text-text-secondary hover:text-accent transition-colors duration-200"
          >
            Written
          </Link>
        </div>
      </nav>
    </header>
  );
}
