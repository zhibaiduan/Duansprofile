import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Deterministic rotation from slug string.
 * Work projects: ±2deg range. All others: ±1deg range.
 */
export function getRotationFromSlug(
  slug: string,
  variant: "work" | "side" | "academic" | "hobby" = "side"
): number {
  const hash = slug
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const range = variant === "work" ? 2 : 1;
  // Map hash to [-range, +range] with one decimal
  const normalized = ((hash % 20) - 10) / 10; // -1 to +1
  return Math.round(normalized * range * 10) / 10;
}
