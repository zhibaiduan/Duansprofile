"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ScreenItem {
  src: string;
  caption?: string;
}

interface ImageGridProps {
  images?: string[];
  imagesJson?: string;
  items?: ScreenItem[];
  itemsJson?: string;
  label?: string;
  captions?: string[];
  cols?: 1 | 2 | 3 | 4;
  center?: boolean;
  width?: "40" | "50" | "60" | "70" | "80" | "100";
}

function parseStringArray(json?: string): string[] | undefined {
  if (!json) return undefined;
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : undefined;
  } catch {
    return undefined;
  }
}

function parseScreenItems(json?: string): ScreenItem[] | undefined {
  if (!json) return undefined;
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return undefined;
    return parsed
      .filter((value): value is Record<string, unknown> => Boolean(value) && typeof value === "object")
      .map((value) => ({
        src: typeof value.src === "string" ? value.src : "",
        caption: typeof value.caption === "string" ? value.caption : undefined,
      }))
      .filter((value) => value.src);
  } catch {
    return undefined;
  }
}

export default function ImageGrid({ images: imagesProp, imagesJson, items, itemsJson, label, captions, cols, center, width }: ImageGridProps) {
  // Normalise to a flat list of { src, caption }
  const parsedItems = parseScreenItems(itemsJson);
  const parsedImages = parseStringArray(imagesJson);
  const sourceItems = items ?? parsedItems;
  const sourceImages = imagesProp ?? parsedImages ?? [];
  const resolved: ScreenItem[] = sourceItems
    ? sourceItems
    : sourceImages.map((src, i) => ({ src, caption: captions?.[i] }));

  const images = resolved.map((r) => r.src);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const close = () => setLightboxIndex(null);
  const centeredMaxWidthClass =
    cols === 1 ? "max-w-4xl" :
    cols === 2 ? "max-w-5xl" :
    cols === 3 ? "max-w-6xl" :
    cols === 4 ? "max-w-7xl" :
    "max-w-5xl";
  const widthClass =
    width === "40" ? "md:w-2/5" :
    width === "50" ? "md:w-1/2" :
    width === "60" ? "md:w-3/5" :
    width === "70" ? "md:w-[70%]" :
    width === "80" ? "md:w-4/5" :
    width === "100" ? "w-full" :
    "w-full";

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

  const markFailed = useCallback((index: number) => {
    setFailedImages((current) => (current[index] ? current : { ...current, [index]: true }));
  }, []);

  return (
    <>
      <div
        className={`mt-6 mb-2 ${center ? `mx-auto w-full ${centeredMaxWidthClass}` : widthClass} ${center && width !== "100" ? widthClass : ""}`}
      >
        <div className={`grid gap-3 ${
          cols === 4 ? "grid-cols-2 sm:grid-cols-4" :
          cols === 3 ? "grid-cols-1 sm:grid-cols-3" :
          cols === 2 ? "grid-cols-1 sm:grid-cols-2" :
          cols === 1 ? "grid-cols-1" :
          images.length === 1 ? "grid-cols-1" :
          images.length === 2 ? "grid-cols-1 sm:grid-cols-2" :
          "grid-cols-1 sm:grid-cols-3"
        }`}>
        {resolved.map(({ src, caption }, i) => (
          <div key={i} className="flex flex-col">
            <button
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="img-skeleton group relative min-h-[6rem] overflow-hidden rounded-lg border border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {failedImages[i] ? (
                <div className="flex min-h-[10rem] w-full items-center justify-center bg-bg px-4 text-center">
                  <p className="font-mono text-[0.6875rem] leading-relaxed text-text-secondary">
                    Image failed to load
                  </p>
                </div>
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={caption ?? (label ? `${label} ${i + 1}` : `Image ${i + 1}`)}
                    className="block w-full h-auto object-cover transition-all duration-500 group-hover:scale-[1.03]"
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    onError={() => markFailed(i)}
                  />
                  <div className="absolute inset-0 bg-transparent transition-colors duration-300 group-hover:bg-black/10" />
                </>
              )}
            </button>
            {caption && (
              <p className="mt-2 text-center font-mono text-[0.6875rem] leading-relaxed text-text-secondary opacity-60">
                {caption}
              </p>
            )}
          </div>
        ))}
        </div>
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
            {!failedImages[lightboxIndex] ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[lightboxIndex]}
                  alt={label ? `${label} ${lightboxIndex + 1}` : `Image ${lightboxIndex + 1}`}
                  className="block w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
                  loading="eager"
                  decoding="async"
                  onError={() => markFailed(lightboxIndex)}
                />
              </>
            ) : (
              <div className="flex min-h-[50vh] w-full items-center justify-center rounded-xl bg-white/5 px-6 text-center">
                <p className="font-mono text-xs leading-relaxed text-white/60">
                  Image failed to load in preview
                </p>
              </div>
            )}
            <p className="text-center font-mono text-xs text-white/40 mt-4">
              {lightboxIndex + 1} / {images.length}
            </p>
            {resolved[lightboxIndex]?.caption && (
              <p className="mx-auto mt-3 max-w-3xl text-center font-mono text-[0.6875rem] leading-relaxed text-white/70">
                {resolved[lightboxIndex].caption}
              </p>
            )}
          </div>

          {/* Prev */}
            {images.length > 1 && (
            <button
              type="button"
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
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="fixed right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Close */}
          <button
            type="button"
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
                type="button"
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
