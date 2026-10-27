
import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
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
          dihapus, atau alamatnya tidak sesuai.
        </p>

        {/* Divider */}
        <div className="my-9 h-px w-16 bg-slate-300 dark:bg-slate-700" />

        {/* Action */}
        <Link
          href="/ppkn"
          className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#172b4d] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#243e68] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5479b8] focus-visible:ring-offset-4 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-200 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          Kembali ke Modul PPKn
        </Link>

        {/* Footer */}
        <p className="mt-16 text-xs tracking-wide text-slate-400 dark:text-slate-500">
          PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN
        </p>
      </div>
    </Section>
  );
}
