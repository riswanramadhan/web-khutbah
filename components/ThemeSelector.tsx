"use client";

import { useMemo } from "react";
import themes from "@/data/themes.json";
import { cn } from "@/lib/utils";

type ThemeSelectorProps = {
  jenisAcara: string;
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
};

export function ThemeSelector({
  jenisAcara,
  value,
  onChange,
  hasError
}: ThemeSelectorProps) {
  const recommendedThemes = useMemo(() => {
    if (!jenisAcara) {
      return [] as string[];
    }

    return (themes as Record<string, string[]>)[jenisAcara] || [];
  }, [jenisAcara]);

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ketik tema atau pilih rekomendasi"
        className={cn(
          "w-full rounded-xl border-2 border-duo-border px-4 py-3 text-sm font-bold text-duo-ink placeholder:text-duo-muted focus:border-duo-blue focus:outline-none",
          hasError && "border-duo-red"
        )}
      />
      {jenisAcara ? (
        <div className="flex flex-wrap gap-2">
          {recommendedThemes.map((theme) => {
            const isSelected = value === theme;
            return (
              <button
                key={theme}
                type="button"
                onClick={() => onChange(theme)}
                className={cn(
                  "rounded-full border-2 px-3 py-1 text-xs font-bold transition",
                  isSelected
                    ? "border-duo-blue bg-duo-blue text-white"
                    : "border-duo-border bg-white text-duo-ink hover:border-duo-blue"
                )}
              >
                {theme}
              </button>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-duo-muted">
          Pilih jenis acara untuk melihat rekomendasi tema.
        </p>
      )}
    </div>
  );
}
