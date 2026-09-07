"use client";

import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, FileText, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { legislativeSteps } from "@/data/media-realita/alur-uu";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function AlurUUPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = legislativeSteps[currentStepIndex];
  const totalSteps = legislativeSteps.length;
  
  // Use progress percentage for visual progress bar
  const progressPercentage = isCompleted ? 100 : ((currentStepIndex) / (totalSteps - 1)) * 100;

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (isCompleted) {
      setIsCompleted(false);
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsCompleted(false);
  };

  const handleSelectStep = (index: number) => {
    setCurrentStepIndex(index);
    setIsCompleted(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepIndex, isCompleted]);

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
            <span className="text-gray-600 dark:text-gray-300">Alur UU</span>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="font-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Alur Pembentukan Undang-Undang
          </h1>
          <p className="font-desc text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Simulasi langkah demi langkah bagaimana sebuah Undang-Undang dirancang, dibahas, hingga akhirnya disahkan.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-150">
          
          {/* Top Progress Bar */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-4xl mx-auto">
              {/* Desktop Stepper */}
              <div className="hidden md:flex justify-between items-center relative z-10">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10 -translate-y-1/2 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary dark:bg-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
                
                {legislativeSteps.map((step, idx) => {
                  const isPast = idx < currentStepIndex || isCompleted;
                  const isActive = idx === currentStepIndex && !isCompleted;
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => handleSelectStep(idx)}
                      className="flex flex-col items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
                      aria-label={`Ke tahap ${step.order}: ${step.title}`}
                    >
                      <div className={clsx(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 shadow-sm",
                        isPast ? "bg-primary dark:bg-gold border-primary dark:border-gold text-white dark:text-gray-900" :
                        isActive ? "bg-white dark:bg-gray-900 border-primary dark:border-gold text-primary dark:text-gold ring-4 ring-primary/20 dark:ring-gold/20" :
                        "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400"
                      )}>
                        {isPast ? <CheckCircle2 className="w-5 h-5" /> : step.order}
                      </div>
                      <span className={clsx(
                        "text-[10px] font-bold uppercase tracking-wider hidden lg:block max-w-30 text-center",
                        (isActive || isPast) ? "text-gray-900 dark:text-white" : "text-gray-400"
                      )}>
                        {step.title.split(' ')[0]} {step.title.split(' ')[1]}...
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Stepper Text */}
              <div className="md:hidden flex items-center justify-between">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                  Tahap {isCompleted ? totalSteps : currentStepIndex + 1} / {totalSteps}
                </span>
                <div className="h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary dark:bg-gold transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="grow p-6 sm:p-10 lg:p-16 relative overflow-hidden flex items-center justify-center min-h-100">
            <AnimatePresence mode="wait">
              
              {isCompleted ? (
                /* Completion State */
                <motion.div 
                  key="completed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="text-center max-w-lg mx-auto"
                >
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="font-title text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Alur Selesai
                  </h2>
                  <p className="font-desc text-gray-600 dark:text-gray-400 mb-8">
                    Anda telah melihat seluruh tahapan pembentukan Undang-Undang dari penyusunan draf hingga pengundangan resmi.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                      onClick={handleRestart}
                      className="w-full sm:w-auto px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" /> Ulangi Simulasi
                    </button>
                    <Link 
                      href="/media/realita"
                      className="w-full sm:w-auto px-6 py-3 bg-primary dark:bg-gold text-white dark:text-gray-900 font-bold rounded-xl hover:bg-primary/90 dark:hover:bg-gold/90 transition-colors flex items-center justify-center"
                    >
                      Modul Lainnya
                    </Link>
                  </div>
                </motion.div>
              ) : (
                /* Active Step Content */
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16"
                >
                  {/* Left Column: Info */}
                  <div className="lg:col-span-3 space-y-6">
                    <div className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold rounded-lg uppercase tracking-widest">
                      Tahap {currentStep.order}
                    </div>
                    
                    <h2 className="font-title text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                      {currentStep.title}
                    </h2>
                    
                    <p className="font-desc text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {currentStep.description}
                    </p>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                        Pihak Terlibat
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentStep.actors.map((actor, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-lg"
                          >
                            {actor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Document/Visual */}
                  <div className="lg:col-span-2 flex flex-col justify-center">
                    <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center text-center relative">
                      <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/5 dark:bg-gold/5 rounded-full blur-xl" />
                      
                      <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center mb-4 border border-gray-100 dark:border-gray-700 relative z-10 text-primary dark:text-gold">
                        <FileText className="w-8 h-8" />
                      </div>
                      
                      <h4 className="font-title text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Status Dokumen
                      </h4>
                      <div className="font-bold text-gray-900 dark:text-white mb-6 relative z-10">
                        {currentStep.documentState}
                      </div>

                      {currentStep.legalBasis && (
                        <div className="w-full mt-auto bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-800 text-left">
                          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                            Dasar Hukum
                          </span>
                          <span className="block text-xs text-gray-600 dark:text-gray-300 font-medium">
                            {currentStep.legalBasis[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Navigation Controls */}
          <div className="bg-white dark:bg-gray-900 p-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0 && !isCompleted}
              className={clsx(
                "px-4 sm:px-6 py-3 font-bold rounded-xl flex items-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                (currentStepIndex === 0 && !isCompleted)
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Sebelumnya</span>
            </button>
            
            {!isCompleted && (
              <button
                onClick={handleNext}
                className="px-6 sm:px-8 py-3 bg-primary dark:bg-gold text-white dark:text-gray-900 font-bold rounded-xl hover:bg-primary/90 dark:hover:bg-gold/90 transition-all flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-lg shadow-primary/20 dark:shadow-gold/20"
              >
                <span className="hidden sm:inline">Selanjutnya</span>
                <span className="sm:hidden">Lanjut</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>

        </div>

      </div>
    </Section>
  );
}
