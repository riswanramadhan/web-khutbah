import type { Metadata } from "next";
import { Fraunces, Nunito, Outfit } from "next/font/google";
import { Heart } from "lucide-react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const nunito = Nunito({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nunito"
});

const fraunces = Fraunces({
  weight: ["700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-display"
});

const outfit = Outfit({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-accent"
});

export const metadata: Metadata = {
  title: "KhutbahKit - Khutbah Berkualitas dalam Hitungan Menit",
  description: "Asisten AI untuk membantu ustadz membuat naskah khutbah cepat dan akurat.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${nunito.variable} ${fraunces.variable} ${outfit.variable} h-full antialiased`}>
      <body className="relative flex min-h-full flex-col overflow-x-hidden bg-paper text-duo-ink">
        <div className="arabic-float-bg" aria-hidden="true">
          <span>الله</span>
          <span>بركة</span>
          <span>نور</span>
          <span>سلام</span>
          <span>رحمة</span>
          <span>ذكر</span>
        </div>
        <Navbar />
        <main className="relative z-10 mx-auto w-full max-w-6xl px-3 py-5 sm:px-5 sm:py-8 lg:px-6">{children}</main>
        <footer className="relative z-10 mx-auto w-full max-w-6xl px-3 pb-8 pt-2 text-center font-accent text-sm font-extrabold text-ink-deep sm:px-5">
          made with{" "}
          <Heart className="mx-1 inline-block h-4 w-4 fill-duo-red text-duo-red" aria-label="love" />
          {" "}in Bone . Powered by{" "}
          <a
            href="https://dekatlokal.com"
            target="_blank"
            rel="noreferrer"
            className="font-display text-base font-black text-duo-green underline decoration-duo-yellow decoration-4 underline-offset-4 transition hover:text-duo-blue"
          >
            DekatLokal
          </a>
        </footer>
      </body>
    </html>
  );
}
