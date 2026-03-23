"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ScreenItem {
  src: string;
  caption?: string;
}

interface ImageGridProps {
  images?: string[];
  items?: ScreenItem[];
  label?: string;
  captions?: string[];
  cols?: 1 | 2 | 3 | 4;
  center?: boolean;
}

export default function ImageGrid({ images: imagesProp, items, label, captions, cols, center }: ImageGridProps) {
  // Normalise to a flat list of { src, caption }
  const resolved: ScreenItem[] = items
    ? items
    : (imagesProp ?? []).map((src, i) => ({ src, caption: captions?.[i] }));

  const images = resolved.map((r) => r.src);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    );
  }, [images.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % images.length
    );
  }, [images.length]);

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

  return (
    <>
      <div className={`grid gap-3 mt-6 mb-2 ${center ? "mx-auto" : ""} ${
        cols === 4 ? "grid-cols-4" :
        cols === 3 ? "grid-cols-1 sm:grid-cols-3" :
        cols === 2 ? "grid-cols-2" :
        cols === 1 ? "grid-cols-1" :
        images.length === 1 ? "grid-cols-1" :
        images.length === 2 ? "grid-cols-2" :
        "grid-cols-1 sm:grid-cols-3"
      }`}
      style={center ? { maxWidth: `${Math.round(100 / (cols ?? 4))}%` } : undefined}
      >
        {resolved.map(({ src, caption }, i) => (
          <div key={i} className="flex flex-col">
            <button
              onClick={() => setLightboxIndex(i)}
              className="group relative overflow-hidden rounded-lg border border-[#e7e5e4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c07a56]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={caption ?? (label ? `${label} ${i + 1}` : `Image ${i + 1}`)}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-[#1c1917]/0 group-hover:bg-[#1c1917]/10 transition-colors duration-300" />
            </button>
            {caption && (
              <p className="mt-2 text-center font-mono text-[0.6875rem] text-[#78716c]/60 leading-relaxed">
                {caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={close}
        >
          {/* Image */}
          <div
            className="relative max-w-5xl w-full mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightboxIndex]}
              alt={label ? `${label} ${lightboxIndex + 1}` : `Image ${lightboxIndex + 1}`}
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
            <p className="text-center font-mono text-xs text-white/40 mt-4">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="fixed left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="fixed right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Close */}
          <button
            onClick={close}
            className="fixed top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Thumbnails */}
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`w-14 h-9 rounded overflow-hidden border-2 transition-all ${
                  i === lightboxIndex
                    ? "border-white opacity-100 scale-110"
                    : "border-white/20 opacity-50 hover:opacity-80"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
