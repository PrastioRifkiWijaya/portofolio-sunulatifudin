export interface Party {
  id: string;
  name: string;
  logoColor: string;
  vision: string;
  leader: string;
}

export interface PemiluStep {
  id: string;
  title: string;
  description: string;
}

export const partiesData: Party[] = [
  {
    id: "partai-a",
    name: "Partai Keadilan Sosial",
    logoColor: "bg-orange-500",
    vision: "Mewujudkan pemerataan ekonomi dan keadilan sosial bagi seluruh rakyat.",
    leader: "Dr. Budi Santoso"
  },
  {
    id: "partai-b",
    name: "Partai Inovasi Bangsa",
    logoColor: "bg-blue-500",
    vision: "Mendorong kemajuan teknologi dan pendidikan untuk Indonesia emas.",
    leader: "Ir. Siti Aminah"
  },
  {
    id: "partai-c",
    name: "Partai Bumi Pertiwi",
    logoColor: "bg-green-500",
    vision: "Menjaga kelestarian lingkungan dan ketahanan pangan nasional.",
    leader: "H. Joko Susilo"
  }
];

export const pemiluSteps: PemiluStep[] = [
  {
    id: "pendaftaran",
    title: "Pemeriksaan Identitas",
    description: "Pemilih datang ke TPS dan menunjukkan e-KTP serta form pemberitahuan (C6) kepada petugas KPPS untuk diverifikasi."
  },
  {
    id: "pencoblosan",
    title: "Pencoblosan di Bilik Suara",
    description: "Pemilih menerima surat suara, masuk ke bilik suara yang tertutup, dan memberikan hak suaranya secara rahasia (Luber Jurdil)."
  },
  {
    id: "kotak-suara",
    title: "Memasukkan Surat Suara",
    description: "Pemilih melipat kembali surat suara dan memasukkannya ke dalam kotak suara yang tersegel."
  },
  {
    id: "tinta",
    title: "Pemberian Tinta",
    description: "Pemilih mencelupkan jari ke dalam tinta khusus sebagai bukti bahwa ia telah menggunakan hak pilihnya, mencegah pemungutan suara ganda."
  }
];
