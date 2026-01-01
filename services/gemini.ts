
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateLessonObjectives(materi: string, mapel: string, fase: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Buatkan 3 Tujuan Pembelajaran yang konkret dan terukur dalam Bahasa Indonesia untuk mata pelajaran "${mapel}", materi "${materi}", Fase "${fase}". Gunakan kata kerja operasional (KKO) yang sesuai. Berikan hasil dalam daftar angka tanpa simbol teknis. Gunakan istilah "Murid" bukan "Peserta didik".`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Gagal menghasilkan tujuan secara otomatis.";
  }
}

export async function generateLearningExperience(materi: string, mapel: string, alokasi: string, pancaCinta: string[]) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Buatkan "Pengalaman Pembelajaran" yang sangat RINCI dalam Bahasa Indonesia untuk mata pelajaran "${mapel}", materi "${materi}", alokasi waktu "${alokasi}". 
        
        WAJIB GUNAKAN FORMAT TABEL MARKDOWN dengan kolom yang tepat: 
        | Fase | Kegiatan Pembelajaran | Alokasi Waktu |
        | :--- | :--- | :--- |
        | **Pendahuluan** | 1. Sapaan & Doa. 2. Presensi. 3. Apersepsi KBC. 4. Tujuan Belajar. (Integrasi: ${pancaCinta.join(", ")}) | ... Menit |
        | **Inti** | Detail langkah-langkah pembelajaran (gunakan penomoran 1, 2, 3 dan poin bullet untuk sub-langkah). Masukkan narasi integrasi nilai cinta secara logis and mendalam. | ... Menit |
        | **Penutup** | 1. Refleksi. 2. Kesimpulan. 3. Janji Cinta/Aksi Nyata. 4. Doa & Salam. | ... Menit |
        | | **Total Alokasi Waktu** | **${alokasi}** |

        KETENTUAN REDAKSI:
        1. Gunakan istilah "Murid" bukan "Peserta didik".
        2. JANGAN gunakan simbol teknis LaTeX seperti ($\rightarrow$).
        3. JANGAN gunakan garis pemisah "---".
        4. Gunakan kalimat deskriptif yang rapi, logis, and mengalir.
        5. Pastikan alur kegiatan mencerminkan Kurikulum Berbasis Cinta (KBC).
        6. Gunakan penomoran dan bullet points di dalam sel tabel agar terstruktur seperti di contoh PDF.`,
      });
      return response.text || "";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Gagal menghasilkan pengalaman pembelajaran.";
    }
}

export async function generateKbcQuestions(materi: string, mapel: string, pancaCinta: string[], counts: any) {
    try {
      const prompt = `Buatkan soal evaluasi pembelajaran untuk materi "${materi}" pada mapel "${mapel}".
      
      INTEGRASI KBC: Masukkan nilai-nilai [${pancaCinta.join(", ")}] ke dalam narasi soal (konteks: kasih sayang, kejujuran, atau kepedulian lingkungan).
      
      SUSUNAN DAN INSTRUKSI SOAL:
      1. Pilihan Ganda HOTS (${counts.hots} soal): Gunakan instruksi "Pilihlah Jawaban yang Benar!". Format angka (1, 2, 3) and pilihan (a, b, c, d).
      2. Pilihan Ganda Kompleks (${counts.kompleks} soal): Gunakan instruksi "Pilihlah Jawaban yang Benar! (Pilih lebih dari satu jawaban)". Format angka and pilihan (a, b, c, d).
      3. Benar/Salah (${counts.benarSalah} soal): Gunakan instruksi "Nyatakan B jika pernyataan ada pertanyaan benar dan Nyatakan S jika salah!". Format angka and pernyataan diikuti (B / S).
      4. Isian Singkat (${counts.isian} soal): Gunakan instruksi "Isilah titik-titik pada pertanyaan berikut dengan jawaban yang benar!". Format angka.
      5. Menjodohkan (${counts.menjodohkan} soal): Gunakan instruksi "Pasangkan sesuai dengan pasangan yang tepat!". Format angka.
      6. Uraian (${counts.uraian} soal): Gunakan instruksi "Jawablah pertanyaan berikut dengan benar!". Format angka.
      
      ATURAN FORMAT:
      - Gunakan penomoran berlanjut (1 sampai akhir).
      - Untuk pilihan ganda, tuliskan soal lalu di bawahnya pilihan a, b, c, d dengan indentasi.
      - Gunakan istilah "Murid" bukan "Peserta didik".
      - JANGAN gunakan simbol LaTeX atau kode matematika kompleks.
      - JANGAN sertakan judul "EVALUASI PEMBELAJARAN" atau header materi lagi di dalam teks soal.
      - Sertakan Kunci Jawaban di bagian paling akhir.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      return response.text || "";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Gagal menghasilkan soal.";
    }
}
