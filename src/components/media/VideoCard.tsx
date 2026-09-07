"use client";

import { Material, Topic } from "@/data/ppkn";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink, PlayCircle, Clock } from "lucide-react";
import { parseVideoUrl } from "@/lib/video-utils";

interface VideoCardProps {
  material: Material;
  topic: Topic;
}

export function VideoCard({ material, topic }: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const videoInfo = parseVideoUrl(material.drive_url);
  
  // Try to use provided thumbnail, fallback to youtube thumbnail if possible
  let thumbnailUrl = material.thumbnail_url;
  if (!thumbnailUrl && videoInfo.provider === 'youtube' && videoInfo.videoId) {
    thumbnailUrl = `https://img.youtube.com/vi/${videoInfo.videoId}/maxresdefault.jpg`;
  }

  const handleOpen = () => {
    if (videoInfo.provider === 'external' || videoInfo.provider === 'invalid') {
      // If we can't embed it, just open in new tab
      window.open(material.drive_url, '_blank');
      return;
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div 
        onClick={handleOpen}
        className="group flex flex-col rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:border-primary dark:hover:border-gold hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden">
          {thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={thumbnailUrl} 
              alt={material.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <PlayCircle className="w-12 h-12 text-gray-400 dark:text-gray-600" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          
          {material.estimated_duration && (
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded-md text-xs font-semibold text-white backdrop-blur-sm flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {material.estimated_duration} mnt
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 bg-primary/90 dark:bg-gold/90 text-white dark:text-gray-900 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
              {videoInfo.provider === 'external' || videoInfo.provider === 'invalid' ? (
                <ExternalLink className="w-6 h-6 ml-1" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </div>
          </div>
        </div>
        
        <div className="p-5 flex flex-col grow">
          <div className="text-[10px] font-bold text-primary dark:text-gold uppercase tracking-wider mb-2">
            Video Pembelajaran
          </div>
          <h4 className="font-title font-bold text-gray-800 dark:text-white text-lg mb-2 line-clamp-2">
            {material.title}
          </h4>
          <p className="font-desc text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 grow">
            {material.description || "Video pembelajaran interaktif untuk topik ini."}
          </p>
          <div className="mt-auto flex items-center text-primary dark:text-gold text-sm font-semibold group-hover:underline">
            {videoInfo.provider === 'external' || videoInfo.provider === 'invalid' ? "Buka Tautan " : "Tonton Video "} 
            &rarr;
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-start justify-between p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="pr-8">
                  <div className="text-xs font-bold text-primary dark:text-gold uppercase tracking-wider mb-1">
                    {topic.name}
                  </div>
                  <h3 className="font-title text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {material.title}
                  </h3>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400 transition-colors shrink-0"
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
                    title={material.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
                
                {videoInfo.provider === 'google-drive' && videoInfo.embedUrl && (
                  <iframe
                    src={videoInfo.embedUrl}
                    title={material.title}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay"
                    allowFullScreen
                  />
                )}

                {videoInfo.provider === 'direct-video' && videoInfo.embedUrl && (
                  <video 
                    src={videoInfo.embedUrl} 
                    controls 
                    autoPlay 
                    className="absolute inset-0 w-full h-full outline-none"
                  >
                    Maaf, browser Anda tidak mendukung pemutaran video.
                  </video>
                )}
              </div>

              {/* Footer / Description */}
              <div className="p-4 sm:p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
                <p className="font-desc text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {material.description || "Video pembelajaran interaktif untuk mendalami materi Pendidikan Pancasila dan Kewarganegaraan."}
                </p>
                
                {/* Fallback for unsupported embed inside modal just in case */}
                {(videoInfo.provider === 'external' || videoInfo.provider === 'invalid') && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl flex items-center justify-between">
                    <span className="text-sm text-blue-700 dark:text-blue-300">Video ini tidak dapat diputar langsung di dalam halaman.</span>
                    <a 
                      href={material.drive_url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors"
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
