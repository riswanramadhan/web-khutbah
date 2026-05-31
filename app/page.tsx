import { KhutbahForm } from "@/components/KhutbahForm";

function HighlightWords({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className="word-chip">
          {word}
        </span>
      ))}
    </span>
  );
}

export default function Page() {
  return (
    <div className="space-y-8 sm:space-y-12">
      <section className="overflow-hidden rounded-[2rem] border-2 border-ink-deep bg-white shadow-[0_8px_0_#25231f]">
        <div className="grid gap-0 md:grid-cols-[1.28fr_0.72fr] md:items-stretch">
          <div className="p-5 sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex rounded-full border-2 border-ink-deep bg-mint-soft px-4 py-2 font-accent text-xs font-extrabold uppercase text-ink-deep shadow-[0_3px_0_#25231f]">
              Asisten ceramah cepat, rapi, dan bernuansa lokal
            </div>
            <h1 className="font-display text-4xl font-black leading-[0.95] text-ink-deep sm:text-6xl">
              <HighlightWords text="Khutbah Berkualitas" />
              <br />
              <span className="mt-2 inline-block">dalam Hitungan Menit</span>
            </h1>
            <p className="mt-5 max-w-2xl font-accent text-base font-semibold leading-8 text-duo-ink sm:text-lg">
              Buat outline, naskah, dalil, ringkasan, dan tips penyampaian tanpa rasa template murahan. Pilih konteksnya, lalu biarkan AI menyusun bahan yang siap dipoles.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#khutbah-form" className="inline-flex w-full items-center justify-center rounded-2xl border-2 border-ink-deep bg-duo-green px-6 py-4 text-center font-accent font-extrabold text-white shadow-[0_5px_0_#25231f] transition-transform active:translate-y-1 active:shadow-none sm:w-auto">Mulai Buat Khutbah -&gt;</a>
              <div className="rounded-full border-2 border-ink-deep bg-sun-soft px-4 py-2 font-accent text-sm font-extrabold text-ink-deep">
                1,234+ khutbah dibuat
              </div>
            </div>
          </div>
          <div className="border-t-2 border-ink-deep bg-[#123b2a] p-5 text-white md:border-l-2 md:border-t-0 sm:p-8">
            <div className="flex h-full min-h-64 flex-col justify-between gap-8">
              <div>
                <p className="font-accent text-sm font-extrabold uppercase text-duo-yellow">Quick Start</p>
                <h2 className="mt-3 font-display text-3xl font-black leading-tight">
                  Fokus pada pesan, bukan form yang bikin pening.
                </h2>
              </div>
              <div className="grid gap-3 font-accent text-sm font-bold leading-6">
                <div className="rounded-2xl bg-white/10 p-4">1. Pilih acara, audiens, dan gaya bicara.</div>
                <div className="rounded-2xl bg-white/10 p-4">2. Geser kedalaman sesuai kebutuhan kajian.</div>
                <div className="rounded-2xl bg-white/10 p-4">3. Generate, evaluasi, lalu pakai hasilnya.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <KhutbahForm />
      </section>
    </div>
  );
}
