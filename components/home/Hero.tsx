"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { bodoniModa } from "@/lib/fonts";

const EASE = [0.22, 1, 0.36, 1] as const;

// Module-level flag: persists across re-renders within the same session.
// On re-mount, initial={false} tells Framer Motion to skip to the final state.
let heroPlayed = false;

const block = (delay: number, y = 36) => ({
  initial: heroPlayed ? false : { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.0, ease: EASE, delay },
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    heroPlayed = true;
    const onScroll = () => {
      if (window.scrollY > 40) setScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        {/* Photo column — appears first */}
        <motion.div
          className="flex flex-col items-center md:items-start"
          {...block(0.1, 50)}
        >
          <div className="relative w-[220px] md:w-[300px]">
            {/* Backlight — follows tilt direction */}
            <motion.div
              className="absolute rounded-3xl pointer-events-none"
              style={{
                inset: "-60px",
                background: "radial-gradient(ellipse at 50% 60%, #5b7a52 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
              animate={{
                opacity: tilt.hovering ? 0.3 : 0,
                x: tilt.rotY * 4,
                y: -tilt.rotX * 3,
                scale: tilt.hovering ? 1.15 : 0.85,
              }}
              transition={{ duration: tilt.hovering ? 0.12 : 0.7, ease: "easeOut" }}
            />
          <div
            ref={imgRef}
            className="relative w-full cursor-default"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transition: tilt.hovering
                ? "transform 0.1s ease"
                : "transform 0.6s cubic-bezier(0.34, 1.4, 0.64, 1)",
              transform: photoTransform,
            }}
          >
            {quote && (
              <div className="pointer-events-none absolute -left-3 -top-4 right-3 z-20 rounded-xl border border-border bg-card/92 px-4 py-3 shadow-[0_4px_16px_rgba(28,25,23,0.12)] backdrop-blur-sm">
                <p className="font-sans text-[11px] italic leading-[1.6] text-text-secondary">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            )}
            <div className="img-skeleton relative overflow-hidden rounded-2xl">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt={`${firstName} ${lastName}`}
                className="w-full rounded-2xl object-cover shadow-[0_8px_32px_rgba(28,25,23,0.18)] transition-opacity duration-500 opacity-0"
                style={{ aspectRatio: "3/4" }}
                loading="eager"
                decoding="sync"
                onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                ref={(el) => { if (el?.complete) el.classList.remove("opacity-0"); }}
              />
            ) : (
              <div
                className="w-full rounded-2xl bg-border/40 shadow-[0_8px_32px_rgba(28,25,23,0.12)]"
                style={{ aspectRatio: "3/4" }}
              />
            )}
            </div>
          </div>
          </div>
          {photoCaption && (
            <p className="mt-3 font-mono text-[10px] tracking-[0.08em] text-text-secondary/60 text-center md:text-left">
              {photoCaption}
            </p>
          )}
        </motion.div>

        {/* Content column */}
        <div className="flex flex-col justify-center">

          {/* Block 2 — name */}
          <motion.div {...block(1.1, 32)}>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary mb-3">
              Hey, I&apos;m
            </p>
            <h1 className={`${bodoniModa.className} text-[clamp(2.8rem,6vw,4.5rem)] leading-[1.08] tracking-[-0.02em] text-text-primary mb-6`}>
              {firstName}
              <br />
              <em className="not-italic text-accent">{lastName}</em>
              {" "}
              <span className="not-italic">👋</span>
            </h1>
          </motion.div>

          {/* Block 3 — bio */}
          <motion.div {...block(2.1, 28)} className="flex flex-col gap-4 mb-8">
            {bio.map((paragraph, i) => (
              <p
                key={i}
                className="font-sans text-[15px] leading-[1.9] text-text-primary"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="flex items-center gap-8">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="font-serif text-3xl font-semibold leading-none text-[#5b7a52]">
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
      {/* Scroll hint */}
      <motion.div
        className="flex flex-col items-center gap-2 mt-8 select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: scrolled ? 0 : 3.5 }}
        aria-hidden
      >
        <span className="font-mono text-xs uppercase tracking-[0.1em] text-text-secondary/50">
          scroll
        </span>
        <motion.svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M8 2L8 18M8 18L3 13M8 18L13 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text-secondary/40"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
