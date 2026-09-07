import { RealitaModule } from "@/types/media-realita";

export const realitaModules: RealitaModule[] = [
  {
    id: "struktur-negara",
    slug: "struktur-negara",
    title: "Struktur Ketatanegaraan Indonesia",
    description: "Visualisasi interaktif hubungan lembaga-lembaga negara (Legislatif, Eksekutif, Yudikatif, dll) berdasarkan UUD NRI Tahun 1945.",
    iconName: "Landmark",
    status: "active",
    href: "/media/realita/struktur-negara",
    category: "Konstitusi"
  },
  {
    id: "alur-uu",
    slug: "alur-uu",
    title: "Alur Pembentukan Undang-Undang",
    description: "Simulasi interaktif langkah demi langkah proses pembentukan Rancangan Undang-Undang hingga disahkan menjadi Undang-Undang.",
    iconName: "GitCommit",
    status: "active",
    href: "/media/realita/alur-uu",
    category: "Legislasi"
  },
  {
    id: "simulasi-pemilu",
    slug: "simulasi-pemilu",
    title: "Simulasi Pemilu",
    description: "Modul interaktif untuk memahami proses pemilihan umum dari pendaftaran pemilih hingga penghitungan suara secara langsung.",
    iconName: "Vote",
    status: "active",
    href: "/media/realita/simulasi-pemilu",
    category: "Demokrasi"
  },
  {
    id: "pemilihan-presiden",
    slug: "pemilihan-presiden",
    title: "Proses Pemilihan Presiden",
    description: "Pelajari secara mendalam mekanisme pencalonan, kampanye, hingga pelantikan Presiden dan Wakil Presiden.",
    iconName: "UserCheck",
    status: "active",
    href: "/media/realita/pemilihan-presiden",
    category: "Demokrasi"
  },
  {
    id: "sidang-mpr",
    slug: "sidang-mpr",
    title: "Sidang MPR",
    description: "Simulasi tata tertib dan dinamika persidangan Majelis Permusyawaratan Rakyat, termasuk proses amandemen konstitusi.",
    iconName: "Users",
    status: "active",
    href: "/media/realita/sidang-mpr",
    category: "Ketatanegaraan"
  },
  {
    id: "pusat-daerah",
    slug: "pusat-daerah",
    title: "Hubungan Pemerintah Pusat–Daerah",
    description: "Visualisasi desentralisasi, otonomi daerah, dan pembagian kewenangan antara pemerintah pusat dan pemerintah daerah.",
    iconName: "Map",
    status: "active",
    href: "/media/realita/pusat-daerah",
    category: "Pemerintahan"
  },
  {
    id: "hak-kewajiban-warga",
    slug: "hak-kewajiban-warga",
    title: "Studi Kasus Hak & Kewajiban Warga Negara",
    description: "Analisis interaktif terhadap kasus-kasus pelanggaran hak dan pengingkaran kewajiban warga negara di kehidupan nyata.",
    iconName: "Scale",
    status: "active",
    href: "/media/realita/hak-kewajiban-warga",
    category: "Warga Negara"
  }
];
