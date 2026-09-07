export type AuthorityLevel = "pusat" | "daerah" | "bersama";

export interface GovernmentAffair {
  id: string;
  name: string;
  type: "absolut" | "konkuren";
  level: AuthorityLevel;
  icon: string;
  description: string;
}

export const affairsData: GovernmentAffair[] = [
  {
    id: "pertahanan",
    name: "Pertahanan",
    type: "absolut",
    level: "pusat",
    icon: "ShieldAlert",
    description: "Urusan mendirikan angkatan bersenjata, menyatakan damai/perang, sepenuhnya kewenangan Pusat."
  },
  {
    id: "agama",
    name: "Agama",
    type: "absolut",
    level: "pusat",
    icon: "HeartHandshake",
    description: "Pengakuan agama resmi, penetapan hari libur nasional keagamaan dikelola oleh Pusat."
  },
  {
    id: "luar-negeri",
    name: "Politik Luar Negeri",
    type: "absolut",
    level: "pusat",
    icon: "Globe",
    description: "Pengangkatan duta besar, perjanjian internasional, semuanya oleh Pemerintah Pusat."
  },
  {
    id: "pendidikan",
    name: "Pendidikan",
    type: "konkuren",
    level: "bersama",
    icon: "BookOpen",
    description: "Pusat mengatur standar (Kurikulum), Provinsi mengurus SMA/SMK, Kabupaten/Kota mengurus SD/SMP."
  },
  {
    id: "kesehatan",
    name: "Kesehatan",
    type: "konkuren",
    level: "bersama",
    icon: "Stethoscope",
    description: "Pusat mengurus RS Nasional/Standar Obat, Daerah mengurus Puskesmas dan RSUD."
  },
  {
    id: "tata-ruang",
    name: "Tata Ruang & PU",
    type: "konkuren",
    level: "daerah",
    icon: "Building2",
    description: "Pembangunan taman kota, izin mendirikan bangunan (IMB) sangat diserahkan ke kewenangan Daerah."
  }
];
