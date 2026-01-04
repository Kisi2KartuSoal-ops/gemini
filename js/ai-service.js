
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateTP(materi, mapel, fase) {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Buatkan 3 Tujuan Pembelajaran untuk "${mapel}", materi "${materi}", Fase "${fase}". Gunakan istilah "Murid". Berikan hasil daftar angka.`,
    });
    return response.text;
}

export async function generateExperience(materi, mapel, alokasi, pancaCinta) {
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Buatkan Pengalaman Pembelajaran materi "${materi}" mapel "${mapel}" alokasi "${alokasi}". Gunakan tabel Markdown (Pendahuluan, Inti, Penutup). Integrasikan nilai: ${pancaCinta.join(", ")}. Gunakan istilah "Murid".`,
    });
    return response.text;
}

export async function generateQuestions(materi, mapel, pancaCinta, counts) {
    const prompt = `Buatkan soal evaluasi materi "${materi}" mapel "${mapel}".
    INSTRUKSI SOAL:
    1. PG HOTS (${counts.hots}): "Pilihlah Jawaban yang Benar!".
    2. PG Kompleks (${counts.kompleks}): "Pilihlah Jawaban yang Benar! (Pilih lebih dari satu jawaban)".
    3. Benar/Salah: "Nyatakan B jika pernyataan ada pertanyaan benar dan Nyatakan S jika salah!".
    4. Isian: "Isilah titik-titik pada pertanyaan berikut dengan jawaban yang benar!".
    5. Menjodohkan: "Pasangkan sesuai dengan pasangan yang tepat!".
    6. Uraian: "Jawablah pertanyaan berikut dengan benar!".
    Gunakan istilah "Murid". Sertakan Kunci Jawaban di akhir.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
    });
    return response.text;
}
