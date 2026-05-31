"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import {
  BookOpen,
  ClipboardList,
  Copy,
  Download,
  FileText,
  Lightbulb,
  Pencil,
  Printer,
  RotateCcw,
  Share2,
  Star
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { GeminiOutput } from "@/app/api/generate/route";
import { cn } from "@/lib/utils";
import { CtaButton } from "./CtaButton";
import { LanguageBadge } from "./LanguageBadge";

type KhutbahResultProps = {
  data: GeminiOutput;
  namaPenceramah: string;
  jenisAcara: string;
  bahasa: string[];
  onRegenerate: () => void;
};

type ResultTab = "outline" | "naskah" | "dalil" | "ringkasan" | "evaluasi";

const tabs: Array<{ id: ResultTab; label: string; Icon: LucideIcon }> = [
  { id: "outline", label: "Outline", Icon: ClipboardList },
  { id: "naskah", label: "Naskah", Icon: BookOpen },
  { id: "dalil", label: "Dalil", Icon: FileText },
  { id: "ringkasan", label: "Ringkasan", Icon: Lightbulb },
  { id: "evaluasi", label: "Evaluasi", Icon: Star }
];

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export function KhutbahResult({
  data,
  namaPenceramah,
  jenisAcara,
  bahasa,
  onRegenerate
}: KhutbahResultProps) {
  const [activeTab, setActiveTab] = useState<ResultTab>("naskah");
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [rating, setRating] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editableNaskah, setEditableNaskah] = useState<string | null>(null);

  const renderedNaskah = editableNaskah ?? data.naskah;
  const outline = useMemo(
    () =>
      data.outline ?? {
        pembukaan: "Pembukaan belum tersedia.",
        poinUtama: data.poinUtama,
        penutup: "Penutup mengikuti naskah lengkap."
      },
    [data.outline, data.poinUtama]
  );
  const evaluasi = useMemo(
    () =>
      data.evaluasi ?? {
        kekuatanPembukaan: 0,
        kesesuaianAudiens: 0,
        keseimbanganDalil: 0,
        keterhubunganPesan: 0,
        kekuatanPenutup: 0,
        saranPerbaikan: ["Evaluasi belum tersedia untuk hasil lama."]
      },
    [data.evaluasi]
  );

  const headerTitle = useMemo(() => {
    return `${namaPenceramah} - ${jenisAcara}`;
  }, [namaPenceramah, jenisAcara]);

  const fullText = useMemo(() => {
    const dalil = data.ayatDanHadits
      .map((item) => `${item.teks}\n${item.terjemahan}\nSumber: ${item.sumber}`)
      .join("\n\n");
    const kisah = (data.kisahPendukung ?? []).join("\n");
    const tips = data.tipsPenyampaian.map((tip) => `- ${tip}`).join("\n");
    const saran = evaluasi.saranPerbaikan.map((item) => `- ${item}`).join("\n");

    return [
      `# ${data.judul}`,
      `Penceramah: ${namaPenceramah}`,
      `Acara: ${jenisAcara}`,
      "",
      "## Outline",
      `Pembukaan: ${outline.pembukaan}`,
      ...outline.poinUtama.map((poin) => `- ${poin}`),
      `Penutup: ${outline.penutup}`,
      "",
      "## Naskah Lengkap",
      renderedNaskah,
      "",
      "## Dalil dan Referensi",
      dalil || "Belum ada dalil.",
      kisah ? `\nKisah pendukung:\n${kisah}` : "",
      "",
      "## Ringkasan Cepat",
      data.ringkasan || "Ringkasan belum tersedia.",
      "",
      "## Evaluasi AI",
      `Kekuatan Pembukaan: ${evaluasi.kekuatanPembukaan}/100`,
      `Kesesuaian Audiens: ${evaluasi.kesesuaianAudiens}/100`,
      `Keseimbangan Dalil: ${evaluasi.keseimbanganDalil}/100`,
      `Keterhubungan Pesan: ${evaluasi.keterhubunganPesan}/100`,
      `Kekuatan Penutup: ${evaluasi.kekuatanPenutup}/100`,
      saran,
      "",
      "## Tips Penyampaian",
      tips
    ].join("\n");
  }, [data, evaluasi, jenisAcara, namaPenceramah, outline, renderedNaskah]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "khutbahkit.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadDoc = () => {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(data.judul)}</title></head><body><pre>${escapeHtml(fullText)}</pre></body></html>`;
    const blob = new Blob([html], { type: "application/msword;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "khutbahkit.doc";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#khutbah-form`;
    await navigator.clipboard.writeText(`${data.judul}\n${shareUrl}`);
    setShared(true);
    setTimeout(() => setShared(false), 1200);
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
      <div className="rounded-2xl border-2 border-duo-border bg-white p-4 shadow-[0_2px_0_#E5E5E5] sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 space-y-2">
            <h2 className="break-words text-lg font-extrabold leading-tight text-duo-ink sm:text-xl">{headerTitle}</h2>
            <LanguageBadge languages={bahasa} />
          </div>
          <div className="shrink-0 text-sm font-bold text-duo-muted">Estimasi {data.estimasiMenit} menit</div>
        </div>

        <div className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-2">
          {tabs.map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={cn(
                  "flex min-h-11 min-w-fit items-center gap-2 rounded-xl border-2 px-4 py-2 text-sm font-extrabold transition",
                  isActive
                    ? "border-duo-green bg-duo-green text-white shadow-[0_3px_0_#58A700]"
                    : "border-duo-border bg-white text-duo-ink hover:border-duo-blue"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="min-h-[320px] min-w-0 space-y-4 sm:min-h-[420px]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="break-words text-base font-extrabold leading-tight text-duo-ink sm:text-lg">{data.judul}</h3>
              {activeTab === "naskah" && (
                <button
                  type="button"
                  onClick={() => {
                    if (!isEditing && editableNaskah === null) {
                      setEditableNaskah(data.naskah);
                    }
                    setIsEditing((prev) => !prev);
                  }}
                  className="flex w-fit items-center gap-2 rounded-lg px-1 text-sm font-extrabold text-duo-blue"
                >
                  <Pencil className="h-4 w-4" />
                  {isEditing ? "Selesai" : "Edit Manual"}
                </button>
              )}
            </div>

            {activeTab === "outline" && (
              <div className="space-y-4 text-sm font-bold leading-7 text-duo-ink">
                <ResultBlock title="Pembukaan" body={outline.pembukaan} />
                <div>
                  <h4 className="font-extrabold">Poin Utama</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {outline.poinUtama.map((poin) => (
                      <li key={poin}>{poin}</li>
                    ))}
                  </ul>
                </div>
                <ResultBlock title="Penutup" body={outline.penutup} />
              </div>
            )}

            {activeTab === "naskah" && (
              isEditing ? (
                <textarea
                  value={renderedNaskah}
                  onChange={(event) => setEditableNaskah(event.target.value)}
                  rows={18}
                  className="w-full rounded-xl border-2 border-duo-border bg-white px-4 py-3 text-base font-bold leading-7 text-duo-ink focus:border-duo-blue focus:outline-none sm:text-sm"
                />
              ) : (
                <div className="prose max-w-none text-sm font-bold text-duo-ink">
                  <ReactMarkdown>{renderedNaskah}</ReactMarkdown>
                </div>
              )
            )}

            {activeTab === "dalil" && (
              <div className="space-y-4">
                {data.ayatDanHadits.map((item, index) => (
                  <div key={`${item.sumber}-${index}`} className="rounded-2xl border-2 border-duo-border bg-duo-surface p-4 text-sm font-bold leading-7 text-duo-ink">
                    <p className="font-extrabold">{item.teks}</p>
                    <p className="mt-2 text-duo-muted">{item.terjemahan}</p>
                    <p className="mt-2 font-extrabold text-duo-blue">{item.sumber}</p>
                  </div>
                ))}
                {(data.kisahPendukung ?? []).length > 0 && (
                  <ResultBlock title="Kisah Pendukung" body={(data.kisahPendukung ?? []).join("\n\n")} />
                )}
              </div>
            )}

            {activeTab === "ringkasan" && (
              <div className="prose max-w-none text-sm font-bold text-duo-ink">
                <ReactMarkdown>{data.ringkasan || "Ringkasan cepat belum tersedia untuk hasil ini."}</ReactMarkdown>
              </div>
            )}

            {activeTab === "evaluasi" && (
              <div className="space-y-4">
                <Score label="Kekuatan Pembukaan" value={evaluasi.kekuatanPembukaan} />
                <Score label="Kesesuaian Audiens" value={evaluasi.kesesuaianAudiens} />
                <Score label="Keseimbangan Dalil" value={evaluasi.keseimbanganDalil} />
                <Score label="Keterhubungan Pesan" value={evaluasi.keterhubunganPesan} />
                <Score label="Kekuatan Penutup" value={evaluasi.kekuatanPenutup} />
                <div>
                  <h4 className="text-sm font-extrabold text-duo-ink">Saran Perbaikan</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-semibold text-duo-ink">
                    {evaluasi.saranPerbaikan.map((saran) => (
                      <li key={saran}>{saran}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <Panel title="Poin Utama" items={data.poinUtama} />
            <Panel title="Tips Penyampaian" items={data.tipsPenyampaian} />
          </aside>
        </div>

        <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
          <CtaButton type="button" onClick={handleCopy} className="w-full justify-center px-4 py-3 sm:w-auto">
            <Copy className="mr-2 h-4 w-4" />
            {copied ? "Tersalin" : "Salin Teks"}
          </CtaButton>
          <ActionButton onClick={handleDownloadTxt} icon={<Download className="h-4 w-4" />} label="Download .txt" />
          <ActionButton onClick={handleDownloadDoc} icon={<FileText className="h-4 w-4" />} label="Export DOC" />
          <ActionButton onClick={() => window.print()} icon={<Printer className="h-4 w-4" />} label="Export PDF" />
          <ActionButton onClick={handleShare} icon={<Share2 className="h-4 w-4" />} label={shared ? "Link Disalin" : "Bagikan"} />
          <ActionButton onClick={onRegenerate} icon={<RotateCcw className="h-4 w-4" />} label="Generate Ulang" />
        </div>

        <div className="mt-6 flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button key={value} type="button" onClick={() => handleRating(value)} className="rounded-full p-1">
              <Star className={cn("h-5 w-5", value <= rating ? "fill-duo-yellow text-duo-yellow" : "text-duo-muted")} />
            </button>
          ))}
          <span className="text-xs font-bold text-duo-muted">Nilai hasil</span>
        </div>
      </div>
    </section>
  );
}

function ResultBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border-2 border-duo-border bg-duo-surface p-4 text-sm font-bold leading-7 text-duo-ink">
      <h4 className="font-extrabold">{title}</h4>
      <p className="mt-2 whitespace-pre-line">{body}</p>
    </div>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm font-extrabold text-duo-ink">
        <span>{label}</span>
        <span>{value}/100</span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-duo-surface">
        <div className="h-full rounded-full bg-duo-green" style={{ width: `${Math.max(0, Math.min(value, 100))}%` }} />
      </div>
    </div>
  );
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border-2 border-duo-border bg-duo-surface p-4">
      <h4 className="text-sm font-extrabold text-duo-ink">{title}</h4>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-sm font-bold leading-7 text-duo-ink">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ActionButton({
  onClick,
  icon,
  label
}: {
  onClick: () => void;
  icon: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-duo-border bg-white px-4 py-3 text-sm font-extrabold text-duo-ink transition hover:border-duo-blue sm:w-auto"
    >
      {icon}
      {label}
    </button>
  );
}
