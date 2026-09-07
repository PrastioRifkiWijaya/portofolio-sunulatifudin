"use client";

import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft, Check, ChevronRight, Fingerprint, Inbox, ScrollText, UserCheck } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { partiesData, pemiluSteps } from "@/data/media-realita/pemilu";
import clsx from "clsx";

export default function SimulasiPemiluPage() {
  const [step, setStep] = useState(0);
  const [selectedParty, setSelectedParty] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const currentStepData = pemiluSteps[step];

  const handleNextStep = () => {
    if (step === 1 && !selectedParty) {
      alert("Silakan pilih salah satu partai terlebih dahulu!");
      return;
    }
    if (step < pemiluSteps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setHasVoted(true);
    }
  };

  const resetSimulation = () => {
    setStep(0);
    setSelectedParty(null);
    setHasVoted(false);
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
            <span className="text-gray-600 dark:text-gray-300">Simulasi Pemilu</span>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="font-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Simulasi Pemilihan Umum
          </h1>
          <p className="font-desc text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Ikuti proses pemungutan suara di Tempat Pemungutan Suara (TPS) secara interaktif untuk memahami asas LUBER JURDIL.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-150">
          
          {/* Progress Indicator */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 border-b border-gray-200 dark:border-gray-800 flex justify-center gap-4 sm:gap-8">
            {pemiluSteps.map((s, idx) => (
              <div key={s.id} className="flex flex-col items-center relative">
                <div className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 shadow-sm z-10",
                  hasVoted || idx < step ? "bg-green-500 border-green-500 text-white" :
                  idx === step && !hasVoted ? "bg-white dark:bg-gray-900 border-primary dark:border-gold text-primary dark:text-gold ring-4 ring-primary/20 dark:ring-gold/20" :
                  "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400"
                )}>
                  {hasVoted || idx < step ? <Check className="w-5 h-5" /> : idx + 1}
                </div>
                <span className={clsx(
                  "text-[10px] font-bold uppercase tracking-wider mt-2 hidden md:block w-24 text-center",
                  (idx === step || hasVoted || idx < step) ? "text-gray-900 dark:text-white" : "text-gray-400"
                )}>
                  {s.title}
                </span>
                
                {/* Connector Line */}
                {idx < pemiluSteps.length - 1 && (
                  <div className={clsx(
                    "absolute top-5 left-5 w-24 sm:w-32 h-1 z-0",
                    idx < step || hasVoted ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Interactive Area */}
          <div className="grow p-6 sm:p-10 lg:p-16 relative flex items-center justify-center bg-gray-50 dark:bg-gray-900/50">
            <AnimatePresence mode="wait">
              {hasVoted ? (
                <motion.div 
                  key="finish"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Fingerprint className="w-12 h-12" />
                  </div>
                  <h2 className="font-title text-3xl font-bold text-gray-900 dark:text-white mb-2">Terima Kasih!</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    Suara Anda telah berhasil direkam. Simulasi ini menunjukkan bahwa pemilu di Indonesia berasaskan Langsung, Umum, Bebas, Rahasia, Jujur, dan Adil.
                  </p>
                  <button onClick={resetSimulation} className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                    Ulangi Simulasi
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-center mb-8">
                    <h3 className="font-title text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {currentStepData.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {currentStepData.description}
                    </p>
                  </div>

                  {/* Step Specific UI */}
                  {step === 0 && (
                    <div className="flex justify-center p-8">
                      <div className="w-64 h-40 bg-blue-100 dark:bg-blue-900/40 rounded-xl border-2 border-blue-200 dark:border-blue-800 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                        <div className="absolute top-2 right-2 w-8 h-10 bg-gray-300 dark:bg-gray-600 rounded opacity-50" />
                        <UserCheck className="w-12 h-12 text-blue-500 dark:text-blue-400 mb-2" />
                        <span className="font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest text-sm">e-KTP Valid</span>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                        Surat Suara Pemilihan Umum
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {partiesData.map((party) => (
                          <button
                            key={party.id}
                            onClick={() => setSelectedParty(party.id)}
                            className={clsx(
                              "p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden group",
                              selectedParty === party.id 
                                ? "border-primary dark:border-gold bg-primary/5 dark:bg-gold/5" 
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-400"
                            )}
                          >
                            <div className={clsx("w-10 h-10 rounded-lg mb-3 flex items-center justify-center text-white font-bold", party.logoColor)}>
                              {party.name.charAt(0)}
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{party.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{party.vision}</p>
                            
                            {selectedParty === party.id && (
                              <div className="absolute inset-0 bg-black/10 dark:bg-black/20 flex items-center justify-center backdrop-blur-[1px]">
                                <div className="w-12 h-12 rounded-full border-4 border-red-500 flex items-center justify-center transform rotate-12">
                                  <div className="w-6 h-6 rounded-full bg-red-500" />
                                </div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="flex justify-center p-8">
                       <motion.div 
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-48 h-64 bg-gray-200 dark:bg-gray-700 rounded-t-xl border-4 border-gray-300 dark:border-gray-600 relative flex flex-col"
                      >
                        <div className="h-4 w-32 bg-black/20 mx-auto mt-4 rounded-full" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-32 bg-white dark:bg-gray-800 border-2 border-gray-300 rounded shadow-md z-10 flex items-center justify-center mt-2">
                          <ScrollText className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="mt-auto p-4 text-center border-t-2 border-gray-300 dark:border-gray-600">
                          <Inbox className="w-8 h-8 mx-auto text-gray-500" />
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="flex justify-center p-8">
                       <div className="w-32 h-32 rounded-full border-4 border-purple-500 flex items-center justify-center bg-purple-100 dark:bg-purple-900/30">
                          <Fingerprint className="w-16 h-16 text-purple-600 dark:text-purple-400" />
                       </div>
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                    <button
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-primary dark:bg-gold text-white dark:text-gray-900 font-bold rounded-xl hover:bg-primary/90 dark:hover:bg-gold/90 transition-all flex items-center"
                    >
                      {step === pemiluSteps.length - 1 ? "Selesai" : "Selanjutnya"}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
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
