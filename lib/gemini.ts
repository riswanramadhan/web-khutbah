import { GoogleGenerativeAI } from "@google/generative-ai";
import { estimateWordCount } from "./utils";

export type GeminiInput = {
  namaPenceramah: string;
  tempat: string;
  jenisAcara: string;
  tema: string;
  durasi: number;
  gayaBahasa: string[];
  audiens: string[];
  bahasa: string[];
  includeAyat: boolean;
  includeHadits: boolean;
  struktur: string;
  kedalaman: string;
  catatan: string;
};

const SYSTEM_PROMPT =
  "Kamu adalah asisten khusus untuk membantu para ustadz membuat naskah khutbah " +
  "dan ceramah Islam yang berkualitas tinggi. Kamu memiliki pengetahuan mendalam " +
  "tentang Al-Qur'an, Hadits, Fiqih, dan ilmu-ilmu Islam lainnya. Selalu gunakan " +
  "sumber yang shahih dan terpercaya. Jika diminta menulis dalam bahasa daerah " +
  "(Bugis/Jawa), gunakan ungkapan yang autentik dan hormat. Format output dalam " +
  "Markdown yang rapi.";

export function buildPrompt(input: GeminiInput) {
  const estimasiKata = estimateWordCount(input.durasi);
  const yaTidak = (value: boolean) => (value ? "ya" : "tidak");

  return `Buat naskah khutbah dengan spesifikasi berikut:
- Penceramah: ${input.namaPenceramah}
- Tempat/Acara: ${input.tempat}
- Jenis Acara: ${input.jenisAcara}
- Tema: ${input.tema}
- Durasi: ${input.durasi} menit (~${estimasiKata} kata)
- Gaya Bahasa: ${input.gayaBahasa.join(", ")}
- Target Audiens: ${input.audiens.join(", ")}
- Bahasa: ${input.bahasa.join(" + ")}
- Sertakan Ayat Qur'an: ${yaTidak(input.includeAyat)}
- Sertakan Hadits: ${yaTidak(input.includeHadits)}
- Struktur: ${input.struktur}
- Tingkat Kedalaman: ${input.kedalaman}
- Catatan Khusus: ${input.catatan || "-"}

Output dalam format JSON dengan struktur:
{
  "judul": "...",
  "naskah": "... (markdown)",
  "poinUtama": ["...", "...", "..."],
  "ayatDanHadits": [{"teks": "...", "sumber": "...", "terjemahan": "..."}],
  "tipsPenyampaian": ["...", "..."],
  "estimasiMenit": number
}

PENTING: Return ONLY valid JSON, no markdown fences, no extra text.`;
}

export async function callGemini(input: GeminiInput) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.6
    }
  });

  const result = await model.generateContent(buildPrompt(input));
  return result.response.text();
}
