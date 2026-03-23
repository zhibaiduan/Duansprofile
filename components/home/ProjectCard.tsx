"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type {
  WorkProject,
  SideProject,
  AcademicProject,
  HobbyItem,
} from "@/types";

interface ProjectCardProps {
  project: WorkProject | SideProject | AcademicProject | HobbyItem;
  variant: "work" | "side" | "academic" | "hobby";
  rotationDeg: number;
  index?: number;
}

const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function PreviewArea() {
  return (
    <div className="h-40 bg-gradient-to-br from-[#f5f1ea] via-[#faf8f4] to-[#e8e0d5] relative overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#c07a56]/15 to-[#f59e0b]/10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: noiseTexture, backgroundSize: "100px 100px" }}
      />
      <div className="relative z-10 flex flex-col items-center gap-1.5">
        <span className="text-2xl">🚧</span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-[#a8a29e]">Under Construction</span>
      </div>
    </div>
  );
}

export default function ProjectCard({
  project,
  variant,
  rotationDeg,
  index = 0,
}: ProjectCardProps) {
  if (variant === "work") {
    const p = project as WorkProject;
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
        style={{ rotate: `${rotationDeg}deg` }}
      >
        <Link href={`/projects/work/${p.slug}`} className="block">
          <motion.article
            whileHover={{ rotate: 0, y: -5, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0px_2px_8px_0px_rgba(28,25,23,0.08)] border border-white/60 overflow-hidden relative group cursor-pointer flex flex-row hover:shadow-[0px_12px_40px_0px_rgba(28,25,23,0.12)] transition-shadow duration-500"
          >
            {/* Image — left */}
            <div className="relative overflow-hidden" style={{ flex: '0 0 32%' }}>
              {p.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.coverImage} alt={p.title} className="absolute inset-0 w-full h-full object-cover object-top" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5f1ea] via-[#faf8f4] to-[#e8e0d5] flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#c07a56]/15 to-[#f59e0b]/10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="relative z-10 flex flex-col items-center gap-1.5">
                    <span className="text-2xl">🚧</span>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#a8a29e]">Under Construction</span>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-[#1c1917]/0 group-hover:bg-[#1c1917]/8 transition-colors duration-500" />
            </div>

            {/* Content — right */}
            <div className="p-6 space-y-3 flex flex-col flex-1 min-w-0 bg-white/40 backdrop-blur-sm relative z-10">
              <p className="text-xs font-medium text-[#78716c] tracking-wider uppercase font-mono">
                {p.company} · {p.year}
              </p>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-[#1c1917] leading-snug font-sans flex-1">
                  {p.title}
                </h3>
                <motion.span
                  className="text-xl text-[#78716c] flex-shrink-0"
                  whileHover={{ scale: 1.15, rotate: 45 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  ↗
                </motion.span>
              </div>
              <p className="text-sm text-[#78716c] leading-relaxed font-sans group-hover:text-[#57534e] transition-colors duration-300 flex-1 line-clamp-3">
                {p.summary}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {p.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-[rgba(28,25,23,0.05)] text-[#78716c] font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {p.result && (
                <p className="text-xs font-medium text-[#3a6d15] font-mono">
                  {p.result}
                </p>
              )}
            </div>
          </motion.article>
        </Link>
      </motion.div>
    );
  }

  if (variant === "side") {
    const p = project as SideProject;
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
        style={{ rotate: `${rotationDeg}deg` }}
      >
        <Link href={`/projects/side/${p.slug}`} className="block h-full">
          <motion.article
            whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0px_2px_8px_0px_rgba(28,25,23,0.08)] border border-white/60 overflow-hidden relative group cursor-pointer flex flex-col h-full hover:shadow-[0px_12px_40px_0px_rgba(28,25,23,0.12)] transition-shadow duration-500"
          >
            {p.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.coverImage} alt={p.title} className="h-40 w-full object-cover scale-110" />
            ) : (
              <PreviewArea />
            )}
            <div className="p-6 space-y-4 flex flex-col flex-1 bg-white/40 backdrop-blur-sm relative z-10">
              <p className="text-xs font-medium text-[#78716c] tracking-wider uppercase font-mono">
                Personal · {p.year}
              </p>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-[#1c1917] leading-snug font-sans flex-1">
                  {p.title}
                </h3>
                <motion.span
                  className="text-xl text-[#78716c] flex-shrink-0"
                  whileHover={{ scale: 1.15, rotate: 45 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  ↗
                </motion.span>
              </div>
              <p className="text-sm text-[#78716c] leading-relaxed font-sans group-hover:text-[#57534e] transition-colors duration-300 flex-1 line-clamp-4">
                {p.summary}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {p.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-[rgba(28,25,23,0.05)] text-[#78716c] font-sans"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.article>
        </Link>
      </motion.div>
    );
  }

  if (variant === "academic") {
    const p = project as AcademicProject;
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
        style={{ rotate: `${rotationDeg}deg` }}
      >
        <Link href={`/projects/academic/${p.slug}`} className="block h-full">
          <motion.article
            whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0px_2px_8px_0px_rgba(28,25,23,0.08)] border border-white/60 overflow-hidden relative group cursor-pointer flex flex-col h-full hover:shadow-[0px_12px_40px_0px_rgba(28,25,23,0.12)] transition-shadow duration-500"
          >
            <div className="p-5 space-y-3 flex flex-col flex-1 bg-white/40 backdrop-blur-sm relative z-10">
              <p className="text-xs font-medium text-[#78716c] tracking-wider uppercase font-mono">
                {[p.context, p.institution, p.year].filter(Boolean).join(" · ")}
              </p>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[15px] font-semibold text-[#1c1917] leading-snug font-sans flex-1">
                  {p.title}
                </h3>
                <motion.span
                  className="text-base text-[#78716c] flex-shrink-0"
                  whileHover={{ scale: 1.15, rotate: 45 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  ↗
                </motion.span>
              </div>
              <p className="text-sm text-[#78716c] leading-relaxed font-sans group-hover:text-[#57534e] transition-colors duration-300 flex-1 line-clamp-4">
                {p.summary}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-auto">
                {p.grade && (
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#edf5e4] text-[#3a6d15]">
                    {p.grade}
                  </span>
                )}
                {p.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-[rgba(28,25,23,0.05)] text-[#78716c] font-sans"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.article>
        </Link>
      </motion.div>
    );
  }

  // hobby
  const p = project as HobbyItem;
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => p.notice && setOpen(true)}
      className={`bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-[0px_2px_8px_0px_rgba(28,25,23,0.08)] border border-white/60 hover:shadow-[0px_12px_32px_0px_rgba(28,25,23,0.12)] group relative overflow-hidden ${p.notice ? "cursor-pointer" : "cursor-default"}`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c07a56]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <motion.div
          className="text-5xl"
          whileHover={{ scale: 1.15, rotate: 15 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          {p.icon ?? "•"}
        </motion.div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[#1c1917] font-sans group-hover:text-[#c07a56] transition-colors duration-300">
            {p.title}
          </h3>
          <p className="text-sm text-[#78716c] leading-relaxed font-sans group-hover:text-[#57534e] transition-colors duration-300">
            {p.summary}
          </p>
        </div>
      </div>

      {/* Bottom gradient bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#c07a56] to-[#f59e0b] origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Notice popup */}
      <AnimatePresence>
        {open && p.notice && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-4 bottom-4 bg-white/90 backdrop-blur-md border border-[#e7e5e4] rounded-xl overflow-hidden shadow-[0px_8px_24px_0px_rgba(28,25,23,0.12)] z-20"
          >
            {/* YouTube thumbnail */}
            {p.noticeLink && (() => {
              const match = p.noticeLink.match(/[?&]v=([^&]+)/);
              const videoId = match?.[1];
              return videoId ? (
                <a href={p.noticeLink} target="_blank" rel="noopener noreferrer" className="block relative group/thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt="Video thumbnail"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover/thumb:bg-black/30 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                      <svg className="w-4 h-4 text-[#1c1917] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </a>
              ) : null;
            })()}
            <div className="px-5 py-4">
              <p className="text-sm text-[#57534e] leading-relaxed font-sans">{p.notice}</p>
              <div className="mt-3 flex items-center gap-4">
                {p.noticeLink && (
                  <a
                    href={p.noticeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#c07a56] hover:underline"
                  >
                    Watch →
                  </a>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="text-xs font-mono text-[#a8a29e] hover:text-[#78716c] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
