
import { DatabaseCP, BankSoalItem, RubrikItem } from './types';

export const RUBRIK_DATABASE: Record<string, { instrumen: string; rubrik: RubrikItem[] }> = {
  'Diskusi': {
    instrumen: 'Lembar Observasi Aktivitas Diskusi Kelompok',
    rubrik: [
      { 
        kriteria: 'Partisipasi & Kontribusi', 
        sangatBaik: 'Sangat aktif menyampaikan pendapat kritis dan solusi relevan', 
        baik: 'Aktif menyampaikan pendapat yang relevan dengan topik', 
        sedang: 'Sesekali menyampaikan pendapat jika ditanya', 
        kurang: 'Pasif atau tidak memberikan kontribusi pada diskusi' 
      },
      { 
        kriteria: 'Etika & Kerjasama', 
        sangatBaik: 'Sangat menghargai pendapat orang lain dan membantu rekan sekelompok', 
        baik: 'Menghargai pendapat orang lain dan bekerja sama dengan baik', 
        sedang: 'Cukup menghargai pendapat orang lain namun kurang koordinasi', 
        kurang: 'Mendominasi diskusi atau tidak menghargai pendapat orang lain' 
      }
    ]
  },
  'Presentasi': {
    instrumen: 'Rubrik Penilaian Keterampilan Presentasi Lisan',
    rubrik: [
      { 
        kriteria: 'Penguasaan Materi', 
        sangatBaik: 'Sangat menguasai seluruh konten and menjawab pertanyaan secara mendalam', 
        baik: 'Menguasai konten dengan baik dan mampu menjawab pertanyaan', 
        sedang: 'Cukup menguasai konten namun kesulitan menjawab pertanyaan kritis', 
        kurang: 'Tidak menguasai konten and hanya membaca teks presentasi' 
      },
      { 
        kriteria: 'Teknik Komunikasi', 
        sangatBaik: 'Suara sangat jelas, intonasi menarik, dan melakukan koordinasi mata yang baik', 
        baik: 'Suara jelas dan intonasi cukup stabil dalam penyampaian', 
        sedang: 'Suara terdengar jelas namun intonasi monoton', 
        kurang: 'Suara pelan, tidak jelas, dan tidak ada interaksi dengan audiens' 
      }
    ]
  },
  'Kerja Kelompok': {
    instrumen: 'Lembar Penilaian Kinerja Kolaboratif Proyek',
    rubrik: [
      { 
        kriteria: 'Pembagian Peran', 
        sangatBaik: 'Seluruh anggota memiliki peran spesifik dan berkontribusi maksimal', 
        baik: 'Sebagian besar anggota menjalankan perannya dengan baik', 
        sedang: 'Hanya beberapa anggota yang aktif mengerjakan tugas', 
        kurang: 'Tidak ada pembagian peran yang jelas dalam kelompok' 
      },
      { 
        kriteria: 'Kualitas Hasil Tugas', 
        sangatBaik: 'Hasil tugas sangat kreatif, lengkap, dan melebihi ekspektasi', 
        baik: 'Hasil tugas lengkap dan sesuai dengan petunjuk guru', 
        sedang: 'Hasil tugas cukup lengkap namun ada beberapa kekurangan minor', 
        kurang: 'Hasil tugas tidak lengkap atau tidak sesuai petunjuk' 
      }
    ]
  },
  'Penyelidikan': {
    instrumen: 'Rubrik Penilaian Laporan Penyelidikan / Eksperimen',
    rubrik: [
      { 
        kriteria: 'Langkah Kerja', 
        sangatBaik: 'Melaksanakan prosedur penyelidikan secara sangat sistematis dan detail', 
        baik: 'Melaksanakan prosedur penyelidikan secara sistematis sesuai instruksi', 
        sedang: 'Melaksanakan prosedur penyelidikan namun ada langkah yang terlewat', 
        kurang: 'Langkah kerja tidak teratur atau tidak sesuai dengan tujuan' 
      },
      { 
        kriteria: 'Analisis & Kesimpulan', 
        sangatBaik: 'Analisis data sangat akurat dan kesimpulan didukung bukti kuat', 
        baik: 'Analisis data benar dan mampu menarik kesimpulan yang tepat', 
        sedang: 'Analisis data cukup benar namun kesimpulan kurang mendalam', 
        kurang: 'Analisis data salah dan kesimpulan tidak relevan dengan hasil' 
      }
    ]
  },
  'Observasi': {
    instrumen: 'Lembar Observasi Perilaku dan Keterampilan Proses',
    rubrik: [
      { 
        kriteria: 'Ketajaman Pengamatan', 
        sangatBaik: 'Mampu mengidentifikasi detail objek observasi secara sangat akurat', 
        baik: 'Mampu mengidentifikasi detail objek observasi dengan baik', 
        sedang: 'Mampu mengidentifikasi objek namun detail kurang lengkap', 
        kurang: 'Hanya melihat objek secara umum tanpa detail yang relevan' 
      },
      { 
        kriteria: 'Pencatatan Data', 
        sangatBaik: 'Data dicatat secara sistematis, rapi, dan sangat objektif', 
        baik: 'Data dicatat secara sistematis dan objektif', 
        sedang: 'Data dicatat namun kurang sistematis', 
        kurang: 'Pencatatan data tidak lengkap atau bersifat subjektif' 
      }
    ]
  }
};

export const CP_DATABASE: DatabaseCP = {
  'pendidikan pancasila': {
    'MI': {
      'A': 'Murid mengenal simbol dan sila Pancasila, aturan sederhana di keluarga, semboyan Bhinneka Tunggal Ika, serta karakteristik lingkungan tempat tinggal dan sekolah sebagai bagian dari NKRI, dan mempraktikkan nilai Pancasila dalam kehidupan sehari-hari.',
      'B': 'Murid mengidentifikasi makna sila-sila Pancasila dan penerapannya, melaksanakan aturan serta hak dan kewajiban di sekolah dan lingkungan, menghargai keberagaman identitas, serta menunjukkan kerja sama dalam keberagaman sebagai bagian dari NKRI.',
      'C': 'Murid memahami sejarah kelahiran Pancasila, menghubungkan sila-sila Pancasila sebagai satu kesatuan, mengimplementasikan norma serta musyawarah, melestarikan keberagaman budaya, dan menunjukkan gotong royong sebagai wujud bela negara.'
    },
    'MTs': {
      'D': 'Murid memahami kedudukan Pancasila sebagai dasar negara dan ideologi, menerapkan norma dan peraturan perundang-undangan, menerima dan melestarikan keberagaman budaya, serta berpartisipasi aktif menjaga keutuhan wilayah NKRI.'
    },
    'MA': {
      'E': 'Murid menganalisis kedudukan Pancasila sebagai dasar dan ideologi negara, menaati hukum, memahami makna Bhinneka Tunggal Ika dan gotong royong, serta memahami peran warga negara dan posisi Indonesia dalam hubungan antarnegara.',
      'F': 'Murid menganalisis keterkaitan sila-sila Pancasila, dinamika UUD 1945, potensi konflik keberagaman dan solusinya, serta mendemonstrasikan praktik demokrasi dan peran lembaga negara dalam menjaga NKRI di tengah tantangan global.'
    }
  },
  'bahasa indonesia': {
    'MI': {
      'A': 'Murid memahami informasi dan pesan dari teks lisan sederhana; membaca kata dan teks sederhana tentang diri dan lingkungan; berpartisipasi dalam percakapan santun; serta menulis permulaan dan teks sederhana tentang diri, keluarga, dan lingkungan sekitar.',
      'B': 'Murid memahami ide pokok dan informasi dari teks lisan dan tulis; membaca dan memirsa berbagai teks sederhana; menyajikan pendapat secara lisan; serta menulis teks sederhana dengan kaidah kebahasaan yang tepat sesuai konteks.',
      'C': 'Murid menganalisis informasi dan nilai dalam teks sastra dan nonsastra; mempresentasikan gagasan secara efektif dan santun; serta menulis berbagai teks berdasarkan pengamatan, pengalaman, dan imajinasi dengan struktur kalimat yang lebih kompleks dan kreatif.'
    },
    'MTs': {
      'D': 'Murid menganalisis gagasan dan pesan dari berbagai teks multimodal; menyampaikan gagasan dan solusi secara kritis dan kreatif melalui lisan; serta menulis teks logis, kritis, dan kreatif dengan kosakata denotatif, konotatif, dan kiasan.'
    },
    'MA': {
      'E': 'Murid mengevaluasi informasi dan kualitas berbagai teks; mempresentasikan gagasan secara sistematis and kreatif; serta menulis dan memublikasikan karya tulis dalam berbagai bentuk media cetak dan digital.',
      'F': 'Murid mengevaluasi dan merefleksi gagasan dari berbagai teks kompleks; menyajikan gagasan dan karya sastra secara logis, kritis, dan kreatif; serta menulis dan memublikasikan karya ilmiah dan sastra dalam berbagai media sebagai wujud literasi tingkat lanjut.'
    }
  },
  'matematika': {
    'MI': {
      'A': 'Murid menunjukkan pemahaman bilangan cacah sampai 100, melakukan penjumlahan dan pengurangan menggunakan benda konkret, mengenal pola sederhana, membandingkan dan mengukur panjang, berat, dan waktu dengan satuan tidak baku, mengenal bangun datar dan bangun ruang sederhana, serta menyajikan data sederhana dalam bentuk piktogram.',
      'B': 'Murid memahami bilangan cacah sampai 10.000, melakukan operasi hitung dasar, mengenal pecahan dan desimal sederhana, mengembangkan pola bilangan, mengukur dengan satuan baku, mengenali dan menyusun bangun datar, serta menyajikan dan menginterpretasi data dalam tabel dan diagram sederhana.',
      'C': 'Murid memahami bilangan cacah sampai 1.000.000, operasi bilangan dan pecahan, KPK dan FPB, pola bilangan dan rasio, menghitung keliling dan luas bangun datar, mengenal bangun ruang dan peta sederhana, serta menganalisis data dan peluang kejadian sederhana.'
    },
    'MTs': {
      'D': 'Murid memahami bilangan real, rasio dan proporsi, aljabar dan fungsi linear, persamaan dan pertidaksamaan, geometri dan transformasi, teorema Pythagoras, statistika dan peluang, serta menggunakan penalaran matematis untuk menyelesaikan masalah kontekstual.'
    },
    'MA': {
      'E': 'Murid menggeneralisasi sifat bilangan berpangkat, menyelesaikan sistem pertidaksamaan dan persamaan kuadrat, memahami fungsi eksponensial dan trigonometri, serta menganalisis dan merepresentasikan data statistik menggunakan berbagai diagram.',
      'F': 'Murid memahami barisan dan deret, fungsi dan transformasinya, geometri lingkaran, statistika dan peluang lanjut, serta menerapkan konsep kalkulus dasar (turunan dan integral) untuk memodelkan dan menyelesaikan berbagai permasalahan nyata.'
    }
  },
  'bahasa inggris': {
    'MI': {
      'B': 'Murid memahami dan merespons teks lisan, tulis, dan multimodal sederhana tentang kehidupan sehari-hari; serta mengomunikasikan gagasan sederhana secara lisan dan tertulis sesuai konteks.',
      'C': 'Murid memahami alur informasi, gagasan utama, dan rincian dari teks lisan, tulis, dan multimodal tentang topik sehari-hari; serta mengomunikasikan ide dan pengalaman melalui teks sederhana secara lisan, tulis, dan multimodal sesuai konteks.'
    },
    'MTs': {
      'D': 'Murid memahami informasi tersurat dan tersirat dari berbagai teks lisan, tulis, dan multimodal; mengungkapkan gagasan, pengalaman, dan pendapat secara lisan dan tertulis dengan kalimat sederhana dan majemuk sesuai konteks dan tujuan komunikasi.'
    },
    'MA': {
      'E': 'Murid menganalisis dan menyimpulkan informasi dari teks fiksi dan nonfiksi lisan, tulis, dan multimodal tentang topik sehari-hari dan isu terkini; serta mengomunikasikan gagasan dan mempertahankan argumen secara efektif melalui berbagai media.',
      'F': 'Murid mengevaluasi dan merefleksi informasi tersurat dan tersirat dari teks narasi, eksposisi, dan diskusi tentang isu nasional, global, dan lintas mata pelajaran; serta mengomunikasikan gagasan dan argumen secara lisan dan tertulis dengan struktur teks dan unsur kebahasaan yang kompleks dan tepat.'
    }
  },
  'ipas': {
    'MI': {
      'B': 'Murid menjelaskan fungsi pancaindra; menganalisis siklus hidup makhluk hidup dan pelestariannya; memahami perubahan wujud zat, sumber dan perubahan energi, gaya dan pengaruhnya; memahami interaksi sosial, peran dan tanggung jawab masyarakat sekitar; mengenali wilayah dan bentang alam; memahami sejarah lokal; serta mengelola keuangan secara bijak melalui penerapan keterampilan proses ilmiah.',
      'C': 'Murid merefleksikan sistem organ manusia dan kesehatan; menganalisis ekosistem dan interaksi biotik-abiotik; memahami gelombang bunyi dan cahaya, tata surya, dan energi alternatif; memahami kondisi geografis dan sejarah Indonesia; mengapresiasi keberagaman budaya; serta menerapkan kegiatan ekonomi masyarakat melalui keterampilan proses ilmiah yang utuh dan mandiri.'
    }
  },
  'ipa': {
    'MTs': {
      'D': 'Murid menganalisis klasifikasi dan ciri makhluk hidup, sistem organisasi kehidupan, interaksi makhluk hidup dan lingkungan, pewarisan sifat, serta bioteknologi sederhana; menganalisis sifat dan perubahan materi, gerak, gaya, tekanan, energi, kalor, gelombang, listrik, dan kemagnetan; memahami sistem tata surya dan dampaknya; serta menerapkan keterampilan proses ilmiah secara sistematis dan berbasis bukti.'
    },
    'MA': {
      'E': 'Murid menerapkan prinsip klasifikasi dan pelestarian keanekaragaman hayati; menganalisis interaksi ekosistem dan keseimbangannya; menggunakan sistem pengukuran dalam kerja ilmiah; menganalisis gerak dua dimensi dan energi alternatif; memahami partikel penyusun materi dan stoikiometri; serta menerapkan konsep IPA untuk menganalisis dan mencari solusi permasalahan perubahan iklim melalui keterampilan proses ilmiah yang utuh.'
    }
  },
  'ips': {
    'MTs': {
      'D': 'Murid mampu menjelaskan keberagaman kondisi geografis Indonesia, konektivitas antarruang, pemanfaatan dan pelestarian sumber daya alam, serta dampak aktivitas manusia terhadap perubahan iklim dan bencana. Murid memahami kegiatan ekonomi, pasar, lembaga keuangan, dan perdagangan internasional serta peran masyarakat dan negara dalam pertumbuhan ekonomi digital. Murid menganalisis interaksi sosial, dinamika sosial budaya, dan integrasi bangsa dalam masyarakat majemuk, serta memahami konsep dasar sejarah dalam konteks lokal, nasional, dan global.'
    },
    'MA': {
      'E': 'Murid mampu menjelaskan konsep dasar geografi dan fenomena geosfer (litosfer, atmosfer, hidrosfer) serta menerapkan teknologi geospasial (peta, penginderaan jauh, SIG). Murid memahami hakikat ilmu ekonomi, membedakan produk keuangan bank dan nonbank, risiko keuangan, dan menyusun laporan keuangan pribadi. Murid memahami fungsi sosiologi dalam mengkaji masyarakat, menganalisis gejala sosial dan keragaman budaya, serta memahami konsep dasar sejarah dan penelitian sejarah dari masa Hindu-Buddha hingga Islam.',
      'F': 'Murid mampu menganalisis fenomena sosial, ekonomi, dan sejarah secara kritis dan mendalam. Murid mengkaji peristiwa sejarah Indonesia dan dunia, memahami perubahan dan keberlanjutan sosial, serta mengaitkan perkembangan global dengan konteks Indonesia. Murid menunjukkan keterampilan proses IPS melalui observasi, analisis data, refleksi, komunikasi, dan penyusunan proyek sosial atau kajian sejarah yang bermakna.'
    }
  },
  'bahasa arab': {
    'MI': {
      'A': 'Murid dapat mengenal bunyi huruf hijaiyah dan kosakata sederhana tentang diri dan lingkungan.',
      'B': 'Murid dapat memahami kosakata dan ungkapan sederhana serta membaca dan menulis kalimat pendek.',
      'C': 'Murid dapat memahami teks sederhana dan berkomunikasi secara terbatas dalam bahasa Arab.'
    },
    'MTs': {
      'D': 'Murid dapat memahami teks lisan dan tulis sederhana serta berkomunikasi dalam konteks kehidupan sehari-hari.'
    },
    'MA': {
      'E': 'Murid dapat memahami dan menganalisis teks bahasa Arab tingkat menengah serta mengekspresikan ide secara lisan dan tulis.',
      'F': 'Murid dapat memahami dan menganalisis teks bahasa Arab kompleks serta berkomunikasi sesuai konteks sosial dan akademik.'
    }
  },
  'informatika': {
    'MTs': {
      'D': 'Murid menerapkan berpikir komputasional untuk menyelesaikan persoalan kehidupan sehari-hari dan komputasi sederhana; memahami himpunan data terstruktur dan penggunaan lembar kerja pengolah data; menuliskan instruksi sederhana dalam bentuk pseudocode; memahami cara kerja mesin pencari, memilah informasi digital; memahami konsep dasar komputer, jaringan lokal dan internet; serta menerapkan etika, keamanan, dan kesadaran digital.'
    },
    'MA': {
      'E': 'Murid memahami struktur data dan algoritma standar; menerapkan algoritma untuk menyelesaikan persoalan dan merancang solusi dalam bentuk pseudocode yang mendekati bahasa pemrograman; memahami model kerja komputer dan peran sistem operasi; menggunakan mesin pencari lanjutan dan teknik periksa fakta; memanfaatkan beragam perangkat digital untuk kolaborasi dan produksi konten; memahami hak kekayaan intelektual, profesi informatika, digitalisasi budaya; serta menerapkan konfigurasi dasar keamanan jaringan dan akun digital.',
      'F': 'Murid menganalisis dan mengembangkan solusi komputasional dengan berbagai strategi.'
    }
  },
  'pjok': {
    'MI': {
      'A': 'Murid mempraktikkan keterampilan gerak fundamental dalam berbagai situasi; mengeksplorasi strategi dan konsep gerak; menaati peraturan dan bekerja sama untuk menumbuhkan fair play; berpartisipasi dalam aktivitas jasmani serta mengenali manfaatnya.',
      'B': 'Murid menghaluskan keterampilan gerak fundamental dan menerapkannya dalam situasi baru; menyesuaikan strategi gerak; memecahkan masalah gerak secara sederhana; berpartisipasi aktif dan sportif dalam kelompok; mengenali faktor aktivitas jasmani yang menyenangkan.',
      'C': 'Murid menyesuaikan dan mentransfer keterampilan serta strategi gerak ke berbagai situasi; menguji efektivitas strategi gerak; menjalankan peran dalam kelompok untuk mendukung fair play dan partisipasi inklusif; menjelaskan manfaat aktivitas jasmani teratur.'
    },
    'MTs': {
      'D': 'Murid menerapkan dan mentransfer keterampilan serta strategi gerak secara efektif; membuktikan strategi gerak paling tepat dalam berbagai situasi; menunjukkan kepemimpinan, kolaborasi, dan pengambilan keputusan kelompok.'
    },
    'MA': {
      'E': 'Murid menerapkan keterampilan gerak spesifik dalam situasi menantang; mengembangkan dan merefleksikan strategi gerak; mengevaluasi fair play dan perilaku etis dalam aktivitas jasmani.',
      'F': 'Murid mengevaluasi keterampilan dan strategi gerak untuk meningkatkan kinerja; mengevaluasi kepemimpinan, kolaborasi, dan pengambilan keputusan dalam aktivitas jasmani; menilai efektivitas partisipasi kebugaran terhadap kesehatan.'
    }
  },
  'seni musik': {
    'MI': {
      'A': 'Murid mengenali unsur musik sederhana (nada dan irama) menggunakan anggota tubuh dan alat musik; menirukan pola irama dan nada; memberikan umpan balik sederhana tentang praktik bermusik; menunjukkan ekspresi senang dalam kegiatan bermusik.',
      'B': 'Murid mengenali nada dan pola irama; menirukan pola irama dan melodi; memberikan umpan balik menggunakan istilah musik sederhana; membuat bunyi dengan anggota tubuh atau alat musik.',
      'C': 'Murid menerapkan unsur musik (nada, irama, melodi); mengeksplorasi variasi pola irama, tempo, dan melodi; memberikan umpan balik karya musik dengan istilah musik yang tepat; mengembangkan pola irama berbasis kearifan lokal.'
    },
    'MTs': {
      'D': 'Murid menerapkan unsur musik (nada, irama, melodi) dengan alat musik berbasis teknologi; mengidentifikasi karakteristik musik berbagai genre and era; menyajikan musik daerah, Nusantara, dan musik modern Indonesia; menciptakan lagu sederhana.'
    },
    'MA': {
      'E': 'Murid menganalisis unsur musik lengkap (nada, irama, melodi, harmoni, timbre, tempo, dinamika); merefleksikan kemampuan dan karya musik dengan istilah musik yang tepat; menyajikan musik Nusantara dan musik modern Indonesia; menciptakan dan mendokumentasikan karya musik kreasi sendiri.',
      'F': 'Murid mengevaluasi dan mengeksplorasi unsur musik secara mendalam; menerapkan hasil refleksi praktik bermusik; menyajikan ansambel musik remaja; menciptakan dan mendokumentasikan karya kolaboratif dengan manajemen pementasan.'
    }
  },
  'seni rupa': {
    'MI': {
      'A': 'Murid mengenali dan menyebutkan unsur rupa pada benda dan karya seni di sekitar; merefleksikan dan mengapresiasi karya sendiri; mengenali serta mencoba alat dan bahan; membuat karya seni rupa berdasarkan pengalaman dan pengamatan lingkungan.',
      'B': 'Murid mengidentifikasi unsur rupa dan prinsip desain; merefleksikan dan mengapresiasi karya diri sendiri dan teman dengan kosa kata seni rupa yang sesuai; mencoba alat, bahan, dan prosedur penggunaannya.',
      'C': 'Murid menjelaskan unsur rupa dan prinsip desain; merefleksikan dan mengapresiasi karya menggunakan istilah seni rupa yang tepat; mencoba variasi teknik alat dan bahan; membuat karya melalui pengembangan imajinasi.'
    },
    'MTs': {
      'D': 'Murid menganalisis unsur rupa dan prinsip desain; membandingkan fungsi dan unsur karya seni rupa; mengaplikasikan variasi teknik serta mengeksplorasi alat dan bahan sekitar; membuat karya dengan mempertimbangkan fungsi, gaya, atau teknik.'
    },
    'MA': {
      'E': 'Murid mengeksplorasi unsur rupa dan prinsip desain; merefleksikan penggunaan unsur, prinsip, dan fungsi karya; mengeksplorasi potensi alat dan bahan serta menghubungkan seni rupa dengan bidang ilmu lain.',
      'F': 'Murid mengeksplorasi dan menganalisis unsur rupa serta prinsip desain; merefleksikan karya dengan kosa kata seni rupa yang tepat; menganalisis keterhubungan seni rupa dengan bidang lain; menciptakan karya dengan teknik yang dikuasai.'
    }
  },
  'seni tari': {
    'MI': {
      'A': 'Murid mengenal tari sebagai media komunikasi; mengeksplorasi unsur utama tari (gerak, ruang, waktu, tenaga); merefleksikan pencapaian diri; meragakan gerak dengan etika penampil dan penonton; menciptakan gerak sederhana yang indah.',
      'B': 'Murid mengamati bentuk penyajian tari; mengeksplorasi unsur utama tari (level dan arah hadap); merefleksikan pencapaian diri; bekerja kooperatif dalam meragakan tari; mengembangkan gerak tari.',
      'C': 'Murid mengamati tari tradisi; mengidentifikasi unsur pendukung tari; meragakan rangkaian gerak secara berkelompok; merangkai gerak tari berbasis tradisi atau kreasi.'
    },
    'MTs': {
      'D': 'Murid mengamati jenis, fungsi, dan nilai tari dalam konteks budaya; merefleksikan dan mengelompokkan karya tari; merancang konsep tari kreasi; menciptakan tari berdasarkan tradisi dengan desain lantai dan level.'
    },
    'MA': {
      'E': 'Murid menginterpretasi makna dan simbol tari tradisi atau kreasi; membandingkan dan mengapresiasi karya tari; merancang dan menata karya tari pertunjukan; mengaktualisasikan diri melalui pertunjukan tari.',
      'F': 'Murid elaborasi dan mengevaluasi tari tradisi atau kreasi; mengembangkan penciptaan tari dengan manajemen pertunjukan; mengomposisi tari terinspirasi dari berbagai pertunjukan.'
    }
  },
  'prakarya': {
    'MTs': {
      'D': 'Murid mampu melakukan observasi dan eksplorasi bahan, alat, teknik, dan prosedur pada bidang Prakarya (budi daya, kerajinan, pengolahan, dan rekayasa) sesuai potensi lingkungan dan kearifan lokal; menyusun desain/perencanaan kegiatan.'
    },
    'MA': {
      'E': 'Murid mampu menganalisis keragaman produk Prakarya bernilai ekonomis (budi daya, kerajinan, pengolahan, dan rekayasa) berdasarkan kebutuhan pasar dan potensi sumber daya; menyusun rancangan pengembangan produk secara sistematis dan kreatif.'
    }
  },
  'prakarya dan kewirausahaan': {
    'MA': {
      'F': 'Murid mampu menganalisis peluang usaha produk budi daya/kerajinan/pengolahan/rekayasa berdasarkan potensi internal dan eksternal; menyusun proposal usaha sederhana berbasis kajian ilmiah, teknologi, dan kebutuhan pasar; melaksanakan strategi produksi dan pemasaran.'
    }
  },
  'akidah akhlak': {
    'MI': {
      'A': 'Murid dapat mengenal Allah SWT, rukun iman, dan membiasakan akhlak terpuji kepada Allah, diri sendiri, dan sesama.',
      'B': 'Murid dapat memahami sifat-sifat Allah, meneladani akhlak Rasulullah SAW, serta menunjukkan sikap jujur, disiplin, dan santun.',
      'C': 'Murid dapat memahami konsep dasar akidah Islam dan membiasakan akhlak mulia dalam kehidupan sehari-hari.'
    },
    'MTs': {
      'D': 'Murid dapat memahami prinsip akidah Islam dan akhlak terpuji, serta menunjukkan sikap moderat, tanggung jawab, dan toleransi dalam kehidupan sosial.'
    },
    'MA': {
      'E': 'Murid dapat menganalisis prinsip akidah Islam dan aliran pemikiran kalam serta merefleksikannya dalam kehidupan beragama.',
      'F': 'Murid dapat mengevaluasi konsep akidah dan akhlak Islam serta menerapkannya dalam kehidupan bermasyarakat dan berbangsa.'
    }
  },
  'alquran hadis': {
    'MI': {
      'A': 'Murid dapat mengenal huruf hijaiyah, membaca dan menghafal surah pendek, memahami hadis tentang cinta Allah dan Rasul-Nya, serta membiasakan perilaku religius sederhana.',
      'B': 'Murid dapat membaca Al-Qur\'an dengan tartil dasar, memahami makna surah dan hadis tentang ibadah dan akhlak, serta menerapkannya dalam kehidupan sehari-hari.',
      'C': 'Murid dapat memahami kandungan ayat dan hadis tentang keimanan, ibadah, dan kepedulian sosial serta meneladani nilai-nilainya.'
    },
    'MTs': {
      'D': 'Murid dapat memahami dan menganalisis kandungan Al-Qur\'an dan Hadis tentang akidah, ibadah, dan akhlak, serta mengaitkannya dengan fenomena kehidupan remaja.'
    },
    'MA': {
      'E': 'Murid dapat menganalisis konsep Al-Qur\'an dan Hadis, fungsi hadis terhadap Al-Qur\'an, serta merefleksikan nilai-nilainya secara kontekstual.',
      'F': 'Murid dapat merefleksi dan menganalisis ayat dan hadis tentang tanggung jawab manusia sebagai khalifah, kehidupan sosial, dakwah, dan pelestarian lingkungan.'
    }
  },
  'fikih': {
    'MI': {
      'A': 'Murid dapat mengenal tata cara bersuci, salat, dan adab ibadah sehari-hari.',
      'B': 'Murid dapat memahami dan mempraktikkan ibadah wajib serta adab muamalah sederhana.',
      'C': 'Murid dapat memahami ketentuan fikih ibadah dan muamalah serta menerapkannya secara bertanggung jawab.'
    },
    'MTs': {
      'D': 'Murid dapat memahami fikih ibadah dan muamalah serta mengaitkannya dengan praktik kehidupan sehari-hari di masyarakat.'
    },
    'MA': {
      'E': 'Murid dapat menganalisis dalil dan ketentuan fikih ibadah (salat, zakat, puasa, haji) serta fenomena sosial keagamaan.',
      'F': 'Murid dapat menganalisis fikih muamalah, transaksi modern, and prinsip keadilan dalam kehidupan bermasyarakat.'
    }
  },
  'sejarah kebudayaan islam (ski)': {
    'MI': {
      'B': 'Murid dapat menceritakan kehidupan Rasulullah SAW, peristiwa kerasulan, hijrah, dan Isra Mikraj serta mengambil ibrah dari peristiwa tersebut.',
      'C': 'Murid dapat memahami dakwah Rasulullah SAW di Madinah dan keteladanan para sahabat.'
    },
    'MTs': {
      'D': 'Murid dapat memahami sejarah Nabi, Khulafaur Rasyidin, dan perkembangan Islam serta meneladani nilai-nilai kepemimpinan dan perjuangan.'
    },
    'MA': {
      'E': 'Murid dapat menganalisis sejarah Rasulullah SAW, Khulafaur Rasyidin, serta perkembangan peradaban Islam klasik.',
      'F': 'Murid dapat menganalisis perkembangan peradaban Islam dunia dan mengambil ibrah bagi kehidupan masa kini dan masa depan.'
    }
  }
};

export const BANK_SOAL_BAHASA_ARAB: Record<string, BankSoalItem[]> = {
  'perkenalan': [
    { tipe: 'kompleks', soal: 'Pernyataan yang benar tentang kalimat perkenalan dalam Bahasa Arab adalah...', opsi: ['مَا اسْمُكَ؟ (Mā ismuka?) digunakan untuk laki-laki', 'مَا اسْمُكِ؟ (Mā ismuki?) digunakan untuk perempuan', 'اِسْمِي ... (Ismī ...) digunakan untuk menjawab "Namaku..."', 'مَنْ هُوَ؟ (Man huwa?) untuk menanyakan laki-laki'] },
    { tipe: 'hots', soal: 'Ahmad bertemu teman baru di madrasah. Bagaimana cara Ahmad memperkenalkan diri dengan benar?', opsi: ['Mengucapkan salam', 'Bertanya nama', 'Menyebutkan nama sendiri', 'Menyapa dengan sopan'] },
    { tipe: 'benar_salah', pernyataan: 'Kalimat مَا اسْمُكَ؟ dan مَا اسْمُكِ؟ memiliki arti yang sama.' },
    { tipe: 'uraian', soal: 'Tuliskan percakapan perkenalan singkat antara dua orang murid!' }
  ],
  'keluarga': [
     { tipe: 'kompleks', soal: 'Anggota keluarga dalam Bahasa Arab yang benar adalah...', opsi: ['أَبِي (Ayahku)', 'أُمِّي (Ibuku)', 'أَخِي (Saudaraku)', 'أُخْتِي (Saudariku)'] }
  ]
};

export const KELAS_FASE_MAP: Record<string, string> = {
  'I': 'A', 'II': 'A', 'III': 'B', 'IV': 'B', 'V': 'C', 'VI': 'C',
  'VII': 'D', 'VIII': 'D', 'IX': 'D', 'X': 'E', 'XI': 'E', 'XII': 'F'
};

export const DPL_OPTIONS = [
  "Keimanan dan Ketaqwaan terhadap Tuhan Yang Maha Esa",
  "Kewargaan", "Penalaran Kritis", "Kreativitas", "Kolaborasi", "Kemandirian", "Kesehatan", "Communication"
];

export const PANCA_CINTA_OPTIONS = [
  "Cinta kepada Allah dan Rasul-Nya", "Cinta Ilmu", "Cinta Lingkungan", "Cinta Diri Sendiri dan Sesama", "Cinta Tanah Air"
];
