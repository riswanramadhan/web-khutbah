"use client";

import { useState } from "react";
import { Flame, Sparkles } from "lucide-react";

export function Navbar() {
  const [streak] = useState(() => {
    if (typeof window === "undefined") return 0;
    const storedStreak = localStorage.getItem("khutbahkit_streak");
    const parsedStreak = storedStreak ? Number(storedStreak) : 0;
    return Number.isFinite(parsedStreak) ? parsedStreak : 0;
  });

  const [badge] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const badges = localStorage.getItem("khutbahkit_badges");
    const parsedBadges = badges ? (JSON.parse(badges) as string[]) : [];
    return parsedBadges.length ? parsedBadges[parsedBadges.length - 1] : null;
  });

  return (
    <header className="sticky top-0 z-20 w-full border-b-2 border-duo-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-5 sm:py-4 lg:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <div className="shrink-0 rounded-2xl bg-duo-green px-3 py-2 text-sm font-extrabold text-white shadow-[0_3px_0_#58A700]">
            KhutbahKit
          </div>
          {badge && (
            <span className="hidden items-center gap-1 rounded-full bg-duo-purple px-3 py-1 text-xs font-bold text-white sm:flex">
              <Sparkles className="h-3 w-3" />
              {badge}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-full border-2 border-duo-border bg-duo-surface px-3 py-1 text-xs font-bold text-duo-ink">
          <Flame className="h-4 w-4 text-duo-yellow" />
          <span className="whitespace-nowrap">{streak} khutbah hari ini</span>
        </div>
      </div>
    </header>
  );
}
