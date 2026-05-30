"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, History } from "lucide-react";
import { ThemeSelector } from "./ThemeSelector";
import { LoadingScreen } from "./LoadingScreen";
import { KhutbahResult } from "./KhutbahResult";
import { CtaButton } from "./CtaButton";
import { cn, estimateWordCount, formatDuration } from "@/lib/utils";
import type { GeminiOutput } from "@/app/api/generate/route";

const jenisAcaraOptions = [
  "Khutbah Jum'at",
  "Khutbah Idul Fitri",
  "Khutbah Idul Adha",
  "Maulid Nabi SAW",
  "Akad Nikah / Pernikahan",
  "Santunan Anak Yatim",
  "Wisuda / Kelulusan",
  "Aqiqah / Tasyakuran Kelahiran",
  "Syukuran Rumah Baru",
  "Ceramah Motivasi Islami",
  "Kajian Rutin",
  "Nuzulul Qur'an",
  "Ceramah Isra Mi'raj",
  "Ceramah Tahun Baru Hijriyah",
  "Tahlilan / Doa Bersama",
  "Ceramah Perpisahan / Pelepasan",
  "Ceramah di Rumah Sakit / Pasien",
  "Ceramah Hari Kemerdekaan (Islami)",
  "Parenting Islami",
  "Ceramah Zakat & Wakaf"
];

const gayaBahasaOptions = [
  "Khusyuk & Hikmat",
  "Santai & Humoris",
  "Edukatif & Akademis",
  "Inspiratif & Motivatif",
  "Emosional & Menyentuh",
  "Tegas & Bersemangat",
  "Lembut & Penuh Kasih",
  "Analitis & Kritis",
  "Praktis & To The Point",
  "Naratif & Storytelling"
];

const audiensOptions = [
  "Mahasiswa",
  "Milenial & Gen Z",
  "Jamaah Umum",
  "Anak-anak TPA",
  "Ibu-ibu Majelis Ta'lim",
  "Pengusaha & Profesional",
  "Remaja Putri",
  "Remaja Putra",
  "Keluarga",
  "Siswa & Pelajar",
  "Jamaah Lansia",
  "Komunitas Multikultural"
];

const bahasaOptions = ["Bahasa Indonesia", "Bahasa Bugis", "Bahasa Jawa"];
const durasiOptions = [5, 10, 15, 20, 30, 45, 60];
const strukturOptions = ["Standard", "Lengkap", "Custom"] as const;
const kedalamanOptions = ["Basic", "Intermediate", "Advanced"] as const;

type FormState = {
  namaPenceramah: string;
  tempat: string;
  jenisAcara: string;
  tema: string;
  durasi: number | null;
  gayaBahasa: string[];
  audiens: string[];
  bahasa: string[];
  includeAyat: boolean;
  includeHadits: boolean;
  struktur: (typeof strukturOptions)[number];
  kedalaman: (typeof kedalamanOptions)[number];
  catatan: string;
};

type HistoryItem = {
  id: string;
  createdAt: string;
  title: string;
  payload: FormState;
  result: GeminiOutput;
};

const initialState: FormState = {
  namaPenceramah: "",
  tempat: "",
  jenisAcara: "",
  tema: "",
  durasi: null,
  gayaBahasa: [],
  audiens: [],
  bahasa: ["Bahasa Indonesia"],
  includeAyat: true,
  includeHadits: true,
  struktur: "Standard",
  kedalaman: "Basic",
  catatan: ""
};

export function KhutbahForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [shakeField, setShakeField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<GeminiOutput | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("khutbahkit_history");
    if (stored) {
      setHistory(JSON.parse(stored) as HistoryItem[]);
    }
  }, []);

  const wordEstimate = useMemo(() => {
    return form.durasi ? estimateWordCount(form.durasi) : 0;
  }, [form.durasi]);

  const updateForm = (key: keyof FormState, value: FormState[keyof FormState]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMulti = (key: "gayaBahasa" | "audiens" | "bahasa", value: string) => {
    setForm((prev) => {
      const current = prev[key];
      const exists = current.includes(value);
      const next = exists ? current.filter((item) => item !== value) : [...current, value];
      return { ...prev, [key]: next } as FormState;
    });
  };

  const validate = () => {
    const nextErrors: Record<string, boolean> = {
      namaPenceramah: !form.namaPenceramah.trim(),
      jenisAcara: !form.jenisAcara,
      tema: !form.tema.trim(),
      durasi: form.durasi === null,
      gayaBahasa: form.gayaBahasa.length === 0,
      audiens: form.audiens.length === 0,
      bahasa: form.bahasa.length === 0
    };

    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors).find((key) => nextErrors[key]);
    if (firstError) {
      setShakeField(firstError);
      setTimeout(() => setShakeField(null), 400);
      const fieldId = `field-${firstError}`;
      document.getElementById(fieldId)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }

    return true;
  };

  const updateStreakAndBadges = (nextHistory: HistoryItem[]) => {
    const today = new Date().toISOString().slice(0, 10);
    const storedDate = localStorage.getItem("khutbahkit_streak_date");
    const storedStreak = localStorage.getItem("khutbahkit_streak");

    let nextStreak = 1;
    if (storedDate === today) {
      nextStreak = storedStreak ? Number(storedStreak) + 1 : 1;
    }

    localStorage.setItem("khutbahkit_streak", String(nextStreak));
    localStorage.setItem("khutbahkit_streak_date", today);

    const totalCount = nextHistory.length;
    const badges: string[] = [];
    if (totalCount >= 1) badges.push("Penceramah Pemula");
    if (totalCount >= 10) badges.push("Ustadz Digital");
    if (totalCount >= 50) badges.push("Dai Nusantara");
    localStorage.setItem("khutbahkit_badges", JSON.stringify(badges));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namaPenceramah: form.namaPenceramah,
          tempat: form.tempat,
          jenisAcara: form.jenisAcara,
          tema: form.tema,
          durasi: form.durasi,
          gayaBahasa: form.gayaBahasa,
          audiens: form.audiens,
          bahasa: form.bahasa,
          includeAyat: form.includeAyat,
          includeHadits: form.includeHadits,
          struktur: form.struktur,
          kedalaman: form.kedalaman,
          catatan: form.catatan
        })
      });

      if (!response.ok) {
        const errorPayload = (await response.json()) as { error?: string };
        throw new Error(errorPayload.error || "Gagal memproses permintaan");
      }

      const payload = (await response.json()) as { data: GeminiOutput };
      setResult(payload.data);

      const nextHistory: HistoryItem[] = [
        {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          title: payload.data.judul,
          payload: form,
          result: payload.data
        },
        ...history
      ].slice(0, 5);

      localStorage.setItem("khutbahkit_history", JSON.stringify(nextHistory));
      setHistory(nextHistory);
      updateStreakAndBadges(nextHistory);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Terjadi kesalahan";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadHistory = (item: HistoryItem) => {
    setForm(item.payload);
    setResult(item.result);
  };

  return (
    <div id="khutbah-form" className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-2xl border-2 border-duo-border bg-white p-6 shadow-[0_2px_0_#E5E5E5]">
          <div className="grid gap-6 md:grid-cols-2">
            <div id="field-nama" className={cn(shakeField === "namaPenceramah" && "animate-shake")}>
              <label className="text-sm font-bold text-duo-ink">Nama Penceramah</label>
              <input
                type="text"
                value={form.namaPenceramah}
                onChange={(event) => updateForm("namaPenceramah", event.target.value)}
                placeholder="Ust. Muhammad Syahrul, Lc."
                className={cn(
                  "mt-2 w-full rounded-xl border-2 border-duo-border px-4 py-3 text-sm font-bold text-duo-ink placeholder:text-duo-muted focus:border-duo-blue focus:outline-none",
                  errors.namaPenceramah && "border-duo-red"
                )}
              />
            </div>
            <div>
              <label className="text-sm font-bold text-duo-ink">Tempat / Nama Acara</label>
              <input
                type="text"
                value={form.tempat}
                onChange={(event) => updateForm("tempat", event.target.value)}
                placeholder="Masjid Al-Ikhlas Makassar / Pernikahan Bapak Haji Ahmad"
                className="mt-2 w-full rounded-xl border-2 border-duo-border px-4 py-3 text-sm font-bold text-duo-ink placeholder:text-duo-muted focus:border-duo-blue focus:outline-none"
              />
            </div>
          </div>

          <div id="field-jenisAcara" className={cn("mt-6", shakeField === "jenisAcara" && "animate-shake")}>
            <label className="text-sm font-bold text-duo-ink">Jenis Acara</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {jenisAcaraOptions.map((option) => {
                const isSelected = form.jenisAcara === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateForm("jenisAcara", option)}
                    className={cn(
                      "rounded-full border-2 px-3 py-2 text-xs font-bold transition",
                      isSelected
                        ? "border-duo-green bg-duo-green text-white"
                        : "border-duo-border bg-white text-duo-ink hover:border-duo-blue",
                      errors.jenisAcara && "border-duo-red"
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div id="field-tema" className={cn("mt-6", shakeField === "tema" && "animate-shake")}>
            <label className="text-sm font-bold text-duo-ink">Tema / Judul Kajian</label>
            <div className="mt-3">
              <ThemeSelector
                jenisAcara={form.jenisAcara}
                value={form.tema}
                onChange={(value) => updateForm("tema", value)}
                hasError={errors.tema}
              />
            </div>
          </div>

          <div id="field-durasi" className={cn("mt-6", shakeField === "durasi" && "animate-shake")}>
            <label className="text-sm font-bold text-duo-ink">Durasi Ceramah</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {durasiOptions.map((minutes) => {
                const isSelected = form.durasi === minutes;
                return (
                  <button
                    key={minutes}
                    type="button"
                    onClick={() => updateForm("durasi", minutes)}
                    className={cn(
                      "rounded-full border-2 px-3 py-2 text-xs font-bold transition",
                      isSelected
                        ? "border-duo-blue bg-duo-blue text-white"
                        : "border-duo-border bg-white text-duo-ink hover:border-duo-blue",
                      errors.durasi && "border-duo-red"
                    )}
                  >
                    {formatDuration(minutes)}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs font-bold text-duo-muted">
              Estimasi jumlah kata: {wordEstimate ? `~${wordEstimate} kata` : "-"}
            </p>
          </div>

          <div id="field-gayaBahasa" className={cn("mt-6", shakeField === "gayaBahasa" && "animate-shake")}>
            <label className="text-sm font-bold text-duo-ink">Gaya Bahasa</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {gayaBahasaOptions.map((option) => {
                const isSelected = form.gayaBahasa.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleMulti("gayaBahasa", option)}
                    className={cn(
                      "rounded-full border-2 px-3 py-2 text-xs font-bold transition",
                      isSelected
                        ? "border-duo-green bg-duo-green text-white"
                        : "border-duo-border bg-white text-duo-ink hover:border-duo-blue",
                      errors.gayaBahasa && "border-duo-red"
                    )}
                  >
                    {isSelected && <Check className="mr-1 inline-block h-3 w-3" />}
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div id="field-audiens" className={cn("mt-6", shakeField === "audiens" && "animate-shake")}>
            <label className="text-sm font-bold text-duo-ink">Target Audiens</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {audiensOptions.map((option) => {
                const isSelected = form.audiens.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleMulti("audiens", option)}
                    className={cn(
                      "rounded-full border-2 px-3 py-2 text-xs font-bold transition",
                      isSelected
                        ? "border-duo-blue bg-duo-blue text-white"
                        : "border-duo-border bg-white text-duo-ink hover:border-duo-blue",
                      errors.audiens && "border-duo-red"
                    )}
                  >
                    {isSelected && <Check className="mr-1 inline-block h-3 w-3" />}
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div id="field-bahasa" className={cn("mt-6", shakeField === "bahasa" && "animate-shake")}>
            <label className="text-sm font-bold text-duo-ink">Pilihan Bahasa</label>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {bahasaOptions.map((option) => {
                const isSelected = form.bahasa.includes(option);
                return (
                  <label
                    key={option}
                    className={cn(
                      "flex items-center justify-between rounded-xl border-2 px-4 py-3 text-sm font-bold",
                      isSelected
                        ? "border-duo-purple bg-duo-purple/10 text-duo-ink"
                        : "border-duo-border bg-white text-duo-ink",
                      errors.bahasa && "border-duo-red"
                    )}
                  >
                    <span>{option}</span>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleMulti("bahasa", option)}
                      className="h-4 w-4 accent-duo-purple"
                    />
                  </label>
                );
              })}
            </div>
            <p className="mt-2 text-xs font-bold text-duo-muted">
              Mix bahasa akan membuat ceramah lebih dekat dengan jamaah lokal.
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <label className="text-sm font-bold text-duo-ink">Ayat & Hadits Otomatis</label>
              <div className="mt-3 space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-duo-ink">
                  <input
                    type="checkbox"
                    checked={form.includeAyat}
                    onChange={(event) => updateForm("includeAyat", event.target.checked)}
                    className="h-4 w-4 accent-duo-green"
                  />
                  Sertakan ayat Al-Quran yang relevan
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-duo-ink">
                  <input
                    type="checkbox"
                    checked={form.includeHadits}
                    onChange={(event) => updateForm("includeHadits", event.target.checked)}
                    className="h-4 w-4 accent-duo-green"
                  />
                  Sertakan hadits shahih yang relevan
                </label>
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-duo-ink">Struktur Khutbah</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {strukturOptions.map((option) => {
                  const isSelected = form.struktur === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateForm("struktur", option)}
                      className={cn(
                        "rounded-full border-2 px-3 py-2 text-xs font-bold transition",
                        isSelected
                          ? "border-duo-green bg-duo-green text-white"
                          : "border-duo-border bg-white text-duo-ink hover:border-duo-blue"
                      )}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-bold text-duo-ink">Tingkat Kedalaman</label>
            <div className="mt-3 flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={2}
                value={kedalamanOptions.indexOf(form.kedalaman)}
                onChange={(event) => {
                  const index = Number(event.target.value);
                  updateForm("kedalaman", kedalamanOptions[index]);
                }}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-duo-surface accent-duo-green"
              />
              <span className="rounded-full bg-duo-surface px-3 py-1 text-xs font-bold text-duo-ink">
                {form.kedalaman}
              </span>
            </div>
            <p className="mt-2 text-xs font-bold text-duo-muted">
              Basic cocok untuk ceramah singkat, Advanced untuk kajian ilmiah.
            </p>
          </div>

          <div className="mt-6">
            <label className="text-sm font-bold text-duo-ink">Catatan Tambahan (Optional)</label>
            <textarea
              value={form.catatan}
              onChange={(event) => updateForm("catatan", event.target.value)}
              rows={4}
              placeholder="Contoh: Jamaah baru kehilangan orang tersayang, suasana penuh haru..."
              className="mt-2 w-full rounded-xl border-2 border-duo-border px-4 py-3 text-sm font-semibold text-duo-ink placeholder:text-duo-muted focus:border-duo-blue focus:outline-none"
            />
          </div>
        </div>

        {errorMessage && (
          <div className="rounded-xl border-2 border-duo-red bg-white px-4 py-3 text-sm font-bold text-duo-red">
            {errorMessage}
          </div>
        )}

        <CtaButton type="submit" disabled={loading} className="w-full justify-center">
          {loading ? "Memproses..." : "Generate Khutbah"}
        </CtaButton>
      </form>

      {loading && <LoadingScreen />}

      {result && !loading && (
        <KhutbahResult
          data={result}
          namaPenceramah={form.namaPenceramah}
          jenisAcara={form.jenisAcara}
          bahasa={form.bahasa}
          onRegenerate={() => setResult(null)}
        />
      )}

      {history.length > 0 && (
        <div className="rounded-2xl border-2 border-duo-border bg-white p-6 shadow-[0_2px_0_#E5E5E5]">
          <div className="flex items-center gap-2 text-sm font-extrabold text-duo-ink">
            <History className="h-4 w-4" />
            Riwayat 5 Khutbah Terakhir
          </div>
          <div className="mt-3 space-y-2">
            {history.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLoadHistory(item)}
                className="flex w-full items-center justify-between rounded-xl border-2 border-duo-border px-4 py-3 text-left text-sm font-bold text-duo-ink transition hover:border-duo-blue"
              >
                <span>{item.title}</span>
                <ChevronDown className="h-4 w-4 text-duo-muted" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
