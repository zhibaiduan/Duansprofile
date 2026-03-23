"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GallerySection {
  title: string;
  description: string;
  images: string[];
}

interface ProductGalleryProps {
  sections: GallerySection[];
}

export default function ProductGallery({ sections }: ProductGalleryProps) {
  const allImages = sections.flatMap((s) =>
    s.images.map((src) => ({ src, label: s.title }))
  );

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (globalIndex: number) => setLightboxIndex(globalIndex);
  const close = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + allImages.length) % allImages.length));
  }, [allImages.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % allImages.length));
  }, [allImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, prev, next]);

  // Build a flat image index offset per section
  let globalOffset = 0;

  return (
    <>
      <div className="space-y-14">
        {sections.map((section) => {
          const sectionOffset = globalOffset;
          globalOffset += section.images.length;

          return (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-[#1c1917] font-sans mb-2">
                {section.title}
              </h3>
              <p className="text-sm text-[#78716c] font-sans leading-relaxed mb-5">
                {section.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {section.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => open(sectionOffset + i)}
                    className="group relative overflow-hidden rounded-lg border border-[#e7e5e4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c07a56]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${section.title} ${i + 1}`}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-[#1c1917]/0 group-hover:bg-[#1c1917]/10 transition-colors duration-300" />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={close}
        >
          {/* Image container */}
          <div
            className="relative max-w-5xl w-full mx-6 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Label */}
            <p className="font-mono text-xs text-white/50 uppercase tracking-wider mb-4">
              {allImages[lightboxIndex].label} · {(lightboxIndex % sections.find((_, si) => {
                let off = 0;
                for (let k = 0; k < si; k++) off += sections[k].images.length;
                return lightboxIndex < off + sections[si].images.length && lightboxIndex >= off;
              })!.images.length) + 1} · {allImages.length} total
            </p>

            {/* Main image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={allImages[lightboxIndex].src}
              alt={allImages[lightboxIndex].label}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />

            {/* Counter */}
            <p className="font-mono text-xs text-white/40 mt-4">
              {lightboxIndex + 1} / {allImages.length}
            </p>
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="fixed left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="fixed right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Close */}
          <button
            onClick={close}
            className="fixed top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Thumbnail strip */}
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex gap-2 px-4">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`w-12 h-8 rounded overflow-hidden border-2 transition-all ${
                  i === lightboxIndex
                    ? "border-white opacity-100 scale-110"
                    : "border-white/20 opacity-50 hover:opacity-80"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
