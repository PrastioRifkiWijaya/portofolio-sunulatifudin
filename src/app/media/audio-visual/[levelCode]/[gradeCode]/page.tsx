import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft, MonitorPlay } from "lucide-react";
import { PPKnService } from "@/services/ppkn.service";
import { notFound } from "next/navigation";
import { VideoCard } from "@/components/media/VideoCard";
import { Material } from "@/data/ppkn";

export default async function AudioVisualMaterialPage(props: { params: Promise<{ levelCode: string, gradeCode: string }> }) {
  const params = await props.params;
  const { levelCode, gradeCode } = params;
  
  // 1. Get Level
  const level = await PPKnService.getLevelByCode(levelCode);
  if (!level) notFound();

  // 2. Get Grade
  const grade = await PPKnService.getGradeByCode(gradeCode, level.id);
  if (!grade) notFound();

  // 3. Get Topics for Grade
  const topics = await PPKnService.getActiveTopics(grade.id);

  // 4. Get Video Materials for all these topics at once (Avoid N+1)
  const topicIds = topics.map(t => t.id);
  const videoMaterials = await PPKnService.getActiveMaterialsByTopicIds(topicIds, "video");

  // Group materials by topicId for easier rendering
  const materialsByTopic = videoMaterials.reduce((acc, material) => {
    if (!acc[material.topic_id]) {
      acc[material.topic_id] = [];
    }
    acc[material.topic_id].push(material);
    return acc;
  }, {} as Record<string, Material[]>);

  // Filter out topics that have no video materials
  const topicsWithVideos = topics.filter(t => materialsByTopic[t.id] && materialsByTopic[t.id].length > 0);

  return (
    <Section className="min-h-[80vh] py-16 md:py-24 bg-gray-50 dark:bg-background">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link 
            href={`/media/audio-visual/${level.code.toLowerCase()}`} 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Kelas
          </Link>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            <Link href="/media" className="hover:text-primary dark:hover:text-gold transition-colors">Media</Link>
            <span>/</span>
            <Link href="/media/audio-visual" className="hover:text-primary dark:hover:text-gold transition-colors">Audio-Visual</Link>
            <span>/</span>
            <Link href={`/media/audio-visual/${level.code.toLowerCase()}`} className="hover:text-primary dark:hover:text-gold transition-colors">{level.code}</Link>
            <span>/</span>
            <span className="text-gray-600 dark:text-gray-300">{grade.name}</span>
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900/50 p-8 shadow-sm">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-primary/10 dark:bg-gold/10 text-primary dark:text-gold rounded-xl flex items-center justify-center">
                <MonitorPlay className="h-5 w-5" />
              </div>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-lg uppercase tracking-wider">
                Video Pembelajaran
              </span>
            </div>
            <h1 className="font-title text-3xl font-bold text-gray-900 dark:text-white md:text-5xl tracking-tight mb-4">
              {level.code} — {grade.name}
            </h1>
            <p className="font-desc text-gray-600 dark:text-gray-400 max-w-2xl text-lg leading-relaxed">
              Kumpulan materi audio-visual interaktif untuk mendukung proses pemahaman Pendidikan Pancasila dan Kewarganegaraan.
            </p>
          </div>
          {/* Decorative element */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 dark:bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Content Area */}
        {topicsWithVideos.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-gray-900/30 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <MonitorPlay className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="font-title text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Media Audio-Visual Belum Tersedia
            </h3>
            <p className="font-desc text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 text-center">
              Belum ada video pembelajaran yang tersedia untuk kelas ini. Silakan pilih kelas lain atau kembali ke halaman sebelumnya.
            </p>
            <Link 
              href={`/media/audio-visual/${level.code.toLowerCase()}`}
              className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Kembali ke Pilihan Kelas
            </Link>
          </div>
        ) : (
          <div className="space-y-16">
            {topicsWithVideos.map((topic, index) => (
              <section key={topic.id} className="scroll-mt-24" id={`topic-${topic.slug}`}>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-title font-black text-xl shadow-md">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="font-title text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {topic.name}
                    </h2>
                    {topic.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-3xl">
                        {topic.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {materialsByTopic[topic.id].map(material => (
                    <VideoCard 
                      key={material.id} 
                      material={material} 
                      topic={topic}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

      </div>
    </Section>
  );
}
