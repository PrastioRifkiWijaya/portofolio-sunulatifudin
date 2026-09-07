import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft, BookOpen, MonitorPlay } from "lucide-react";
import { PPKnService } from "@/services/ppkn.service";
import { notFound } from "next/navigation";

export default async function AudioVisualGradePage(props: { params: Promise<{ levelCode: string }> }) {
  const params = await props.params;
  const { levelCode } = params;
  const level = await PPKnService.getLevelByCode(levelCode);

  if (!level) {
    notFound();
  }

  const grades = await PPKnService.getActiveGrades(level.id);

  return (
    <Section className="min-h-[80vh] py-16 md:py-24">
      <div className="max-w-5xl mx-auto space-y-12">
        
        <Link href="/media/audio-visual" className="inline-flex items-center text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-gold transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Pilih Jenjang
        </Link>

        <div className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-8">
          <h1 className="font-title text-3xl font-bold text-secondary dark:text-white md:text-4xl tracking-wider">
            Media Audio-Visual {level.name} ({level.code})
          </h1>
          <p className="font-desc text-gray-600 dark:text-gray-400">
            Pilih kelas untuk mengeksplorasi video pembelajaran yang tersedia.
          </p>
        </div>

        {grades.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <h3 className="font-title text-xl font-semibold text-gray-600 dark:text-gray-400">
              Media Belum Tersedia
            </h3>
            <p className="font-desc text-gray-500 mt-2">
              Belum ada kelas yang terdaftar untuk jenjang ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {grades.map((grade) => (
              <Link 
                key={grade.id} 
                href={`/media/audio-visual/${level.code.toLowerCase()}/${grade.code.toLowerCase()}`}
                className="group flex items-center p-6 border-2 border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-[#0d1b38] hover:border-primary dark:hover:border-gold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              >
                <div className="h-12 w-12 bg-primary/10 dark:bg-gold/10 text-primary dark:text-gold rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shrink-0">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-title text-xl font-bold text-secondary dark:text-white">
                    {grade.name}
                  </h2>
                  <div className="text-xs font-semibold text-primary dark:text-gold mt-1 group-hover:underline flex items-center">
                    <MonitorPlay className="w-3 h-3 mr-1" /> Lihat Media &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </Section>
  );
}
