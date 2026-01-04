
function renderResult(state, aiContent) {
    const resultArea = document.getElementById('resultArea');
    resultArea.classList.remove('hidden');
    
    const rubrikData = RUBRIK_DATABASE[state.jenisAsesmenProses];
    
    let html = `
    <div class="flex justify-between items-center no-print mb-6 p-4 bg-white rounded-xl shadow border">
        <h3 class="font-black text-indigo-900">📄 PRATINJAU DOKUMEN</h3>
        <div class="flex gap-2">
            <button onclick="window.print()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase">Cetak / PDF</button>
            <button id="btnDownloadWord" class="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase">Simpan Word</button>
        </div>
    </div>
    
    <div id="rpp-doc" class="bg-white p-[20mm] mx-auto text-black border shadow-2xl" style="width:210mm; min-height:297mm; font-family:Arial; font-size:11pt; line-height:1.3;">
        <div style="text-align:center; border-bottom:2px solid black; padding-bottom:5px; margin-bottom:20px;">
            <h1 style="font-size:14pt; margin:0;">RENCANA PEMBELAJARAN MENDALAM BERBASIS CINTA</h1>
            <h2 style="font-size:12pt; margin:5px 0;">${state.namaMadrasah.toUpperCase()}</h2>
        </div>

        <table style="width:100%; border:none; margin-bottom:20px;">
            <tr><td width="150">Mata Pelajaran</td><td width="10">:</td><td><b>${state.mataPelajaran}</b></td></tr>
            <tr><td>Materi Pokok</td><td>:</td><td><b>${state.materi}</b></td></tr>
            <tr><td>Kelas / Alokasi</td><td>:</td><td>${state.kelas} / ${state.alokasi}</td></tr>
        </table>

        <div style="margin-bottom:20px;">
            <h3 style="font-weight:bold; border-bottom:1px solid black; display:inline-block; margin-bottom:5px;">A. CAPAIAN PEMBELAJARAN</h3>
            <p style="text-align:justify;">${state.capaianPembelajaran}</p>
        </div>

        <div style="margin-bottom:20px;">
            <h3 style="font-weight:bold; border-bottom:1px solid black; display:inline-block; margin-bottom:5px;">B. TUJUAN PEMBELAJARAN</h3>
            <div style="white-space:pre-line; margin-left:15px;">${state.tujuanPembelajaran}</div>
        </div>

        <div style="margin-bottom:20px;">
            <h3 style="font-weight:bold; border-bottom:1px solid black; display:inline-block; margin-bottom:10px;">C. PENGALAMAN PEMBELAJARAN</h3>
            <div class="table-container">${formatMarkdownTable(aiContent.experience)}</div>
        </div>

        ${rubrikData ? `
        <div style="margin-bottom:20px;">
            <h3 style="font-weight:bold; border-bottom:1px solid black; display:inline-block; margin-bottom:10px;">D. ASESMEN PROSES</h3>
            <p style="margin-bottom:5px; font-style:italic;">Instrumen: ${rubrikData.instrumen}</p>
            <table border="1" style="width:100%; border-collapse:collapse; font-size:9pt;">
                <tr style="background:#eee;"><th>Kriteria</th><th>Sangat Baik (4)</th><th>Baik (3)</th><th>Cukup (2)</th><th>Kurang (1)</th></tr>
                ${rubrikData.rubrik.map(r => `<tr><td><b>${r.kriteria}</b></td><td>${r.sangatBaik}</td><td>${r.baik}</td><td>${r.sedang}</td><td>${r.kurang}</td></tr>`).join('')}
            </table>
            <p style="font-weight:bold; margin-top:10px;">Tabel Nilai Murid (Rekapitulasi):</p>
            <table border="1" style="width:100%; border-collapse:collapse; margin-top:5px;">
                <tr><th width="30">No</th><th>Nama Murid</th><th width="50">Skor</th><th width="50">Nilai</th></tr>
                ${[1,2,3,4,5].map(i => `<tr height="25"><td>${i}</td><td></td><td></td><td></td></tr>`).join('')}
            </table>
        </div>
        ` : ''}

        <div style="margin-bottom:20px;">
            <h3 style="font-weight:bold; border-bottom:1px solid black; display:inline-block; margin-bottom:10px;">${rubrikData ? 'E' : 'D'}. EVALUASI PEMBELAJARAN</h3>
            <div style="text-align:justify;">${formatSoalToHtml(cleanAIText(aiContent.questionsText))}</div>
        </div>

        <div style="margin-top:50px;">
            <table style="width:100%; border:none;">
                <tr>
                    <td align="center" width="50%">
                        <p>Mengetahui,</p><p>Kepala Madrasah</p><br><br><br>
                        <p><b><u>${state.namaKepala}</u></b></p><p>NIP. ${state.nipKepala || '-'}</p>
                    </td>
                    <td align="center" width="50%">
                        <p>${state.kota}, ${state.tgl} ${state.bulan} ${state.thn}</p><p>Guru Mapel</p><br><br><br>
                        <p><b><u>${state.namaGuru}</u></b></p><p>NIP. ${state.nipGuru || '-'}</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    `;

    resultArea.innerHTML = html;

    document.getElementById('btnDownloadWord').onclick = () => {
        const content = document.getElementById('rpp-doc').innerHTML;
        const blob = new Blob(['\ufeff', `<html><head><meta charset='utf-8'></head><body>${content}</body></html>`], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `RPP_${state.mataPelajaran}_${state.materi}.doc`;
        a.click();
    };
}
