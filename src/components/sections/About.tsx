import { Section } from "../Section";

export default function About() {
  return (
    <Section id="about" className="border-b border-primary pb-16 pt-32 dark:border-gold bg-gray-100 dark:bg-secondary/20">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
        {/* Section Label */}
        <div>
          <span className="font-desc text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-gold">
            About Me
          </span>

          <h2 className="mt-2 font-title text-3xl font-bold tracking-tight text-secondary dark:text-white">
            Summary
          </h2>

          <div className="mt-5 h-1 w-10 rounded-full bg-primary dark:bg-gold" />
        </div>

        {/* Content */}
        <div className="max-w-4xl text-justify">
          <p className="font-desc text-lg leading-[1.9] text-gray-700 dark:text-gray-300">
            Berorientasi pada hasil, lulusan Sarjana Pendidikan Pancasila dan
            Kewarganegaraan dengan IPK 3,69 (cumlaude) yang memiliki komitmen
            kuat dalam membentuk karakter, menanamkan nilai-nilai moral, serta
            memperkuat kesadaran kebangsaan.
          </p>

          <p className="mt-5 font-desc text-lg leading-[1.9] text-gray-700 dark:text-gray-300">
            Memiliki pengalaman dalam pengelolaan program pembelajaran,
            pemecahan masalah, serta kolaborasi lintas bidang pendidikan.
            Terampil dalam merancang dan mengimplementasikan strategi inovatif
            guna meningkatkan kualitas kewarganegaraan, membangun partisipasi
            aktif, dan menumbuhkan sikap demokratis serta tanggung jawab sosial.
          </p>
        </div>
      </div>
    </Section>
  );
}
