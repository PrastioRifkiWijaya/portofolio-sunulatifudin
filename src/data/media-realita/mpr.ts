export interface MPRAgenda {
  id: string;
  title: string;
  quorum: string;
  decisionRule: string;
  description: string;
}

export const mprAgendas: MPRAgenda[] = [
  {
    id: "amandemen",
    title: "Mengubah dan Menetapkan UUD",
    quorum: "Dihadiri minimal 2/3 dari jumlah anggota MPR.",
    decisionRule: "Disetujui minimal 50% + 1 dari seluruh anggota MPR.",
    description: "Kewenangan tertinggi MPR untuk merubah pasal-pasal dalam Undang-Undang Dasar Negara Republik Indonesia Tahun 1945."
  },
  {
    id: "pelantikan",
    title: "Melantik Presiden & Wapres",
    quorum: "Dihadiri minimal 50% + 1 dari jumlah anggota MPR.",
    decisionRule: "Sidang Paripurna (Tanpa Voting).",
    description: "MPR melantik Presiden dan Wakil Presiden hasil Pemilu, sesuai Keputusan KPU."
  },
  {
    id: "pemberhentian",
    title: "Memberhentikan Presiden (Impeachment)",
    quorum: "Dihadiri minimal 3/4 dari jumlah anggota MPR.",
    decisionRule: "Disetujui minimal 2/3 dari jumlah anggota yang hadir.",
    description: "Berdasarkan putusan Mahkamah Konstitusi bahwa Presiden/Wapres terbukti melakukan pelanggaran hukum atau tidak lagi memenuhi syarat."
  }
];

export const mprMembers = {
  total: 711,
  dpr: 580,
  dpd: 131
};
