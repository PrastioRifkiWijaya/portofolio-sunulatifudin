import { StateInstitution } from "@/types/media-realita";

export const stateInstitutions: StateInstitution[] = [
  {
    id: "mpr",
    name: "MPR",
    fullName: "Majelis Permusyawaratan Rakyat",
    category: "Legislatif",
    shortDescription: "Lembaga legislatif bikameral yang terdiri atas anggota DPR dan anggota DPD yang dipilih melalui pemilihan umum.",
    duties: [
      "Memasyarakatkan ketetapan MPR.",
      "Memasyarakatkan Pancasila, UUD 1945, NKRI, dan Bhinneka Tunggal Ika."
    ],
    authorities: [
      "Mengubah dan menetapkan Undang-Undang Dasar.",
      "Melantik Presiden dan/atau Wakil Presiden.",
      "Memberhentikan Presiden dan/atau Wakil Presiden dalam masa jabatannya menurut UUD."
    ],
    legalBasis: ["Pasal 2 dan Pasal 3 UUD NRI Tahun 1945"]
  },
  {
    id: "dpr",
    name: "DPR",
    fullName: "Dewan Perwakilan Rakyat",
    category: "Legislatif",
    shortDescription: "Lembaga perwakilan rakyat tingkat nasional yang memiliki fungsi legislasi, anggaran, dan pengawasan.",
    duties: [
      "Menyerap, menghimpun, menampung, dan menindaklanjuti aspirasi rakyat.",
      "Membahas dan menindaklanjuti hasil pemeriksaan atas pengelolaan dan tanggung jawab keuangan negara yang disampaikan oleh BPK."
    ],
    authorities: [
      "Membentuk Undang-Undang (Fungsi Legislasi).",
      "Membahas dan memberikan persetujuan Peraturan Pemerintah Pengganti Undang-Undang (Perppu).",
      "Membahas dan menyetujui RAPBN yang diajukan Presiden (Fungsi Anggaran).",
      "Melakukan pengawasan terhadap pelaksanaan UU dan APBN (Fungsi Pengawasan)."
    ],
    legalBasis: ["Pasal 20, 20A, 21, 22, 22B UUD NRI Tahun 1945"]
  },
  {
    id: "dpd",
    name: "DPD",
    fullName: "Dewan Perwakilan Daerah",
    category: "Legislatif",
    shortDescription: "Lembaga legislatif yang mewakili aspirasi daerah-daerah (provinsi) di Indonesia tingkat nasional.",
    duties: [
      "Menyampaikan hasil pengawasan atas pelaksanaan undang-undang tertentu kepada DPR."
    ],
    authorities: [
      "Mengajukan rancangan undang-undang yang berkaitan dengan otonomi daerah, hubungan pusat dan daerah, pembentukan dan pemekaran serta penggabungan daerah kepada DPR.",
      "Ikut membahas RUU yang berkaitan dengan otonomi daerah.",
      "Memberikan pertimbangan kepada DPR atas RUU APBN dan RUU yang berkaitan dengan pajak, pendidikan, dan agama."
    ],
    legalBasis: ["Pasal 22C dan 22D UUD NRI Tahun 1945"]
  },
  {
    id: "presiden",
    name: "Presiden",
    fullName: "Presiden Republik Indonesia",
    category: "Eksekutif",
    shortDescription: "Kepala negara sekaligus kepala pemerintahan di Indonesia yang memegang kekuasaan eksekutif.",
    duties: [
      "Menyelenggarakan pemerintahan negara.",
      "Melaksanakan undang-undang."
    ],
    authorities: [
      "Memegang kekuasaan pemerintahan menurut UUD.",
      "Mengajukan Rancangan Undang-Undang (RUU) kepada DPR.",
      "Menetapkan Peraturan Pemerintah (PP) untuk menjalankan UU.",
      "Memegang kekuasaan tertinggi atas Angkatan Darat, Laut, dan Udara.",
      "Menyatakan perang, membuat perdamaian dan perjanjian dengan negara lain (dengan persetujuan DPR)."
    ],
    legalBasis: ["Pasal 4 s.d. Pasal 16 UUD NRI Tahun 1945"]
  },
  {
    id: "ma",
    name: "MA",
    fullName: "Mahkamah Agung",
    category: "Yudikatif",
    shortDescription: "Pengadilan negara tertinggi dari semua lingkungan peradilan yang dalam melaksanakan tugasnya terlepas dari pengaruh pemerintah.",
    duties: [
      "Melakukan pengawasan tertinggi terhadap penyelenggaraan peradilan di semua lingkungan peradilan."
    ],
    authorities: [
      "Mengadili pada tingkat kasasi.",
      "Menguji peraturan perundang-undangan di bawah undang-undang terhadap undang-undang.",
      "Wewenang lain yang diberikan oleh undang-undang."
    ],
    legalBasis: ["Pasal 24 dan Pasal 24A UUD NRI Tahun 1945"]
  },
  {
    id: "mk",
    name: "MK",
    fullName: "Mahkamah Konstitusi",
    category: "Yudikatif",
    shortDescription: "Lembaga peradilan konstitusi yang independen untuk menjaga konstitusi agar dilaksanakan secara bertanggung jawab.",
    duties: [
      "Menjaga kemurnian Konstitusi (UUD 1945)."
    ],
    authorities: [
      "Menguji undang-undang terhadap UUD 1945 (Judicial Review).",
      "Memutus sengketa kewenangan lembaga negara yang kewenangannya diberikan oleh UUD.",
      "Memutus pembubaran partai politik.",
      "Memutus perselisihan tentang hasil pemilihan umum.",
      "Memberikan putusan atas pendapat DPR mengenai dugaan pelanggaran hukum oleh Presiden/Wapres (Impeachment)."
    ],
    legalBasis: ["Pasal 24C UUD NRI Tahun 1945"]
  },
  {
    id: "ky",
    name: "KY",
    fullName: "Komisi Yudisial",
    category: "Yudikatif",
    shortDescription: "Lembaga mandiri yang dibentuk untuk mengawasi perilaku hakim dan mengusulkan pengangkatan hakim agung.",
    duties: [
      "Menjaga dan menegakkan kehormatan, keluhuran martabat, serta perilaku hakim."
    ],
    authorities: [
      "Mengusulkan pengangkatan hakim agung kepada DPR.",
      "Mempunyai wewenang lain dalam rangka menjaga dan menegakkan kehormatan, keluhuran martabat, serta perilaku hakim (misal: pemberian sanksi administratif)."
    ],
    legalBasis: ["Pasal 24B UUD NRI Tahun 1945"]
  },
  {
    id: "bpk",
    name: "BPK",
    fullName: "Badan Pemeriksa Keuangan",
    category: "Eksaminatif",
    shortDescription: "Lembaga negara yang bebas dan mandiri dalam memeriksa pengelolaan dan tanggung jawab keuangan negara.",
    duties: [
      "Menyerahkan hasil pemeriksaan keuangan negara kepada DPR, DPD, dan DPRD."
    ],
    authorities: [
      "Memeriksa pengelolaan dan tanggung jawab tentang keuangan negara.",
      "Meminta keterangan/dokumen yang wajib diberikan oleh setiap orang, unit organisasi Pemerintah Pusat, Pemerintah Daerah, dan lembaga negara lainnya."
    ],
    legalBasis: ["Pasal 23E, 23F, 23G UUD NRI Tahun 1945"]
  }
];
