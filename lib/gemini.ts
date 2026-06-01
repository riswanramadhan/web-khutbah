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

const DEFAULT_MODEL = "gemini-2.5-flash";
const FALLBACK_MODELS = ["gemini-2.5-flash-lite", "gemini-1.5-flash"];
const MODEL_RETRY_DELAY_MS = 850;

export class GeminiServiceError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "GeminiServiceError";
    this.status = status;
  }
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getModelCandidates() {
  const configured = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  return [configured, ...FALLBACK_MODELS].filter((model, index, models) => {
    return model && models.indexOf(model) === index;
  });
}

function isTemporaryGeminiError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes("503") ||
    message.includes("429") ||
    /Service Unavailable|high demand|overloaded|quota|rate limit/i.test(message)
  );
}

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
  "outline": {
    "pembukaan": "...",
    "poinUtama": ["Poin utama 1", "Poin utama 2", "Poin utama 3"],
    "penutup": "..."
  },
  "naskah": "... (markdown)",
  "poinUtama": ["...", "...", "..."],
  "ayatDanHadits": [{"teks": "...", "sumber": "...", "terjemahan": "..."}],
  "kisahPendukung": ["...", "..."],
  "ringkasan": "... (markdown, versi satu halaman untuk panduan cepat)",
  "evaluasi": {
    "kekuatanPembukaan": number 1-100,
    "kesesuaianAudiens": number 1-100,
    "keseimbanganDalil": number 1-100,
    "keterhubunganPesan": number 1-100,
    "kekuatanPenutup": number 1-100,
    "saranPerbaikan": ["...", "..."]
  },
  "tipsPenyampaian": ["...", "..."],
  "estimasiMenit": number
}

Pastikan ayat dan hadits memiliki sumber yang jelas. Jika tidak yakin, tulis ketidakpastian pada sumber dan jangan mengarang.
PENTING: Return ONLY valid JSON, no markdown fences, no extra text.`;
}

export async function callGemini(input: GeminiInput) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const prompt = buildPrompt(input);
  const modelCandidates = getModelCandidates();
  let lastError: unknown;

  for (const [index, modelName] of modelCandidates.entries()) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_PROMPT,
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.6
        }
      });

      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      lastError = error;
      const shouldTryNextModel = isTemporaryGeminiError(error) && index < modelCandidates.length - 1;

      if (!shouldTryNextModel) {
        break;
      }

      await wait(MODEL_RETRY_DELAY_MS * (index + 1));
    }
  }

  const detail = lastError instanceof Error ? lastError.message : "Unknown Gemini error";
  if (isTemporaryGeminiError(lastError)) {
    throw new GeminiServiceError(
      "Layanan Gemini sedang ramai. Sistem sudah mencoba model cadangan, tetapi masih belum berhasil. Coba lagi beberapa menit lagi atau pakai GEMINI_MODEL=gemini-2.5-flash-lite untuk mode lebih ringan.",
      503
    );
  }

  throw new GeminiServiceError(detail, 500);
}
