
import React, { useState, useEffect } from 'react';
import { RppFormData, Fase, Jenjang } from './types';
import { CP_DATABASE, KELAS_FASE_MAP, DPL_OPTIONS, PANCA_CINTA_OPTIONS, RUBRIK_DATABASE } from './constants';
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
    mataPelajaran: '', kelas: '', fase: '', semester: '', tahunPembelajaran: '2024/2025',
    capaianPembelajaran: '', materi: '', materiKBC: '', alokasi: '', kriteriaPembelajaran: '',
    tujuanPembelajaran: '', pendekatan: '', model: '', mediaAlat: '', kota: '',
    tanggalPengesahan: new Date().getDate().toString(), bulanPengesahan: '', tahunPengesahan: '2025',
    jumlahPGKompleks: 5, jumlahPGHOTS: 3, jumlahBenarSalah: 2, jumlahUraian: 3,
    jumlahIsian: 2, jumlahMenjodohkan: 2,
    dpl: [], pancaCinta: [],
    prinsip: { berkesadaran: '', bermakna: '', menyenangkan: '' },
    kerangka: { praktikPedagogis: '', lingkungan: '', kemitraan: '', digital: '' },
    asesmenAwal: '',
    asesmenTengah: { jenisKegiatan: '', instrumen: '', rubrik: [] }
  });

  const [isAiLoading, setIsAiLoading] = useState(false);

  const mataPelajaranOptions = Object.keys(CP_DATABASE).map(key => ({
    value: key,
    label: key.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }));

  const processAssessmentOptions = Object.keys(RUBRIK_DATABASE);

  const checkJenjangKelasMatch = (jenjang: string, kelas: string) => {
    if (!jenjang || !kelas) return true;
    const miClasses = ['I', 'II', 'III', 'IV', 'V', 'VI'];
    const mtsClasses = ['VII', 'VIII', 'IX'];
    const maClasses = ['X', 'XI', 'XII'];
    
    if (jenjang === 'MI' && !miClasses.includes(kelas)) return false;
    if (jenjang === 'MTs' && !mtsClasses.includes(kelas)) return false;
    if (jenjang === 'MA' && !maClasses.includes(kelas)) return false;
    return true;
  };

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
    const isMatch = checkJenjangKelasMatch(jenjang, kelas);

    let finalCP = '';
    let warning = false;

    if (isMatch && subjectData && subjectData[jenjang] && subjectData[jenjang][currentFase]) {
      finalCP = subjectData[jenjang][currentFase];
      warning = false;
    } else {
      warning = true;
      if (!isMatch) {
        finalCP = `[PERINGATAN] Kelas ${kelas} tidak sesuai untuk jenjang ${jenjang}. Mohon sesuaikan pilihan Kelas atau Jenjang agar Capaian Pembelajaran (CP) muncul otomatis.`;
      } else if (!subjectData) {
        finalCP = `[PERINGATAN] Data CP untuk Mata Pelajaran "${mataPelajaran}" belum tersedia di database. Silakan isi secara manual.`;
      } else {
        finalCP = `[PERINGATAN] Data CP untuk jenjang ${jenjang} Fase ${currentFase} pada mata pelajaran ini tidak ditemukan. Silakan isi secara manual.`;
      }
    }

    setIsCpWarning(warning);
    setFormData(prev => ({ ...prev, fase: currentFase as Fase, capaianPembelajaran: finalCP }));
  }, [formData.jenjang, formData.kelas, formData.mataPelajaran]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
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
    if (!formData.materi || !formData.mataPelajaran) return alert("Isi Mapel dan Materi Pokok!");
    setIsAiLoading(true);
    const result = await generateLessonObjectives(formData.materi, formData.mataPelajaran, formData.fase);
    setFormData(prev => ({ ...prev, tujuanPembelajaran: result }));
    setIsAiLoading(false);
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (formData.pancaCinta.length === 0) return alert("Pilih minimal satu Nilai Panca Cinta!");
    if (formData.dpl.length === 0) return alert("Pilih minimal satu Dimensi Profil Lulusan!");
    
    setIsGenerating(true);
    try {
        const [experience, questions] = await Promise.all([
            generateLearningExperience(formData.materi, formData.mataPelajaran, formData.alokasi, formData.pancaCinta),
            generateKbcQuestions(formData.materi, formData.mataPelajaran, formData.pancaCinta, {
                hots: formData.jumlahPGHOTS, kompleks: formData.jumlahPGKompleks, 
                benarSalah: formData.jumlahBenarSalah, isian: formData.jumlahIsian,
                uraian: formData.jumlahUraian, menjodohkan: formData.jumlahMenjodohkan
            })
        ]);
        setAiContent({ experience, questionsText: questions });
        setView('result');
        window.scrollTo(0, 0);
    } catch (err) {
        alert("Gagal memproses AI. Periksa koneksi internet Anda.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-gray-50 font-[Poppins]">
      <header className="bg-gradient-to-r from-[#4A90E2] to-[#764ba2] text-white py-8 no-print shadow-lg">
        <div className="container mx-auto px-4 flex flex-col items-center">
            <img src="https://iili.io/fYvaKwF.jpg" className="w-20 h-20 rounded-full border-2 border-white shadow-lg mb-4 object-cover" alt="Kang Abede" />
            <div className="text-center">
              <h1 className="text-2xl font-black tracking-tight uppercase">🎓 Rencana Pembelajaran Mendalam Berbasis Cinta</h1>
              <p className="mt-1 text-blue-100 opacity-80 text-sm italic">Otomasi Kurikulum Madrasah - Kurikulum Berbasis Cinta (KBC)</p>
            </div>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8">
        {view === 'form' ? (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100">
            <form onSubmit={handleGenerate} className="space-y-10">
              <section>
                <div className="flex items-center gap-2 mb-6 border-l-4 border-indigo-600 pl-4">
                  <h2 className="text-lg font-black text-indigo-900 uppercase">1. Identitas Madrasah & Guru</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <InputGroup label="Jenjang" id="jenjang" as="select" options={['MI', 'MTs', 'MA']} value={formData.jenjang} onChange={handleChange} />
                  <InputGroup label="Nama Madrasah" id="namaMadrasah" placeholder="MIS/MTsN/MAN ..." value={formData.namaMadrasah} onChange={handleChange} />
                  <InputGroup label="Nama Guru" id="namaGuru" value={formData.namaGuru} onChange={handleChange} />
                  <InputGroup label="NIP Guru" id="nipGuru" value={formData.nipGuru} onChange={handleChange} />
                  <InputGroup label="Nama Kepala" id="namaKepala" value={formData.namaKepala} onChange={handleChange} />
                  <InputGroup label="NIP Kepala" id="nipKepala" value={formData.nipKepala} onChange={handleChange} />
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-6 border-l-4 border-indigo-600 pl-4">
                  <h2 className="text-lg font-black text-indigo-900 uppercase">2. Data Pembelajaran</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <InputGroup label="Mata Pelajaran" id="mataPelajaran" as="select" options={mataPelajaranOptions} value={formData.mataPelajaran} onChange={handleChange} />
                  <InputGroup label="Materi Pokok" id="materi" placeholder="Contoh: Energi dan Perubahannya" value={formData.materi} onChange={handleChange} />
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Kelas" id="kelas" as="select" options={['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']} value={formData.kelas} onChange={handleChange} />
                    <InputGroup label="Fase" id="fase" value={formData.fase} onChange={() => {}} readOnly helper="Otomatis" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Semester" id="semester" as="select" options={['Ganjil', 'Genap']} value={formData.semester} onChange={handleChange} />
                    <InputGroup label="Alokasi Waktu" id="alokasi" placeholder="e.g. 2 x 35 Menit" value={formData.alokasi} onChange={handleChange} />
                  </div>
                </div>
                
                <InputGroup 
                  label="Kriteria Pembelajaran (Karakteristik Murid & Fasilitas)" 
                  id="kriteriaPembelajaran" 
                  as="textarea" 
                  rows={4} 
                  placeholder="Deskripsikan kondisi murid (heterogen/minat), fasilitas madrasah (LCD, Laboratorium), dan sumber daya yang tersedia..." 
                  value={formData.kriteriaPembelajaran} 
                  onChange={handleChange} 
                />

                <div className={`p-4 rounded-xl border-2 transition-all ${isCpWarning ? "bg-red-50 border-red-300" : "bg-blue-50 border-blue-100"}`}>
                  <label className={`block text-sm font-bold mb-2 uppercase ${isCpWarning ? "text-red-800" : "text-blue-800"}`}>
                    Capaian Pembelajaran (CP) {isCpWarning ? "⚠️" : "✅"}
                  </label>
                  <textarea 
                    id="capaianPembelajaran" 
                    rows={6} 
                    value={formData.capaianPembelajaran} 
                    onChange={handleChange} 
                    className={`w-full px-4 py-3 rounded-lg text-sm bg-white border focus:outline-none transition-all ${isCpWarning ? "border-red-200 text-red-900 italic font-medium" : "border-blue-200 text-gray-700"}`}
                    placeholder="Data CP akan muncul otomatis setelah memilih Mata Pelajaran, Jenjang, and Kelas..."
                  />
                  {isCpWarning && <p className="text-xs text-red-600 mt-2 font-bold uppercase tracking-tight italic">Cek kembali kesesuaian Jenjang dan Kelas!</p>}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-6 border-l-4 border-purple-600 pl-4">
                  <h2 className="text-lg font-black text-purple-900 uppercase">3. Karakter & Profil Lulusan</h2>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-bold text-purple-800 mb-2 block uppercase">8 Dimensi Profil Lulusan (DPL):</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-purple-50 p-4 rounded-xl border border-purple-100">
                    {DPL_OPTIONS.map(opt => (
                        <label key={opt} className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm cursor-pointer border hover:border-purple-400 transition-all">
                          <input type="checkbox" checked={formData.dpl.includes(opt)} onChange={() => handleCheckboxChange('dpl', opt)} className="w-4 h-4 accent-purple-600" />
                          <span className="text-[10px] leading-tight font-bold text-purple-900 uppercase">{opt}</span>
                        </label>
                      ))}
                  </div>
                </div>
                <div className="mt-6">
                  <label className="text-sm font-bold text-pink-800 mb-2 block uppercase">Nilai Panca Cinta (KBC):</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {PANCA_CINTA_OPTIONS.map(opt => (
                      <label key={opt} className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl cursor-pointer border border-pink-100 hover:bg-pink-100 transition-all">
                        <input type="checkbox" checked={formData.pancaCinta.includes(opt)} onChange={() => handleCheckboxChange('pancaCinta', opt)} className="w-5 h-5 accent-pink-600" />
                        <span className="text-xs font-black text-pink-700 uppercase">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-bold text-gray-800 uppercase">Tujuan Pembelajaran</label>
                        <button type="button" onClick={handleAiGenerateObjectives} disabled={isAiLoading} className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-black hover:bg-indigo-700 active:scale-95 transition-all">
                            {isAiLoading ? "MEMPROSES..." : "AUTO-RUMUSKAN TP (AI)"}
                        </button>
                    </div>
                    <textarea id="tujuanPembelajaran" rows={4} value={formData.tujuanPembelajaran} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-indigo-400 transition-all" placeholder="Deskripsikan tujuan pembelajaran yang ingin dicapai..." />
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-6 border-l-4 border-orange-600 pl-4">
                  <h2 className="text-lg font-black text-orange-900 uppercase">4. Rencana Asesmen</h2>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                  <label className="block text-sm font-bold text-blue-800 mb-2 uppercase tracking-tight">Jenis Asesmen Proses (Observasi/Kinerja)</label>
                  <select 
                    id="asesmenTengah.jenisKegiatan" 
                    value={formData.asesmenTengah.jenisKegiatan} 
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all text-sm bg-white"
                  >
                    <option value="">-- Pilih Jenis Asesmen Proses --</option>
                    {processAssessmentOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <p className="text-xs text-blue-600 mt-1 italic">Pilih aktivitas murid yang akan dinilai secara proses (diskusi, presentasi, dll).</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6 bg-orange-50 p-4 rounded-xl border border-orange-100">
                  <InputGroup label="PG HOTS" id="jumlahPGHOTS" type="number" value={formData.jumlahPGHOTS} onChange={handleChange} />
                  <InputGroup label="PG Komp." id="jumlahPGKompleks" type="number" value={formData.jumlahPGKompleks} onChange={handleChange} />
                  <InputGroup label="B / S" id="jumlahBenarSalah" type="number" value={formData.jumlahBenarSalah} onChange={handleChange} />
                  <InputGroup label="Isian" id="jumlahIsian" type="number" value={formData.jumlahIsian} onChange={handleChange} />
                  <InputGroup label="Uraian" id="jumlahUraian" type="number" value={formData.jumlahUraian} onChange={handleChange} />
                  <InputGroup label="Jodoh" id="jumlahMenjodohkan" type="number" value={formData.jumlahMenjodohkan} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-100 p-4 rounded-xl">
                  <InputGroup label="Kota TTD" id="kota" placeholder="Kota" value={formData.kota} onChange={handleChange} />
                  <InputGroup label="Tgl" id="tanggalPengesahan" type="number" value={formData.tanggalPengesahan} onChange={handleChange} />
                  <InputGroup label="Bulan" id="bulanPengesahan" as="select" options={['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']} value={formData.bulanPengesahan} onChange={handleChange} />
                  <InputGroup label="Tahun" id="tahunPengesahan" as="select" options={['2024', '2025', '2026', '2027']} value={formData.tahunPengesahan} onChange={handleChange} />
                </div>
              </section>

              <button 
                type="submit" 
                disabled={isGenerating} 
                className="w-full bg-gradient-to-r from-indigo-800 to-purple-900 text-white font-black py-6 rounded-2xl shadow-2xl hover:scale-[1.01] active:scale-95 transition-all text-2xl uppercase tracking-widest border-b-8 border-indigo-950"
              >
                {isGenerating ? "⏳ SEDANG MENYUSUN DOKUMEN..." : "✨ GENERATE & SIMPAN RPP"}
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
