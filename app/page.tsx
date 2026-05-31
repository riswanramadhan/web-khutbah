import { KhutbahForm } from "@/components/KhutbahForm";

export default function Page() {
  return (
    <div className="space-y-8 sm:space-y-12">
      <section className="rounded-2xl border-2 border-duo-border bg-white p-5 shadow-[0_2px_0_#E5E5E5] sm:p-8">
        <div className="grid gap-6 md:grid-cols-[1.25fr_0.75fr] md:items-center">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight text-duo-ink sm:text-5xl">
              Khutbah Berkualitas
              <br />
              dalam Hitungan Menit
            </h1>
            <p className="mt-4 max-w-xl text-base font-bold leading-7 text-duo-muted sm:text-lg">
              Asisten AI untuk para Ustadz & Da&apos;i Nusantara - buat outline, naskah, dan referensi dalil secara cepat dan terpercaya.
            </p>
            <div className="mt-6">
              <a href="#khutbah-form" className="inline-flex w-full items-center justify-center rounded-xl bg-duo-green px-6 py-4 text-center font-extrabold text-white shadow-[0_4px_0_#58A700] transition-transform active:translate-y-1 active:shadow-none sm:w-auto">Mulai Buat Khutbah -&gt;</a>
            </div>
            <div className="mt-6 text-sm font-bold text-duo-muted">1,234+ Khutbah Dibuat</div>
          </div>
          <div className="flex items-center justify-center md:justify-end">
            <div className="w-full rounded-2xl border-2 border-duo-border bg-duo-surface p-5 text-left sm:max-w-sm sm:p-6 sm:text-center">
              <h3 className="text-lg font-extrabold text-duo-ink">Quick Start</h3>
              <p className="mt-2 text-sm font-bold leading-6 text-duo-muted">Isi form di bawah untuk mulai membuat khutbah.</p>
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
