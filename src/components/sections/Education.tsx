import { Section } from "../Section";

const educations = [
  { school: "PPG Prajabatan Pascasarjana UPGRIS", year: "2026" },
  { school: "S1 Universitas Muhammadiyah Purwokerto", year: "2021 — 2025" },
  { school: "SMAN 1 Sumpiuh", year: "2018 — 2021" },
  { school: "SMPN 1 Nusawungu", year: "2015 — 2018" },
  { school: "SDN 1 Klumprit", year: "2009 — 2015" },
  { school: "TK Putra Pertiwi Klumprit", year: "2008 — 2009" },
];

const certifications = [
  {
    title: "PPG Prajabatan",
    date: "2026",
    desc: "Melaksanakan perkuliahan PPG Prajabatan.",
  },
  {
    title: "Bela Negara",
    date: "2026",
    desc: "Melaksanakan kegiatan Bela Negara.",
  },
  {
    title: "Pramuka KMD Penggalang",
    date: "2026",
    desc: "Melaksanakan pelatihan pembina Pramuka Penggalang.",
  },
  {
    title: "Publikasi Karya Ilmiah",
    date: "2025",
    desc: "Mempublikasikan artikel ilmiah ke dalam Jurnal Pendidikan Sultan Agung dengan akreditasi Sinta 4.",
  },
  {
    title: "Program Kreativitas Mahasiswa",
    date: "2024",
    desc: "Mengembangkan inovasi Milenial Healthblend Drink berbahan dasar alami.",
  },
  {
    title: "Intensive English",
    date: "2022",
    desc: "Melaksanakan program pengayaan bahasa Inggris.",
  },
];

export default function Education() {
  return (
    <Section
      id="education"
      className="border-b border-primary pb-16 pt-32 dark:border-gold bg-gray-100 dark:bg-secondary/20"
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Education */}
        <div>
          <div className="mb-10">
            <span className="font-desc text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-gold">
              Academic Background
            </span>

            <h2 className="mt-2 font-title text-3xl font-bold tracking-tight text-secondary dark:text-white sm:text-4xl">
              Education
            </h2>

            <div className="mt-5 h-1 w-10 rounded-full bg-primary dark:bg-gold" />
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-700" />

            <div className="space-y-8">
              {educations.map((edu, idx) => (
                <div
                  key={idx}
                  className="relative pl-8"
                >
                  <span className="absolute left-0 top-1.5 h-3.25 w-3.25 rounded-full border-[3px] border-gray-50 bg-primary dark:border-secondary dark:bg-gold" />

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="font-title text-lg font-semibold leading-snug text-secondary dark:text-white">
                      {edu.school}
                    </h3>

                    <span className="shrink-0 font-desc text-sm font-medium text-primary dark:text-gold">
                      {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="mb-10">
            <span className="font-desc text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-gold">
              Professional Development
            </span>

            <h2 className="mt-2 font-title text-3xl font-bold tracking-tight text-secondary dark:text-white sm:text-4xl">
              Certifications
            </h2>

            <div className="mt-5 h-1 w-10 rounded-full bg-primary dark:bg-gold" />
          </div>

          <div className="space-y-8">
            {certifications.map((cert, idx) => (
              <article
                key={idx}
                className="border-l border-gray-200 pl-6 dark:border-gray-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-title text-lg font-semibold leading-snug text-secondary dark:text-white">
                    {cert.title}
                  </h3>

                  <span className="shrink-0 font-desc text-sm font-medium text-primary dark:text-gold">
                    {cert.date}
                  </span>
                </div>

                <p className="mt-2 font-desc text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {cert.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
