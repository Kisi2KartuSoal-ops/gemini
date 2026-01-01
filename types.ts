export type Jenjang = 'MI' | 'MTs' | 'MA' | '';
export type Fase = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | '';

export interface RubrikItem {
  kriteria: string;
  sangatBaik: string; // Skor 4
  baik: string;       // Skor 3
  sedang: string;     // Skor 2
  kurang: string;     // Skor 1
}

export interface RppFormData {
  jenjang: Jenjang;
  namaMadrasah: string;
  namaKepala: string;
  nipKepala: string;
  namaGuru: string;
  nipGuru: string;
  mataPelajaran: string;
  kelas: string;
  fase: Fase;
  semester: 'Ganjil' | 'Genap' | '';
  tahunPembelajaran: string;
  capaianPembelajaran: string;
  materi: string;
  materiKBC: string;
  alokasi: string;
  kriteriaPembelajaran: string;
  tujuanPembelajaran: string;
  pendekatan: string;
  model: string;
  mediaAlat: string;
  kota: string;
  tanggalPengesahan: string;
  bulanPengesahan: string;
  tahunPengesahan: string;
  jumlahPGKompleks: number;
  jumlahPGHOTS: number;
  jumlahBenarSalah: number;
  jumlahUraian: number;
  jumlahIsian: number;
  jumlahMenjodohkan: number;
  dpl: string[];
  pancaCinta: string[];
  prinsip: {
    berkesadaran: string;
    bermakna: string;
    menyenangkan: string;
  };
  kerangka: {
    praktikPedagogis: string;
    lingkungan: string;
    kemitraan: string;
    digital: string;
  };
  asesmenAwal: string;
  asesmenTengah: {
    jenisKegiatan: string;
    instrumen: string;
    rubrik: RubrikItem[];
  };
}

export interface BankSoalItem {
  tipe: 'kompleks' | 'hots' | 'benar_salah' | 'uraian' | 'isian' | 'menjodohkan';
  soal?: string;
  pernyataan?: string;
  opsi?: string[];
}

export interface DatabaseCP {
  [mapel: string]: {
    [jenjang: string]: {
      [fase: string]: string;
    };
  };
}