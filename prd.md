# PRD - KhutbahAI

## Product Name

KhutbahAI

## Tagline

Asisten Persiapan Ceramah Berbasis AI untuk Ustadz, Dai, dan Pengisi Kajian.

---

# 1. Product Overview

KhutbahAI adalah platform berbasis AI yang membantu ustadz, dai, guru agama, dan pengisi kajian dalam mempersiapkan materi ceramah secara cepat, terstruktur, relevan, dan sesuai dengan kebutuhan audiens.

Platform ini memanfaatkan Gemini API untuk menghasilkan outline ceramah, naskah lengkap, referensi dalil, serta ringkasan materi berdasarkan konteks acara dan kondisi jamaah.

---

# 2. Problem Statement

Banyak penceramah menghadapi kendala:

* Persiapan materi yang memakan waktu.
* Kesulitan mencari referensi yang relevan.
* Sulit menyesuaikan materi dengan audiens tertentu.
* Membutuhkan inspirasi tema baru.
* Membutuhkan struktur ceramah yang sistematis.
* Membutuhkan referensi dalil yang cepat ditemukan.

---

# 3. Product Goal

Membantu pengguna menghasilkan:

* Outline ceramah
* Naskah ceramah lengkap
* Referensi ayat Al-Qur'an
* Referensi hadits
* Kisah inspiratif pendukung
* Ringkasan materi
* Evaluasi kualitas ceramah

Dalam waktu kurang dari 30 detik.

---

# 4. Tech Stack

## Frontend

* Next.js 15
* TypeScript
* Tailwind CSS
* Shadcn UI
* Lucide Icons

## AI

* Gemini 2.5 Flash

## Deployment

* Vercel

## Environment Variable

.env.local

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

## Database

Tidak menggunakan database pada MVP pertama.

Semua proses dilakukan secara realtime melalui Gemini API.

---

# 5. User Flow

Landing Page

↓

Isi Form Ceramah

↓

Generate Ceramah

↓

AI Processing

↓

Menampilkan Hasil

↓

Copy / Export PDF / Export DOCX

---

# 6. Landing Page

## Hero Section

Headline:

"Persiapkan Ceramah Lebih Cepat dengan AI"

Subheadline:

"Buat outline, naskah, dalil, dan referensi ceramah dalam hitungan detik."

CTA Button:

* Buat Ceramah Sekarang

---

# 7. Form Generator

## Nama Penceramah

Type: Text Input

Placeholder:

Contoh: Ustadz Ahmad Fauzi

---

## Tempat Ceramah

Type: Text Input

Placeholder:

Contoh: Masjid Raya Makassar

---

## Jenis Acara

Type: Select

Options:

* Khutbah Jumat
* Khutbah Idul Fitri
* Khutbah Idul Adha
* Tabligh Akbar
* Kajian Umum
* Kajian Mahasiswa
* Kajian Pemuda
* Kajian Muslimah
* Pengajian Rutin
* Tarawih Ramadan
* Buka Puasa Bersama
* Nuzulul Quran
* Isra Mi'raj
* Maulid Nabi
* Tahun Baru Hijriah
* Santunan Anak Yatim
* Pernikahan
* Aqiqah
* Tasyakuran Rumah
* Tasyakuran Usaha
* Wisuda
* Seminar Pendidikan
* Pelatihan Kepemimpinan
* Pembinaan UMKM
* Takziah
* Doa Bersama
* Pelepasan Haji
* Penyambutan Haji

---

## Tema / Judul Kajian

Type:

* Autocomplete
* Manual Input

Behavior:

Ketika user memilih jenis acara, sistem menampilkan 5 rekomendasi tema otomatis sesuai acara.

User tetap dapat memasukkan tema sendiri.

---

## Kondisi Jamaah

Type: Textarea

Placeholder:

* Banyak pemuda malas shalat
* Banyak mahasiswa kehilangan motivasi
* Banyak keluarga mengalami kesulitan ekonomi
* Banyak UMKM mengalami penurunan omzet

Tujuan:

AI menyesuaikan isi ceramah berdasarkan kondisi jamaah.

---

## Durasi Ceramah

Type: Select

Options:

* 5 Menit
* 10 Menit
* 15 Menit
* 20 Menit
* 30 Menit
* 45 Menit
* 60 Menit

---

## Gaya Penyampaian

Type: Multi Select

Options:

* Khusyuk
* Inspiratif
* Edukatif
* Motivatif
* Formal
* Santai
* Storytelling
* Persuasif
* Tegas
* Menyentuh Hati
* Lugas
* Interaktif

---

## Target Audiens

Type: Select

Options:

* Jamaah Umum
* Mahasiswa
* Pelajar SMA
* Pelajar SMP
* Anak-anak TPA
* Pemuda Masjid
* Muslimah
* Pasangan Suami Istri
* Pengusaha
* UMKM
* Guru
* ASN
* Karyawan
* Petani
* Nelayan
* Lansia

---

## Bahasa Ceramah

Type: Multi Select

Options:

* Bahasa Indonesia
* Bahasa Bugis
* Bahasa Jawa

Mode:

* Indonesia
* Indonesia + Bugis
* Indonesia + Jawa
* Bugis + Jawa
* Indonesia + Bugis + Jawa

---

## Referensi Utama

Type: Checkbox

Options:

* Al-Qur'an
* Hadits
* Kisah Nabi
* Kisah Sahabat
* Ulama Nusantara
* Kombinasi Semuanya

---

## Tujuan Ceramah

Type: Select

Options:

* Mengedukasi
* Memotivasi
* Mengingatkan
* Mengajak Bertaubat
* Menguatkan Iman
* Meningkatkan Ukhuwah
* Meningkatkan Semangat Ibadah
* Membangun Akhlak
* Menguatkan Keluarga
* Mendorong Produktivitas

---

# 8. AI Output

Menggunakan Tab Interface.

## Tab 1 - Outline Ceramah

Berisi:

* Pembukaan
* Poin Utama 1
* Poin Utama 2
* Poin Utama 3
* Penutup

---

## Tab 2 - Naskah Lengkap

Berisi naskah ceramah lengkap sesuai durasi.

---

## Tab 3 - Dalil dan Referensi

Berisi:

* Ayat Al-Qur'an
* Terjemahan
* Hadits
* Kisah Pendukung
* Sumber Referensi

---

## Tab 4 - Ringkasan Cepat

Versi satu halaman.

Digunakan untuk panduan cepat saat ceramah.

---

## Tab 5 - Evaluasi AI

AI memberikan skor:

* Kekuatan Pembukaan
* Kesesuaian Audiens
* Keseimbangan Dalil
* Keterhubungan Pesan
* Kekuatan Penutup

Serta saran perbaikan.

---

# 9. Additional Features

## Copy Result

Menyalin seluruh hasil.

---

## Export PDF

Mengunduh hasil ke PDF.

---

## Export DOCX

Mengunduh hasil ke Word.

---

## Regenerate

Membuat variasi hasil baru.

---

## Share Link

Membuat URL yang dapat dibagikan.

---

# 10. AI Prompt Rules

AI wajib:

* Menggunakan bahasa sopan dan sesuai syariat.
* Tidak membuat hadits palsu.
* Tidak membuat ayat Al-Qur'an yang tidak memiliki referensi jelas.
* Menyebutkan sumber dalil.
* Menyesuaikan hasil berdasarkan:

  * jenis acara
  * tema
  * kondisi jamaah
  * target audiens
  * durasi
  * bahasa
  * gaya penyampaian
  * tujuan ceramah

Jika referensi tidak dapat dipastikan, AI harus menyatakan ketidakpastian daripada mengarang sumber.

---

# 11. Future Roadmap

## V2

* Login Google
* Riwayat Ceramah
* Bookmark Ceramah
* Template Ceramah Favorit

## V3

* Text to Speech
* Audio Ceramah
* Podcast Mode

## V4

* AI Search Referensi Khutbah
* Knowledge Base Dakwah
* AI Assistant untuk Ustadz

---

# Success Metrics

* User dapat menghasilkan ceramah dalam kurang dari 30 detik.
* Tingkat keberhasilan generate > 95%.
* Export PDF digunakan oleh > 40% pengguna.
* Average session duration > 5 menit.
* Returning users > 30%.

Buatkan saya website bernama "KhutbahKit" menggunakan Next.js 14 (App Router), 
Tailwind CSS, dan Google Gemini API. Website ini membantu para ustadz 
mencari referensi dan membuat naskah khutbah dengan cepat dan akurat.

---

## TECH STACK
- Next.js 14 (App Router)
- Tailwind CSS
- Google Gemini API (model: gemini-1.5-flash)
- API Key disimpan di .env.local sebagai GEMINI_API_KEY
- Deploy target: Vercel

---

## DESIGN SYSTEM (WAJIB IKUTI)
Gunakan design system berikut secara konsisten:
UI JANGAN PAKAI EMOJI HARUS ICON SIMPEL
Colors:
- Primary green: #58CC02 (button CTA, active state)
- Green shadow: #58A700 (3D button shadow)
- Blue: #1CB0F6 (secondary actions)
- Yellow: #FFC800 (streak, XP, highlights)
- Red: #FF4B4B (error states)
- Purple: #CE82FF (premium badge, AI label)
- Ink: #3C3C3C (body text)
- Ink-muted: #777777 (placeholder, label)
- Canvas: #ffffff
- Surface-1: #F7F7F7
- Surface-2: #EBEBEB
- Border: #E5E5E5

Typography:
- Display: Nunito 800, 40px, line-height 1.15
- Body: Nunito 700, 15px
- All via Google Fonts: import Nunito weight 400,700,800

Components style:
- CTA button: background #58CC02, border-radius 12px, box-shadow 0 4px 0 #58A700, 
  text white bold, on click translateY(4px) dan shadow hilang (press effect)
- Cards: border 2px solid #E5E5E5, border-radius 20px, background white, 
  box-shadow 0 2px 0 #E5E5E5
- Input/Select: border 2px solid #E5E5E5, radius 12px, focus border #1CB0F6
- Progress bar: green fill #58CC02, pill shape, animated
- Badges: rounded-full, bold, colorful sesuai kategori
- Gamification feel: playful, chunky, rounded — seperti Duolingo

---

## STRUKTUR FILE
/app
  /page.tsx              → Landing page + form input
  /api/generate/route.ts → API route panggil Gemini
/components
  /KhutbahForm.tsx       → Form utama
  /KhutbahResult.tsx     → Tampilan hasil khutbah
  /LanguageBadge.tsx     → Badge pilihan bahasa
  /ThemeSelector.tsx     → Pilihan tema otomatis berdasarkan jenis acara
  /Navbar.tsx            → Header dengan logo dan streak counter
.env.local               → GEMINI_API_KEY=your_key_here

---

## FITUR FORM INPUT

### 1. Nama Penceramah
- Input text
- Placeholder: "Ust. Muhammad Syahrul, Lc."

### 2. Tempat / Nama Acara
- Input text
- Placeholder: "Masjid Al-Ikhlas Makassar / Pernikahan Bapak Haji Ahmad"

### 3. Jenis Acara (dropdown/pill selector)
Pilihan (buat tampil sebagai pill buttons yang bisa diklik):
-  Khutbah Jum'at
- Khutbah Idul Fitri
-  Khutbah Idul Adha
-  Maulid Nabi SAW
-  Akad Nikah / Pernikahan
-  Santunan Anak Yatim
-  Wisuda / Kelulusan
-  Aqiqah / Tasyakuran Kelahiran
-  Syukuran Rumah Baru
-  Ceramah Motivasi Islami
-  Kajian Rutin
-  Nuzulul Qur'an
-  Ceramah Isra Mi'raj
-  Ceramah Tahun Baru Hijriyah
-  Tahlilan / Doa Bersama
-  Ceramah Perpisahan / Pelepasan
-  Ceramah di Rumah Sakit / Pasien
-  Ceramah Hari Kemerdekaan (Islami)
-  Parenting Islami
-  Ceramah Zakat & Wakaf

### 4. Tema / Judul Kajian (SMART SELECTOR)
- Ketika user memilih Jenis Acara, tampilkan 5 opsi tema otomatis yang relevan
- User bisa pilih salah satu ATAU ketik tema sendiri
- Data tema per jenis acara disimpan dalam JSON di /data/themes.json

Contoh isi themes.json:
{
  "Khutbah Jum'at": [
    "Menjaga Shalat di Era Digital",
    "Ikhlas dalam Beramal",
    "Persatuan Umat Islam",
    "Pentingnya Ilmu dalam Islam",
    "Akhlak Mulia sebagai Identitas Muslim"
  ],
  "Khutbah Idul Fitri": [
    "Kembali ke Fitrah Setelah Ramadan",
    "Taqwa sebagai Bekal Hidup",
    "Mempererat Silaturahmi",
    "Menjadi Muslim yang Lebih Baik",
    "Lebaran sebagai Momentum Perubahan"
  ],
  "Akad Nikah / Pernikahan": [
    "Membangun Keluarga Sakinah Mawaddah Warahmah",
    "Hak dan Kewajiban Suami Istri dalam Islam",
    "Cinta dalam Bingkai Ridha Allah",
    "Pernikahan sebagai Ibadah",
    "Menjaga Komunikasi dalam Rumah Tangga Islami"
  ]
  // ... buat untuk semua jenis acara
}

### 5. Durasi Ceramah
- Slider atau dropdown
- Pilihan: 5 menit, 10 menit, 15 menit, 20 menit, 30 menit, 45 menit, 60 menit
- Tampilkan estimasi jumlah kata di bawahnya (misal: "~750 kata")

### 6. Gaya Bahasa (multi-select pills)
-  Khusyuk & Hikmat
-  Santai & Humoris
-  Edukatif & Akademis
-  Inspiratif & Motivatif
-  Emosional & Menyentuh
-  Tegas & Bersemangat
-  Lembut & Penuh Kasih
-  Analitis & Kritis
-  Praktis & To The Point
-  Naratif & Storytelling

### 7. Target Audiens (multi-select pills)
-  Mahasiswa
-  Milenial & Gen Z
- Jamaah Umum
-  Anak-anak TPA
-  Ibu-ibu Majelis Ta'lim
-  Pengusaha & Profesional
-  Remaja Putri
-  Remaja Putra
- Keluarga
-  Siswa & Pelajar
-  Jamaah Lansia
-  Komunitas Multikultural

### 8. Pilihan Bahasa (SPECIAL FEATURE)
Buat UI yang menarik dengan toggle/checkbox combination:
- 🇮🇩 Bahasa Indonesia
-  Bahasa Bugis (Lontara modern)
-  Bahasa Jawa (Krama/Ngoko)

Kombinasi yang bisa dipilih:
- Indonesia saja
- Bugis saja  
- Jawa saja
- Indonesia + Bugis (mix)
- Indonesia + Jawa (mix)
- Bugis + Jawa (mix)
- Indonesia + Bugis + Jawa (mix ketiganya)

Tampilkan info tooltip: "Mix bahasa akan membuat ceramah lebih dekat dengan 
jamaah lokal"

### 9. FITUR TAMBAHAN (Nilai MVP)

#### A. Ayat & Hadits Otomatis
- Checkbox: "Sertakan ayat Al-Qur'an yang relevan ✓"
- Checkbox: "Sertakan hadits shahih yang relevan ✓"
- Default: keduanya tercentang

#### B. Struktur Khutbah
- Toggle: Pilih struktur
  - Standard (Pembukaan → Isi → Penutup)
  - Lengkap (Muqaddimah → Hamdalah → Shalawat → Isi 1 → Isi 2 → Doa Penutup)
  - Custom (hanya isi/materi)

#### C. Tingkat Kedalaman
- Slider: Basic → Intermediate → Advanced
- Tooltip: "Basic cocok untuk ceramah singkat, Advanced untuk kajian ilmiah"

#### D. Catatan Tambahan (Optional)
- Textarea: "Ada pesan khusus atau kondisi jamaah yang perlu diperhatikan?"
- Placeholder: "Contoh: Jamaah baru kehilangan orang tersayang, suasana penuh 
  haru, ada tamu VIP pejabat..."

---

## API ROUTE: /api/generate/route.ts

Buat prompt ke Gemini yang menyertakan semua parameter dan menghasilkan:
1. Judul Khutbah
2. Naskah lengkap (terformat dengan section headers)
3. Poin-poin utama (3-5 poin)
4. Estimasi waktu baca
5. Ayat & hadits yang digunakan (dengan terjemahan)
6. Tips penyampaian untuk ustadz

System prompt untuk Gemini:
"Kamu adalah asisten khusus untuk membantu para ustadz membuat naskah khutbah 
dan ceramah Islam yang berkualitas tinggi. Kamu memiliki pengetahuan mendalam 
tentang Al-Qur'an, Hadits, Fiqih, dan ilmu-ilmu Islam lainnya. Selalu gunakan 
sumber yang shahih dan terpercaya. Jika diminta menulis dalam bahasa daerah 
(Bugis/Jawa), gunakan ungkapan yang autentik dan hormat. Format output dalam 
Markdown yang rapi."

---

## HALAMAN HASIL (/hasil atau modal)

Tampilkan hasil dengan:
1. Header kartu: Nama ustadz + jenis acara + badge bahasa
2. Progress bar animasi saat loading ("Menyusun khutbah... 🤲")
3. Naskah lengkap dengan formatting Markdown
4. Sidebar/panel: Ayat & Hadits yang digunakan
5. Panel: Poin utama (bullet points)
6. Panel: Tips penyampaian
7. Tombol aksi:
   - Salin Teks
   - Download .txt
   - Generate Ulang
   - Edit Manual (textarea)
   - Bagikan (copy link)

---

## GAMIFICATION & UX ELEMENTS

1. **Streak Counter di Navbar**: "🔥 3 Khutbah hari ini" — simpan di localStorage
2. **Badge Pencapaian**: 
   - "Penceramah Pemula" (1 khutbah)
   - "Ustadz Digital" (10 khutbah)
   - "Dai Nusantara" (50 khutbah)
3. **Loading Animation**: Tampilkan quote Islamic random saat loading
4. **Rating Hasil**: Bintang 1-5 setelah generate, simpan feedback ke localStorage
5. **History**: Simpan 5 khutbah terakhir di localStorage, bisa dibuka kembali
6. **Tip of the Day**: Tips singkat public speaking islami di landing page

---

## LANDING PAGE (page.tsx)

Section 1 — Hero:
- Headline besar: "Khutbah Berkualitas dalam Hitungan Menit"
- Sub: "Asisten AI untuk para Ustadz & Da'i Nusantara"
- Ilustrasi/emoji: 🕌🤲📖
- CTA button: "Mulai Buat Khutbah →" (scroll ke form)
- Counter animasi: "1,234+ Khutbah Dibuat" (simulasi)

Section 2 — Form Input (KhutbahForm component)

Section 3 — Features:
- Kartu fitur: AI Cerdas, Bahasa Lokal, Ayat Shahih, Download Gratis

Section 4 — FAQ singkat

Footer: Made with ❤️ untuk Dai Nusantara

---

## MOBILE RESPONSIVE
- Form full-width di mobile
- Pill buttons wrap dengan flex-wrap
- Hasil khutbah: scroll panjang, tombol sticky di bottom
- Navbar minimal di mobile

---

## ENV SETUP
Buat file .env.local.example:
GEMINI_API_KEY=your_gemini_api_key_here

Tambahkan instruksi di README.md cara setup dan deploy ke Vercel.

---

Buat semua file lengkap dan siap pakai. Mulai dari struktur folder, 
semua komponen, API route, data JSON tema, sampai konfigurasi Tailwind. 
Pastikan tidak ada import yang hilang dan semua TypeScript type sudah benar.