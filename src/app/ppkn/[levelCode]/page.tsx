import { Section } from "@/components/Section";
import Link from "next/link";
import { PPKnService } from "@/services/ppkn.service";
import { notFound } from "next/navigation";
import { ChevronRight, GraduationCap } from "lucide-react";

interface Props {
  params: Promise<{
    levelCode: string;
  }>;
}

export default async function LevelPage({ params }: Props) {
  const { levelCode } = await params;
  const level = await PPKnService.getLevelByCode(levelCode);
  
  if (!level) {
    notFound();
  }

  const grades = await PPKnService.getActiveGrades(level.id);

  return (
    <Section className="min-h-[80vh] py-16 md:py-24">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm font-desc text-gray-500 dark:text-gray-400 space-x-2">
          <Link href="/ppkn" className="hover:text-primary dark:hover:text-gold transition-colors">PPKn</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-secondary dark:text-white font-medium">{level.code}</span>
        </div>

        <div className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-8">
          <h1 className="font-title text-3xl font-bold text-secondary dark:text-white md:text-4xl">
            PPKn {level.code}
          </h1>
          <p className="font-desc text-gray-600 dark:text-gray-400">
            Pilih kelas untuk melihat topik pembelajaran yang tersedia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
          {grades && grades.length > 0 ? (
            grades.map((grade) => (
              <Link 
                key={grade.id} 
                href={`/ppkn/${levelCode.toLowerCase()}/${grade.code.toLowerCase()}`}
                className="group flex items-center justify-between p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-[#0d1b38] hover:border-primary dark:hover:border-gold transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 dark:bg-gold/10 p-3 rounded-lg text-primary dark:text-gold group-hover:scale-110 transition-transform">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-desc font-bold text-lg text-secondary dark:text-white">
                      {grade.name}
                    </h2>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary dark:group-hover:text-gold group-hover:translate-x-1 transition-transform" />
              </Link>
            ))
          ) : (
             <div className="col-span-full py-12 text-center text-gray-500 font-desc border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
               Belum ada kelas yang tersedia untuk jenjang ini.
             </div>
          )}
        </div>
      </div>
    </Section>
  );
}
