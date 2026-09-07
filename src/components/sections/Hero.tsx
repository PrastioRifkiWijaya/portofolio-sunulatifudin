import { Section } from "../Section";
import { Mail, Phone, MapPin, ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <Section className="relative overflow-hidden border-b border-primary pb-10 pt-10 dark:border-gold md:pb-24 md:pt-20">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/6 blur-3xl dark:bg-gold/5" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-72 w-72 rounded-full bg-secondary/5 blur-3xl dark:bg-primary/4" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:gap-16">
        {/* Profile Image */}
        <div className="relative shrink-0">
          {/* Outer ring */}
          <div className="absolute -inset-2 rounded-full border border-primary/20 dark:border-gold/20" />

          {/* Image */}
          <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-xl shadow-secondary/10 dark:border-[#0d1b38] dark:bg-gray-800 md:h-64 md:w-64">
            <Image
              src="/fotoprofil.jpeg"
              alt="Sunu Latifudin"
              width={256}
              height={256}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          {/* Status indicator */}
          <div className="absolute bottom-2 right-3 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-primary dark:border-[#0d1b38] dark:bg-gold">
            <span className="h-2 w-2 rounded-full bg-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          {/* Small label */}
          <p className="mb-3 font-desc text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-gold">
            Pendidik & Pengembang Pembelajaran
          </p>

          <h1 className="font-title text-4xl font-bold tracking-tight text-secondary dark:text-primary md:text-5xl lg:text-6xl">
            Sunu Latifudin, S.Pd.
          </h1>

          <h2 className="mt-3 font-tagline text-xl leading-relaxed text-primary dark:text-gold md:text-2xl">
            Guru Pendidikan Pancasila dan Kewarganegaraan
          </h2>

          <p className="mt-5 max-w-2xl font-desc text-sm leading-7 text-gray-600 dark:text-gray-300 md:text-base">
            Berbagi pengetahuan, pengalaman, dan media pembelajaran untuk
            menciptakan proses belajar yang lebih bermakna dan relevan.
          </p>

          {/* Contact */}
          <div className="mt-7 flex flex-col gap-3 font-desc text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-start justify-center gap-3 md:justify-start">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary dark:text-gold" />
              <span>
                Rt 01/06 Desa Klumprit, Kec. Nusawungu,
                <br className="hidden sm:block" />
                Kab. Cilacap, Jawa Tengah
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 md:justify-start">
              <Phone className="h-4 w-4 shrink-0 text-primary dark:text-gold" />
              <span>085802747478</span>
            </div>

            <div className="flex items-center justify-center gap-3 md:justify-start">
              <Mail className="h-4 w-4 shrink-0 text-primary dark:text-gold" />
              <span>lagam7ng@gmail.com</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-8 hidden items-center gap-2 text-xs font-medium text-gray-400 md:flex">
            <ArrowDown className="h-4 w-4" />
            <span>Jelajahi portfolio</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
