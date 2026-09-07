"use client";

import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft, Users, FileSignature, ShieldCheck, ChevronRight } from "lucide-react";
import { useState } from "react";
import { mprAgendas, mprMembers, MPRAgenda } from "@/data/media-realita/mpr";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export default function SidangMPRPage() {
  const [selectedAgenda, setSelectedAgenda] = useState<MPRAgenda | null>(null);

  // Generate dots to simulate members
  const generateDots = (count: number, colorClass: string) => {
    // Render only a fraction for performance, e.g. 1 dot = 10 members
    const visualCount = Math.ceil(count / 10);
    return Array.from({ length: visualCount }).map((_, i) => (
      <div key={i} className={clsx("w-3 h-3 rounded-full m-1 shadow-sm", colorClass)} />
    ));
  };

  return (
    <Section className="min-h-screen py-16 md:py-24 bg-gray-50 dark:bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6">
        
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
            <span className="text-gray-600 dark:text-gray-300">Sidang MPR</span>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="font-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Simulasi Sidang MPR
          </h1>
          <p className="font-desc text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Pelajari struktur, komposisi, dan mekanisme persidangan Majelis Permusyawaratan Rakyat (MPR) berdasarkan wewenang konstitusionalnya.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chamber Visualization */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col items-center">
            
            <div className="w-full text-center mb-10">
              <div className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-8 py-4 rounded-xl border border-gray-200 dark:border-gray-700 font-title font-bold text-lg text-gray-900 dark:text-white mb-8">
                Meja Pimpinan MPR
              </div>

              {/* Semicircle Seating Simulation */}
              <div className="relative max-w-3xl mx-auto flex justify-center mt-4">
                {/* DPR Block */}
                <div className="flex flex-col items-center w-1/2">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-wider">Anggota DPR ({mprMembers.dpr})</span>
                  <div className="flex flex-wrap justify-center content-start bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-tl-full border-t border-l border-blue-200 dark:border-blue-900/50 min-h-62.5">
                    {generateDots(mprMembers.dpr, "bg-blue-500")}
                  </div>
                </div>

                {/* DPD Block */}
                <div className="flex flex-col items-center w-1/2">
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-4 uppercase tracking-wider">Anggota DPD ({mprMembers.dpd})</span>
                  <div className="flex flex-wrap justify-center content-start bg-amber-50/50 dark:bg-amber-900/10 p-6 rounded-tr-full border-t border-r border-amber-200 dark:border-amber-900/50 min-h-62.5">
                    {generateDots(mprMembers.dpd, "bg-amber-500")}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-center items-center gap-3">
                <Users className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Total Anggota MPR: <strong className="text-gray-900 dark:text-white text-lg">{mprMembers.total}</strong> Anggota</span>
              </div>
            </div>
          </div>

          {/* Agenda Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-title font-bold text-xl text-gray-900 dark:text-white mb-4">Agenda Persidangan</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Pilih salah satu agenda konstitusional di bawah ini untuk melihat simulasi aturan mainnya.</p>
              
              <div className="space-y-3">
                {mprAgendas.map((agenda) => (
                  <button
                    key={agenda.id}
                    onClick={() => setSelectedAgenda(agenda)}
                    className={clsx(
                      "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group",
                      selectedAgenda?.id === agenda.id 
                        ? "border-primary dark:border-gold bg-primary/5 dark:bg-gold/5" 
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-400"
                    )}
                  >
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{agenda.title}</span>
                    <ChevronRight className={clsx("w-5 h-5 transition-transform", selectedAgenda?.id === agenda.id ? "text-primary dark:text-gold rotate-90" : "text-gray-400 group-hover:translate-x-1")} />
                  </button>
                ))}
              </div>
            </div>

            {/* Agenda Detail Panel */}
            <AnimatePresence mode="wait">
              {selectedAgenda ? (
                <motion.div
                  key={selectedAgenda.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-md"
                >
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{selectedAgenda.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                    {selectedAgenda.description}
                  </p>
                  
                  <div className="space-y-5">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary dark:text-gold" />
                        Syarat Kuorum (Kehadiran)
                      </span>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-800 dark:text-gray-200">
                        {selectedAgenda.quorum}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block flex items-center gap-2">
                        <FileSignature className="w-4 h-4 text-green-500" />
                        Syarat Putusan (Voting)
                      </span>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-800 dark:text-gray-200">
                        {selectedAgenda.decisionRule}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center opacity-50 border-dashed">
                  <ShieldCheck className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-500">Pilih agenda persidangan di atas untuk melihat detail kuorum dan putusan.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </Section>
  );
}
