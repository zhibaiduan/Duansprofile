"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "timeline", label: "Journey" },
  { id: "work-cases", label: "Work" },
  { id: "side", label: "Side Projects" },
  { id: "academic", label: "Academic" },
  { id: "think", label: "Hobbies" },
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
                      ? "border-[#c07a56] bg-[#c07a56] scale-125"
                      : "border-[#e8e0d5] bg-transparent hover:border-[#c07a56]"
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 w-2 h-2 rounded-full bg-[#c07a56]/20"
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
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#c07a56] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(192,122,86,0.45)] hover:bg-[#b36a46] transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
