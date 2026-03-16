"use client";

import { motion, useReducedMotion } from "framer-motion";

interface StoryBeat {
  label: string;
  headline: string;
  body: string;
  annotation?: string;
}

interface StoryFlowProps {
  beats: StoryBeat[];
}

export default function StoryFlow({ beats }: StoryFlowProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="flex flex-col gap-16 md:gap-20">
        {beats.map((beat, i) => (
          <motion.div
            key={i}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 * i }}
            className="grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr]"
          >
            {/* Left: label + annotation */}
            <div className="flex flex-row items-baseline gap-3 md:flex-col md:gap-1 md:pt-1">
              <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                — {beat.label}
              </span>
              {beat.annotation && (
                <span className="font-mono text-xs text-text-secondary/60">
                  {beat.annotation}
                </span>
              )}
            </div>

            {/* Right: headline + body */}
            <div>
              <h2 className="font-serif text-[1.75rem] leading-[1.2] text-text-primary md:text-[2rem]">
                {beat.headline}
              </h2>
              <p className="mt-3 font-sans text-base leading-[1.65] text-text-secondary">
                {beat.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
