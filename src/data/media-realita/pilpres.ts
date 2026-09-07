export interface PilpresPhase {
  id: string;
  order: number;
  title: string;
  description: string;
  requirements: string[];
}

export const pilpresPhases: PilpresPhase[] = [
  {
    id: "pencalonan",
    order: 1,
    title: "Pencalonan Paslon",
    description: "Partai politik atau gabungan partai politik mendaftarkan Pasangan Calon Presiden dan Wakil Presiden.",
    requirements: [
      "Warga Negara Indonesia (WNI) sejak lahir.",
      "Diusulkan oleh Parpol/Gabungan Parpol.",
      "Memenuhi Presidential Threshold (20% kursi DPR atau 25% suara sah nasional)."
    ]
  },
  {
    id: "kampanye",
    order: 2,
    title: "Masa Kampanye",
    description: "Pasangan calon menyampaikan visi, misi, dan program kerja kepada masyarakat melalui berbagai media dan debat publik.",
    requirements: [
      "Penyampaian visi dan misi.",
      "Debat capres dan cawapres.",
      "Larangan menggunakan fasilitas negara."
    ]
  },
  {
    id: "pemungutan",
    order: 3,
    title: "Pemungutan Suara",
    description: "Rakyat Indonesia memberikan suara secara langsung di TPS di seluruh Indonesia dan luar negeri.",
    requirements: [
      "Berasaskan LUBER JURDIL.",
      "Diikuti oleh WNI yang memiliki hak pilih."
    ]
  },
  {
    id: "penetapan",
    order: 4,
    title: "Penetapan Pemenang",
    description: "KPU menetapkan pasangan calon terpilih berdasarkan hasil rekapitulasi suara nasional.",
    requirements: [
      "Mendapat lebih dari 50% jumlah suara nasional.",
      "Tersebar di lebih dari setengah jumlah provinsi di Indonesia (syarat sebaran).",
      "Jika tidak ada yang memenuhi syarat, dilakukan putaran kedua."
    ]
  },
  {
    id: "pelantikan",
    order: 5,
    title: "Pelantikan",
    description: "Presiden dan Wakil Presiden terpilih dilantik dan mengucapkan sumpah/janji di hadapan Sidang MPR.",
    requirements: [
      "Sidang paripurna MPR.",
      "Pengucapan Sumpah atau Janji Presiden."
    ]
  }
];
