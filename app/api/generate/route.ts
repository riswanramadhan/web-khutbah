import { NextResponse } from "next/server";
import { GeminiServiceError, callGemini, type GeminiInput } from "@/lib/gemini";

export type GeminiOutput = {
  judul: string;
  outline: {
    pembukaan: string;
    poinUtama: string[];
    penutup: string;
  };
  naskah: string;
  poinUtama: string[];
  ayatDanHadits: Array<{
    teks: string;
    sumber: string;
    terjemahan: string;
  }>;
  kisahPendukung: string[];
  ringkasan: string;
  evaluasi: {
    kekuatanPembukaan: number;
    kesesuaianAudiens: number;
    keseimbanganDalil: number;
    keterhubunganPesan: number;
    kekuatanPenutup: number;
    saranPerbaikan: string[];
  };
  tipsPenyampaian: string[];
  estimasiMenit: number;
};

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "GEMINI_API_KEY is missing",
        detail: "GEMINI_API_KEY belum terbaca di server. Untuk Vercel, tambahkan Environment Variable GEMINI_API_KEY di Project Settings lalu redeploy."
      },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as GeminiInput;
    const responseText = await callGemini(body);
    const parsed = JSON.parse(responseText) as GeminiOutput;

    return NextResponse.json({ data: parsed });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = error instanceof GeminiServiceError ? error.status : 500;

    return NextResponse.json(
      { error: "Gemini request failed", detail: message },
      { status }
    );
  }
}
