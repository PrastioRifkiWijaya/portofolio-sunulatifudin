import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PPKnService } from "@/services/ppkn.service";
import { FaBookOpenReader } from "react-icons/fa6";

export const dynamic = "force-dynamic";

export default async function KuisLevelPage() {
  const levels = await PPKnService.getActiveLevels();

  return (
    <Section className="min-h-[80vh] py-16 md:py-24">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <Link href="/media" className="inline-flex items-center text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-gold transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Media Pembelajaran
        </Link>

        <div className="text-center space-y-4">
          <h1 className="font-title text-4xl font-bold text-secondary dark:text-white md:text-5xl">
            Kuis Interaktif PPKn
          </h1>
          <p className="font-desc text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Pilih jenjang pendidikan Anda untuk memulai latihan soal-soal Pendidikan Pancasila dan Kewarganegaraan.
          </p>
        </div>

        {levels.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <h3 className="font-title text-xl font-semibold text-gray-600 dark:text-gray-400">
              Belum ada data jenjang pendidikan
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {levels.map((level) => (
              <Link 
                key={level.id} 
                href={`/media/game/kuis/${level.code.toLowerCase()}`}
                className="group flex flex-col items-center text-center p-8 border-2 border-gray-200 dark:border-gray-800 rounded-3xl bg-white dark:bg-[#0d1b38] hover:border-primary dark:hover:border-gold transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                <div className="h-16 w-16 bg-primary/10 dark:bg-gold/10 text-primary dark:text-gold rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FaBookOpenReader className="h-8 w-8" />
                </div>
                <h2 className="font-title text-2xl font-bold text-secondary dark:text-white mb-3">
                  {level.name}
                </h2>
                <div className="text-sm font-semibold text-primary dark:text-gold group-hover:underline">
                  Lihat Daftar Kelas &rarr;
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </Section>
  );
}
