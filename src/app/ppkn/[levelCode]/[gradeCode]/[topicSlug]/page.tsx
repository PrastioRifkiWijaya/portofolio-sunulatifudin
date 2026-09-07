import { Section } from "@/components/Section";
import Link from "next/link";
import { PPKnService } from "@/services/ppkn.service";
import { notFound } from "next/navigation";
import { ChevronRight, FileText, File, Video, ExternalLink, Clock } from "lucide-react";

interface Props {
  params: Promise<{
    levelCode: string;
    gradeCode: string;
    topicSlug: string;
  }>;
}

const getIconForContentType = (type: string) => {
  switch (type) {
    case "pdf":
    case "document":
      return <FileText className="h-5 w-5" />;
    case "video":
      return <Video className="h-5 w-5" />;
    default:
      return <File className="h-5 w-5" />;
  }
};

export default async function TopicPage({ params }: Props) {
  const { levelCode, gradeCode, topicSlug } = await params;
  
  const level = await PPKnService.getLevelByCode(levelCode);
  const grade = await PPKnService.getGradeByCode(gradeCode, level?.id || "");
  const topic = await PPKnService.getTopicBySlug(topicSlug, grade?.id || "");
  
  // Validate hierarchy
  if (!level || !grade || !topic || grade.level_id !== level.id || topic.grade_id !== grade.id) {
    notFound();
  }

  const materials = await PPKnService.getActiveMaterials(topic.id);

  return (
    <Section className="min-h-[80vh] py-16 md:py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center text-sm font-desc text-gray-500 dark:text-gray-400 gap-2">
          <Link href="/ppkn" className="hover:text-primary dark:hover:text-gold transition-colors">PPKn</Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <Link href={`/ppkn/${levelCode.toLowerCase()}`} className="hover:text-primary dark:hover:text-gold transition-colors uppercase">{level.code}</Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <Link href={`/ppkn/${levelCode.toLowerCase()}/${grade.code.toLowerCase()}`} className="hover:text-primary dark:hover:text-gold transition-colors">{grade.name}</Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <span className="text-secondary dark:text-white font-medium">{topic.name}</span>
        </div>

        <div className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-8">
          <h1 className="font-title text-3xl font-bold text-secondary dark:text-white md:text-4xl">
            {topic.name}
          </h1>
          <p className="font-desc text-gray-600 dark:text-gray-400">
            {topic.description || "Daftar materi pembelajaran untuk topik ini."}
          </p>
        </div>
        
        <div className="space-y-4 pt-4">
          {materials && materials.length > 0 ? (
            materials.map((material, index) => (
              <div 
                key={material.id} 
                className="flex flex-col sm:flex-row gap-6 p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-[#0d1b38] transition-all duration-300 hover:shadow-md"
              >
                <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-title font-bold text-lg">
                  {index + 1}
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-primary dark:text-gold bg-primary/10 dark:bg-gold/10 p-1.5 rounded-md">
                      {getIconForContentType(material.content_type)}
                    </span>
                    <h2 className="font-desc font-bold text-lg text-secondary dark:text-white">
                      {material.title}
                    </h2>
                  </div>
                  
                  <p className="font-desc text-sm text-gray-600 dark:text-gray-400">
                    {material.description || "Tidak ada deskripsi untuk materi ini."}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs font-desc text-gray-500 dark:text-gray-400 pt-2">
                    <div className="flex items-center gap-1.5 uppercase font-semibold">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">
                        {material.content_type}
                      </span>
                    </div>
                    {material.estimated_duration && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{material.estimated_duration} Menit</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="sm:self-center pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-200 dark:border-gray-800">
                  <a 
                    href={material.drive_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-primary dark:bg-gold text-white dark:text-[#0d1b38] rounded-xl font-desc font-semibold hover:opacity-90 transition-opacity"
                  >
                    Buka Materi
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))
          ) : (
             <div className="py-12 text-center text-gray-500 font-desc border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
               Belum ada materi yang tersedia untuk topik ini.
             </div>
          )}
        </div>
      </div>
    </Section>
  );
}
