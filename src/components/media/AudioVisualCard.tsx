"use client";

import { AudioVisualMedia } from "@/data/ppkn";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink, PlayCircle, Music } from "lucide-react";
import { parseVideoUrl } from "@/lib/video-utils";

interface AudioVisualCardProps {
  media: AudioVisualMedia;
}

export function AudioVisualCard({ media }: AudioVisualCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const videoInfo = parseVideoUrl(media.url);
  
  // Try to use fallback to youtube thumbnail if possible
  let thumbnailUrl = "";
  if (videoInfo.provider === 'youtube' && videoInfo.videoId) {
    thumbnailUrl = `https://img.youtube.com/vi/${videoInfo.videoId}/hqdefault.jpg`;
  }

  const handleOpen = () => {
    if (videoInfo.provider === 'external' || videoInfo.provider === 'invalid') {
      window.open(media.url, '_blank');
      return;
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const isSong = media.type === "song";

  return (
    <>
      <div 
        onClick={handleOpen}
        className="group flex flex-col rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0d1b38]/50 overflow-hidden hover:border-primary dark:hover:border-gold hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
      >
        <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden">
          {thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={thumbnailUrl} 
              alt={media.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              {isSong ? (
                <Music className="w-12 h-12 text-gray-400 dark:text-gray-600" />
              ) : (
                <PlayCircle className="w-12 h-12 text-gray-400 dark:text-gray-600" />
              )}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
          
          <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10 flex items-center">
            {isSong ? (
              <><Music className="w-3 h-3 mr-1.5 text-primary dark:text-gold" /> Lagu</>
            ) : (
              <><PlayCircle className="w-3 h-3 mr-1.5 text-primary dark:text-gold" /> Motivasi</>
            )}
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
              {videoInfo.provider === 'external' || videoInfo.provider === 'invalid' ? (
                <ExternalLink className="w-7 h-7 ml-1" />
              ) : (
                <Play className="w-8 h-8 ml-1.5" />
              )}
            </div>
          </div>
        </div>
        
        <div className="p-5 flex flex-col grow relative">
          <div className="absolute -top-10 right-4 w-12 h-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform">
             {isSong ? (
               <Music className="w-5 h-5 text-primary dark:text-gold" />
             ) : (
               <PlayCircle className="w-5 h-5 text-primary dark:text-gold" />
             )}
          </div>
          
          <h4 className="font-title font-bold text-gray-900 dark:text-white text-lg mt-1 mb-2 line-clamp-2 group-hover:text-primary dark:group-hover:text-gold transition-colors pr-8">
            {media.title}
          </h4>
          
          <div className="mt-auto flex items-center text-primary dark:text-gold text-sm font-semibold group-hover:tracking-wider transition-all duration-300">
            {videoInfo.provider === 'external' || videoInfo.provider === 'invalid' ? "Buka Tautan " : "Putar Sekarang "} 
            <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-5xl bg-white dark:bg-gray-950 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-start justify-between p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <div className="pr-8 flex items-center gap-4">
                   <div className="w-12 h-12 bg-primary/10 dark:bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                      {isSong ? (
                        <Music className="w-6 h-6 text-primary dark:text-gold" />
                      ) : (
                        <PlayCircle className="w-6 h-6 text-primary dark:text-gold" />
                      )}
                   </div>
                   <div>
                    <div className="text-xs font-bold text-primary dark:text-gold uppercase tracking-wider mb-1">
                      {isSong ? 'Lagu Pembelajaran' : 'Video Motivasi'}
                    </div>
                    <h3 className="font-title text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {media.title}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-2 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400 transition-colors shrink-0 shadow-sm border border-gray-200 dark:border-gray-700"
                  aria-label="Tutup video"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Player Area */}
              <div className="w-full aspect-video bg-black relative">
                {videoInfo.provider === 'youtube' && videoInfo.embedUrl && (
                  <iframe
                    src={`${videoInfo.embedUrl}?autoplay=1`}
                    title={media.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
                
                {/* Fallback for unsupported embed inside modal just in case */}
                {(videoInfo.provider === 'external' || videoInfo.provider === 'invalid') && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 p-6 text-center">
                    <ExternalLink className="w-16 h-16 text-gray-500 mb-4" />
                    <h3 className="text-white text-xl font-bold mb-2">Video Tidak Dapat Diputar Langsung</h3>
                    <p className="text-gray-400 mb-6 max-w-md">Tautan video ini tidak mendukung pemutaran langsung di dalam aplikasi. Silakan buka tautan asli untuk menonton.</p>
                    <a 
                      href={media.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                      Buka Tautan Asli
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
