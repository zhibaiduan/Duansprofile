"use client";

import { motion, useReducedMotion } from "framer-motion";

interface HeroProps {
  name: string;
  tagline: string;
}

export default function Hero({ name, tagline }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden px-6 py-24">
      {/* Breathing warm shape */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.12, 1],
                opacity: [0.5, 0.8, 0.5],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] leading-[1.05] tracking-[-0.02em] text-text-primary">
          {name}
        </h1>
        <p className="mt-6 max-w-xl font-sans text-[1.125rem] leading-[1.7] text-text-secondary">
          {tagline}
        </p>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-secondary"
          animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </div>
    </section>
  );
}
