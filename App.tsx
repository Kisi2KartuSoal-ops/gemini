
import React, { useState, useEffect } from 'react';
import { RppFormData, Fase, Jenjang } from './types';
import { CP_DATABASE, KELAS_FASE_MAP, DPL_OPTIONS, PANCA_CINTA_OPTIONS, RUBRIK_DATABASE, JENJANG_SUBJECTS } from './constants';
import InputGroup from './components/InputGroup';
import ResultSection from './components/ResultSection';
import { generateLessonObjectives, generateLearningExperience, generateKbcQuestions } from './services/gemini';

const App: React.FC = () => {
  const [view, setView] = useState<'form' | 'result'>('form');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiContent, setAiContent] = useState({ experience: '', questionsText: '' });
  const [isCpWarning, setIsCpWarning] = useState(false);
  
  const [formData, setFormData] = useState<RppFormData>({
    jenjang: '', namaMadrasah: '', namaKepala: '', nipKepala: '', namaGuru: '', nipGuru: '',
    mataPelajaran: '', kelas: '', fase: '', semester: 'Ganjil', tahunPembelajaran: '2025/2026',
    capaianPembelajaran: '', materi: '', materiKBC: '', alokasi: '', kriteriaPembelajaran: '',
    tujuanPembelajaran: '', pendekatan: 'Saintifik', model: 'Problem Based Learning (PBL)', mediaAlat: '', kota: '',
    tanggalPengesahan: '4', bulanPengesahan: 'Januari', tahunPengesahan: '2026',
    jumlahPGKompleks: 5, jumlahPGHOTS: 3, jumlahBenarSalah: 5, jumlahUraian: 3,
    jumlahIsian: 5, jumlahMenjodohkan: 3,
    dpl: [], pancaCinta: [],
    asesmenAwal: '',
    asesmenTengah: { jenisKegiatan: '', instrumen: '', rubrik: [] }
  });

  const [isAiLoading, setIsAiLoading] = useState(false);

  const availableSubjects = formData.jenjang ? JENJANG_SUBJECTS[formData.jenjang] || [] : [];
  const mapelOptions = availableSubjects.map(s => ({ value: s.toLowerCase(), label: s }));

  const kelasOptions = formData.jenjang === 'MI' ? ['I', 'II', 'III', 'IV', 'V', 'VI'] :
                 formData.jenjang === 'MTs' ? ['VII', 'VIII', 'IX'] :
                 formData.jenjang === 'MA' ? ['X', 'XI', 'XII'] : [];

  useEffect(() => {
    const { jenjang, kelas, mataPelajaran } = formData;
    const currentFase = (kelas && KELAS_FASE_MAP[kelas]) ? KELAS_FASE_MAP[kelas] : '';

    if (!jenjang || !kelas || !mataPelajaran) {
      setFormData(prev => ({ ...prev, fase: currentFase as Fase, capaianPembelajaran: '' }));
      setIsCpWarning(false);
      return;
    }

    const mapelKey = mataPelajaran.toLowerCase();
    const subjectData = CP_DATABASE[mapelKey];
    
    let finalCP = '';
    let warning = false;

    if (subjectData && subjectData[jenjang] && subjectData[jenjang][currentFase]) {
      finalCP = subjectData[jenjang][currentFase];
      warning = false;
    } else {
      warning = true;
      finalCP = `[OTOMATIS GAGAL] Data CP tidak ditemukan di database. Silakan isi manual.`;
    }

    setIsCpWarning(warning);
    setFormData(prev => ({ 
      ...prev, 
      fase: currentFase as Fase, 
      capaianPembelajaran: finalCP 
    }));
  }, [formData.jenjang, formData.kelas, formData.mataPelajaran]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === 'jenjang') {
      setFormData(prev => ({ ...prev, jenjang: value as Jenjang, mataPelajaran: '', kelas: '', capaianPembelajaran: '' }));
      return;
    }
    if (id.includes('.')) {
        const [parent, child] = id.split('.');
        setFormData(prev => ({ ...prev, [parent]: { ...(prev as any)[parent], [child]: value } }));
    } else {
        setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleCheckboxChange = (category: 'dpl' | 'pancaCinta', value: string) => {
    setFormData(prev => {
      const current = prev[category];
      return { ...prev, [category]: current.includes(value) ? current.filter(i => i !== value) : [...current, value] };
    });
  };

  const handleAiGenerateObjectives = async () => {
    if (!formData.materi || !formData.mataPelajaran || !formData.fase) {
      return alert("Mohon pilih Mata Pelajaran, Kelas (Fase), dan isi Materi Pokok terlebih dahulu!");
    }
    setIsAiLoading(true);
    try {
      const result = await generateLessonObjectives(formData.materi, formData.mataPelajaran, formData.fase);
      setFormData(prev => ({ ...prev, tujuanPembelajaran: result }));
    } catch (err) {
      alert("Gagal menghubungi AI. Silakan coba sesaat lagi.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (formData.pancaCinta.length === 0) return alert("Pilih minimal satu Nilai Panca Cinta!");
    
    setIsGenerating(true);
    try {
        const [experience, questions] = await Promise.all([
            generateLearningExperience(formData.materi, formData.mataPelajaran, formData.alokasi, formData.pancaCinta, formData.dpl),
            generateKbcQuestions(formData.materi, formData.mataPelajaran, formData.pancaCinta, {
                hots: formData.jumlahPGHOTS, 
                kompleks: formData.jumlahPGKompleks, 
                benarSalah: formData.jumlahBenarSalah,
                isian: formData.jumlahIsian,
                uraian: formData.jumlahUraian,
                menjodohkan: formData.jumlahMenjodohkan
            })
        ]);
        setAiContent({ experience, questionsText: questions });
        setView('result');
        window.scrollTo(0, 0);
    } catch (err) {
        alert("Gagal memproses AI. Mohon cek kuota API atau koneksi internet.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-gray-50 font-sans">
      <header className="bg-gradient-to-r from-indigo-800 to-purple-900 text-white py-14 no-print shadow-2xl relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
            <img src="https://iili.io/fYvaKwF.jpg" className="w-28 h-28 rounded-full border-4 border-white shadow-2xl mb-4 mx-auto object-cover" alt="Logo" />
            <h1 className="text-4xl font-black uppercase tracking-tighter">RENCANA PEMBELAJARAN MENDALAM (RPM)</h1>
            <p className="mt-2 text-indigo-100 opacity-95 text-lg font-medium italic">Kurikulum Berbasis Cinta (KBC) • Madrasah Masa Depan</p>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-10">
        {view === 'form' ? (
          <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-2xl p-8 md:p-14 border border-gray-100">
            <form onSubmit={handleGenerate} className="space-y-16">
              <section>
                <div className="flex items-center gap-4 mb-8 border-l-8 border-indigo-600 pl-5">
                  <h2 className="text-2xl font-black text-indigo-950 uppercase tracking-tight">1. Identitas Madrasah</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputGroup label="Jenjang Madrasah" id="jenjang" as="select" options={['MI', 'MTs', 'MA']} value={formData.jenjang} onChange={handleChange} />
                  <InputGroup label="Nama Madrasah" id="namaMadrasah" placeholder="e.g. MIN 1 Kota" value={formData.namaMadrasah} onChange={handleChange} />
                  <InputGroup label="Nama Guru" id="namaGuru" value={formData.namaGuru} onChange={handleChange} />
                  <InputGroup label="NIP Guru" id="nipGuru" value={formData.nipGuru} onChange={handleChange} />
                  <InputGroup label="Nama Kepala Madrasah" id="namaKepala" value={formData.namaKepala} onChange={handleChange} />
                  <InputGroup label="NIP Kepala Madrasah" id="nipKepala" value={formData.nipKepala} onChange={handleChange} />
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8 border-l-8 border-indigo-600 pl-5">
                  <h2 className="text-2xl font-black text-indigo-950 uppercase tracking-tight">2. Materi & Fase</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputGroup label="Mata Pelajaran" id="mataPelajaran" as="select" options={mapelOptions} value={formData.mataPelajaran} onChange={handleChange} />
                  <InputGroup label="Materi Pokok" id="materi" placeholder="e.g. Rukun Islam" value={formData.materi} onChange={handleChange} />
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Kelas" id="kelas" as="select" options={kelasOptions} value={formData.kelas} onChange={handleChange} />
                    <InputGroup label="Semester" id="semester" as="select" options={['Ganjil', 'Genap']} value={formData.semester} onChange={handleChange} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Tahun Pembelajaran" id="tahunPembelajaran" as="select" options={['2023/2024', '2024/2025', '2025/2026', '2026/2027']} value={formData.tahunPembelajaran} onChange={handleChange} />
                    <InputGroup label="Alokasi Waktu" id="alokasi" placeholder="e.g. 2 x 35 Menit" value={formData.alokasi} onChange={handleChange} />
                  </div>
                </div>
                <div className={`mt-8 p-8 rounded-3xl border-2 transition-all ${isCpWarning ? "bg-red-50 border-red-200" : "bg-indigo-50 border-indigo-100"}`}>
                  <label className="block text-sm font-black mb-3 uppercase text-indigo-900">Capaian Pembelajaran (CP)</label>
                  <textarea id="capaianPembelajaran" rows={5} value={formData.capaianPembelajaran} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl text-sm border-0 shadow-sm focus:ring-2 focus:ring-indigo-300 outline-none" />
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8 border-l-8 border-pink-600 pl-5">
                  <h2 className="text-2xl font-black text-pink-950 uppercase tracking-tight">3. Dimensi Profil & Nilai Cinta</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-sm font-bold text-pink-800 uppercase mb-4">Dimensi Profil Lulusan:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {DPL_OPTIONS.map(opt => (
                        <label key={opt} className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer border-2 transition-all ${formData.dpl.includes(opt) ? "bg-pink-100 border-pink-400" : "bg-white border-gray-100"}`}>
                          <input type="checkbox" checked={formData.dpl.includes(opt)} onChange={() => handleCheckboxChange('dpl', opt)} className="w-5 h-5 accent-pink-600 rounded" />
                          <span className="text-[10px] font-bold text-pink-900 uppercase leading-tight">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-red-800 uppercase mb-4">Panca Cinta (KBC):</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {PANCA_CINTA_OPTIONS.map(opt => (
                        <label key={opt} className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer border-2 transition-all ${formData.pancaCinta.includes(opt) ? "bg-red-50 border-red-300" : "bg-white border-gray-100"}`}>
                          <input type="checkbox" checked={formData.pancaCinta.includes(opt)} onChange={() => handleCheckboxChange('pancaCinta', opt)} className="w-5 h-5 accent-red-600 rounded" />
                          <span className="text-[10px] font-bold text-red-900 uppercase leading-tight">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                    <button type="button" onClick={handleAiGenerateObjectives} disabled={isAiLoading} className="w-full bg-indigo-50 text-indigo-700 py-6 rounded-2xl font-black text-sm mb-4 border-2 border-dashed border-indigo-200 hover:bg-indigo-100 transition-colors shadow-sm active:scale-[0.99]">
                        {isAiLoading ? "⏳ MERUMUSKAN TUJUAN KOMPREHENSIF (C1-C6)..." : "🤖 AUTO-GENERATE TUJUAN PEMBELAJARAN (AI)"}
                    </button>
                    <textarea id="tujuanPembelajaran" rows={4} value={formData.tujuanPembelajaran} onChange={handleChange} className="w-full px-6 py-4 border-2 border-gray-100 rounded-2xl text-sm focus:border-indigo-400 outline-none" placeholder="Hasil rumusan tujuan pembelajaran akan muncul di sini..." />
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8 border-l-8 border-orange-500 pl-5">
                  <h2 className="text-2xl font-black text-orange-950 uppercase tracking-tight">4. Konfigurasi Evaluasi & Penandatanganan</h2>
                </div>
                <div className="bg-orange-50 p-10 rounded-[2.5rem] border-2 border-orange-100 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup label="Metode Asesmen Proses" id="asesmenTengah.jenisKegiatan" as="select" options={Object.keys(RUBRIK_DATABASE)} value={formData.asesmenTengah.jenisKegiatan} onChange={handleChange} />
                        <InputGroup label="Kota Pembuatan (Lokasi)" id="kota" placeholder="e.g. Jakarta" value={formData.kota} onChange={handleChange} />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        <InputGroup label="PG HOTS" id="jumlahPGHOTS" type="number" value={formData.jumlahPGHOTS} onChange={handleChange} />
                        <InputGroup label="PG Komp." id="jumlahPGKompleks" type="number" value={formData.jumlahPGKompleks} onChange={handleChange} />
                        <InputGroup label="Isian" id="jumlahIsian" type="number" value={formData.jumlahIsian} onChange={handleChange} />
                        <InputGroup label="B / S" id="jumlahBenarSalah" type="number" value={formData.jumlahBenarSalah} onChange={handleChange} />
                        <InputGroup label="Jodoh" id="jumlahMenjodohkan" type="number" value={formData.jumlahMenjodohkan} onChange={handleChange} />
                        <InputGroup label="Uraian" id="jumlahUraian" type="number" value={formData.jumlahUraian} onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InputGroup label="Tanggal Pengesahan" id="tanggalPengesahan" value={formData.tanggalPengesahan} onChange={handleChange} />
                        <InputGroup label="Bulan Pengesahan" id="bulanPengesahan" as="select" options={['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']} value={formData.bulanPengesahan} onChange={handleChange} />
                        <InputGroup label="Tahun Pengesahan" id="tahunPengesahan" value={formData.tahunPengesahan} onChange={handleChange} />
                    </div>
                </div>
              </section>

              <button type="submit" disabled={isGenerating} className="w-full bg-indigo-900 text-white font-black py-10 rounded-3xl shadow-2xl hover:bg-black active:scale-[0.98] transition-all text-2xl uppercase tracking-[0.2em] border-b-8 border-indigo-950">
                {isGenerating ? "⏳ MENYUSUN RPM BERBASIS CINTA..." : "🚀 GENERATE RPM (RENCANA PEMBELAJARAN MENDALAM)"}
              </button>
            </form>
          </div>
        ) : (
          <ResultSection data={formData} aiContent={aiContent} onEdit={() => setView('form')} />
        )}
      </main>
    </div>
  );
};

export default App;
