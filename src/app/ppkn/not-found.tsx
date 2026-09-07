import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <Section className="min-h-[80vh] py-16 md:py-24 flex flex-col items-center justify-center text-center">
      <div className="bg-primary/10 dark:bg-gold/10 p-6 rounded-full text-primary dark:text-gold mb-6">
        <FileQuestion className="h-12 w-12" />
      </div>
      <h2 className="font-title text-3xl font-bold text-secondary dark:text-white mb-4">
        Halaman Tidak Ditemukan
      </h2>
      <p className="font-desc text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
        Maaf, materi atau kelas yang Anda cari tidak dapat ditemukan. Mungkin URL salah atau materi telah dipindahkan.
      </p>
      <Link 
        href="/ppkn" 
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary dark:bg-gold text-white dark:text-[#0d1b38] rounded-xl font-desc font-semibold hover:opacity-90 transition-opacity"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Modul PPKn
      </Link>
    </Section>
  );
}
