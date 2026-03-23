"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "work-cases", label: "Working Cases" },
  { id: "side", label: "Side Projects" },
  { id: "academic", label: "Academic Projects" },
  { id: "think", label: "Outside of Work" },
  { id: "contact", label: "Contact" },
];

export default function ScrollUI() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Section nav dots */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() =>
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="group relative flex items-center justify-end gap-3"
              aria-label={`Navigate to ${label}`}
            >
              <span className="text-xs font-medium text-[#78716c] opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-sans">
                {label}
              </span>
              <div className="relative">
                <div
                  className={`w-2 h-2 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? "border-[#5b7a52] bg-[#5b7a52] scale-125"
                      : "border-[#b8b0a8] bg-transparent hover:border-[#5b7a52]"
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 w-2 h-2 rounded-full bg-[#5b7a52]/20"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#5b7a52] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(91,122,82,0.45)] hover:bg-[#4a6542] transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
