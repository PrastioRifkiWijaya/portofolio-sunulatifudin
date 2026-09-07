import { Section } from "@/components/Section";
import Link from "next/link";
import { PPKnService } from "@/services/ppkn.service";
import { notFound } from "next/navigation";
import { ChevronRight, LayoutList } from "lucide-react";

interface Props {
  params: Promise<{
    levelCode: string;
    gradeCode: string;
  }>;
}

export default async function GradePage({ params }: Props) {
  const { levelCode, gradeCode } = await params;
  
  const level = await PPKnService.getLevelByCode(levelCode);
  const grade = await PPKnService.getGradeByCode(gradeCode, level?.id || "");
  
  // Validate hierarchy
  if (!level || !grade || grade.level_id !== level.id) {
    notFound();
  }

  const topics = await PPKnService.getActiveTopics(grade.id);

  return (
    <Section className="min-h-[80vh] py-16 md:py-24">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center text-sm font-desc text-gray-500 dark:text-gray-400 gap-2">
          <Link href="/ppkn" className="hover:text-primary dark:hover:text-gold transition-colors">PPKn</Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <Link href={`/ppkn/${levelCode.toLowerCase()}`} className="hover:text-primary dark:hover:text-gold transition-colors uppercase">{level.code}</Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <span className="text-secondary dark:text-white font-medium">{grade.name}</span>
        </div>

        <div className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-8">
          <h1 className="font-title text-3xl font-bold text-secondary dark:text-white md:text-4xl tracking-wider">
            PPKn {level.code} - {grade.name}
          </h1>
          <p className="font-desc text-gray-600 dark:text-gray-400">
            Pilih topik pembelajaran yang ingin Anda pelajari.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {topics && topics.length > 0 ? (
            topics.map((topic) => (
              <Link 
                key={topic.id} 
                href={`/ppkn/${levelCode.toLowerCase()}/${grade.code.toLowerCase()}/${topic.slug}`}
                className="group flex flex-col p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-[#0d1b38] hover:border-primary dark:hover:border-gold transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 dark:bg-gold/10 p-2.5 rounded-lg text-primary dark:text-gold">
                    <LayoutList className="h-5 w-5" />
                  </div>
                  <h2 className="font-desc font-bold text-lg text-secondary dark:text-white group-hover:text-primary dark:group-hover:text-gold transition-colors">
                    {topic.name}
                  </h2>
                </div>
                <p className="font-desc text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
                  {topic.description || "Tidak ada deskripsi."}
                </p>
                <div className="flex items-center text-primary dark:text-gold font-medium text-sm mt-auto">
                  Mulai Belajar
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))
          ) : (
             <div className="col-span-full py-12 text-center text-gray-500 font-desc border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
               Belum ada topik yang tersedia untuk kelas ini.
             </div>
          )}
        </div>
      </div>
    </Section>
  );
}
