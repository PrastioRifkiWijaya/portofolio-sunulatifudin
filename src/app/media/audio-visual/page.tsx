import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft, MonitorPlay, PlayCircle, Music } from "lucide-react";
import { PPKnService } from "@/services/ppkn.service";
import { AudioVisualCard } from "@/components/media/AudioVisualCard";

export const dynamic = "force-dynamic";

export default async function AudioVisualLevelPage() {
  const levels = await PPKnService.getActiveLevels();
  const motivationVideos = await PPKnService.getActiveAudioVisuals("motivation");
  const songs = await PPKnService.getActiveAudioVisuals("song");

  return (
    <Section className="min-h-[80vh] py-16 md:py-24 bg-gray-50/50 dark:bg-background">
      <div className="max-w-6xl mx-auto space-y-16">
        
        <Link href="/media" className="inline-flex items-center text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-gold transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Media Pembelajaran
        </Link>

        <div className="text-center space-y-4">
          <h1 className="font-title text-4xl font-bold text-secondary dark:text-white md:text-5xl">
            Media Audio-Visual
          </h1>
          <p className="font-desc text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Pilih jenjang pendidikan Anda untuk mengeksplorasi kumpulan video dan materi visual pembelajaran Pendidikan Pancasila dan Kewarganegaraan.
          </p>
        </div>

        {levels.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <h3 className="font-title text-xl font-semibold text-gray-600 dark:text-gray-400">
              Belum ada data jenjang pendidikan
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {levels.map((level) => (
              <Link 
                key={level.id} 
                href={`/media/audio-visual/${level.code.toLowerCase()}`}
                className="group flex flex-col items-center text-center p-8 border-2 border-gray-200 dark:border-gray-800 rounded-3xl bg-white dark:bg-[#0d1b38] hover:border-primary dark:hover:border-gold transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                <div className="h-16 w-16 bg-primary/10 dark:bg-gold/10 text-primary dark:text-gold rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MonitorPlay className="h-8 w-8" />
                </div>
                <h2 className="font-title text-2xl font-bold text-secondary dark:text-white mb-2">
                  {level.name}
                </h2>
                {level.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                    {level.description}
                  </p>
                )}
                <div className="mt-auto text-sm font-semibold text-primary dark:text-gold group-hover:underline">
                  Lihat Daftar Kelas &rarr;
                </div>
              </Link>
            ))}
          </div>
        )}


        {/* Motivation Videos Section */}
        {motivationVideos.length > 0 && (
          <div className="space-y-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 dark:bg-gold/10 text-primary dark:text-gold rounded-xl flex items-center justify-center">
                <PlayCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-title text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Video Motivasi Pembelajaran</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Kumpulan video untuk menumbuhkan motivasi belajar dan wawasan kebangsaan.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {motivationVideos.map((video) => (
                <AudioVisualCard key={video.id} media={video} />
              ))}
            </div>
          </div>
        )}

        {/* Songs Section */}
        {songs.length > 0 && (
          <div className="space-y-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 dark:bg-gold/10 text-primary dark:text-gold rounded-xl flex items-center justify-center">
                <Music className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-title text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Lagu Pembelajaran & Wajib Nasional</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Dengarkan lagu-lagu inspiratif untuk meningkatkan semangat kebangsaan.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {songs.map((song) => (
                <AudioVisualCard key={song.id} media={song} />
              ))}
            </div>
          </div>
        )}

      </div>
    </Section>
  );
}
