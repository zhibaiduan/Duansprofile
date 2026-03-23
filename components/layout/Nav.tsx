"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "/#work-cases" },
    { label: "Side Projects", href: "/#side" },
    { label: "Academic", href: "/#academic" },
    { label: "How I Think", href: "/#think" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-nav border-b border-border transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? "bg-bg/90 shadow-[0_2px_12px_rgba(28,25,23,0.08)]"
          : "bg-bg/70"
      }`}
    >
      <nav className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
        {/* Logo / name */}
        <Link
          href="/"
          className="font-sans text-[13px] font-semibold text-text-primary hover:text-accent transition-colors duration-200"
        >
          Xiaoyan Duan
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) =>
            link.label === "How I Think" ? (
              <Link
                key={link.label}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ) : link.label === "Contact" ? (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            )
          )}
          <Link
            href="/written"
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Writing
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-px w-5 bg-text-primary transition-all duration-200 ${
              menuOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-text-primary transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-text-primary transition-all duration-200 ${
              menuOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary hover:text-text-primary transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/written"
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary hover:text-text-primary transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Writing
          </Link>
        </div>
      )}
    </header>
  );
}
