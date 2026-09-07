"use client";

import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, RotateCcw, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pilpresPhases } from "@/data/media-realita/pilpres";
import clsx from "clsx";

export default function PemilihanPresidenPage() {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentPhase = pilpresPhases[currentPhaseIndex];
  const totalPhases = pilpresPhases.length;
  
  const progressPercentage = isCompleted ? 100 : ((currentPhaseIndex) / (totalPhases - 1)) * 100;

  const handleNext = () => {
    if (currentPhaseIndex < totalPhases - 1) {
      setCurrentPhaseIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const resetFlow = () => {
    setCurrentPhaseIndex(0);
    setIsCompleted(false);
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
            <span className="text-gray-600 dark:text-gray-300">Pilpres</span>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="font-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Proses Pemilihan Presiden
          </h1>
          <p className="font-desc text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Pelajari tahapan pemilu presiden di Indonesia mulai dari pencalonan hingga pelantikan berdasarkan UUD 1945.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-150 relative">
          
          {/* Top Progress Bar */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-4xl mx-auto relative">
              
              {/* Background Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full -translate-y-1/2" />
              
              {/* Active Progress Line */}
              <motion.div 
                className="absolute top-1/2 left-0 h-1.5 bg-primary dark:bg-gold rounded-full -translate-y-1/2 origin-left"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />

              {/* Nodes */}
              <div className="relative flex justify-between items-center z-10">
                {pilpresPhases.map((phase, idx) => {
                  const isActive = idx === currentPhaseIndex && !isCompleted;
                  const isPast = idx < currentPhaseIndex || isCompleted;

                  return (
                    <div key={phase.id} className="flex flex-col items-center">
                      <div className={clsx(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-4 mb-3",
                        isActive ? "bg-white dark:bg-gray-900 border-primary dark:border-gold text-primary dark:text-gold shadow-lg scale-110" :
                        isPast ? "bg-primary dark:bg-gold border-primary dark:border-gold text-white" :
                        "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400"
                      )}>
                        {isPast ? <CheckCircle2 className="w-5 h-5" /> : phase.order}
                      </div>
                      <span className={clsx(
                        "text-[10px] font-bold uppercase tracking-wider hidden lg:block max-w-24 text-center",
                        (isActive || isPast) ? "text-gray-900 dark:text-white" : "text-gray-400"
                      )}>
                        {phase.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="grow p-6 sm:p-10 lg:p-16 relative overflow-hidden flex items-center justify-center min-h-100 bg-gray-50/50 dark:bg-gray-900/30">
            <AnimatePresence mode="wait">
              {isCompleted ? (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="text-center max-w-xl"
                >
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="font-title text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Presiden Baru Resmi Dilantik!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    Seluruh tahapan dari pencalonan hingga pelantikan telah dilalui sesuai dengan amanat Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.
                  </p>
                  
                  <button
                    onClick={resetFlow}
                    className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-lg"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Ulangi Simulasi
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={currentPhase.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-3xl"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                    
                    {/* Decorative Number */}
                    <div className="absolute -top-6 -right-6 text-[150px] font-bold text-gray-50 dark:text-gray-900/50 leading-none select-none pointer-events-none z-0">
                      {currentPhase.order}
                    </div>

                    <div className="relative z-10">
                      <div className="inline-flex items-center px-3 py-1 bg-primary/10 dark:bg-gold/10 text-primary dark:text-gold text-xs font-bold rounded-full uppercase tracking-widest mb-4">
                        Tahap {currentPhase.order}
                      </div>
                      
                      <h2 className="font-title text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {currentPhase.title}
                      </h2>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                        {currentPhase.description}
                      </p>

                      <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/30">
                        <h4 className="font-bold text-blue-900 dark:text-blue-300 flex items-center mb-4 uppercase text-xs tracking-wider">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Syarat & Ketentuan Khusus
                        </h4>
                        <ul className="space-y-3">
                          {currentPhase.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="mt-1 mr-3 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                              <span className="text-blue-800 dark:text-blue-200/80 text-sm leading-relaxed">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 flex justify-end">
                        <button
                          onClick={handleNext}
                          className="px-8 py-4 bg-primary dark:bg-gold text-white dark:text-gray-900 font-bold rounded-xl hover:bg-primary/90 dark:hover:bg-gold/90 transition-all flex items-center shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                          Lanjut ke Tahap Berikutnya
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </Section>
  );
}
