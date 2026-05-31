"use client";

import { useEffect, useState } from "react";
import quotes from "@/data/quotes.json";

export function LoadingScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl border-2 border-duo-border bg-white p-4 shadow-[0_2px_0_#E5E5E5] sm:p-6">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-extrabold text-duo-muted">Menyusun khutbah...</p>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-duo-surface">
            <div className="h-full w-1/2 animate-progress rounded-full bg-duo-green" />
          </div>
        </div>
        <p className="text-sm font-extrabold leading-7 text-duo-ink">{quotes[index]}</p>
      </div>
    </div>
  );
}
