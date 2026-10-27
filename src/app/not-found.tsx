import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";

export default function RootNotFound() {
  return (
    <Section className="flex min-h-[75vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="flex w-full max-w-2xl flex-col items-center">
        {/* Icon */}
        <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <FileQuestion
            size={30}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        {/* Error code */}
        <p className="mb-3 font-mono text-sm font-medium tracking-[0.25em] text-slate-500 dark:text-slate-400">
          ERROR 404
        </p>

        {/* Heading */}
        <h1 className="font-title text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
          Halaman tidak ditemukan.
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-md text-base leading-7 text-slate-600 dark:text-slate-400">
          Halaman yang Anda cari mungkin telah dipindahkan,
          dihapus, atau alamat URL yang Anda masukkan tidak sesuai.
        </p>

        {/* Divider */}
        <div className="my-9 h-px w-16 bg-slate-300 dark:bg-slate-700" />

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-md dark:bg-gold dark:text-[#0d1b38] dark:hover:bg-gold/90"
          >
            <Home size={16} aria-hidden="true" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/ppkn"
            className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/80 px-6 py-3 text-sm font-semibold text-secondary dark:text-white transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            <span>Modul Pembelajaran</span>
          </Link>
        </div>

        {/* Footer info */}
        <p className="mt-16 text-xs tracking-wide text-slate-400 dark:text-slate-500 uppercase font-medium">
          Portofolio Pembelajaran PPKn — Sunu Latifudin, S.Pd.
        </p>
      </div>
    </Section>
  );
}
