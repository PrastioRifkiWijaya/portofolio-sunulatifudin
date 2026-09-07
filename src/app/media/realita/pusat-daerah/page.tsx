"use client";

import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft, Landmark, MapPin, Building2, BookOpen, Stethoscope, Globe, ShieldAlert, HeartHandshake, Eye, LucideIcon } from "lucide-react";
import { useState } from "react";
import { affairsData } from "@/data/media-realita/pusat-daerah";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  ShieldAlert, HeartHandshake, Globe, BookOpen, Stethoscope, Building2
};

export default function PusatDaerahPage() {
  const [revealedAffairs, setRevealedAffairs] = useState<string[]>([]);

  const toggleReveal = (id: string) => {
    if (revealedAffairs.includes(id)) {
      setRevealedAffairs(revealedAffairs.filter(aId => aId !== id));
    } else {
      setRevealedAffairs([...revealedAffairs, id]);
    }
  };

  const revealAll = () => {
    setRevealedAffairs(affairsData.map(a => a.id));
  };

  const hideAll = () => {
    setRevealedAffairs([]);
  };

  return (
    <Section className="min-h-screen py-16 md:py-24 bg-gray-50 dark:bg-background overflow-hidden relative">
      <div className="max-w-6xl mx-auto space-y-8 px-4 sm:px-6">
        
        {/* Header & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link 
            href="/media/realita" 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Media Realita
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 hidden sm:flex">
            <Link href="/media/realita" className="hover:text-primary dark:hover:text-gold transition-colors">Realita</Link>
            <span>/</span>
            <span className="text-gray-600 dark:text-gray-300">Pusat & Daerah</span>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="font-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Pembagian Kewenangan
          </h1>
          <p className="font-desc text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Otonomi daerah memberikan wewenang (Urusan Konkuren) kepada daerah untuk mengurus urusannya sendiri, namun ada Urusan Absolut yang mutlak milik pusat. Klik kartu untuk menebak kewenangannya!
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={revealAll} className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-sm font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">Buka Semua</button>
            <button onClick={hideAll} className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-sm font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">Tutup Semua</button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400">
            <Landmark className="w-5 h-5" /> Pemerintah Pusat (Absolut)
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-purple-600 dark:text-purple-400">
            <Landmark className="w-5 h-5" /><MapPin className="w-5 h-5 -ml-3" /> Konkuren (Pusat & Daerah)
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
            <MapPin className="w-5 h-5" /> Pemerintah Daerah
          </div>
        </div>

        {/* Grid of Affairs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {affairsData.map((affair) => {
            const isRevealed = revealedAffairs.includes(affair.id);
            const IconComponent = iconMap[affair.icon] || BookOpen;
            
            // Determine colors based on level when revealed
            let bgColor = "bg-white dark:bg-gray-800";
            let borderColor = "border-gray-200 dark:border-gray-700";
            let textColor = "text-gray-900 dark:text-white";
            let iconColor = "text-gray-400";
            let badgeBg = "bg-gray-100 dark:bg-gray-700";
            
            if (isRevealed) {
              if (affair.level === "pusat") {
                bgColor = "bg-red-50 dark:bg-red-900/10";
                borderColor = "border-red-200 dark:border-red-800";
                textColor = "text-red-900 dark:text-red-100";
                iconColor = "text-red-500 dark:text-red-400";
                badgeBg = "bg-red-200 dark:bg-red-800";
              } else if (affair.level === "bersama") {
                bgColor = "bg-purple-50 dark:bg-purple-900/10";
                borderColor = "border-purple-200 dark:border-purple-800";
                textColor = "text-purple-900 dark:text-purple-100";
                iconColor = "text-purple-500 dark:text-purple-400";
                badgeBg = "bg-purple-200 dark:bg-purple-800";
              } else if (affair.level === "daerah") {
                bgColor = "bg-emerald-50 dark:bg-emerald-900/10";
                borderColor = "border-emerald-200 dark:border-emerald-800";
                textColor = "text-emerald-900 dark:text-emerald-100";
                iconColor = "text-emerald-500 dark:text-emerald-400";
                badgeBg = "bg-emerald-200 dark:bg-emerald-800";
              }
            }

            return (
              <motion.button
                key={affair.id}
                onClick={() => toggleReveal(affair.id)}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={clsx(
                  "p-6 rounded-3xl border-2 text-left flex flex-col h-full shadow-sm transition-colors",
                  bgColor, borderColor
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center", badgeBg)}>
                    <IconComponent className={clsx("w-6 h-6", iconColor)} />
                  </div>
                  
                  <span className={clsx(
                    "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md",
                    isRevealed ? badgeBg + " " + iconColor : "bg-gray-100 dark:bg-gray-700 text-gray-500"
                  )}>
                    {isRevealed ? (affair.type === "absolut" ? "Absolut" : "Konkuren") : "Tebak Status"}
                  </span>
                </div>
                
                <h3 className={clsx("font-title font-bold text-xl mb-3", textColor)}>
                  {affair.name}
                </h3>
                
                <div className="grow">
                  <AnimatePresence mode="wait">
                    {isRevealed ? (
                      <motion.div
                        key="revealed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm leading-relaxed text-gray-700 dark:text-gray-300"
                      >
                        {affair.description}
                        
                        <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10 flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                          {affair.level === "pusat" && <><Landmark className="w-4 h-4"/> Wewenang Pusat</>}
                          {affair.level === "daerah" && <><MapPin className="w-4 h-4"/> Wewenang Daerah</>}
                          {affair.level === "bersama" && <><Landmark className="w-4 h-4"/><MapPin className="w-4 h-4 -ml-2"/> Pusat & Daerah</>}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-6 text-gray-400"
                      >
                        <Eye className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-sm font-medium">Klik untuk membuka kewenangan</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            );
          })}
        </div>

      </div>
    </Section>
  );
}
