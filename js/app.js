
import { generateTP, generateExperience, generateQuestions } from './ai-service.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rppForm');
    const mapelSelect = document.getElementById('mataPelajaran');
    const jenjangSelect = document.getElementById('jenjang');
    const kelasSelect = document.getElementById('kelas');
    const pcContainer = document.getElementById('pancaCintaContainer');
    const asesmenSelect = document.getElementById('jenisAsesmenProses');
    const cpTextarea = document.getElementById('capaianPembelajaran');
    
    // 1. Populasi Dropdown Mapel berdasarkan Jenjang
    const populateMapel = (jenjang) => {
        mapelSelect.innerHTML = '<option value="">Pilih Mata Pelajaran</option>';
        if (!jenjang || !JENJANG_SUBJECTS[jenjang]) return;

        JENJANG_SUBJECTS[jenjang].forEach(subject => {
            const opt = document.createElement('option');
            opt.value = subject.toLowerCase();
            opt.textContent = subject;
            mapelSelect.appendChild(opt);
        });
    };

    // 2. Inisialisasi Panca Cinta Checkboxes
    PANCA_CINTA_OPTIONS.forEach(pc => {
        const label = document.createElement('label');
        label.className = "flex items-center gap-2 p-3 bg-gray-50 rounded-xl border-2 border-transparent hover:border-indigo-300 cursor-pointer transition-all";
        label.innerHTML = `
            <input type="checkbox" name="pancaCinta" value="${pc}" class="w-4 h-4 accent-indigo-600"> 
            <span class="text-[11px] font-bold text-gray-700 uppercase leading-tight">${pc}</span>
        `;
        pcContainer.appendChild(label);
    });

    // 3. Inisialisasi Pilihan Asesmen
    Object.keys(RUBRIK_DATABASE).forEach(key => {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = key;
        asesmenSelect.appendChild(opt);
    });

    // 4. Logika Update CP Otomatis
    const updateCP = () => {
        const mapel = mapelSelect.value;
        const jenjang = jenjangSelect.value;
        const kelas = kelasSelect.value;
        const fase = KELAS_FASE_MAP[kelas];
        
        if (mapel && jenjang && fase) {
            const subjectData = CP_DATABASE[mapel];
            if (subjectData && subjectData[jenjang] && subjectData[jenjang][fase]) {
                cpTextarea.value = subjectData[jenjang][fase];
            } else {
                cpTextarea.value = `[Data CP tidak ditemukan untuk: ${mapel.toUpperCase()}, ${jenjang}, Fase ${fase}]`;
            }
        } else {
            cpTextarea.value = "";
        }
    };
    
    // 5. Event Listeners
    jenjangSelect.addEventListener('change', (e) => {
        populateMapel(e.target.value);
        updateCP();
    });

    mapelSelect.addEventListener('change', updateCP);
    kelasSelect.addEventListener('change', updateCP);

    // 6. AI TP Generator
    document.getElementById('btnGenTujuan').onclick = async () => {
        const mapelText = mapelSelect.options[mapelSelect.selectedIndex]?.text || "";
        const materi = document.getElementById('materi').value;
        const fase = KELAS_FASE_MAP[kelasSelect.value];
        
        if (!materi || !mapelText || !fase) {
            return alert("Lengkapi Mapel, Materi, dan Kelas!");
        }
        
        const btn = document.getElementById('btnGenTujuan');
        btn.textContent = "MERUMUSKAN...";
        btn.disabled = true;
        
        try {
            const tp = await generateTP(materi, mapelText, fase);
            document.getElementById('tujuanPembelajaran').value = tp;
        } catch (err) {
            alert("Gagal koneksi AI.");
        } finally {
            btn.textContent = "AUTO-GENERATE TP (AI)";
            btn.disabled = false;
        }
    };

    // 7. Form Submission
    form.onsubmit = async (e) => {
        e.preventDefault();
        const selectedPC = Array.from(document.querySelectorAll('input[name="pancaCinta"]:checked')).map(el => el.value);
        if (selectedPC.length === 0) return alert("Pilih minimal satu Nilai Panca Cinta!");

        const btn = document.getElementById('btnSubmit');
        btn.disabled = true;
        btn.textContent = "⏳ MENYUSUN DOKUMEN...";

        const state = {
            namaMadrasah: document.getElementById('namaMadrasah').value,
            namaGuru: document.getElementById('namaGuru').value,
            nipGuru: document.getElementById('nipGuru').value,
            namaKepala: document.getElementById('namaKepala').value,
            nipKepala: document.getElementById('nipKepala').value,
            mataPelajaran: mapelSelect.options[mapelSelect.selectedIndex].text,
            materi: document.getElementById('materi').value,
            kelas: kelasSelect.value,
            fase: KELAS_FASE_MAP[kelasSelect.value],
            alokasi: document.getElementById('alokasi').value,
            capaianPembelajaran: cpTextarea.value,
            tujuanPembelajaran: document.getElementById('tujuanPembelajaran').value,
            jenisAsesmenProses: asesmenSelect.value,
            pancaCinta: selectedPC,
            kota: document.getElementById('kota').value,
            tgl: document.getElementById('tgl').value,
            bulan: document.getElementById('bulan').value,
            thn: document.getElementById('thn').value
        };

        try {
            const exp = await generateExperience(state.materi, state.mataPelajaran, state.alokasi, state.pancaCinta);
            const questions = await generateQuestions(state.materi, state.mataPelajaran, state.pancaCinta, {
                hots: document.getElementById('countHots').value,
                kompleks: document.getElementById('countKompleks').value
            });
            
            renderResult(state, { experience: exp, questionsText: questions });
            document.getElementById('resultArea').scrollIntoView({ behavior: 'smooth' });
        } catch (err) {
            alert("Gagal memproses data AI.");
        } finally {
            btn.disabled = false;
            btn.textContent = "🚀 GENERATE RPP & EVALUASI";
        }
    };
});
