"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

interface StatItem {
  value: string;
  label: string;
}

interface HeroProps {
  firstName: string;
  lastName: string;
  bio: React.ReactNode[];
  photo?: string;
  photoCaption?: string;
  quote?: string;
  stats?: StatItem[];
}

export default function Hero({
  firstName,
  lastName,
  bio,
  photo,
  photoCaption,
  quote,
  stats,
}: HeroProps) {
  const prefersReduced = useReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, hovering: false });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced) return;
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotX: -dy * 10, rotY: dx * 14, hovering: true });
  }

  function handleMouseLeave() {
    setTilt({ rotX: 0, rotY: 0, hovering: false });
  }

  const photoTransform = tilt.hovering
    ? `perspective(900px) rotate(-3deg) scale(1.06) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`
    : `perspective(900px) scale(0.86) rotate(-3deg)`;

  return (
    <section id="hero" className="mx-auto max-w-5xl px-6 pt-[8rem] pb-16">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-20 items-start">
        {/* Photo column */}
        <motion.div
          className="flex flex-col items-center md:items-start"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div
            ref={imgRef}
            className="w-[220px] md:w-[300px] cursor-default relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transition: tilt.hovering
                ? "transform 0.1s ease"
                : "transform 0.6s cubic-bezier(0.34, 1.4, 0.64, 1)",
              transform: photoTransform,
            }}
          >
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt={`${firstName} ${lastName}`}
                className="w-full rounded-2xl object-cover shadow-[0_8px_32px_rgba(28,25,23,0.18)]"
                style={{ aspectRatio: "3/4" }}
              />
            ) : (
              <div
                className="w-full rounded-2xl bg-border/40 shadow-[0_8px_32px_rgba(28,25,23,0.12)]"
                style={{ aspectRatio: "3/4" }}
              />
            )}

            {/* Quote overlay */}
            {quote && (
              <div className="absolute -top-4 -left-3 right-3 bg-card/92 backdrop-blur-sm rounded-xl shadow-[0_4px_16px_rgba(28,25,23,0.12)] border border-border px-4 py-3 pointer-events-none">
                <p className="font-sans text-[11px] leading-[1.6] text-text-secondary italic">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            )}
          </div>
          {photoCaption && (
            <p className="mt-3 font-mono text-[10px] tracking-[0.08em] text-text-secondary/60 text-center md:text-left">
              {photoCaption}
            </p>
          )}
        </motion.div>

        {/* Content column */}
        <div className="flex flex-col justify-center">
          <motion.p
            {...fadeUp(0.65)}
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary mb-3"
          >
            Hey, I&apos;m
          </motion.p>
          <motion.h1
            {...fadeUp(0.85)}
            className="font-serif text-[clamp(2.8rem,6vw,4.5rem)] leading-[1.08] tracking-[-0.02em] text-text-primary mb-6"
          >
            {firstName}
            <br />
            <em className="not-italic text-accent">{lastName}</em>
          </motion.h1>
          <div className="flex flex-col gap-4 mb-8">
            {bio.map((paragraph, i) => (
              <motion.p
                key={i}
                {...fadeUp(1.2 + i * 0.3)}
                className="font-sans text-[15px] leading-[1.9] text-text-secondary"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="flex items-center gap-8">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="font-serif text-3xl font-bold leading-none text-[#c07a56]">
                    {value}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#78716c] mt-1">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
