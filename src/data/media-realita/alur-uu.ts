import { LegislativeStep } from "@/types/media-realita";

export const legislativeSteps: LegislativeStep[] = [
  {
    id: "step-1-pengajuan",
    order: 1,
    title: "Tahap Persiapan & Pengajuan",
    description: "Rancangan Undang-Undang (RUU) dapat berasal dari DPR, Presiden, atau DPD (khusus materi otonomi daerah). RUU tersebut harus dilengkapi Naskah Akademik kecuali untuk RUU tertentu (seperti APBN).",
    actors: ["DPR", "Presiden", "DPD"],
    documentState: "Naskah Akademik & Draf RUU",
    legalBasis: ["Pasal 20 ayat (1), Pasal 21, Pasal 22D ayat (1) UUD 1945", "UU No. 12 Tahun 2011"]
  },
  {
    id: "step-2-pembahasan-tingkat-1",
    order: 2,
    title: "Pembahasan Tingkat I",
    description: "Pembahasan dilakukan dalam Rapat Komisi, Rapat Gabungan Komisi, Rapat Badan Legislasi, atau Rapat Panitia Khusus bersama dengan Menteri yang mewakili Presiden. Pada tahapan ini dilakukan dengar pendapat umum untuk menyerap aspirasi.",
    actors: ["DPR", "Menteri (Mewakili Presiden)", "DPD (Jika terkait Otonomi Daerah)"],
    documentState: "Draf RUU Hasil Pembahasan & Daftar Inventarisasi Masalah (DIM)",
    legalBasis: ["Peraturan Tata Tertib DPR"]
  },
  {
    id: "step-3-pembahasan-tingkat-2",
    order: 3,
    title: "Pembahasan Tingkat II (Pengambilan Keputusan)",
    description: "Pengambilan keputusan dalam Rapat Paripurna DPR. Pimpinan panitia/komisi melaporkan hasil Pembahasan Tingkat I, dilanjutkan pandangan fraksi-fraksi, dan pandangan akhir Presiden (diwakili Menteri).",
    actors: ["DPR", "Menteri (Mewakili Presiden)"],
    documentState: "Draf RUU yang Disetujui Bersama",
    legalBasis: ["Pasal 20 ayat (2) UUD 1945"]
  },
  {
    id: "step-4-pengesahan",
    order: 4,
    title: "Pengesahan oleh Presiden",
    description: "RUU yang telah disetujui bersama oleh DPR dan Presiden dikirimkan kepada Presiden untuk disahkan. Presiden mengesahkan RUU tersebut menjadi Undang-Undang dengan membubuhkan tanda tangan dalam waktu paling lambat 30 hari.",
    actors: ["Presiden"],
    documentState: "Undang-Undang (UU) yang Telah Ditandatangani",
    legalBasis: ["Pasal 20 ayat (4) UUD 1945"]
  },
  {
    id: "step-5-pengundangan",
    order: 5,
    title: "Pengundangan",
    description: "Agar setiap orang mengetahuinya, Undang-Undang diundangkan dalam Lembaran Negara Republik Indonesia. Setelah diundangkan, UU dinyatakan mulai berlaku dan mengikat secara hukum bagi seluruh warga negara.",
    actors: ["Pemerintah (Kementerian Hukum dan HAM)"],
    documentState: "UU Tercatat di Lembaran Negara",
    legalBasis: ["UU No. 12 Tahun 2011 (Pasal 72 & 73)"]
  }
];
