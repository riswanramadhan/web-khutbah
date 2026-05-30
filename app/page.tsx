import { KhutbahForm } from "@/components/KhutbahForm";

export default function Page() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl border-2 border-duo-border bg-white p-8 shadow-[0_2px_0_#E5E5E5]">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">Khutbah Berkualitas
              <br />dalam Hitungan Menit</h1>
            <p className="mt-4 max-w-xl text-lg font-semibold text-duo-muted">Asisten AI untuk para Ustadz & Da'i Nusantara — buat outline, naskah, dan referensi dalil secara cepat dan terpercaya.</p>
            <div className="mt-6">
              <a href="#khutbah-form" className="inline-block rounded-xl bg-duo-green px-6 py-4 font-bold text-white shadow-[0_4px_0_#58A700] transition-transform active:translate-y-1 active:shadow-none">Mulai Buat Khutbah →</a>
            </div>
            <div className="mt-6 text-sm font-bold text-duo-muted">1,234+ Khutbah Dibuat</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm rounded-2xl border-2 border-duo-border bg-duo-surface p-6 text-center">
              <h3 className="text-lg font-extrabold text-duo-ink">Quick Start</h3>
              <p className="mt-2 text-sm text-duo-muted">Isi form di bawah untuk mulai membuat khutbah.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <KhutbahForm />
      </section>

      <section className="grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl border-2 border-duo-border bg-white p-6 text-center shadow-[0_2px_0_#E5E5E5]">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-duo-green text-white">AI</div>
          <h4 className="mt-3 font-extrabold">AI Cerdas</h4>
        </div>
        <div className="rounded-2xl border-2 border-duo-border bg-white p-6 text-center shadow-[0_2px_0_#E5E5E5]">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-duo-blue text-white">🌐</div>
          <h4 className="mt-3 font-extrabold">Bahasa Lokal</h4>
        </div>
        <div className="rounded-2xl border-2 border-duo-border bg-white p-6 text-center shadow-[0_2px_0_#E5E5E5]">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-duo-yellow text-duo-ink">📖</div>
          <h4 className="mt-3 font-extrabold">Ayat Shahih</h4>
        </div>
        <div className="rounded-2xl border-2 border-duo-border bg-white p-6 text-center shadow-[0_2px_0_#E5E5E5]">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-duo-green text-white">⬇️</div>
          <h4 className="mt-3 font-extrabold">Download Gratis</h4>
        </div>
      </section>

      <section className="rounded-2xl border-2 border-duo-border bg-white p-6 shadow-[0_2px_0_#E5E5E5]">
        <h3 className="text-lg font-extrabold">FAQ</h3>
        <div className="mt-4 space-y-3">
          <details className="rounded-xl border-2 border-duo-border p-4">
            <summary className="font-bold">Apakah referensi ayat dan hadits akurat?</summary>
            <p className="mt-2 text-sm text-duo-muted">AI akan mencantumkan sumber; jika tidak pasti, akan memberi tahu ketidakpastian.</p>
          </details>
          <details className="rounded-xl border-2 border-duo-border p-4">
            <summary className="font-bold">Apakah data disimpan?</summary>
            <p className="mt-2 text-sm text-duo-muted">Hanya data lokal (localStorage) untuk history dan streak; tidak menggunakan database di MVP.</p>
          </details>
          <details className="rounded-xl border-2 border-duo-border p-4">
            <summary className="font-bold">Bagaimana cara deploy ke Vercel?</summary>
            <p className="mt-2 text-sm text-duo-muted">Buat repo, push, lalu import ke Vercel; tambahkan GEMINI_API_KEY di Environment Variables.</p>
          </details>
        </div>
      </section>
    </div>
  );
}
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
