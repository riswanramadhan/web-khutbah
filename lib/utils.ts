import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function estimateWordCount(minutes: number, wordsPerMinute = 150) {
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return 0;
  }

  return Math.max(1, Math.round(minutes * wordsPerMinute));
}

export function formatDuration(minutes: number) {
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return "-";
  }

  return `${minutes} menit`;
}
