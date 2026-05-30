"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Download, RotateCcw, Star, Pencil } from "lucide-react";
import type { GeminiOutput } from "@/app/api/generate/route";
import { LanguageBadge } from "./LanguageBadge";
import { cn } from "@/lib/utils";
import { CtaButton } from "./CtaButton";

type KhutbahResultProps = {
  data: GeminiOutput;
  namaPenceramah: string;
  jenisAcara: string;
  bahasa: string[];
  onRegenerate: () => void;
};

export function KhutbahResult({
  data,
  namaPenceramah,
  jenisAcara,
  bahasa,
  onRegenerate
}: KhutbahResultProps) {
  const [copied, setCopied] = useState(false);
  const [rating, setRating] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editableNaskah, setEditableNaskah] = useState(data.naskah);

  useEffect(() => {
    setEditableNaskah(data.naskah);
    setIsEditing(false);
  }, [data.naskah]);

  const headerTitle = useMemo(() => {
    return `${namaPenceramah} - ${jenisAcara}`;
  }, [namaPenceramah, jenisAcara]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editableNaskah);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleDownload = () => {
    const blob = new Blob([editableNaskah], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "khutbah.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleRating = (value: number) => {
    setRating(value);
    const stored = localStorage.getItem("khutbahkit_ratings");
    const parsed = stored ? (JSON.parse(stored) as number[]) : [];
    const next = [value, ...parsed].slice(0, 20);
    localStorage.setItem("khutbahkit_ratings", JSON.stringify(next));
  };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border-2 border-duo-border bg-white p-6 shadow-[0_2px_0_#E5E5E5]">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-duo-ink">{headerTitle}</h2>
            <LanguageBadge languages={bahasa} />
          </div>
          <div className="text-sm font-bold text-duo-muted">
            Estimasi {data.estimasiMenit} menit
          </div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-duo-ink">{data.judul}</h3>
              <button
                type="button"
                onClick={() => setIsEditing((prev) => !prev)}
                className="flex items-center gap-2 text-xs font-bold text-duo-blue"
              >
                <Pencil className="h-4 w-4" />
                {isEditing ? "Selesai" : "Edit Manual"}
              </button>
            </div>
            {isEditing ? (
              <textarea
                value={editableNaskah}
                onChange={(event) => setEditableNaskah(event.target.value)}
                rows={14}
                className="w-full rounded-xl border-2 border-duo-border px-4 py-3 text-sm font-semibold text-duo-ink focus:border-duo-blue focus:outline-none"
              />
            ) : (
              <div className="prose max-w-none text-sm font-semibold text-duo-ink">
                <ReactMarkdown>{editableNaskah}</ReactMarkdown>
              </div>
            )}
          </div>
          <aside className="space-y-4">
            <div className="rounded-2xl border-2 border-duo-border bg-duo-surface p-4">
              <h4 className="text-sm font-extrabold text-duo-ink">Poin Utama</h4>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm font-semibold text-duo-ink">
                {data.poinUtama.map((poin) => (
                  <li key={poin}>{poin}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-duo-border bg-duo-surface p-4">
              <h4 className="text-sm font-extrabold text-duo-ink">Ayat dan Hadits</h4>
              <div className="mt-2 space-y-3 text-xs font-semibold text-duo-ink">
                {data.ayatDanHadits.map((item, index) => (
                  <div key={`${item.sumber}-${index}`}>
                    <p className="font-bold">{item.teks}</p>
                    <p className="text-duo-muted">{item.terjemahan}</p>
                    <p className="text-duo-blue">{item.sumber}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border-2 border-duo-border bg-duo-surface p-4">
              <h4 className="text-sm font-extrabold text-duo-ink">Tips Penyampaian</h4>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm font-semibold text-duo-ink">
                {data.tipsPenyampaian.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <CtaButton type="button" onClick={handleCopy} className="px-4 py-3">
            <Copy className="mr-2 h-4 w-4" />
            {copied ? "Tersalin" : "Salin Teks"}
          </CtaButton>
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-xl border-2 border-duo-border bg-white px-4 py-3 text-sm font-bold text-duo-ink transition hover:border-duo-blue"
          >
            <Download className="h-4 w-4" />
            Download .txt
          </button>
          <button
            type="button"
            onClick={onRegenerate}
            className="flex items-center gap-2 rounded-xl border-2 border-duo-border bg-white px-4 py-3 text-sm font-bold text-duo-ink transition hover:border-duo-blue"
          >
            <RotateCcw className="h-4 w-4" />
            Generate Ulang
          </button>
        </div>
        <div className="mt-6 flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleRating(value)}
              className="rounded-full p-1"
            >
              <Star
                className={cn(
                  "h-5 w-5",
                  value <= rating ? "fill-duo-yellow text-duo-yellow" : "text-duo-muted"
                )}
              />
            </button>
          ))}
          <span className="text-xs font-bold text-duo-muted">Nilai hasil</span>
        </div>
      </div>
    </section>
  );
}
