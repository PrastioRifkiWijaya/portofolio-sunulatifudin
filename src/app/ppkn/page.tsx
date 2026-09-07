import { Section } from "@/components/Section";
import Link from "next/link";
import { PPKnService } from "@/services/ppkn.service";
import { ChevronRight } from "lucide-react";
import { FaBookOpenReader } from "react-icons/fa6";

export const dynamic = "force-dynamic";

export default async function PPKNPage() {
  const levels = await PPKnService.getActiveLevels();

  return (
    <Section className="min-h-[80vh] py-16 md:py-24">
      <div className="max-w-full mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="font-title text-4xl font-bold text-secondary dark:text-white md:text-5xl">
            Materi Pembelajaran PPKn
          </h1>
          <p className="font-desc text-gray-600 dark:text-gray-400 max-w-full mx-auto">
            Pilih jenjang pendidikan untuk memulai belajar materi Pendidikan Pancasila dan Kewarganegaraan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {levels.map((level) => (
            <Link 
              key={level.id} 
              href={`/ppkn/${level.code.toLowerCase()}`}
              className="group flex flex-col items-center text-center p-8 border-2 border-gray-200 dark:border-gray-800 rounded-3xl bg-white dark:bg-[#0d1b38] hover:border-primary dark:hover:border-gold transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="h-16 w-16 bg-primary/10 dark:bg-gold/10 text-primary dark:text-gold rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaBookOpenReader className="h-8 w-8" />
              </div>
              <h2 className="font-title text-2xl font-bold text-secondary dark:text-white mb-3">
                {level.name}
              </h2>
              <p className="font-desc text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1">
                {level.description}
              </p>
              <div className="flex items-center text-primary dark:text-gold font-semibold text-sm">
                Lihat Materi
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
