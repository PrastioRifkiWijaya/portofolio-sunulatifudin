"use client";

import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft, Receipt, GraduationCap, Megaphone, HeartPulse, ShieldAlert, CheckCircle2, XCircle, LucideIcon } from "lucide-react";
import { useState } from "react";
import { citizenCases, CaseType } from "@/data/media-realita/hak-kewajiban";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Receipt, GraduationCap, Megaphone, HeartPulse, ShieldAlert
};

export default function HakKewajibanWargaPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState<CaseType | null>(null);

  const currentCase = citizenCases[currentIndex];
  const IconComponent = iconMap[currentCase.icon] || ShieldAlert;

  const handleGuess = (type: CaseType) => {
    setUserGuess(type);
    setFlipped(true);
  };

  const nextCase = () => {
    setFlipped(false);
    setUserGuess(null);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % citizenCases.length);
    }, 200);
  };

  return (
    <Section className="min-h-screen py-16 md:py-24 bg-gray-50 dark:bg-background overflow-hidden relative">
      <div className="max-w-4xl mx-auto space-y-8 px-4 sm:px-6">
        
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
            <span className="text-gray-600 dark:text-gray-300">Hak & Kewajiban</span>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="font-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Uji Konstitusi
          </h1>
          <p className="font-desc text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Baca skenario di bawah ini, dan tentukan apakah tindakan tersebut termasuk Hak Warga Negara, Kewajiban Warga Negara, atau Pelanggaran Konstitusi.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex justify-center gap-2 mb-8">
          {citizenCases.map((_, idx) => (
            <div key={idx} className={clsx(
              "w-2 h-2 rounded-full transition-all duration-300",
              idx === currentIndex ? "w-6 bg-primary dark:bg-gold" : "bg-gray-300 dark:bg-gray-700"
            )} />
          ))}
        </div>

        {/* Flashcard Area */}
        <div className="relative min-h-100 w-full" style={{ perspective: "1000px" }}>
          <AnimatePresence mode="wait">
            {!flipped ? (
              <motion.div
                key={`front-${currentIndex}`}
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-200 dark:border-gray-700 p-8 sm:p-12 shadow-xl flex flex-col justify-center items-center text-center backface-hidden"
              >
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="font-desc text-xl md:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed max-w-2xl font-medium mb-10">
                  &quot;{currentCase.scenario}&quot;
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
                  <button 
                    onClick={() => handleGuess("hak")}
                    className="grow py-4 bg-green-50 dark:bg-green-900/10 hover:bg-green-100 dark:hover:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-xl font-bold transition-colors"
                  >
                    Ini adalah Hak
                  </button>
                  <button 
                    onClick={() => handleGuess("kewajiban")}
                    className="grow py-4 bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-xl font-bold transition-colors"
                  >
                    Ini adalah Kewajiban
                  </button>
                  <button 
                    onClick={() => handleGuess("pelanggaran")}
                    className="grow py-4 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-xl font-bold transition-colors"
                  >
                    Ini Pelanggaran
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`back-${currentIndex}`}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.4 }}
                className={clsx(
                  "absolute inset-0 rounded-3xl border-2 p-8 sm:p-12 shadow-xl flex flex-col justify-center items-center text-center backface-hidden",
                  userGuess === currentCase.type 
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" 
                    : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                )}
              >
                <div className="mb-6">
                  {userGuess === currentCase.type ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle2 className="w-16 h-16 text-green-500 mb-2" />
                      <span className="font-bold text-green-700 dark:text-green-400 text-xl">Jawaban Tepat!</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <XCircle className="w-16 h-16 text-red-500 mb-2" />
                      <span className="font-bold text-red-700 dark:text-red-400 text-xl">Kurang Tepat</span>
                    </div>
                  )}
                </div>

                <div className="bg-white dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/50 max-w-xl w-full mb-8">
                  <div className="inline-block px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md text-xs font-bold uppercase tracking-widest mb-3">
                    {currentCase.article}
                  </div>
                  <h4 className="font-title text-xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
                    {currentCase.type === "pelanggaran" ? "Pelanggaran Hak/Kewajiban" : `${currentCase.type} Warga Negara`}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {currentCase.explanation}
                  </p>
                </div>

                <button 
                  onClick={nextCase}
                  className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  {currentIndex === citizenCases.length - 1 ? "Ulangi Latihan" : "Skenario Berikutnya"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </Section>
  );
}
