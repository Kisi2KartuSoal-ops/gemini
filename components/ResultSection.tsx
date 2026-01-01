
import React from 'react';
import { RppFormData } from '../types';
import { RUBRIK_DATABASE } from '../constants';

interface ResultSectionProps {
  data: RppFormData;
  aiContent: { experience: string; questionsText: string };
  onEdit: () => void;
}

const ResultSection: React.FC<ResultSectionProps> = ({ data, aiContent, onEdit }) => {
  const handlePrint = () => {
    try {
      window.focus();
      window.print();
    } catch (e) {
      console.error("Gagal mencetak:", e);
      alert("Gagal membuka jendela cetak.");
    }
  };

  const handleDownloadDoc = () => {
    try {
      const content = document.getElementById('rpp-content-area')?.innerHTML;
      if (!content) return;

      const header = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>RPP KBC</title>
          <style>
            @page { size: 21cm 29.7cm; margin: 2cm; }
            body { font-family: 'Arial Narrow', Arial, sans-serif; font-size: 11pt; line-height: 1.3; color: black; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 15px; }
            th, td { border: 1px solid black; padding: 8px; vertical-align: top; }
            .no-border td { border: none !important; padding: 2px 0; }
            h1, h2, h3 { font-family: 'Arial Narrow', Arial, sans-serif; margin: 0 0 5px 0; padding: 0; }
            .text-center { text-align: center; }
            .text-justify { text-align: justify; }
            .font-bold { font-weight: bold; }
            .uppercase { text-transform: uppercase; }
            .border-b { border-bottom: 2px solid black; }
            .question-item { margin-top: 10pt; margin-bottom: 5pt; font-weight: bold; }
            .option-item { margin-left: 20pt; margin-bottom: 2pt; }
            .signature-table td { border: none !important; text-align: center; width: 50%; }
          </style>
        </head>
        <body>
      `;
      const footer = "</body></html>";
      const sourceHtml = header + content + footer;

      const blob = new Blob(['\ufeff', sourceHtml], {
        type: 'application/msword'
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const fileName = `RPP_${data.mataPelajaran.replace(/\s+/g, '_')}_Kelas_${data.kelas}.doc`;
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Gagal mengunduh file:", error);
      alert("Terjadi kesalahan saat mengunduh file.");
    }
  };

  const processAssessment = data.asesmenTengah.jenisKegiatan ? RUBRIK_DATABASE[data.asesmenTengah.jenisKegiatan] : null;
  const maxScorePerCriteria = 4;
  const totalMaxScore = processAssessment ? processAssessment.rubrik.length * maxScorePerCriteria : 0;

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-6 flex flex-wrap gap-4 justify-between items-center no-print bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div>
            <h2 className="text-xl font-black text-indigo-900 uppercase">📄 Hasil Dokumen Rencana Pembelajaran</h2>
            <p className="text-xs text-gray-500">Berbasis Cinta (KBC) - Dokumen diatur untuk ukuran kertas A4</p>
        </div>
        <div className="flex gap-2">
            <button 
              onClick={onEdit} 
              className="bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors uppercase text-xs"
            >
              ✏️ Edit Data
            </button>
            <button 
              onClick={handleDownloadDoc} 
              className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition-all uppercase text-xs shadow-md"
            >
              💾 Simpan ke Word
            </button>
            <button 
              onClick={handlePrint} 
              className="bg-indigo-600 text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition-all uppercase text-xs"
            >
              🖨️ Cetak Dokumen
            </button>
        </div>
      </div>

      <div 
        id="rpp-content-area"
        className="bg-white rpp-print-container shadow-2xl rpp-document text-black leading-snug border border-gray-200 mx-auto" 
        style={{ width: '210mm', minHeight: '297mm', padding: '20mm', fontFamily: "'Arial Narrow', sans-serif", fontSize: '11pt', boxSizing: 'border-box' }}
      >
        <div className="text-center border-b-2 border-black pb-2 mb-6">
            <h1 className="text-xl font-black uppercase tracking-tight">RENCANA PEMBELAJARAN MENDALAM BERBASIS CINTA</h1>
            <h2 className="text-lg font-bold uppercase">{data.namaMadrasah}</h2>
            <p className="text-[10pt] italic">Tahun Pelajaran {data.tahunPembelajaran}</p>
        </div>

        <div className="mb-6 text-[10.5pt]">
          <table className="w-full border-none border-collapse no-border">
              <tbody>
                  <tr>
                    <td style={{ width: '130px' }} className="py-0.5">Mata Pelajaran</td>
                    <td style={{ width: '15px' }} className="py-0.5 text-center">:</td>
                    <td className="font-bold uppercase py-0.5">{data.mataPelajaran}</td>
                  </tr>
                  <tr>
                    <td className="py-0.5">Kelas / Fase</td>
                    <td className="py-0.5 text-center">:</td>
                    <td className="py-0.5">{data.kelas} / Fase {data.fase}</td>
                  </tr>
                  <tr>
                    <td className="py-0.5">Semester</td>
                    <td className="py-0.5 text-center">:</td>
                    <td className="py-0.5">{data.semester}</td>
                  </tr>
                  <tr>
                    <td className="py-0.5">Materi Pokok</td>
                    <td className="py-0.5 text-center">:</td>
                    <td className="font-bold py-0.5">{data.materi}</td>
                  </tr>
                  <tr>
                    <td className="py-0.5">Alokasi Waktu</td>
                    <td className="py-0.5 text-center">:</td>
                    <td className="py-0.5">{data.alokasi}</td>
                  </tr>
              </tbody>
          </table>
        </div>

        <div className="space-y-6">
            <section>
                <h3 className="font-bold mb-1 uppercase text-[10.5pt] border-b border-black inline-block">A. Karakteristik Murid & Fasilitas</h3>
                <p className="text-justify leading-tight mt-1 whitespace-pre-line">{data.kriteriaPembelajaran || "..............................................................................................................................................................................................................................................................."}</p>
            </section>

            <section>
                <h3 className="font-bold mb-1 uppercase text-[10.5pt] border-b border-black inline-block">B. Capaian Pembelajaran (CP)</h3>
                <p className="text-justify leading-tight mt-1">{data.capaianPembelajaran}</p>
            </section>

            <section>
                <h3 className="font-bold mb-1 uppercase text-[10.5pt] border-b border-black inline-block">C. Tujuan Pembelajaran</h3>
                <div className="ml-4 mt-1 text-[10.5pt] whitespace-pre-line text-justify">{data.tujuanPembelajaran}</div>
            </section>

            <section>
                <h3 className="font-bold mb-1 uppercase text-[10.5pt] border-b border-black inline-block">D. Dimensi Profil Lulusan (DPL)</h3>
                <ul className="list-disc ml-8 mt-1 text-[10.5pt]">
                    {data.dpl.map((d, idx) => <li key={idx}>{d}</li>)}
                </ul>
            </section>

            <section>
                <h3 className="font-bold mb-1 uppercase text-[10.5pt] border-b border-black inline-block">E. Nilai Panca Cinta (KBC)</h3>
                <ul className="list-disc ml-8 mt-1 text-[10.5pt] italic text-justify">
                    {data.pancaCinta.map((pc, idx) => <li key={idx}>{pc}</li>)}
                </ul>
            </section>

            <section className="experience-matrix">
                <h3 className="font-bold mb-2 uppercase text-[10.5pt] border-b border-black inline-block">F. Pengalaman Pembelajaran</h3>
                <div className="mt-2 text-[10pt]">
                    <div className="markdown-body">
                      {aiContent.experience ? (
                        <div dangerouslySetInnerHTML={{ __html: formatMarkdownTableToHtml(aiContent.experience) }} />
                      ) : (
                        <p className="italic text-gray-400">Sedang menyusun matriks pembelajaran...</p>
                      )}
                    </div>
                </div>
            </section>

            <div className="page-break-before pt-6"></div>

            {processAssessment && (
              <section className="process-assessment">
                <h3 className="font-bold mb-2 uppercase text-[10.5pt] border-b border-black inline-block">G. Instrumen Asesmen Proses</h3>
                <div className="mt-2 text-[10.5pt]">
                  <p className="font-bold mb-2 underline">1. Rubrik Penilaian: {processAssessment.instrumen}</p>
                  <table className="w-full border-collapse border border-black mt-2">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-black p-2 text-center text-[9pt]" rowSpan={2}>Kriteria Penilaian</th>
                        <th className="border border-black p-2 text-center text-[9pt]" colSpan={4}>Kategori Capaian</th>
                      </tr>
                      <tr className="bg-gray-100">
                        <th className="border border-black p-2 text-center text-[8pt]">Sangat Baik (4)</th>
                        <th className="border border-black p-2 text-center text-[8pt]">Baik (3)</th>
                        <th className="border border-black p-2 text-center text-[8pt]">Cukup (2)</th>
                        <th className="border border-black p-2 text-center text-[8pt]">Kurang (1)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processAssessment.rubrik.map((item, idx) => (
                        <tr key={idx}>
                          <td className="border border-black p-2 font-bold text-[9pt]">{item.kriteria}</td>
                          <td className="border border-black p-2 text-[8pt] text-justify">{item.sangatBaik}</td>
                          <td className="border border-black p-2 text-[8pt] text-justify">{item.baik}</td>
                          <td className="border border-black p-2 text-[8pt] text-justify">{item.sedang}</td>
                          <td className="border border-black p-2 text-[8pt] text-justify">{item.kurang}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <p className="font-bold mb-2 underline mt-6">2. Tabel Rekapitulasi Penilaian Murid</p>
                  <table className="w-full border-collapse border border-black mt-2">
                    <thead>
                      <tr className="bg-gray-100 text-[9pt]">
                        <th className="border border-black p-2 text-center w-10">No</th>
                        <th className="border border-black p-2 text-center">Nama Murid</th>
                        {processAssessment.rubrik.map((item, idx) => (
                          <th key={idx} className="border border-black p-2 text-center text-[8pt] w-20">
                            {item.kriteria.split(' ')[0]} (1-4)
                          </th>
                        ))}
                        <th className="border border-black p-2 text-center w-20">Total Skor</th>
                        <th className="border border-black p-2 text-center w-24">Nilai Akhir</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(8)].map((_, i) => (
                        <tr key={i} className="h-8">
                          <td className="border border-black p-1 text-center text-[9pt]">{i + 1}</td>
                          <td className="border border-black p-1"></td>
                          {processAssessment.rubrik.map((_, idx) => (
                            <td key={idx} className="border border-black p-1"></td>
                          ))}
                          <td className="border border-black p-1"></td>
                          <td className="border border-black p-1"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-2 text-[8.5pt] italic text-gray-700 leading-tight">
                    <p><strong>Catatan Konversi Nilai:</strong></p>
                    <p>1. Skor Maksimal = {totalMaxScore} (Jumlah Kriteria x 4)</p>
                    <p>2. Nilai Akhir = (Skor Perolehan / {totalMaxScore}) x 100</p>
                    <p>3. Predikat: 86-100 (A/Sangat Baik), 71-85 (B/Baik), 56-70 (C/Cukup), &lt;55 (D/Kurang)</p>
                  </div>
                </div>
              </section>
            )}

            <section>
              <h3 className="font-bold mb-2 border-b border-black uppercase text-[10.5pt] inline-block">
                {processAssessment ? 'H.' : 'G.'} Asesmen Akhir Pembelajaran
              </h3>
              <div className="ml-4 text-[10.5pt] leading-relaxed text-justify mt-2">
                  <div dangerouslySetInnerHTML={{ __html: formatQuestionsToHtml(cleanAssessmentText(aiContent.questionsText)) }} />
                  {!aiContent.questionsText && <p className="italic text-gray-400">Sedang menyusun butir soal evaluasi...</p>}
              </div>
            </section>
        </div>

        <div className="mt-16 text-[10.5pt]">
          <table className="w-full no-border signature-table" style={{ border: 'none' }}>
            <tbody>
              <tr>
                <td style={{ textAlign: 'center' }}>
                  <p>Mengetahui,</p>
                  <p className="font-bold uppercase">Kepala Madrasah</p>
                  <div className="h-20" style={{ height: '60pt' }}></div>
                  <p className="font-bold underline uppercase">{data.namaKepala || ".........................."}</p>
                  <p>NIP. {data.nipKepala || "..................."}</p>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <p>{data.kota || ".........."}, {data.tanggalPengesahan} {data.bulanPengesahan} {data.tahunPengesahan}</p>
                  <p className="font-bold uppercase">{data.jenjang === 'MI' ? 'Guru Kelas' : 'Guru Mata Pelajaran'}</p>
                  <div className="h-20" style={{ height: '60pt' }}></div>
                  <p className="font-bold underline uppercase">{data.namaGuru || ".........................."}</p>
                  <p>NIP. {data.nipGuru || "..................."}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .experience-matrix table { width: 100%; border-collapse: collapse; margin-top: 5px; border: 1.5px solid black; }
        .experience-matrix th, .experience-matrix td { border: 1px solid black; padding: 10px 12px; text-align: justify; vertical-align: top; font-size: 10pt; line-height: 1.4; }
        .experience-matrix th { background-color: #f8f8f8; font-weight: bold; text-align: center; text-transform: uppercase; font-size: 10.5pt; }
        .markdown-body ul, .markdown-body ol { margin-left: 1.5rem; margin-bottom: 0.5rem; }
        .markdown-body li { margin-bottom: 0.25rem; list-style-type: disc; }
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; padding: 0 !important; margin: 0 !important; }
          .rpp-document { 
            border: none !important; 
            box-shadow: none !important; 
            padding: 0 !important; 
            margin: 0 auto !important;
            width: 100% !important;
          }
          @page { size: A4; margin: 20mm; }
        }
      `}</style>
    </div>
  );
};

function cleanAssessmentText(text: string): string {
  if (!text) return "";
  return text
    .split('\n')
    .filter(line => {
        const lower = line.toLowerCase();
        return !line.trim().startsWith('---') && 
               !lower.includes('evaluasi pembelajaran') && 
               !lower.includes('materi:') && 
               !lower.includes('tema:');
    })
    .join('\n')
    .trim();
}

function formatQuestionsToHtml(text: string): string {
    if (!text) return "";
    const lines = text.split('\n');
    let html = '';
    
    lines.forEach(line => {
        const trimmed = line.trim();
        // Regex untuk nomor (1., 2., 3., dst)
        if (/^[0-9]+\./.test(trimmed)) {
            html += `<div class="question-item" style="margin-top: 12pt; font-weight: bold;">${trimmed}</div>`;
        } 
        // Regex untuk pilihan (a., b., c., d. atau [a], [b], dst)
        else if (/^[a-dA-D]\./.test(trimmed) || /^\[[a-dA-D]\]/.test(trimmed)) {
            html += `<div class="option-item" style="margin-left: 20pt; margin-top: 2pt;">${trimmed}</div>`;
        } 
        else if (trimmed.length > 0) {
            // Cek jika baris kunci jawaban
            if (trimmed.toLowerCase().includes("kunci jawaban")) {
              html += `<div style="margin-top: 15pt; font-weight: bold; text-decoration: underline;">${trimmed}</div>`;
            } else {
              html += `<div style="margin-bottom: 2pt;">${trimmed}</div>`;
            }
        }
    });
    return html;
}

function formatMarkdownTableToHtml(text: string): string {
    const lines = text.trim().split('\n');
    const tableLines = lines.filter(l => l.includes('|'));
    
    if (tableLines.length < 2) {
      return text.replace(/\n/g, '<br/>').replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    }

    let html = '<table>';
    let hasHeader = false;

    tableLines.forEach((line) => {
        const rawCells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|');
        const cleanCells = rawCells.map(c => c.trim());

        if (cleanCells.every(c => c.includes('---'))) return;

        if (!hasHeader) {
            html += '<thead><tr>';
            cleanCells.forEach(cell => {
                html += `<th>${cell.replace(/\*\*/g, '')}</th>`;
            });
            html += '</tr></thead><tbody>';
            hasHeader = true;
        } else {
            html += '<tr>';
            cleanCells.forEach((cell, idx) => {
                let cellContent = cell
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/^[0-9]+\.\s/gm, (match) => `<br/>${match}`) 
                    .replace(/^- /gm, '• ') 
                    .replace(/\n/g, '<br/>');
                
                html += `<td>${cellContent}</td>`;
            });
            html += '</tr>';
        }
    });

    html += '</tbody></table>';
    return html;
}

export default ResultSection;
