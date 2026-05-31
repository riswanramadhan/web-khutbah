import type { Metadata } from "next";
import { Fraunces, Nunito, Outfit } from "next/font/google";
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
      <body className="flex min-h-full flex-col bg-paper text-duo-ink">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-5 sm:py-8 lg:px-6">{children}</main>
      </body>
    </html>
  );
}
