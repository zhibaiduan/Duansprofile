"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const principles = [
  "What is the real problem.",
  "What is an effective solution.",
  "What is the real cost of adopting it.",
];

export default function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="px-6 pt-16 pb-0">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-[#e7e5e4] bg-white/50 px-10 py-6 flex flex-col items-center gap-4"
        >
          <p className="text-[10px] font-mono font-medium uppercase tracking-widest text-[#c8bfb5]">
            Philosophy
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {principles.map((text, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#d6cfc8]">0{i + 1}</span>
                <span className="text-sm font-sans text-[#78716c]">{text}</span>
                {i < principles.length - 1 && (
                  <span className="ml-6 text-[#e7e5e4] select-none hidden sm:inline">·</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
