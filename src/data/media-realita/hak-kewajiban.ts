export type CaseType = "hak" | "kewajiban" | "pelanggaran";

export interface CitizenCase {
  id: string;
  scenario: string;
  type: CaseType;
  article: string;
  explanation: string;
  icon: string;
}

export const citizenCases: CitizenCase[] = [
  {
    id: "pajak",
    scenario: "Andi, seorang pengusaha muda yang sukses, secara rutin dan jujur melaporkan serta menyetorkan pajaknya setiap tahun.",
    type: "kewajiban",
    article: "Pasal 23A UUD 1945",
    explanation: "Membayar pajak adalah wujud nyata kewajiban warga negara untuk berpartisipasi dalam pembiayaan negara dan pembangunan nasional.",
    icon: "Receipt"
  },
  {
    id: "pendidikan",
    scenario: "Siti, seorang anak dari desa terpencil, mendapatkan beasiswa dari pemerintah daerah untuk meneruskan sekolah hingga jenjang SMA.",
    type: "hak",
    article: "Pasal 31 Ayat (1) UUD 1945",
    explanation: "Setiap warga negara berhak mendapat pendidikan. Pemerintah wajib membiayai pendidikan dasar.",
    icon: "GraduationCap"
  },
  {
    id: "pendapat",
    scenario: "Sekelompok mahasiswa melakukan unjuk rasa dengan tertib di depan gedung DPRD untuk menolak kebijakan pemerintah daerah yang merugikan rakyat.",
    type: "hak",
    article: "Pasal 28E Ayat (3) UUD 1945",
    explanation: "Setiap orang berhak atas kebebasan berserikat, berkumpul, dan mengeluarkan pendapat (sepanjang tidak anarkis).",
    icon: "Megaphone"
  },
  {
    id: "bela-negara",
    scenario: "Budi secara sukarela mendaftar menjadi relawan tim SAR untuk membantu korban bencana alam tanah longsor di daerahnya.",
    type: "kewajiban",
    article: "Pasal 27 Ayat (3) UUD 1945",
    explanation: "Bela negara tidak hanya memanggul senjata, tetapi juga ikut serta dalam menanggulangi bencana dan mengamankan lingkungan.",
    icon: "HeartPulse"
  },
  {
    id: "agama",
    scenario: "Warga desa X melarang kelompok agama minoritas untuk mendirikan rumah ibadah padahal perizinan mereka sudah lengkap.",
    type: "pelanggaran",
    article: "Pasal 29 Ayat (2) UUD 1945",
    explanation: "Ini adalah pengingkaran terhadap konstitusi. Negara menjamin kemerdekaan tiap-tiap penduduk untuk memeluk agamanya masing-masing dan untuk beribadat.",
    icon: "ShieldAlert"
  }
];
