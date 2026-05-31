import { cn } from "@/lib/utils";

type LanguageBadgeProps = {
  languages: string[];
};

const badgeColors: Record<string, string> = {
  "Bahasa Indonesia": "bg-duo-green text-white",
  "Bahasa Bugis": "bg-duo-blue text-white",
  "Bahasa Jawa": "bg-duo-yellow text-duo-ink"
};

export function LanguageBadge({ languages }: LanguageBadgeProps) {
  if (!languages.length) {
    return null;
  }

  const isMix = languages.length > 1;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {isMix && (
        <span className="rounded-full bg-duo-purple px-3 py-1 text-xs font-extrabold text-white">
          Mix Bahasa
        </span>
      )}
      {languages.map((language) => (
        <span
          key={language}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-extrabold",
            badgeColors[language] || "bg-duo-surface text-duo-ink"
          )}
        >
          {language}
        </span>
      ))}
    </div>
  );
}
