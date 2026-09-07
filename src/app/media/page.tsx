"use client";

import { Section } from "@/components/Section";
import { useState } from "react";
import { MonitorPlay, Gamepad2, Globe, ArrowRight, Dices } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type FilterType = "audio-visual" | "game" | "realita";

export default function MediaPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("audio-visual");

  const filters = [
    {
      id: "audio-visual",
      label: "Audio-Visual",
      description: "Dilihat dan Didengar",
      icon: MonitorPlay,
    },
    {
      id: "game",
      label: "Permainan & Interaktif",
      description: "Game-Based Learning",
      icon: Gamepad2,
    },
    {
      id: "realita",
      label: "Realita",
      description: "Lingkungan Nyata",
      icon: Globe,
    },
  ];

  return (
    <Section className="min-h-[80vh] py-16 md:py-24">
      <div className="flex flex-col items-center text-center mb-12 mt-8">
        <h1 className="font-title text-4xl font-bold text-secondary dark:text-white mb-4">
          Media Pembelajaran
        </h1>
        <p className="font-desc text-gray-600 dark:text-gray-400 max-w-2xl">
          Eksplorasi berbagai jenis media pembelajaran inovatif untuk mendukung pengalaman belajar yang lebih menyenangkan.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as FilterType)}
              className={clsx(
                "flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer",
                isActive
                  ? "border-primary bg-primary/10 text-primary dark:text-gold dark:border-gold dark:bg-gold/10"
                  : "border-gray-200 bg-white text-gray-600 hover:border-primary/50 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-400 dark:hover:border-gold/50"
              )}
            >
              <Icon className={clsx("h-5 w-5 sm:h-6 sm:w-6", isActive ? "text-primary dark:text-gold" : "text-gray-400")} />
              <div className="text-left hidden sm:block">
                <div className="font-semibold font-title text-sm">{filter.label}</div>
                <div className="text-xs font-desc opacity-80">{filter.description}</div>
              </div>
              <div className="text-left sm:hidden">
                <div className="font-semibold font-title text-sm">{filter.label}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="w-full max-w-5xl mx-auto min-h-87.5 p-8 md:p-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl bg-gray-50/50 dark:bg-background/50 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center"
          >
            {activeFilter === "audio-visual" && (
              <div className="w-full">
                <div className="flex flex-col items-center mb-8">
                  <MonitorPlay className="h-12 w-12 text-primary dark:text-gold mb-4" />
                  <h3 className="font-title text-2xl font-bold text-gray-800 dark:text-white mb-2">Media Audio-Visual</h3>
                  <p className="font-desc text-gray-500 max-w-md">Kumpulan video edukasi dan alat peraga digital visual untuk mendukung pembelajaran.</p>
                </div>

                <div className="flex justify-center w-full max-w-3xl mx-auto">
                  <Link href="/media/audio-visual" className="group flex flex-col items-center text-center p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-primary dark:hover:border-gold hover:shadow-xl transition-all duration-300 w-full md:w-1/2">
                    <div className="h-16 w-16 rounded-full bg-primary/10 dark:bg-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <MonitorPlay className="h-8 w-8 text-primary dark:text-gold" />
                    </div>
                    <h4 className="font-title font-bold text-lg text-gray-800 dark:text-white mb-2">Jelajahi Video Materi</h4>
                    <p className="font-desc text-sm text-gray-500 mb-6 grow">Akses video pembelajaran berdasarkan jenjang pendidikan dan kelas Anda.</p>
                    <div className="flex items-center text-primary dark:text-gold font-medium text-sm">
                      Pilih Jenjang <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {activeFilter === "game" && (
              <div className="w-full">
                <div className="flex flex-col items-center mb-8">
                  <Gamepad2 className="h-12 w-12 text-primary dark:text-gold mb-4" />
                  <h3 className="font-title text-2xl font-bold text-gray-800 dark:text-white mb-2">Permainan & Interaktif</h3>
                  <p className="font-desc text-gray-500 max-w-md">Pilih mode pembelajaran interaktif yang ingin Anda mainkan.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto">
                  {/* Kartu Kuis */}
                  <Link href="/media/game/kuis" className="group flex flex-col items-center text-center p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-primary dark:hover:border-gold hover:shadow-xl transition-all duration-300">
                    <div className="h-16 w-16 rounded-full bg-primary/10 dark:bg-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <MonitorPlay className="h-8 w-8 text-primary dark:text-gold" />
                    </div>
                    <h4 className="font-title font-bold text-lg text-gray-800 dark:text-white mb-2">Kuis Interaktif</h4>
                    <p className="font-desc text-sm text-gray-500 mb-6 grow">Latih pemahaman PPKn melalui kuis interaktif.</p>
                    <div className="flex items-center text-primary dark:text-gold font-medium text-sm">
                      Mulai Kuis <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  {/* Kartu Ular Tangga */}
                  <Link href="/media/game/ular-tangga" className="group flex flex-col items-center text-center p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-primary dark:hover:border-gold hover:shadow-xl transition-all duration-300">
                    <div className="h-16 w-16 rounded-full bg-primary/10 dark:bg-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Dices className="h-8 w-8 text-primary dark:text-gold" />
                    </div>
                    <h4 className="font-title font-bold text-lg text-gray-800 dark:text-white mb-2">Game Ular Tangga Edukasi</h4>
                    <p className="font-desc text-sm text-gray-500 mb-6 grow">Belajar PPKn sambil bermain ular tangga.</p>
                    <div className="flex items-center text-primary dark:text-gold font-medium text-sm">
                      Main Sekarang <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {activeFilter === "realita" && (
              <div className="w-full">
                <div className="flex flex-col items-center mb-8">
                  <Globe className="h-12 w-12 text-primary dark:text-gold mb-4" />
                  <h3 className="font-title text-2xl font-bold text-gray-800 dark:text-white mb-2">Media Realita</h3>
                  <p className="font-desc text-gray-500 max-w-md">Eksplorasi simulasi interaktif tentang struktur ketatanegaraan dan proses hukum di dunia nyata.</p>
                </div>

                <div className="flex justify-center w-full max-w-3xl mx-auto">
                  <Link href="/media/realita" className="group flex flex-col items-center text-center p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-primary dark:hover:border-gold hover:shadow-xl transition-all duration-300 w-full md:w-1/2">
                    <div className="h-16 w-16 rounded-full bg-primary/10 dark:bg-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Globe className="h-8 w-8 text-primary dark:text-gold" />
                    </div>
                    <h4 className="font-title font-bold text-lg text-gray-800 dark:text-white mb-2">Modul Simulasi</h4>
                    <p className="font-desc text-sm text-gray-500 mb-6 grow">Pelajari penerapan PPKn dalam kehidupan nyata secara visual dan interaktif.</p>
                    <div className="flex items-center text-primary dark:text-gold font-medium text-sm">
                      Mulai Eksplorasi <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
