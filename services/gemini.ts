
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function cleanAsterisks(text: string): string {
  if (!text) return "";
  let cleaned = text.replace(/\*\*/g, "").replace(/\*/g, "");
  const lines = cleaned.split('\n');
  const filteredLines = lines.filter(line => {
    const low = line.toLowerCase().trim();
    return !low.startsWith('soal evaluasi') && 
           !low.startsWith('materi:') && 
           !low.startsWith('tema:') &&
           !low.startsWith('judul:');
  });
  return filteredLines.join('\n').trim();
}

export async function generateLessonObjectives(materi: string, mapel: string, fase: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Bertindaklah sebagai pakar Kurikulum Merdeka. Buatkan 3 Tujuan Pembelajaran (TP) yang variatif untuk mata pelajaran "${mapel}", materi "${materi}", Fase "${fase}". 
      
      KRITERIA WAJIB:
      1. Gunakan Kata Kerja Operasional (KKO) yang berbeda level kognitifnya (kombinasikan dari level C1 hingga C6 Taksonomi Bloom: Mengingat, Memahami, Menerapkan, Menganalisis, Mengevaluasi, dan Menciptakan).
      2. Sesuaikan tingkat kesulitan KKO dengan Fase murid (Fase ${fase}).
      3. Setiap TP harus mengandung unsur Kompetensi dan Lingkup Materi.
      4. Gunakan istilah "Murid".
      
      FORMAT OUTPUT:
      Berikan hasil dalam daftar angka (1, 2, 3) tanpa teks pembuka/penutup. Jangan gunakan tanda bintang (bold).`,
    });
    return cleanAsterisks(response.text || "");
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Gagal menghasilkan tujuan secara otomatis.";
  }
}

export async function generateLearningExperience(materi: string, mapel: string, alokasi: string, pancaCinta: string[], dpl: string[]) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Buatkan "Rencana Pembelajaran Mendalam (RPM)" dalam Bahasa Indonesia untuk mata pelajaran "${mapel}", materi "${materi}", alokasi waktu "${alokasi}". 
        
        KONTEN WAJIB:
        - Integrasi Nilai Cinta: ${pancaCinta.join(", ")}.
        - Dimensi Profil Lulusan: ${dpl.join(", ")}.

        FORMAT OUTPUT (WAJIB TABEL MARKDOWN):
        | Fase | Kegiatan Pembelajaran (Berbasis Cinta) | Alokasi |
        | :--- | :--- | :--- |
        | Pendahuluan | Deskripsi langkah pembuka... | ... |
        | Inti | Deskripsi langkah model PBL/Inquiry... | ... |
        | Penutup | Deskripsi refleksi... | ... |

        PENTING: JANGAN gunakan tanda bintang (bold). Gunakan istilah "Murid".`,
      });
      return cleanAsterisks(response.text || "");
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Gagal menghasilkan pengalaman pembelajaran.";
    }
}

export async function generateKbcQuestions(materi: string, mapel: string, pancaCinta: string[], counts: any) {
    try {
      const totalMax = (counts.hots * 1) + (counts.kompleks * 1) + (counts.isian * 2) + (counts.benarSalah * 1) + (counts.menjodohkan * 1) + (counts.uraian * 3);
      
      const prompt = `Buatkan soal evaluasi pembelajaran untuk materi "${materi}" pada mata pelajaran "${mapel}".
      
      INTEGRASI KURIKULUM BERBASIS CINTA (KBC) - SANGAT WAJIB:
      Hubungkan SETIAP BUTIR SOAL (tanpa kecuali) secara naratif dan kontekstual dengan Nilai Panca Cinta: [${pancaCinta.join(", ")}]. 
      Pastikan nilai-nilai cinta tersebut menjadi jiwa atau latar belakang situasi dalam setiap pertanyaan sehingga murid belajar materi sekaligus meresapi nilai karakter cinta.

      VARIASI KKO & LEVEL KOGNITIF:
      Gunakan kalimat dan Kata Kerja Operasional (KKO) yang variatif mulai dari level C1 hingga C6 (Mengingat sampai Menciptakan) yang diintegrasikan ke dalam soal sesuai porsi jenjang murid.

      WAJIB: Untuk soal Pilihan Ganda (PG) dan PG Kompleks, ANDA HARUS menyertakan opsi jawaban A, B, C, D dengan jelas.

      ATURAN SKOR:
      - PG & PG Kompleks: 1 poin.
      - Isian: 2 poin.
      - Benar/Salah & Menjodohkan: 1 poin.
      - Uraian: 3 poin.

      ATURAN STRUKTUR (ROMAWI):
      I. PG & PG Kompleks (Pilihlah jawaban yang benar!): ${counts.hots} PG HOTS dan ${counts.kompleks} PG Kompleks.
      II. ISIAN (Isilah titik-titik pada pertanyaan berikut dengan jawaban yang benar!): ${counts.isian} soal.
      III. BENAR SALAH (Nyatakan benar jika pernyataan benar atau sebaliknya!): ${counts.benarSalah} soal.
      IV. MENJODOHKAN (Pasangkan dengan benar sesuai pasangan yang cocok!): ${counts.menjodohkan} soal.
      V. URAIAN (Jawablah pertanyaan berikut dengan benar!): ${counts.uraian} soal.
      
      FORMAT OUTPUT:
      1. Butir soal lengkap dengan Opsi A, B, C, D untuk PG/PG Kompleks.
      2. Kunci Jawaban.
      3. TABEL SKOR & NILAI (Wajib format Markdown):
      | Tipe Soal | Skor/Soal | Jumlah | Total Skor | Nilai |
      | :--- | :--- | :--- | :--- | :--- |
      | PG & PG Kompleks | 1 | ${counts.hots + counts.kompleks} | ... | ... |
      | Isian | 2 | ${counts.isian} | ... | ... |
      | Benar / Salah | 1 | ${counts.benarSalah} | ... | ... |
      | Menjodohkan | 1 | ${counts.menjodohkan} | ... | ... |
      | Uraian | 3 | ${counts.uraian} | ... | ... |
      | **TOTAL MAKSIMAL** | | | **${totalMax}** | **100** |

      KETERANGAN: Tambahkan teks "Rumus Nilai: (Skor Perolehan / ${totalMax}) x 100" tepat di bawah tabel. JANGAN gunakan bold (*). Gunakan istilah "Murid".`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      return cleanAsterisks(response.text || "");
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Gagal menghasilkan soal.";
    }
}
