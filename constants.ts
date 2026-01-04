
import { DatabaseCP, RubrikItem } from './types';

export const JENJANG_SUBJECTS: Record<string, string[]> = {
  'MI': [
    "Pendidikan Pancasila", "Bahasa Indonesia", "Matematika", "Bahasa Inggris", "IPAS", 
    "Bahasa Arab", "PJOK", "Seni Musik", "Seni Rupa", "Seni Tari", 
    "Akidah Akhlak", "Alquran Hadis", "Fikih", "Sejarah Kebudayaan Islam (SKI)", 
    "KKA (Koding dan Kecerdasan Artifisial)"
  ],
  'MTs': [
    "Pendidikan Pancasila", "Bahasa Indonesia", "Matematika", "Bahasa Inggris", "IPA", "IPS", 
    "Bahasa Arab", "Informatika", "PJOK", "Seni Musik", "Seni Rupa", "Seni Tari", 
    "Prakarya", "Akidah Akhlak", "Alquran Hadis", "Fikih", 
    "Sejarah Kebudayaan Islam (SKI)", "KKA (Koding dan Kecerdasan Artifisial)"
  ],
  'MA': [
    "Pendidikan Pancasila", "Bahasa Indonesia", "Matematika", "Bahasa Inggris", "IPA", "IPS", 
    "Bahasa Arab", "Informatika", "PJOK", "Seni Musik", "Seni Rupa", "Seni Tari", 
    "Antropologi", "Prakarya dan Kewirausahaan", "Akidah Akhlak", "Alquran Hadis", "Fikih", 
    "Sejarah Kebudayaan Islam (SKI)", "KKA (Koding dan Kecerdasan Artifisial)"
  ]
};

export const CP_DATABASE: DatabaseCP = {
  'pendidikan pancasila': {
    'MI': { 
        'A': 'Peserta didik mengenal simbol dan sila Pancasila, aturan sederhana di keluarga, semboyan Bhinneka Tunggal Ika, serta karakteristik lingkungan tempat tinggal dan sekolah sebagai bagian dari NKRI, dan mempraktikkan nilai Pancasila dalam kehidupan sehari-hari.',
        'B': 'Peserta didik mengidentifikasi makna sila-sila Pancasila dan penerapannya, melaksanakan aturan serta hak dan kewajiban di sekolah dan lingkungan, menghargai keberagaman identitas, serta menunjukkan kerja sama dalam keberagaman sebagai bagian dari NKRI.',
        'C': 'Peserta didik memahami sejarah kelahiran Pancasila, menghubungkan sila-sila Pancasila sebagai satu kesatuan, mengimplementasikan norma serta musyawarah, melestarikan keberagaman budaya, dan menunjukkan gotong royong sebagai wujud bela negara.'
    },
    'MTs': { 
        'D': 'Peserta didik memahami kedudukan Pancasila sebagai dasar negara dan ideologi, menerapkan norma dan peraturan perundang-undangan, menerima dan melestarikan keberagaman budaya, serta berpartisipasi aktif menjaga keutuhan wilayah NKRI.'
    },
    'MA': { 
        'E': 'Peserta didik menganalisis kedudukan Pancasila sebagai dasar dan ideologi negara, menaati hukum, memahami makna Bhinneka Tunggal Ika dan gotong royong, serta memahami peran warga negara dan posisi Indonesia dalam hubungan antarnegara.',
        'F': 'Peserta didik menganalisis keterkaitan sila-sila Pancasila, dinamika UUD 1945, potensi konflik keberagaman dan solusinya, serta mendemonstrasikan praktik demokrasi dan peran lembaga negara dalam menjaga NKRI di tengah tantangan global.'
    }
  },
  'bahasa indonesia': {
    'MI': { 
        'A': 'Peserta didik memahami informasi dan pesan dari teks lisan sederhana; membaca kata dan teks sederhana tentang diri dan lingkungan; berpartisipasi dalam percakapan santun; serta menulis permulaan dan teks sederhana tentang diri, keluarga, dan lingkungan sekitar.',
        'B': 'Peserta didik memahami ide pokok dan informasi dari teks lisan dan tulis; membaca dan memirsa berbagai teks sederhana; menyajikan pendapat secara lisan; serta menulis teks sederhana dengan kaidah kebahasaan yang tepat sesuai konteks.',
        'C': 'Peserta didik menganalisis informasi dan nilai dalam teks sastra dan nonsastra; mempresentasikan gagasan secara efektif and santun; serta menulis berbagai teks berdasarkan pengamatan, pengalaman, dan imajinasi dengan struktur kalimat yang lebih kompleks dan kreatif.'
    },
    'MTs': { 
        'D': 'Peserta didik menganalisis gagasan dan pesan dari berbagai teks multimodal; menyampaikan gagasan dan solusi secara kritis dan kreatif melalui lisan; serta menulis teks logis, kritis, dan kreatif dengan kosakata denotatif, konotatif, dan kiasan.'
    },
    'MA': { 
        'E': 'Peserta didik mengevaluasi informasi dan kualitas berbagai teks; mempresentasikan gagasan secara sistematis dan kreatif; serta menulis dan memublikasikan karya tulis dalam berbagai bentuk media cetak dan digital.',
        'F': 'Peserta didik mengevaluasi dan merefleksi gagasan dari berbagai teks kompleks; menyajikan gagasan dan karya sastra secara logis, kritis, dan kreatif; serta menulis dan memublikasikan karya ilmiah dan sastra dalam berbagai media sebagai wujud literasi tingkat lanjut.'
    }
  },
  'matematika': {
    'MI': { 
        'A': 'Peserta didik menunjukkan pemahaman bilangan cacah sampai 100, melakukan penjumlahan dan pengurangan menggunakan benda konkret, mengenal pola sederhana, membandingkan dan mengukur panjang, berat, dan waktu dengan satuan tidak baku, mengenal bangun datar dan bangun ruang sederhana, serta menyajikan data sederhana dalam bentuk piktogram.',
        'B': 'Peserta didik memahami bilangan cacah sampai 10.000, melakukan operasi hitung dasar, mengenal pecahan dan desimal sederhana, mengembangkan pola bilangan, mengukur dengan satuan baku, mengenali dan menyusun bangun datar, serta menyajikan dan menginterpretasi data dalam tabel dan diagram sederhana.',
        'C': 'Peserta didik memahami bilangan cacah sampai 1.000.000, operasi bilangan dan pecahan, KPK dan FPB, pola bilangan dan rasio, menghitung keliling dan luas bangun datar, mengenal bangun ruang dan peta sederhana, serta menganalisis data dan peluang kejadian sederhana.'
    },
    'MTs': { 
        'D': 'Peserta didik memahami bilangan real, rasio dan proporsi, aljabar dan fungsi linear, persamaan dan pertidaksamaan, geometri dan transformasi, teorema Pythagoras, statistika dan peluang, serta menggunakan penalaran matematis untuk menyelesaikan masalah kontekstual.'
    },
    'MA': { 
        'E': 'Peserta didik menggeneralisasi sifat bilangan berpangkat, menyelesaikan sistem pertidaksamaan dan persamaan kuadrat, memahami fungsi eksponensial dan trigonometri, serta menganalisis dan merepresentasikan data statistik menggunakan berbagai diagram.',
        'F': 'Peserta didik memahami barisan dan deret, fungsi dan transformasinya, geometri lingkaran, statistika dan peluang lanjut, serta menerapkan konsep kalkulus dasar (turunan dan integral) untuk memodelkan dan menyelesaikan berbagai permasalahan nyata.'
    }
  },
  'bahasa inggris': {
    'MI': { 
        'B': 'Peserta didik memahami dan merespons teks lisan, tulis, dan multimodal sederhana tentang kehidupan sehari-hari; serta mengomunikasikan gagasan sederhana secara lisan dan tertulis sesuai konteks.',
        'C': 'Peserta didik memahami alur informasi, gagasan utama, dan rincian dari teks lisan, tulis, dan multimodal tentang topik sehari-hari; serta mengomunikasikan ide dan pengalaman melalui teks sederhana secara lisan, tulis, dan multimodal sesuai konteks.'
    },
    'MTs': { 
        'D': 'Peserta didik memahami informasi tersurat dan tersirat dari berbagai teks lisan, tulis, dan multimodal; mengungkapkan gagasan, pengalaman, dan pendapat secara lisan dan tertulis dengan kalimat sederhana dan majemuk sesuai konteks dan tujuan komunikasi.'
    },
    'MA': { 
        'E': 'Peserta didik menganalisis dan menyimpulkan informasi dari teks fiksi dan nonfiksi lisan, tulis, dan multimodal tentang topik sehari-hari dan isu terkini; serta mengomunikasikan gagasan dan mempertahankan argumen secara efektif melalui berbagai media.',
        'F': 'Peserta didik mengevaluasi dan merefleksi informasi tersurat dan tersirat dari teks narasi, eksposisi, dan diskusi tentang isu nasional, global, dan lintas mata pelajaran; serta mengomunikasikan gagasan dan argumen secara lisan dan tertulis dengan struktur teks dan unsur kebahasaan yang kompleks dan tepat.'
    }
  },
  'ipas': {
    'MI': { 
        'B': 'Peserta didik menjelaskan fungsi pancaindra; menganalisis siklus hidup makhluk hidup dan pelestariannya; memahami perubahan wujud zat, sumber dan perubahan energi, gaya dan pengaruhnya; memahami interaksi sosial, peran dan tanggung jawab masyarakat sekitar; mengenali wilayah dan bentang alam; memahami sejarah lokal; serta mengelola keuangan secara bijak melalui penerapan keterampilan proses ilmiah.',
        'C': 'Peserta didik merefleksikan sistem organ manusia dan kesehatan; menganalisis ekosistem dan interaksi biotik-abiotik; memahami gelombang bunyi dan cahaya, tata surya, dan energi alternatif; memahami kondisi geografis dan sejarah Indonesia; mengapresiasi keberagaman budaya; serta menerapkan kegiatan ekonomi masyarakat melalui keterampilan proses ilmiah yang utuh dan mandiri.'
    }
  },
  'ipa': {
    'MTs': { 
        'D': 'Peserta didik menganalisis klasifikasi dan ciri makhluk hidup, sistem organisasi kehidupan, interaksi makhluk hidup dan lingkungan, pewarisan sifat, serta bioteknologi sederhana; menganalisis sifat dan perubahan materi, gerak, gaya, tekanan, energi, kalor, gelombang, listrik, dan kemagnetan; memahami sistem tata surya dan dampaknya; serta menerapkan keterampilan proses ilmiah secara sistematis dan berbasis bukti.'
    },
    'MA': { 
        'E': 'Peserta didik menerapkan prinsip klasifikasi dan pelestarian keanekaragaman hayati; menganalisis interaksi ekosistem dan keseimbangannya; menggunakan sistem pengukuran dalam kerja ilmiah; menganalisis gerak dua dimensi dan energi alternatif; memahami partikel penyusun materi dan stoikiometri; serta menerapkan konsep IPA untuk menganalisis dan mencari solusi permasalahan perubahan iklim melalui keterampilan proses ilmiah yang utuh.'
    }
  },
  'informatika': {
    'MTs': { 
        'D': 'Peserta didik menerapkan berpikir komputasional untuk menyelesaikan persoalan kehidupan sehari-hari dan komputasi sederhana; memahami himpunan data terstruktur dan penggunaan lembar kerja pengolah data; menuliskan instruksi sederhana dalam bentuk pseudocode; memahami cara kerja mesin pencari, memilah informasi digital; serta menerapkan etika dan kesadaran digital dalam berinteraksi di ruang digital.'
    },
    'MA': { 
        'E': 'Peserta didik memahami struktur data dan algoritma standar; menerapkan algoritma untuk menyelesaikan persoalan dan merancang solusi dalam bentuk pseudocode; memahami model kerja komputer dan peran sistem operasi; memanfaatkan beragam perangkat digital untuk kolaborasi dan produksi konten; serta menerapkan konfigurasi dasar keamanan jaringan dan akun digital.',
        'F': 'Peserta didik menganalisis dan mengembangkan solusi komputasional dengan berbagai strategi.'
    }
  },
  'ips': {
    'MTs': { 
        'D': 'Murid mampu menjelaskan keberagaman kondisi geografis Indonesia, konektivitas antarruang, pemanfaatan dan pelestarian sumber daya alam, serta dampak aktivitas manusia terhadap perubahan iklim dan bencana. Murid memahami kegiatan ekonomi, pasar, lembaga keuangan, dan perdagangan internasional. Murid menganalisis interaksi sosial, dinamika sosial budaya, dan integrasi bangsa serta memahami konsep dasar sejarah.'
    },
    'MA': { 
        'E': 'Murid mampu menjelaskan konsep dasar geografi dan fenomena geosfer serta menerapkan teknologi geospasial. Murid memahami hakikat ilmu ekonomi, membedakan produk keuangan bank dan nonbank, serta menyusun laporan keuangan pribadi. Murid memahami fungsi sosiologi dalam mengkaji masyarakat, menganalisis gejala sosial dan keragaman budaya, serta memahami konsep dasar sejarah dan penelitian sejarah.',
        'F': 'Murid mampu menganalisis fenomena sosial, ekonomi, dan sejarah secara kritis dan mendalam. Murid mengkaji peristiwa sejarah Indonesia dan dunia, memahami perubahan dan keberlanjutan sosial, serta mengaitkan perkembangan global dengan konteks Indonesia melalui observasi, analisis data, refleksi, komunikasi, dan penyusunan proyek sosial.'
    }
  },
  'seni musik': {
    'MI': {
        'A': 'Murid mengenali unsur musik sederhana (nada dan irama) menggunakan anggota tubuh dan alat musik; menirukan pola irama dan nada; memberikan umpan balik sederhana tentang praktik bermusik; membuat pola irama sederhana; serta menunjukkan ekspresi senang dalam kegiatan bermusik.',
        'B': 'Murid mengenali nada dan pola irama; menirukan pola irama dan melodi; memberikan umpan balik menggunakan istilah musik sederhana; membuat bunyi dengan anggota tubuh atau alat musik; serta menunjukkan minat dalam kegiatan bermusik.',
        'C': 'Murid menerapkan unsur musik (nada, irama, melodi); mengeksplorasi variasi pola irama, tempo, dan melodi; memberikan umpan balik karya musik dengan istilah musik yang tepat; mengembangkan pola irama berbasis kearifan lokal; serta menunjukkan minat dan rasa ingin tahu dalam bermusik.'
    },
    'MTs': {
        'D': 'Murid menerapkan unsur musik (nada, irama, melodi) dengan alat musik berbasis teknologi; mengidentifikasi karakteristik musik berbagai genre dan era; menyajikan musik daerah, Nusantara, dan musik modern Indonesia; menciptakan lagu sederhana; serta menunjukkan empati dan kepedulian terhadap lingkungan melalui kegiatan bermusik.'
    },
    'MA': {
        'E': 'Murid menganalisis unsur musik lengkap (nada, irama, melodi, harmoni, timbre, tempo, dinamika); merefleksikan kemampuan dan karya musik dengan istilah musik yang tepat; menyajikan musik Nusantara dan musik modern Indonesia; menciptakan dan mendokumentasikan karya musik kreasi sendiri; serta menerapkan dampak positif bermusik dalam kehidupan sehari-hari.',
        'F': 'Murid mengevaluasi dan mengeksplorasi unsur musik secara mendalam; menerapkan hasil refleksi praktik bermusik; menyajikan ansambel musik remaja termasuk karya mancanegara; menciptakan dan mendokumentasikan karya kolaboratif dengan manajemen pementasan; serta menghayati kegiatan bermusik yang kolaboratif dan kompleks.'
    }
  },
  'seni rupa': {
    'MI': {
        'A': 'Murid mengenali dan menyebutkan unsur rupa pada benda dan karya seni di sekitar; merefleksikan dan mengapresiasi karya sendiri; mengenali serta mencoba alat dan bahan; membuat karya seni rupa berdasarkan pengalaman dan pengamatan lingkungan; serta menghasilkan karya yang berdampak pada perasaan diri.',
        'B': 'Murid mengidentifikasi unsur rupa dan prinsip desain; merefleksikan dan mengapresiasi karya diri sendiri dan teman dengan kosa kata seni rupa yang sesuai; mencoba alat, bahan, dan prosedur penggunaannya; membuat karya berdasarkan pengamatan lingkungan; serta menghasilkan karya yang mewakili perasaan atau harapan.',
        'C': 'Murid menjelaskan unsur rupa dan prinsip desain; merefleksikan dan mengapresiasi karya menggunakan istilah seni rupa yang tepat; mencoba variasi teknik alat dan bahan; membuat karya melalui pengembangan imajinasi; serta menghasilkan karya yang mewakili minatnya.'
    },
    'MTs': {
        'D': 'Murid menganalisis unsur rupa dan prinsip desain; membandingkan fungsi dan unsur karya seni rupa; mengaplikasikan variasi teknik serta mengeksplorasi alat dan bahan sekitar; membuat karya dengan mempertimbangkan fungsi, gaya, atau teknik; serta menghasilkan karya untuk mengekspresikan pengalaman dan perasaan sehari-hari.'
    },
    'MA': {
        'E': 'Murid mengeksplorasi unsur rupa dan prinsip desain; merefleksikan penggunaan unsur, prinsip, dan fungsi karya; mengeksplorasi potensi alat dan bahan serta menghubungkan seni rupa dengan bidang ilmu lain; menciptakan karya dengan gaya atau teknik pilihan; serta menghasilkan karya yang mengajak dan berdampak bagi orang lain.',
        'F': 'Murid mengeksplorasi dan menganalisis unsur rupa serta prinsip desain; merefleksikan karya dengan kosa kata seni rupa yang tepat; menganalisis keterhubungan seni rupa dengan bidang lain; menciptakan karya dengan teknik yang dikuasai; serta menghasilkan karya yang merespons pengalaman, perasaan, minat, dan isu sosial.'
    }
  },
  'seni tari': {
    'MI': {
        'A': 'Murid mengenal tari sebagai media komunikasi; mengeksplorasi unsur utama tari (gerak, ruang, waktu, tenaga); merefleksikan pencapaian diri; meragakan gerak dengan etika penampil dan penonton; menciptakan gerak sederhana yang indah; serta menunjukkan antusiasme dalam pembelajaran tari.',
        'B': 'Murid mengamati bentuk penyajian tari; mengeksplorasi unsur utama tari (level dan arah hadap); merefleksikan pencapaian diri; bekerja kooperatif dalam meragakan tari; mengembangkan gerak tari; serta menunjukkan usaha dan rasa ingin tahu dalam pembelajaran tari.',
        'C': 'Murid mengamati tari tradisi; mengidentifikasi unsur pendukung tari; meragakan rangkaian gerak secara berkelompok; merangkai gerak tari berbasis tradisi atau kreasi; serta menanggapi peristiwa lingkungan melalui sajian tari.'
    },
    'MTs': {
        'D': 'Murid mengamati jenis, fungsi, dan nilai tari dalam konteks budaya; merefleksikan dan mengelompokkan karya tari; merancang konsep tari kreasi; menciptakan tari berdasarkan tradisi dengan desain lantai dan level; serta mengajak orang lain mencintai dan bangga terhadap tari tradisi.'
    },
    'MA': {
        'E': 'Murid menginterpretasi makna dan simbol tari tradisi atau kreasi; membandingkan dan mengapresiasi karya tari; merancang dan menata karya tari pertunjukan; serta aktualisasikan diri melalui pertunjukan tari.',
        'F': 'Murid mengelaborasi dan mengevaluasi tari tradisi atau kreasi; mengembangkan penciptaan tari dengan manajemen pertunjukan; mengomposisi tari terinspirasi dari berbagai pertunjukan; serta membangun karakter diri yang mampu memengaruhi orang lain dalam mengapresiasi tari.'
    }
  },
  'pjok': {
    'MI': {
        'A': 'Murid mempraktikkan keterampilan gerak fundamental dalam berbagai situasi; mengeksplorasi strategi dan konsep gerak; menaati peraturan dan bekerja sama untuk menumbuhkan fair play; berpartisipasi dalam aktivitas jasmani serta mengenali manfaatnya; dan mengenali gaya hidup aktif, makanan bergizi seimbang, serta situasi berisiko terhadap kesehatan.',
        'B': 'Murid menghaluskan keterampilan gerak fundamental dan menerapkannya dalam situasi baru; menyesuaikan strategi gerak; memecahkan masalah gerak secara sederhana; berpartisipasi aktif dan sportif dalam kelompok; mengenali faktor aktivitas jasmani yang menyenangkan; serta memahami risiko kesehatan dan penanganan cecera ringan.',
        'C': 'Murid menyesuaikan dan mentransfer keterampilan serta strategi gerak ke berbagai situasi; menguji efektivitas strategi gerak; menjalankan peran dalam kelompok untuk mendukung fair play dan partisipasi inklusif; menjelaskan manfaat aktivitas jasmani teratur; serta mengaitkan gaya hidup, risiko kesehatan, dan mempraktikkan penanganan cedera sedang.'
    },
    'MTs': {
        'D': 'Murid menerapkan dan mentransfer keterampilan serta strategi gerak secara efektif; membuktikan strategi gerak paling tepat dalam berbagai situasi; menunjukkan kepemimpinan, kolaborasi, dan pengambilan keputusan kelompok; menjelaskan respons tubuh terhadap intensitas aktivitas jasmani; serta menganalisis risiko kesehatan dan merancang pola hidup aktif sesuai prinsip pertolongan pertama.'
    },
    'MA': {
        'E': 'Murid menerapkan keterampilan gerak spesifik dalam situasi menantang; mengembangkan dan merefleksikan strategi gerak; mengevaluasi fair play dan perilaku etis dalam aktivitas jasmani; berpartisipasi dalam aktivitas kebugaran dan merancang strategi peningkatannya; serta mengevaluasi risiko kesehatan sesuai kebutuhan aktivitas jasmani.',
        'F': 'Murid mengevaluasi keterampilan dan strategi gerak untuk meningkatkan kinerja; mengevaluasi kepemimpinan, kolaborasi, dan pengambilan keputusan dalam aktivitas jasmani; menilai efektivitas partisipasi kebugaran terhadap kesehatan; serta mengadvokasi gaya hidup aktif dan sehat dan mempraktikkan tindakan penyelamatan hidup sesuai POS.'
    }
  },
  'kka (koding dan kecerdasan artifisial)': {
    'MI': {
        'C': 'Murid memahami permasalahan sederhana dalam kehidupan sehari-hari dan menerapkan pemecahan masalah secara sistematis melalui berpikir komputasional. Murid menuliskan instruksi logis, memahami konsep dasar dan dampak teknologi digital, menjaga keamanan data pribadi, serta memahami konsep dasar Kecerdasan Artifisial (KA), manfaat dan dampaknya.'
    },
    'MTs': {
        'D': 'Murid menerapkan berpikir komputasional dan pengelolaan data untuk menyelesaikan permasalahan sederhana. Murid memproduksi konten digital multimedia. Murid memahami cara kerja KA dan perbedaannya dengan manusia, memahami kualitas data, manfaat dan dampak KA, etika penggunaan KA termasuk isu privasi dan deep fake.'
    },
    'MA': {
        'E': 'Murid menerapkan berpikir komputasional untuk memecahkan permasalahan kompleks. Murid memproduksi sajian multimedia, menerapkan algoritma pemrograman, serta memahami konsep dasar basis data. Murid memahami pengenalan pola citra dan suara oleh KA, etika dan tanggung jawab hukum penggunaan KA, serta menerapkan prompt engineering dan design thinking.',
        'F': 'Murid menerapkan berpikir komputasional untuk memecahkan permasalahan kompleks dan melakukan prediksi di kehidupan masyarakat. Murid memproduksi konten digital tingkat lanjut, menerapkan pemrograman berorientasi objek, rekayasa perangkat lunak, basis data dan mahadata, serta memahami dampak KA terhadap ketenagakerjaan. Murid mengembangkan model KA sederhana (machine learning, NLP) secara etis.'
    }
  },
  'bahasa arab': {
    'MI': { 
        'A': 'Pada akhir fase A, murid dapat mengenal bunyi huruf hijaiyah dan kosakata sederhana tentang diri dan lingkungan.',
        'B': 'Pada akhir fase B, murid dapat memahami kosakata dan ungkapan sederhana serta membaca dan menulis kalimat pendek.',
        'C': 'Pada akhir fase C, murid dapat memahami teks sederhana dan berkomunikasi secara terbatas dalam bahasa Arab.'
    },
    'MTs': { 
        'D': 'Pada akhir fase D, murid dapat memahami teks lisan dan tulis sederhana serta berkomunikasi dalam konteks kehidupan sehari-hari.'
    },
    'MA': { 
        'E': 'Pada akhir fase E, murid dapat memahami dan menganalisis teks bahasa Arab tingkat menengah serta mengekspresikan ide secara lisan dan tulis.',
        'F': 'Pada akhir fase F, murid dapat memahami dan menganalisis teks bahasa Arab kompleks serta berkomunikasi sesuai konteks sosial dan akademik.'
    }
  },
  'sejarah kebudayaan islam (ski)': {
    'MI': { 
        'B': 'Pada akhir fase B, murid dapat menceritakan kehidupan Rasulullah SAW, peristiwa kerasulan, hijrah, dan Isra Mikraj serta mengambil ibrah dari peristiwa tersebut.',
        'C': 'Pada akhir fase C, murid dapat memahami dakwah Rasulullah SAW di Madinah dan keteladanan para sahabat.'
    },
    'MTs': { 
        'D': 'Pada akhir fase D, murid dapat memahami sejarah Nabi, Khulafaur Rasyidin, dan perkembangan Islam serta meneladani nilai-nilai kepemimpinan dan perjuangan.'
    },
    'MA': { 
        'E': 'Pada akhir fase E, murid dapat menganalisis sejarah Rasulullah SAW, Khulafaur Rasyidin, serta perkembangan peradaban Islam klasik.',
        'F': 'Pada akhir fase F, murid dapat menganalisis perkembangan peradaban Islam dunia dan mengambil ibrah bagi kehidupan masa kini dan masa depan.'
    }
  },
  'fikih': {
    'MI': { 
        'A': 'Pada akhir fase A, murid dapat mengenal tata cara bersuci, salat, dan adab ibadah sehari-hari.',
        'B': 'Pada akhir fase B, murid dapat memahami dan mempraktikkan ibadah wajib serta adab muamalah sederhana.',
        'C': 'Pada akhir fase C, murid dapat memahami ketentuan fikih ibadah dan muamalah serta menerapkannya secara bertanggung jawab.'
    },
    'MTs': { 
        'D': 'Pada akhir fase D, murid dapat memahami fikih ibadah dan muamalah serta mengaitkannya dengan praktik kehidupan sehari-hari di masyarakat.'
    },
    'MA': { 
        'E': 'Pada akhir fase E, murid dapat menganalisis dalil dan ketentuan fikih ibadah (salat, zakat, puasa, haji) serta fenomena sosial keagamaan.',
        'F': 'Pada akhir fase F, murid dapat menganalisis fikih muamalah, transaksi modern, dan prinsip keadilan dalam kehidupan bermasyarakat.'
    }
  },
  'akidah akhlak': {
    'MI': { 
        'A': 'Pada akhir fase A, murid dapat mengenal Allah SWT, rukun iman, dan membiasakan akhlak terpuji kepada Allah, diri sendiri, dan sesama.',
        'B': 'Pada akhir fase B, murid dapat memahami sifat-sifat Allah, meneladani akhlak Rasulullah SAW, serta menunjukkan sikap jujur, disiplin, dan santun.',
        'C': 'Pada akhir fase C, murid dapat memahami konsep dasar akidah Islam dan membiasakan akhlak mulia dalam kehidupan sehari-hari.'
    },
    'MTs': { 
        'D': 'Pada akhir fase D, murid dapat memahami prinsip akidah Islam dan akhlak terpuji, serta menunjukkan sikap moderat, tanggung jawab, dan toleransi dalam kehidupan sosial.'
    },
    'MA': { 
        'E': 'Pada akhir fase E, murid dapat menganalisis prinsip akidah Islam dan aliran pemikiran kalam serta merefleksikannya dalam kehidupan beragama.',
        'F': 'Pada akhir fase F, murid dapat mengevaluasi konsep akidah dan akhlak Islam serta menerapkannya dalam kehidupan bermasyarakat dan berbangsa.'
    }
  },
  'alquran hadis': {
    'MI': { 
        'A': 'Pada akhir fase A, murid dapat mengenal huruf hijaiyah, membaca dan menghafal surah pendek, memahami hadis tentang cinta Allah dan Rasul-Nya, serta membiasakan perilaku religius sederhana.',
        'B': 'Pada akhir fase B, murid dapat membaca Al-Qur’an dengan tartil dasar, memahami makna surah dan hadis tentang ibadah dan akhlak, serta menerapkannya dalam kehidupan sehari-hari.',
        'C': 'Pada akhir fase C, murid dapat memahami kandungan ayat dan hadis tentang keimanan, ibadah, dan kepedulian sosial serta meneladani nilai-nilainya.'
    },
    'MTs': { 
        'D': 'Pada akhir fase D, murid dapat memahami dan menganalisis kandungan Al-Qur’an dan Hadis tentang akidah, ibadah, dan akhlak, serta mengaitkannya dengan fenomena kehidupan remaja.'
    },
    'MA': { 
        'E': 'Pada akhir fase E, murid dapat menganalisis konsep Al-Qur’an dan Hadis, fungsi hadis terhadap Al-Qur’an, serta merefleksikan nilai-nilainya secara kontekstual.',
        'F': 'Pada akhir fase F, murid dapat merefleksi dan menganalisis ayat dan hadis tentang tanggung jawab manusia sebagai khalifah, kehidupan sosial, dakwah, dan pelestarian lingkungan.'
    }
  }
};

export const KELAS_FASE_MAP: Record<string, string> = {
  'I': 'A', 'II': 'A', 'III': 'B', 'IV': 'B', 'V': 'C', 'VI': 'C',
  'VII': 'D', 'VIII': 'D', 'IX': 'D', 'X': 'E', 'XI': 'E', 'XII': 'F'
};

export const DPL_OPTIONS = [
  "Keimanan dan Ketaqwaan terhadap Tuhan Yang Maha Esa",
  "Kewargaan",
  "Penalaran Kritis",
  "Kreativitas",
  "Kolaborasi",
  "Kemandirian",
  "Kesehatan",
  "Komunikasi"
];

export const PANCA_CINTA_OPTIONS = [
  "Cinta kepada Allah dan Rasul-Nya", "Cinta Ilmu", "Cinta Lingkungan", "Cinta Diri Sendiri dan Sesama", "Cinta Tanah Air"
];

export const RUBRIK_DATABASE: Record<string, { instrumen: string; rubrik: RubrikItem[] }> = {
  'Diskusi Kelompok': {
    instrumen: 'Lembar Observasi Aktivitas Diskusi',
    rubrik: [
      { kriteria: 'Partisipasi', sangatBaik: 'Sangat aktif menyampaikan pendapat', baik: 'Aktif menyampaikan pendapat', sedang: 'Cukup aktif', kurang: 'Pasif' },
      { kriteria: 'Kerjasama', sangatBaik: 'Sangat menghargai pendapat teman', baik: 'Menghargai pendapat teman', sedang: 'Kurang menghargai', kurang: 'Tidak bekerjasama' }
    ]
  },
  'Presentasi Hasil': {
    instrumen: 'Rubrik Penilaian Presentasi',
    rubrik: [
      { kriteria: 'Penguasaan Materi', sangatBaik: 'Sangat menguasai materi', baik: 'Menguasai materi', sedang: 'Cukup menguasai', kurang: 'Kurang menguasai' }
    ]
  },
  'Observasi (Penyelidikan)': {
    instrumen: 'Lembar Observasi Penyelidikan Murid',
    rubrik: [
      { kriteria: 'Ketelitian', sangatBaik: 'Sangat teliti dalam mengamati detail', baik: 'Teliti mengamati detail', sedang: 'Cukup teliti', kurang: 'Tidak teliti' },
      { kriteria: 'Objektivitas', sangatBaik: 'Data sangat sesuai fakta lapangan', baik: 'Data sesuai fakta', sedang: 'Ada data asumsi', kurang: 'Data tidak valid' }
    ]
  },
  'Merancang Model / Proyek': {
    instrumen: 'Rubrik Penilaian Proyek KBC',
    rubrik: [
      { kriteria: 'Kreativitas', sangatBaik: 'Desain sangat orisinal dan estetis', baik: 'Desain orisinal', sedang: 'Desain standar', kurang: 'Meniru total' },
      { kriteria: 'Fungsionalitas', sangatBaik: 'Alat/Proyek bekerja sempurna', baik: 'Bekerja dengan baik', sedang: 'Berfungsi sebagian', kurang: 'Tidak berfungsi' }
    ]
  }
};
