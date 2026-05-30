"use client";

import { useEffect, useState } from "react";
import { Flame, Sparkles } from "lucide-react";

export function Navbar() {
  const [streak, setStreak] = useState(0);
  const [badge, setBadge] = useState<string | null>(null);

  useEffect(() => {
    const storedStreak = localStorage.getItem("khutbahkit_streak");
    const badges = localStorage.getItem("khutbahkit_badges");
    const parsedStreak = storedStreak ? Number(storedStreak) : 0;
    const parsedBadges = badges ? (JSON.parse(badges) as string[]) : [];

    setStreak(Number.isFinite(parsedStreak) ? parsedStreak : 0);
    setBadge(parsedBadges.length ? parsedBadges[parsedBadges.length - 1] : null);
  }, []);

  return (
    <header className="sticky top-0 z-20 w-full border-b-2 border-duo-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-duo-green px-3 py-2 text-sm font-extrabold text-white">
            KhutbahKit
          </div>
          {badge && (
            <span className="flex items-center gap-1 rounded-full bg-duo-purple px-3 py-1 text-xs font-bold text-white">
              <Sparkles className="h-3 w-3" />
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 rounded-full border-2 border-duo-border bg-duo-surface px-3 py-1 text-xs font-bold text-duo-ink">
          <Flame className="h-4 w-4 text-duo-yellow" />
          <span>{streak} khutbah hari ini</span>
        </div>
      </div>
    </header>
  );
}
