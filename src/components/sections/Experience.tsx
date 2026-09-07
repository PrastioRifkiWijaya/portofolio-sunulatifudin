import { Section } from "../Section";

const experiences = [
  {
    title: "Magang Nasional Kemnaker RI — Lapas Kelas IIA Gladakan Nusakambangan",
    date: "Nov 2025",
    desc: "Program Magang Nasional Kementerian Ketenagakerjaan Republik Indonesia di Lembaga Pemasyarakatan Kelas IIA Gladakan Nusakambangan yang memberikan pengalaman kerja praktis bagi Fresh Graduate dalam mendukung kegiatan dan pelaksanaan operasional pemasyarakatan.",
  },
  {
    title: "Magang Biro Publikasi dan Administrasi Prodi PPKn UMP",
    date: "Mar 2024 — Jan 2025",
    desc: "Program pengalaman kerja praktis bagi mahasiswa di lembaga-lembaga Prodi, Fakultas, atau Universitas yang berfokus pada tugas publikasi (pemberitaan, komunikasi) dan administrasi (tata kelola, pelayanan).",
  },
  {
    title: "Kampus Mengajar Angkatan 5",
    date: "Feb 2023 — Jul 2023",
    desc: "Program kebijakan Merdeka Belajar-Kampus Merdeka (MBKM) yang memberikan kesempatan kepada mahasiswa untuk mengajar dan membantu kegiatan pembelajaran di jenjang SD dan SMP selama satu semester.",
  },
];

export default function Experience() {
  return (
    <Section id="experience" className="border-b border-primary pb-16 pt-32 dark:border-gold">
      {/* Section Heading */}
      <div className="mb-14 max-w-2xl">
        <span className="font-desc text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-gold">
          Professional Journey
        </span>

        <h2 className="mt-2 font-title text-3xl font-bold tracking-tight text-secondary dark:text-white sm:text-4xl">
          Work Experience
        </h2>

        <div className="mt-5 h-1 w-10 rounded-full bg-primary dark:bg-gold" />
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1.75 top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-700" />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <article key={index} className="relative pl-10 sm:pl-14">
              {/* Timeline Point */}
              <span className="absolute left-0 top-1.5 flex h-3.75 w-3.75 items-center justify-center rounded-full border-[3px] border-gray-50 bg-primary dark:border-secondary dark:bg-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-secondary" />
              </span>

              <div className="grid gap-3 sm:grid-cols-[150px_1fr] sm:gap-8">
                {/* Date */}
                <div className="pt-1">
                  <span className="font-desc text-sm font-medium text-primary dark:text-gold">
                    {exp.date}
                  </span>
                </div>

                {/* Experience */}
                <div className="max-w-3xl">
                  <h3 className="font-title text-xl font-semibold leading-snug text-secondary dark:text-white sm:text-2xl">
                    {exp.title}
                  </h3>

                  <p className="mt-3 font-desc text-[15px] leading-7 text-gray-600 dark:text-gray-300 text-justify">
                    {exp.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
