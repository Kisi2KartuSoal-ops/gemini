
import React from 'react';
import { RppFormData } from '../types';
import { RUBRIK_DATABASE } from '../constants';

interface ResultSectionProps {
  data: RppFormData;
  aiContent: { experience: string; questionsText: string };
  onEdit: () => void;
}

const ResultSection: React.FC<ResultSectionProps> = ({ data, aiContent, onEdit }) => {
  const handlePrint = () => window.print();

  const handleDownloadDoc = () => {
    const content = document.getElementById('rpp-content-area')?.innerHTML;
    if (!content) return;
    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><style>
        body { font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.5; }
        table { border-collapse: collapse; width: 100%; border: 1pt solid black; margin-bottom: 10pt; }
        th, td { border: 1pt solid black; padding: 6pt; vertical-align: top; }
        .text-justify { text-align: justify; }
        .no-border, .no-border td { border: none !important; }
        .font-bold { font-weight: bold; }
        .underline { text-decoration: underline; }
      </style></head><body>`;
    const blob = new Blob(['\ufeff', header + content + "</body></html>"], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `RPM_${data.mataPelajaran.toUpperCase()}_${data.materi.toUpperCase()}.doc`;
    link.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <div className="mb-8 flex flex-wrap gap-4 justify-between items-center no-print bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
        <div>
            <h2 className="text-2xl font-black text-indigo-900 uppercase">📄 RPM Siap Dicetak</h2>
            <p className="text-sm text-gray-500">Pratinjau Rencana Pembelajaran Mendalam untuk {data.namaMadrasah}.</p>
        </div>
        <div className="flex gap-3">
            <button onClick={onEdit} className="bg-gray-100 text-gray-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-200 uppercase text-xs">Edit</button>
            <button onClick={handleDownloadDoc} className="bg-green-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-700 uppercase text-xs">Word</button>
            <button onClick={handlePrint} className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-indigo-700 uppercase text-xs shadow-lg">Cetak</button>
        </div>
      </div>

      <div 
        id="rpp-content-area"
        className="bg-white rpp-document text-black mx-auto shadow-2xl" 
        style={{ width: '210mm', minHeight: '297mm', padding: '25mm', fontFamily: 'Times New Roman, serif', fontSize: '11pt' }}
      >
        <div className="text-center border-b-4 border-double border-black pb-4 mb-8">
            <h1 className="text-xl font-bold uppercase leading-tight">RENCANA PEMBELAJARAN MENDALAM (RPM)</h1>
            <h2 className="text-lg font-bold uppercase tracking-widest mt-1">KURIKULUM BERBASIS CINTA (KBC)</h2>
            <h3 className="text-md font-bold uppercase mt-1">{data.namaMadrasah}</h3>
        </div>

        <table className="w-full no-border mb-8" style={{ border: 'none' }}>
            <tbody>
                <tr><td width="160">Mata Pelajaran</td><td width="20">:</td><td className="font-bold">{data.mataPelajaran.toUpperCase()}</td></tr>
                <tr><td>Kelas / Semester</td><td>:</td><td>{data.kelas} / {data.semester}</td></tr>
                <tr><td>Tahun Pembelajaran</td><td>:</td><td>{data.tahunPembelajaran}</td></tr>
                <tr><td>Materi Pokok</td><td>:</td><td className="font-bold">{data.materi}</td></tr>
                <tr><td>Alokasi Waktu</td><td>:</td><td>{data.alokasi}</td></tr>
                <tr><td>Dimensi Profil Lulusan</td><td>:</td><td>{data.dpl.join(", ")}</td></tr>
                <tr><td>Nilai Panca Cinta</td><td>:</td><td>{data.pancaCinta.join(", ")}</td></tr>
            </tbody>
        </table>

        <div className="space-y-8 text-justify">
            <section>
                <h3 className="font-bold uppercase mb-2">I. CAPAIAN PEMBELAJARAN</h3>
                <p className="text-justify">{data.capaianPembelajaran}</p>
            </section>

            <section>
                <h3 className="font-bold uppercase mb-2">II. TUJUAN PEMBELAJARAN</h3>
                <div className="ml-4 whitespace-pre-line text-justify">{data.tujuanPembelajaran}</div>
            </section>

            <section>
                <h3 className="font-bold uppercase mb-4">III. KERANGKA & PRINSIP PEMBELAJARAN KBC</h3>
                <div className="space-y-4 text-[10pt]">
                    <div className="border border-black p-3 rounded">
                        <p className="font-bold underline mb-1">3 Prinsip Utama Pembelajaran Cinta:</p>
                        <ul className="list-disc ml-5 space-y-1">
                            <li><strong>Berkesadaran (Mindful):</strong> Murid menyadari sepenuhnya keberadaan diri dan lingkungan.</li>
                            <li><strong>Bermakna (Meaningful):</strong> Materi dikaitkan dengan kehidupan nyata bagi jiwa murid.</li>
                            <li><strong>Menyenangkan (Joyful):</strong> Belajar dilakukan dengan antusiasme tanpa tekanan.</li>
                        </ul>
                    </div>
                    <div className="border border-black p-3 rounded">
                        <p className="font-bold underline mb-1">4 Kerangka Implementasi KBC:</p>
                        <ul className="list-disc ml-5 space-y-1">
                            <li><strong>Praktik Pedagogis:</strong> Menggunakan pendekatan yang memanusiakan murid sebagai subjek belajar.</li>
                            <li><strong>Lingkungan Belajar:</strong> Menciptakan suasana yang aman, nyaman, dan penuh kasih.</li>
                            <li><strong>Kemitraan Pembelajaran:</strong> Kolaborasi erat antara guru, orang tua, dan masyarakat.</li>
                            <li><strong>Pemanfaatan Teknologi Digital:</strong> Penggunaan alat digital secara bijak untuk memperluas cakrawala ilmu.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="font-bold uppercase mb-2">IV. PENGALAMAN PEMBELAJARAN</h3>
                <div className="experience-matrix" dangerouslySetInnerHTML={{ __html: formatMarkdownTableToHtml(aiContent.experience) }} />
            </section>

            <section>
              <h3 className="font-bold uppercase mb-2">V. EVALUASI PEMBELAJARAN</h3>
              <div className="ml-2">
                  <div className="question-area" dangerouslySetInnerHTML={{ __html: formatQuestionsToHtml(aiContent.questionsText) }} />
              </div>
            </section>
        </div>

        <div className="mt-20">
          <table className="w-full no-border" style={{ border: 'none' }}>
            <tbody>
              <tr>
                <td className="text-center" width="50%">
                  <p>Mengetahui,</p>
                  <p className="font-bold">Kepala Madrasah</p>
                  <div style={{ height: '60pt' }}></div>
                  <p className="font-bold underline">{data.namaKepala || ".........................."}</p>
                  <p>NIP. {data.nipKepala || "-"}</p>
                </td>
                <td className="text-center" width="50%">
                  <p>{data.kota || '..........'}, {data.tanggalPengesahan} {data.bulanPengesahan} {data.tahunPengesahan}</p>
                  <p className="font-bold">Guru Mata Pelajaran</p>
                  <div style={{ height: '60pt' }}></div>
                  <p className="font-bold underline">{data.namaGuru || ".........................."}</p>
                  <p>NIP. {data.nipGuru || "-"}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .experience-matrix table { width: 100%; border-collapse: collapse; border: 1pt solid black; margin-bottom: 10pt; }
        .experience-matrix th, .experience-matrix td { border: 1pt solid black; padding: 10px; font-size: 10pt; vertical-align: top; }
        .experience-matrix th { background: #f0f0f0; font-weight: bold; }
        .experience-matrix td:nth-child(2) { text-align: justify; }
        .question-area div { margin-bottom: 8pt; text-align: justify; }
        .question-area table { width: 100%; border-collapse: collapse; border: 1pt solid black; margin-top: 10pt; }
        .question-area th, .question-area td { border: 1pt solid black; padding: 6px; text-align: center; font-size: 9pt; }
        .question-area tr:last-child { font-weight: bold; background: #fafafa; }
        @media print { .no-print { display: none !important; } }
      `}</style>
    </div>
  );
};

function formatQuestionsToHtml(text: string): string {
    if (!text) return "";
    const lines = text.split('\n');
    let html = '';
    let inTable = false;
    let tableLines: string[] = [];

    lines.forEach(line => {
        if (line.includes('|')) {
            inTable = true;
            tableLines.push(line);
        } else {
            if (inTable) {
                html += formatMarkdownTableToHtml(tableLines.join('\n'));
                inTable = false;
                tableLines = [];
            }
            const trimmed = line.trim();
            if (/^[0-9]+\./.test(trimmed)) {
                html += `<div class="font-bold mt-4">${trimmed}</div>`;
            } else if (/^[a-dA-D]\./.test(trimmed)) {
                html += `<div style="margin-left: 20pt;">${trimmed}</div>`;
            } else if (trimmed.length > 0) {
                if (/^[IVXLC]+\./.test(trimmed)) {
                  html += `<div class="font-black mt-8 text-md border-b border-gray-300 pb-1 uppercase underline">${trimmed}</div>`;
                } else {
                  html += `<div>${trimmed}</div>`;
                }
            }
        }
    });

    if (inTable) html += formatMarkdownTableToHtml(tableLines.join('\n'));
    return html;
}

function formatMarkdownTableToHtml(text: string): string {
    const lines = text.trim().split('\n');
    const tableLines = lines.filter(l => l.includes('|'));
    if (tableLines.length < 2) return text.replace(/\n/g, '<br/>');
    
    let html = '<table>';
    let hasHeader = false;
    tableLines.forEach(line => {
        const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
        if (cells.every(c => c.includes('---'))) return;
        
        if (!hasHeader) {
            html += '<thead><tr>' + cells.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
            hasHeader = true;
        } else {
            const isTotal = cells.some(c => c.toLowerCase().includes('total'));
            html += `<tr class="${isTotal ? 'font-bold bg-gray-50' : ''}">` + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
        }
    });
    return html + '</tbody></table>';
}

export default ResultSection;
